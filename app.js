const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const fs =require("fs")
const bodyparser = require('koa-bodyparser')
// const logger = require('koa-logger')
const index = require('./routes/index')
// const getfile = require("./index")
var url = require('url');
// const isfile =require("./isfile")
// 错误处理
onerror(app)
app.use(require('koa-static')(__dirname + '/public'))

// 加载中间件
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
// app.use(logger())

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// 加载路由
app.use(index.routes(), index.allowedMethods())
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  await next();
 });
// 错误处理
app.on('error', (err, ctx) => {
  console.error('server error', err)
});

module.exports = app
