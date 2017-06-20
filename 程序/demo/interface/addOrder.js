var link=require("../database/link")
var addPro=function(obj,returnValue,res){
		var mysql = require('mysql');
		
		var obj=JSON.parse(obj);

		var connection = mysql.createConnection(link);
		connection.connect();
		
		console.log(obj)

				  	   
						var  userAddSql = 'INSERT INTO scoreList(id,name,career,class,usualScore,jobScore,finalScore) VALUES(?,?,?,?,?,?,?)';
						
						var  userAddSql_Params = obj;
						
						//增 add
	console.log(obj[0],typeof obj);
						userAddSql_Params.forEach(function(n,i){
							
							connection.query(userAddSql,userAddSql_Params[i],function (err, result) {
						
						        if(err){
									returnValue(err.message,res);
						            
						            connection.end();
						         return;
						
						        }       
						        
						       console.log('-------INSERT----------');
						
						       //console.log('INSERT ID:',result.insertId);       
						
						       console.log('INSERT ID:',result);    
						       
						
						       console.log('#######################');
						       if (i==obj.length-1) {
								returnValue("加入成功",res);
								connection.end();
							   }
						       
							});
							
						})
						
						

		
		
				    
		
		
		
		
		
		

}
module.exports=addPro;