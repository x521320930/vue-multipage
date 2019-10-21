


``` bash
# 目录结构
├── build                                   // 构建相关  
├── config                                  // 配置相关
├── src                                     // 源代码
│   ├── api                                 // 所有请求
│   ├── assets                              // 主题 字体等静态资源
│   ├── components                          // 全局公用组件
│   ├── directive                           // 全局指令
│   ├── filtres                             // 全局 filter
│   ├── icons                               // 项目所有 svg icons
│   ├── lang                                // 国际化 language
│   ├── styles                              // 全局样式
│   ├── utils                               // 全局公用方法
│   ├── store                               // 全局 store管理
│   ├── page                                // 导航模块
│   │  ├── module                           // 模块文件名称
│   │  │  ├── router                        // 路由
│   │  │  ├── components                    // 本模块公用组件 
│   │  │  ├── store                         // 本模块store管理
│   │  │  ├── views                         // 页面与逻辑
│   │  │  │  ├── module                     // 模块文件夹名称
│   │  │  │  │  ├── index.vue               // vue
│   │  │  │  │  ├── style.scss              // 样式
│   │  │  │  │  ├── template.html           // 页面
│   │  │  │  ├── index.vue                  // vue   
│   │  │  ├── store                         // 本模块store管理
│   │  │  ├── App.vue                       // 本模块主页面
│   │  │  ├── main.js                       // js主路径
│   │  │  ├── index.html                    // html模板
│   │  │  ├── utils                         // 本模块工具库
│   │  │  ├── styles                        // 本模块 样式
│   │  │  ├── directive                     // 本模块指令
├── static                                  // 第三方不打包资源
├── .babelrc                                // babel-loader 配置
├── eslintrc.js                             // eslint 配置项
├── .gitignore                              // git 忽略项
├── favicon.ico                             // favicon图标
└── package.json                            // package.json
```
``` bash
# 为了节省 在vue-cli 配置相关 loader plugins 兼容问题 
# 原有 单页面 改成 多页面
# 封装 utils 工具 API 等..
# 具体细节请查看代码
## Build Setup
# Install dependencies
npm install
# 下载慢可以
npm install --registry=https://registry.npm.taobao.org
# serve with hot reload at localhost:9528
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

