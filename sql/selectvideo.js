var mysql = require("mysql")

function select( value,suCalback,errCalback ){
var connection= mysql.createConnection({
  host:'localhost',
  user:'root',
  password:"123456",
  port:"3306",
  database:"mynode"
})

connection.connect( );

return new Promise((res,errs)=>{
  let pagesize=20
  let pagenum = 1
  if(value){
    pagenum=value.no
  }
  let pageno = (pagenum-1) * pagesize
var  sql = `SELECT * FROM  video limit  ${pageno} , ${pagesize} ;`;
connection.query(sql,function (err, result) {
  if(err){
    errs (err)
    return "error"
  }
  let string = JSON.stringify(result)
  let data= JSON.parse(string)
 res (data)
  // res (result)
  connection.end();
})
});

}

module.exports = select
