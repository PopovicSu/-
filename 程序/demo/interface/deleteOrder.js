var link=require("../database/link")
var addPro=function(obj,returnValue,res){
    var mysql = require('mysql');

    var obj=JSON.parse(obj);

    var connection = mysql.createConnection(link);
    connection.connect();



    var  userDelSql = 'DELETE FROM scoreList WHERE id = ?';
var  params=obj;
//ɾ
for (var i=0;i<obj.length;i++) {
	connection.query(userDelSql,params[i],function (err, result) {
	
	        if(err){
	
	          console.log('[DELETE ERROR] - ',err.message);
	
	          return;
	
	        }       
	
	 
	
	       console.log('-------------DELETE--------------');
	
	       console.log('DELETE affectedRows',result.affectedRows);
	
	       console.log('&&&&&&&&&&&&&&&&&'); 
	
	});
}

	
		  

       	connection.end();


		
		
			    
	
	
	
}
module.exports=addPro;
