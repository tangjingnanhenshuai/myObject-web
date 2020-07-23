var url = require('url');
const getfile = require("./index")
const fs =require("fs" )
async function  isfile(ctx,next){
  // console.log(ctx.req)
  let pathname = url.parse(ctx.request.url).pathname
  if(pathname=="/" || pathname=="/index" || pathname=="/add" || pathname=="/submit" || pathname=="/gettotal" ){
    await next()
  }else{
    await getfile.readFileBySuffixName(pathname,fs,ctx.request,ctx.res,next);
  }
}


module.exports=function(){
  return async function(ctx,next){
    await isfile(ctx,next);
      // await next();//运行完毕，交给下一个中间件
  }
}