var mysql = require("mysql")

function gettatal( value,suCalback,errCalback ){
var connection= mysql.createConnection({
  host:'localhost',
  user:'root',
  password:"123456",
  port:"3306",
  database:"mynode"
})

connection.connect( );

return new Promise((res,errs)=>{
var  sql = 'SELECT count(id) as total FROM mast';
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

module.exports = gettatal
