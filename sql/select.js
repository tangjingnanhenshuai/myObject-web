var mysql = require("mysql")

function select( value={no:1},suCalback,errCalback ){
var connection= mysql.createConnection({
  host:'localhost',
  user:'root',
  password:"123456",
  port:"3306",
  database:"mynode"
})

connection.connect( );
let pagesize=20
let pageno = (value.no-1) *pagesize
return new Promise((res,errs)=>{
var  sql = `SELECT * FROM  mast limit  ${pageno} , ${pagesize} ;`;
connection.query(sql,function (err, result) {
  if(err){
    errs (err)
    return "error"
  }
 let string = JSON.stringify(result)
 let data= JSON.parse(string)
res (data)
connection.end();
})
});

}

module.exports = select
