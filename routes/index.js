const router = require('koa-router')()
const request = require('request');
const rp = require('request-promise')
var fs = require("fs");
var mysql = require("mysql")
const bodyParser = require('koa-bodyparser')
const select = require("../sql/select")
const insert = require("../sql/insert")
const gettatal = require('../sql/gettotal')
const addcishu = require("../sql/addcixhu")

router.get('/', async (ctx, next) => {
    const res = await rp("http://localhost:3000/add?no=1")
	await ctx.render('index', {
        PATHNAME: ctx.path,
        list:res
	})
})
router.get('/index', async (ctx, next) => {
    const que = ctx.query
    console.log(que)
    const res = await rp(`http://localhost:3000/add?no=${que.no}`)
	await ctx.render('index', {
        PATHNAME: ctx.path,
        list:res
	})
})
router.get('/add', async (ctx,next)=>{ 
    const que = ctx.query
    await  select({no:que.no,lei:que.lei}).then((res)=>{
        ctx. body ={code: 200, success:true, data:res};
    }).catch(err=>{
        ctx. body ={code: 500,success:false, message: "Error!", data: err};
    })
});
router.post('/submit', async (ctx,next)=>{ 
    const que = ctx.request.body
    await  insert(que).then((res)=>{
        ctx. body ={success:true, code: 200, data:res};
    }).catch(err=>{
        ctx. body ={success:false,code: 500, message: "Error!", data: err};
    })
});
router.get('/gettotal', async (ctx,next)=>{ 
    await  gettatal().then((res)=>{
        ctx. body ={success:true, code: 200, data:res};
    }).catch(err=>{
        ctx. body ={success:false,code: 500, message: "Error!", data: err};
    })
});

router.get('/anli/:id', async (ctx, next) => {
    const id = ctx.params.id
    var data = require('../views/json/posts')
    await ctx.render('anli', {
        PATHNAME: ctx.path,
        list: data[id],
        id:id
    })
})

router.get('/aboutwe',async (ctx, next) => {
    const res = await rp('https://api.kukr.com/api/website/recommend/article')
    const result = JSON.parse(res)
    await ctx.render('aboutwe', {
        PATHNAME: ctx.path,
        list:result.result
    })
})
router.get('/aboutwe/:id',async (ctx, next) => {
    const id = ctx.params.id
    const res2 = await rp(`https://api.kukr.com/api/website/recommend/article/${id}`)
    //请求详情数据
    //返回详情数据
    const result2 = JSON.parse(res2)
    await  ctx.render('content5',{
        PATHNAME: ctx.path,
        data: result2.result
    })
})
router.get('/addcishu',async(ctx,next)=>{
    const id = ctx.query.id
    await addcishu(id).then((res)=>{
        ctx. body ={code: 200, success:true, data:res};
    }).catch(err=>{
        ctx. body ={code: 500,success:false, message: "修改浏览记录失败!", data: err};
    })
})

module.exports = router
