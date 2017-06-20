var http=require("http");
var fwq=require("./service1.js");
var ip="";
function getIPAdress(){
    var interfaces = require('os').networkInterfaces();
    for(var devName in interfaces){
          var iface = interfaces[devName];
          for(var i=0;i<iface.length;i++){
               var alias = iface[i];
               if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
                     return alias.address;
               }
          }
    }
}
ip=getIPAdress();
//ip="localhost"
console.log(ip);
var server=http.createServer(function(req,res){
 	console.log(req.url,1)
 	if (req.url=="/") {
 		var obj={};
	 	req.on('data',function(data){
	 		    var data=decodeURIComponent(data);
	 		    var arr="";
	 		    
	 		    data=data.split("&");
	 		    for (var i=0;i<=data.length-1;i++) {
	 		    	arr=data[i].split("=");
	 		    	//console.log(arr[0]+" "+arr[1]);
	 		    	obj[arr[0]]=arr[1];
	 		    }
	 		    console.log(obj);
	 		    
	            //console.log("服务器接收到的数据：　"+decodeURIComponent(data));
	    });
	
	    req.on("end",function(){
				    	console.log('客户端请求数据全部接收完毕');
				    	//obj=JSON.stringify(obj);
				    	console.log(obj.fun);
				    	switch(obj.fun)
						{

						case "searchOrder":
							var two=require("./interface/searchOrder.js");
							two(returnValue,res);
						
						  
						break;

						case "addOrder":
							var two=require("./interface/addOrder.js");
							two(obj.data,returnValue,res);
						
						     
						break;

						case "updateOrder":
							var two=require("./interface/updateOrder.js");
							two(obj.data,returnValue,res);
						
						     
						break;
						case "deleteOrder":
							var two=require("./interface/deleteOrder.js");
							two(obj.data,returnValue,res);
						
						     
						break;

						default:
						  
						}
                        
				    });
 	            
 	}else{
 		console.log(req.url)
 		fwq(req,res);

 	}
 	


 });
 server.listen(1337,ip,function(){
     console.log("localhost:1337开始监听...");
	 
	 
 });

function returnValue (msg,res) {
	
	//http://127.0.0.1:8020
	res.writeHead(200,{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"});    
    res.write(msg);
	res.end();
}
