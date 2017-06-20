var link=require("../database/link")
var addPro=function(returnValue,res){
    var mysql = require('mysql');



    var connection = mysql.createConnection(link);
    connection.connect();

    connection.query('SELECT * FROM scoreList', function(err,  results, fields) {
		    if (err) {
		       throw err;
		    }
		    
		    	  txt=JSON.stringify(results);
				  returnValue(txt,res);
			  
				
			})
	connection.end();
}
module.exports=addPro;
