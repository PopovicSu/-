var service=function(req,res){
			
		var fs = require('fs');//引入文件读取模块
		var path=require("path");
		var documentRoot = 'H:/final/score/score';
		
		var mime={
		    "css": "text/css",
		    "gif": "image/gif",
		    "html": "text/html",
		    "ico": "image/x-icon",
		    "jpeg": "image/jpeg",
		    "jpg": "image/jpeg",
		    "js": "text/javascript",
		    "json": "application/json",
		    "pdf": "application/pdf",
		    "png": "image/png",
		    "svg": "image/svg+xml",
		    "swf": "application/x-shockwave-flash",
		    "tiff": "image/tiff",
		    "txt": "text/plain",
		    "wav": "audio/x-wav",
		    "wma": "audio/x-ms-wma",
		    "wmv": "video/x-ms-wmv",
		    "xml": "text/xml"
		};
		
		
		    var url = req.url; 
		    console.log(url);
		   
		    if (url.indexOf("html?")!=-1) {
		    	url=url.substring(0,url.indexOf("?"));
		    	console.log(url);
		    }
		    
		     
		    var file = documentRoot + url;
		    
		    var ext = path.extname(file);
		 	
		
		
		    fs.readFile( file , function(err,data){
		   
		        if(err){
		            res.writeHeader(404,{
		                'content-type' : 'text/html;charset="utf-8"'
		            });
		            res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
		            res.end();
		        }else{
		        	
		
					
					ext = ext ? ext.slice(1) : 'unknown';
					
					
					
					var contentType = mime[ext] || "text/plain";
		
		            res.writeHeader(200,{
		                'content-type' : contentType+';charset="utf-8"'
		            });
		            res.write(data);
		            res.end();
		
		        }
		
		    });
		
		
	
		
		
}
module.exports=service;