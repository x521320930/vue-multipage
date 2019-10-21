<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="newDialogShow"
    :close-on-press-escape="false"
    :show-close="true"
    v-el-drag-dialog
    :before-close="handleClose"
    @dragDialog="handleDrag"
    width="600px" custom-class="node-dialog-container" :modal-append-to-body="false">
    <div class="node-common-style-container">
      <div class="dialog-layout-tree-container">
        <div class="dialog-layout-tree-search">
          <el-input :placeholder="queryPlaceholder" clearable maxlength="32" class="dialog-search-input" 
            v-model="searchInput" @input="handleSearchAll">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div class="dialog-layout-tree-structure">
          <!-- @node-click="handleNodeClick" -->
          <!-- @check-change="handleNodeCheckChange" -->
          <el-tree
          :data="treeData"
          :props="defaultTreeKey"
          :show-checkbox="!isRadio"
          ref="tree"
          :expand-on-click-node="false"
          :default-expanded-keys="defaultExpandedKey"
          :default-checked-keys="defaultCheckedKey"
          :filter-node-method="handleFilterNode"
          @check="handleNodeCheckClick"
          @node-click="handleNodeClick"
          :node-key="nodeKey">
          <div class="custom-tree-node"  slot-scope="{ node, data }">
            <template v-if="data[selectedKey.key] == 'd'">
              <svg-icon icon-class="file" class="node-svg-icon"></svg-icon>
            </template>
            <template v-else>
              <svg-icon icon-class="personnel" class="node-svg-icon"></svg-icon>
            </template>
            <span :data-test="selectedKey.val" class="tree-node-label">{{node.label}}</span>
          </div>
          <!-- :title="data[selectedKey.key] == selectedKey.val" -->
          </el-tree>
          <!-- 搜索 -->
          <!-- <div class="dialog-layout-tree-search-result-wrap" v-show="searchInput.length != 0">
            <div class="dialog-searchResult-header" v-if="searchDepartmentData.length != 0">部门</div>
            <div class="dialog-search-party-list"
              :key="i"
              v-for="(item, i) in searchDepartmentData">
              <div class="dialog-search-party-items" @click="handleNodeClick(item)">
                <svg-icon icon-class="file"></svg-icon>
                <span class="dialog-search-party-text">{{item.department_names}}</span>
                <span class="tree-node-checkbox" 
                  :class="{'select-checkbox': collectionId.indexOf(item.department_ids) !== -1}">
                </span>
              </div>
            </div>
            <div class="el-table__empty-block" v-if="searchDepartmentData.length == 0">
              <span class="el-table__empty-text">无搜索结果</span>
            </div>
          </div> -->
        </div>
      </div>
      <div class="dialog-layout-content-container">
        <div class="dialog-container-header">{{selectedTitle}}({{collectionData.length}})</div>
        <el-tag
          v-for="(tag, i) in collectionData"
          :key="i"
          :closable="tag.closable == undefined ? true : false"
          :class="{'is-disabled': tag.closable == undefined ? false : true }"
          :title="tag[defaultTreeKey.label]"
          @close="handleRemoveCollectioClick(tag)">
          <template v-if="tag[selectedKey.key] == 'd'">
            <svg-icon icon-class="file"></svg-icon>
          </template>
          <template v-else>
            <svg-icon icon-class="personnel"></svg-icon>
          </template>
          <span class="tag_label">{{tag[defaultTreeKey.label]}}</span>
        </el-tag>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="handleSubmit" :disabled="collectionKey.length === 0">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
  import elDragDialog from '@/directive/el-dragDialog' // base on element-ui
  export default {
    name: 'HsTree',
    props: {
      treeData: { // 树数据
        type: Array,
        default: () => {
          return []
        }
      },
      // 树node的唯一值
      nodeKey: {
        type: String,
        default: () => {
          return 'id'
        }
      },
      // 树所需要的key
      defaultTreeKey: {
        type: Object,
        default: () => {
          return {
            children: 'children',
            label: 'name'
          }
        }
      },
      // 是否显示
      dialogShow: {
        type: Boolean,
        default: () => {
          return false
        }
      },
      // 弹出框 title
      dialogTitle: {
        type: String,
        default: () => {
          return ''
        }
      },
      // 默认展开节点
      defaultExpandedKey: {
        type: Array,
        default: () => {
          return []
        }
      },
      // 默认选中的key
      defaultCheckedKey: {
        type: Array,
        default: () => {
          return []
        }
      },
      // 搜索信息
      queryPlaceholder: {
        type: String,
        default: () => {
          return ''
        }
      },
      // 选中title
      selectedTitle: {
        type: String,
        default: () => {
          return ''
        }
      },
      // 选人 还是 选部门 默认是选人状态
      selectedType: {
        type: Number,
        default: () => {
          return 0
        }
      },
      // 是否是单元 默认false
      isRadio: {
        type: Boolean,
        default: () => {
          return false
        }
      },
      // 是否选人
      isPersonne: {
        type: Boolean,
        default: () => {
          return false
        }
      },
      // 选中时需要的key
      selectedKey: {
        type: Object,
        default: () => {
          return {
            key: 'dataType',
            val: 'p'
          }
        }
      },
      // 右侧选中过的数据
      selectedData: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data () {
      return {
        newDialogShow: this.dialogShow,
        collectionData: [], // 收集数据
        collectionKey: [], // 收集数据 key
        searchInput: '', // 搜索框
        searchDepartmentData: [], // 搜索的部门数据
        editCheckId: '' // 存单选id
      }
    },
    methods: {
      // 删除 添加 统一方法
      handleAddRemoveNode (data) {
        if (!this.departmentAllId.has(data.department_ids)) {
          this.departmentAllId.set(data.department_ids, data)
        } else {
          this.departmentAllId.delete(data.department_ids)
        }
        // 所有部门id
        this.collectionId = [...this.departmentAllId.keys()]
        // 所有部门详情数据
        this.collectionData = [...this.departmentAllId.values()]
      },
      // 搜索树节点
      handleSearchAll (val, ev) {
        this.$refs.tree.filter(val)
      },
      // 复选框选中时
      handleNodeCheckClick (data, node) {
        console.log(data)
        console.log(node)
        // 多选
        if (this.isRadio) return
        var { checkedNodes } = node
        this.collectionData = [...checkedNodes.filter(n => { return n[this.selectedKey.key] === this.selectedKey.val })]
        this.collectionKey = [...this.collectionData.map(n => { return n[this.nodeKey] })]
        console.log(this.collectionData)
        console.log(this.collectionKey)
      },
      // 节点选中状态发生变化时的回调
      // handleNodeCheckChange (item, node, self) {
      //   // 单选
      //   if (!this.isRadio) return
      //   console.log(item, node, self)
      //   if (node == true) { // 点击未选中复选框
      //     this.editCheckId = item.id
      //     this.$refs.tree.setCheckedKeys([item.id])
      //   } else {
      //     if (this.editCheckId == item.id) { // 点击已选中复选框，保证至少一个选中
      //       this.$refs.tree.setCheckedKeys([item.id])
      //     }
      //   }
      // },
      // 节点被点击时的回调
      handleNodeClick (item, node, self) {
        // 单选
        if (!this.isRadio) return
        // this.editCheckId = item.id
        if (item[this.selectedKey.key] === this.selectedKey.val) {
          this.collectionData = [item]
          // console.log(this.collectionData)
        }
        this.collectionKey = [...this.collectionData.map(n => { return n[this.nodeKey] })]
        // this.$refs.tree.setCheckedKeys([item.id])
      },
      // 收集数据去除
      handleRemoveCollectioClick (data) {
        this.collectionData = this.collectionData.filter(n => { return n[this.nodeKey] !== data[this.nodeKey] })
        this.collectionKey = [...this.collectionData.map(n => { return n[this.nodeKey] })]
        this.$refs.tree.setCheckedKeys(this.collectionKey)
      },
      // 搜索tree配置
      handleFilterNode (value, data) {
        if (!value) return true
        return data[this.defaultTreeKey.label].indexOf(value) !== -1
      },
      // 取消设置
      cancel () {
        this.searchInput = ''
        this.collectionData = this.selectedData
        this.collectionKey = this.defaultCheckedKey
        this.$emit('back', { data: this.collectionData, key: this.collectionKey, type: 'cancel' })
      },
      // 确认
      handleSubmit () {
        this.$emit('back', { data: this.collectionData, key: this.collectionKey, type: 'submit' })
      },
      // 拖拽返回信息
      handleDrag (item) {
      },
      // 是否确认关闭
      handleClose (done) {
        this.$confirm('确认关闭？', '关闭', { type: 'warning' }).then(_ => {
          this.cancel()
          done()
        }).catch(_ => {})
      }
    },
    mounted () {
      this.collectionData = [...this.selectedData]
      this.collectionKey = [...this.collectionData.map(n => { return n[this.nodeKey] })]
    },
    watch: {
      defaultCheckedKey (val) {
        console.log(val)
        if (val.length == 0) {
          this.collectionData = []
          this.collectionKey = []
        }
      },
      selectedData(val) {
        this.collectionData = [...this.selectedData]
        this.collectionKey = [...this.collectionData.map(n => { return n[this.nodeKey] })]
      },
      dialogShow(indexVal) {
        this.newDialogShow = indexVal
      }
    },
    directives: {
      elDragDialog
    }
  }
</script>
<style lang="scss">
  .node-dialog-container .dialog-layout-tree-container .dialog-layout-tree-structure .custom-tree-node .node-svg-icon{
    color: #24448E;
  }
  .node-dialog-container .dialog-layout-content-container .svg-icon{
    color: #24448E;
  }
  .el-tag .el-icon-close:hover{
    background: #24448E;
  }
  .el-tree .el-tree-node__expand-icon:not(.is-leaf){
    color: #24448E;
  }
</style>
