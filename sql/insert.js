var mysql = require("mysql")

function insert( value,suCalback,errCalback ){
var connection= mysql.createConnection({
  host:'localhost',
  user:'root',
  password:"123456",
  port:"3306",
  database:"mynode"
})
console.log(value,value.name)
return new Promise((res,errs)=>{
  var  addSql = `INSERT INTO mast(id,name,url,lei,date,upname,upqq) VALUES(${0},'${value.name}','${value.url}','${value.lei}','${value.date}','${value.upname}','${value.upqq}')`;
  // var  addSql = `INSERT INTO mast(id,name,url,lei) VALUES(${0},'站长测试','www.baidu.com','测试')`;

connection.connect( );
connection.query(addSql,function (err, result) {
  if(err){
    errs (err)
    connection.end();
    return "error"
  }
 let string = JSON.stringify(result)
 let data= JSON.parse(string)
res (data)
connection.end();
})

});

}

module.exports = insert
