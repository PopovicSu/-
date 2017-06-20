var link=require("../database/link")
var addPro=function(obj,returnValue,res){
		var mysql = require('mysql');
		
		var obj=JSON.parse(obj);
		
		var isSample=false;
	    var samplePro=[];
		var connection = mysql.createConnection(link);
		connection.connect();
		console.log(obj);
		
		var userModSql = 'UPDATE scoreList SET finalScore=?,jobScore=?,usualScore=?,class=?,career = ?,name = ? WHERE id = ?';

var userModSql_Params = obj;

//改 up
for (var i=0;i<obj.length;i++) {
	connection.query(userModSql,userModSql_Params[i],function (err, result) {

   if(err){

         console.log('[UPDATE ERROR] - ',err.message);
		returnValue(err.message,res)
         return;

   } 
   returnValue("修改成功",res)

  console.log('----------UPDATE-------------');

  console.log('UPDATE affectedRows',result.affectedRows);

  console.log('******************************');

});
}

connection.end();
		
		
				    
		
		
		
		
		
		

}
module.exports=addPro;