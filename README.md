# voip-uni

## 说明
在`uniapp`和小程序平台，通过`webview`的方式实现音视频功能，支持单人、多人音视频通话，支持会议，但目前不支持邀请新成员。

## 开发测试
1. `npm install`安装依赖
2. `npm run serve`运行本项目
3. 修改 `wx-chat` 项目 `voip.js` 里面的 `voipBaseWebUrl` 为 第1步运行得到的`url`，不能用`localhost`那个
4. 小程序开发者工具，配置不校验合法域名
5. 真机预览`wx-chat`，可以是手机真机或电脑真机预览
6. 目前默认使用的是会议版音视频 SDK，详细说明请参考[voip readme](./src/wfc/av/internal/README.MD)

## 部署
1. 根据实际情况，参考[voip readme](./src/wfc/av/internal/README.MD)替换对应音视频 SDK
2. `npm run build`
3. 将上一步生成的`voip-dist.html`部署到服务器上，链接地址需要支持`https+域名`访问
4. 将上一步用的域名配置到小程序开发者后台业务域名里面

## 常见问题
1. 提示无法打开网页？

   点击右上角三个点，然后打开开发调试开关
2. `npm run serve`时，手机端不能打开网页

    可以用电脑端调试，或者配置域名，具体配置正确的域名和证书

**WIP**

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
