var app=angular.module("app",[]);
var now=0;
// Angular的一个指令，在循环完成后触发timeout函数
    app.directive('onFinishRenderFilters', function ($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                if (scope.$last === true) {
                	//alert(1)
                    $timeout(function() {
                        scope.$emit('ngRepeatFinished');
                    });
                }
            }
        };
    });
//Angular中控制器指令：
	app.controller("my",function($scope,$compile){
		$scope.init=function(){
            $scope.id='';
            $scope.name='';
            $scope.zy='';
            $scope.ps='';
            $scope.ds='';
            $scope.qs='';
            $scope.nj='';
            $scope.id1='';
            $scope.name1='';
            $scope.zy1='';
            $scope.ps1='';
            $scope.ds1='';
            $scope.qs1='';
            $scope.nj1='';
		$scope.now=0;
		$scope.show=false;
		$scope.fileShow=false;
		$scope.lists=[]
			$scope.myValue='';
		$scope.editShow=false;
            sendHttp({
                fun:"searchOrder"
            },function(data){
                console.log(data);
                data=JSON.parse(data);
                
                $.each(data,function(i,n){
	                var c={};
					c.id=n.id;
					c.name=n.name;
					c.nj=n.class;
					c.zy=n.career;
					c.ps=n.usualScore;
					c.ds=n.jobScore;
					c.qs=n.finalScore;
					$scope.lists.push(c)
			   })
//              console.log(b);
//              $scope.lists.push(b);
                $scope.$digest();
            },function(){

            })
		}
        $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
            //下面是在table render完成后执行的js
           $scope.sort();
        });
// 添加数据函数：
		$scope.add=function(){
			$scope.id='';
    		$scope.name='';
    		$scope.zy='';
    		$scope.ps='';
    		$scope.ds='';
    		$scope.qs='';
    		$scope.nj='';
			$scope.show=true;	
		}
// 点击添加之后出现的确定按钮功能：
		$scope.sure=function(){
			$scope.show=false;
			//var page=parseInt(($("#soreList").find("tr").length-1)/10);
			// var str='<tr ng-click="check($event)" page='+page+'><td>'+$scope.id+'</td><td>'+$scope.name+'</td><td>'+$scope.zy+'</td><td>'+$scope.nj+'</td><td>'+$scope.ps+'</td><td>'+$scope.ds+'</td><td>'+$scope.qs+'</td></tr>'
            //
            	// $("#soreList").append($compile(str)($scope));
            $scope.lists.push({id:$scope.id,
				name:$scope.name,
				zy:$scope.zy,
                nj:$scope.nj,
                ps:$scope.ps,
                ds:$scope.ds,
                qs:$scope.qs,

            })
            var data=JSON.stringify([[$scope.id,
                $scope.name,
                $scope.zy,
                $scope.nj,
                $scope.ps,
                $scope.ds,
                $scope.qs

          ]])
            sendHttp({
                fun:"addOrder",
                data:data
            },function(data){
                console.log(data);
                
                
            },function(){

            })
            $scope.$digest();

            console.log(str)
		}
// 点击列表某项数据后选中功能：（若选中，则再次点击成为未选中状态，若未选中，则点击成为选中状态）
		$scope.check=function(e){
			var e=e.target;
			e=$(e).parent("div.row");
			//console.log($(e).attr("checked"),$(e)[0])
			if(e.attr("checked")){
				e.css("border","none").removeAttr("checked")
			}else{
				console.log(e.css("border","1px solid red").attr("checked","checked").siblings())
				e.css("border","1px solid red").attr("checked","checked").siblings().removeAttr("checked").css("border","none");
			}
			
		}
//  取消按钮：
		$scope.cancel=function(){
			$scope.show=false;
		}
// 上一页：
		$scope.pre=function(){
			if($scope.now!=0){
				$scope.now-=1;
				now-=1;
			}
			$scope.sort();
		}
// 下一页：
		$scope.next=function(){
			$scope.now+=1;
			now+=1;
			$scope.sort();
		}
// 排序：即只显示当前页内容，每页只显示10条数据
		$scope.sort=function(){
			$("#soreList div.row[page]").css("display","none");
			$("#soreList div.row[page="+$scope.now+"]").css("display","block");
		}
// 删除数据：
		$scope.del=function(){

            if($("#soreList div.row[checked]").length==0){
                alert("请选中一个列表")
				return;
            }

			//$("#soreList tr[checked]").remove();
			var index=$("#soreList div.row[checked]").index();
			console.log(index)
			var a=JSON.parse(JSON.stringify($scope.lists))
			var b=[];
			$.each(a,function(i,n){
                var c={};
				c.id=n.id;
				c.name=n.name;
				c.nj=n.nj;
				c.zy=n.zy;
				c.ps=n.ps;
				c.ds=n.ds;
				c.qs=n.qs;
				b.push(c)
			})
            $scope.lists=[];
			b.splice(index,1);
            $scope.lists=JSON.parse(JSON.stringify(b));
            //console.log($scope.lists)
            // $scope.$digest();
            // $("#soreList tr[page]").css("display","none");
            // $("#soreList tr[page="+now+"]").css("display","block");
            console.log(a[index].id,a,a[index])
            sendHttp({
               fun:"deleteOrder",
                data:JSON.stringify([a[index].id])
            },function(data){
                console.log(data);
            },function(){

            })
		}
// 导入文件（导入excel表并显示在界面中，同时将excel的数据添加到数据库中）
		$scope.import=function(){
            if(!$scope.fileShow){
                $scope.fileShow=true;
            }else{
                $scope.fileShow=false;
            }
			
		}
// 编辑：对已经保存的信息进行修改
		$scope.edit=function(){
			console.log($("#soreList div.row[checked]").length==0)
            if($("#soreList div.row[checked]").length==0){
                alert("请选中一个列表");
                return
            }
            $scope.id1='';
            $scope.name1='';
            $scope.zy1='';
            $scope.ps1='';
            $scope.ds1='';
            $scope.qs1='';
            $scope.nj1='';
			//$("#soreList tr[checked] td").attr("contenteditable","true")
            $scope.editShow=true;
            var index=$("#soreList div.row[checked]").index();
            $scope.id1=$scope.lists[index].id
		}
// 取消编辑：
		$scope.editCancel=function(){
            $scope.editShow=false;
		}
// 编辑完成后的确定功能：
		$scope.editSure=function(){
			if($("#soreList div.row[checked]").lenth==0){
				alert("请选中一个列表")
				return;
			}
            var index=$("#soreList div.row[checked]").index();
            var obj={
                id:$scope.id1,
                name:$scope.name1,
                zy:$scope.zy1,
                nj:$scope.nj1,
                ps:$scope.ps1,
                ds:$scope.ds1,
                qs:$scope.qs1,

            }
            //console.log($scope.lists,"qian")
            $scope.lists.splice(index,1,obj);
            //console.log($scope.lists,"hou")
            
            $scope.editShow=false;
            sendHttp({
                fun:"updateOrder",
                data:JSON.stringify([[$scope.qs1,$scope.ds1,$scope.ps1,$scope.nj1,$scope.zy1,$scope.name1,$scope.id1]])
            },function(data){
                console.log(data);
            },function(){

            })

		}
// 配置页码：每10条数据为1页，接下来10条为第二页
		$scope.getPage=function(i){
			return (parseInt((i)/10));
		}
//  讲表格转换为json数据
        function fixdata(data) { //文件流转BinaryString
            var o = "",
                l = 0,
                w = 10240;
            for(; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
            o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
            return o;
        }
		$scope.importf=function(obj){
			//console.log(obj)
            var wb;//读取完成的数据
            var rABS = false; //是否将文件读取为二进制字符串
			//obj=obj.target;
            if(!obj.files) {
                return;
            }
            var f = obj.files[0];
            var reader = new FileReader();
            reader.onload = function(e) {
                var data = e.target.result;
                if(rABS) {
                    wb = XLSX.read(btoa(fixdata(data)), {//手动转化
                        type: 'base64'
                    });
                } else {
                    wb = XLSX.read(data, {
                        type: 'binary'
                    });
                }
                //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
                //wb.Sheets[Sheet名]获取第一个Sheet的数据

                var obj1=( XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]) );
        //         var str='';
        console.log(obj1)
        //         for(var i=0;i<=obj1.length-1;i++){
        //             //console.log(obj1[i],obj[i]["学号"])
        //             var page=parseInt(($("#soreList").find("tr").length-1)/10);
        //             str='<tr page='+page+'><td>'+obj1[i]["学号"]+'</td><td>'+obj1[i]["姓名"]+'</td><td>'+obj1[i]["专业"]+'</td><td>'+obj1[i]["年级"]+'</td><td>'+obj1[i]["平时成绩"]+'</td><td>'+obj1[i]["大作业成绩"]+'</td><td>'+obj1[i]["期末成绩"]+'</td></tr>'
        //             $("#soreList").append($(str));
        //         }
                var data=[];
				for(var i=0;i<=obj1.length-1;i++){
				    var data1=[];
                    $scope.lists.push({
                        id:obj1[i]["学号"],
                        name:obj1[i]["姓名"],
                        zy:obj1[i]["专业"],
                        nj:obj1[i]["年级"],
                        ps:obj1[i]["平时成绩"],
                        ds:obj1[i]["大作业成绩"],
                        qs:obj1[i]["期末成绩"],
                    });
                    data1=[obj1[i]["学号"],obj1[i]["姓名"],obj1[i]["专业"],obj1[i]["年级"],obj1[i]["平时成绩"],obj1[i]["大作业成绩"],obj1[i]["期末成绩"]];
                    data.push(data1);
				}
				console.log($scope.lists)
                $scope.$digest();
               data=JSON.stringify(data);
                sendHttp({
                    fun:"addOrder",
                    data:data
                },function(data){
                    console.log(data);
                },function(){

                })
                $("#soreList div.row[page]").css("display","none");
                $("#soreList div.row[page="+now+"]").css("display","block");
            };
            if(rABS) {
                reader.readAsArrayBuffer(f);
            } else {
                reader.readAsBinaryString(f);
            }

		}
		
	})

		