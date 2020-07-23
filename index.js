exports.readFileBySuffixName = async function(pathname,fs,request,response,next){
    var ext = pathname.match(/(\.[^.]+|)$/)[0];
    switch(ext){
      case ".css":
       await next()
       break;
      case ".js":
        //  fs.readFile("."+request.url,"utf-8",function(err,data){
        //     if(err) console.log("读取js/css失败！")
        //     response.writeHead(200,{
        //       "Content-Type":{
        //         ".css":"text/css",
        //         ".js":"application/javascript"
        //       }[ext]
        //     });
        //      response.write(data);
        //      response.end();
        //  });
        await next()
         break;
      case ".jpg":
      case ".gif": 
      case ".png": 
        //  fs.readFile("./public"+decodeURI(request.url),"binary",function(err,data){
        //      if(err) {
        //        console.log(decodeURI(request.url),"读取图片失败") 
        //      } else{
        //         // response.writeHead(200,{
        //         //     "Content-Type":{
        //         //         ".jpg":"image/jpeg",
        //         //         ".png":"image/png",
        //         //     }[ext]
        //         // });
        //         //  response.write(data,'binary'); //发送二进制数据
        //         // return response.end();
        //         response.write("404 not found");
        //         response.end();
        //      }
        //  });
         var liu = fs.createReadStream("./public"+decodeURI(request.url));
            response.writeHead(200,{
                    "Content-Type":{
                        ".jpg":"image/jpeg",
                        ".png":"image/png",
                    }[ext]
                });
         liu.on('open',(res)=>{
           console.log("文件打开")
           console.log("res大小",res)
           response.write(liu);
          response.end();
           liu.pipe(response);
         })
        //  await next()
         break;
      case ".mp4": 
          fs.stat("."+decodeURI(request.url),function(err,stats){
            if(err){
              if(err.code==="ENOENT"){
                return response.sendStatus(404);
              }
              response.end(err);
            }
            //  var range = response.headers.range;
            //  if(!range){
            //     return response.sendStatus(416)
            //  }
            //  var positions = range.replace(/bytes=/,"").split("-");
            //   //获取客户端请求文件的开始位置
            //   var start = parseInt(positions[0]);
              var total = stats.size;
            //   var end = positions[1] ? parseInt(positions[1],10):total -1;
            //   //获取需要读取的文件大小
            //   var chunksize = (end-start) + 1;
             console.log("大小",total)
            let start=0
            let end=10000000
              var chunksize = (end-start) + 1;
              // response.writeHead(206,{
              //     "Content-Range":"bytes "+ start+"-"+end+"/"+total,
              //     "Accept-Ranges":"bytes",
              //     "Content-Length":chunksize,
              //     "Content-Type":"video/mp4"
              // });
             
                // var stream = fs.createReadStream('.'+decodeURI(request.url),{start:start,end:end})
              // .on('open',function(){
              //   stream.pipe(response);
              // }).on('error',function(err){
              //   response.end(err)
              // })
              // var stream = fs.createReadStream('.'+decodeURI(request.url),{start:start,end:end})
              // .on('open',function(){
              //   stream.pipe(response);
              //   // response.end();
              //   // response.write(stream,'binary'); //发送二进制数据
              // }).on('error',function(err){
              //   response.end(err)
              // })
              let head = { 'Content-Type': 'video/mp4' };
              //需要设置HTTP HEAD
              response.writeHead(200, head);
              //使用pipe
            //  var liu = fs.createReadStream('./video/test.mp4',{start:0,end:16761753});
             var liu = fs.createReadStream('./video/test.mp4');
             liu.on('open',(res)=>{
               console.log("文件打开")
               console.log("res大小",res)
              liu.pipe(response);
             })
              // fs.createReadStream('./video/test.mp4')
            //   fs.readFile("."+decodeURI(request.url),"binary",function(err,data){
            //     if(err) {
            //       console.log("读取视频失败") 
            //     } else{
            //       response.writeHead(200,{
            //         "Content-Range":"bytes "+ start+"-"+end+"/"+total,
            //         "Accept-Ranges":"bytes",
            //         "Content-Length":chunksize,
            //         "Content-Type":"video/mp4"
            //     });
            //    response.write(data,'binary'); //发送二进制数据
            //    response.end();
            //     }
            // });
            
            // fs.createReadStream('.'+decodeURI(request.url)).pipe(response);
                // response.end();
                // response.write(stream,'binary'); //发送二进制数据
           
          })
          break;
          　case ".rar":
            //同步读取文件状态
            　　var stats = fs.statSync("." + decodeURI(request.url));
                  response.writeHead(200,{
                      "Content-Type": "application/octet-stream", //相应该文件应该下载
                      //模板字符串
                      "Content-Disposition": `attachment; filename = ${pathname.replace("/","")}`,
                      "Content-Length":stats.size
                  });
               //管道流
               fs.createReadStream("." + decodeURI(request.url)).pipe(response);
               break;
  　　　　　　　　//以上都不匹配则使用默认的方法
  　　　　　　default:
                await next()
//    　　　　　　　fs.readFile('.'+pathname,'utf-8',function(err,data){    
//                   response.writeHead(200,{
//                       "Content-Type":"text/html"
//                   });
//                   response.write(data);
//                   response.end();
//               });
    }
  }