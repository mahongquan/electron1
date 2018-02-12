console.log("load");
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.sqlite');
var socket={
  emit:function(url,data,callback){
    console.log(url);
    console.log(data);
    if (data.limit)
            ;
    else
        data.limit=1
    if (data.start)
        ;
    else
        data.start=0
    if (url=="/get/Contact"){
        db.all("SELECT * FROM parts_contact limit "+data.limit+" offset "+data.start, function(err, row) {
             var res={};
             res.error=err;
             res.data=row;
             callback(res);
        });
    }
    else if (url=="/get/Item"){
        db.all("SELECT * FROM parts_item where name like '%"+data.search+"%' limit "+data.limit+" offset "+data.start, function(err, row) {
             var res={};
             res.error=err;
             res.data=row;
             callback(res);
        });
    }
    else if (url=="/get/UsePack"){
        db.all("SELECT a.id,b.name,b.id as pack_id FROM parts_usepack as a,parts_pack as b where a.contact_id=b.id and a.contact_id="+data.contact_id+" limit "+data.limit+" offset "+data.start, function(err, row) {
             var res={};
             res.error=err;
             res.data=row;
             callback(res);
        });
    }
    else if (url=="/get/PackItem"){
    	var cmd="SELECT a.id,b.name,b.guige,b.bh,b.id as pack_id FROM parts_packitem as a,parts_item as b where a.pack_id=b.id and  a.pack_id="+data.pack_id+" limit "+data.limit+" offset "+data.start;
    	console.log(cmd);
        db.all(cmd, function(err, row) {
             var res={};
             res.error=err;
             res.data=row;
             callback(res);
        });
    }
  }
};
//db.serialize(function() {

    // db.all("SELECT * FROM parts_item", function(err, row) {
    //         console.log(row);
    // });
 //    socket.emit("/get/Contact",{},(res)=>{
	// 	console.log(res);
	// });
	// socket.emit("/get/Item",{limit:2,start:10,search:"2011"},(res)=>{
	// 	console.log(res);
	// });
	socket.emit("/get/PackItem",{pack_id:9,limit:2,start:0},(res)=>{
		console.log(res);
	});
//});


