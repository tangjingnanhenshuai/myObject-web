var mysql = require("mysql")

function addcishu( value,suCalback,errCalback ){
var connection= mysql.createConnection({
  host:'localhost',
  user:'root',
  password:"123456",
  port:"3306",
  database:"mynode"
})

connection.connect( );

return new Promise((res,errs)=>{
var  sql = `UPDATE mast set cishu=cishu+1 where id=${value}`;
connection.query(sql,function (err, result) {
  if(err){
    errs (err)
    return "error"
  }
res (result)
connection.end();
})
});

}

module.exports = addcishu
