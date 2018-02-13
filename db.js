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
        data.limit=1000
    if (data.start)
        ;
    else
        data.start=0
    if (url=="/get/Contact"){
    	var where=" where 2>1"
    	if (data.baoxiang)
    		where+=" and  baoxiang like '%"+data.baoxiang+"%'";
        db.serialize(function(){
            var res={};
            db.all("SELECT count(*) as total FROM parts_contact"+where, function(err, row) {
                res.total=row[0].total;
            });
            db.all("SELECT * FROM parts_contact"+where+" ORDER BY yujifahuo_date DESC limit "+data.limit+" offset "+data.start, function(err, row) {
                 res.error=err;
                 res.data=row;
                 callback(res);
            });
        });
    }
    else if (url=="/get/Pack"){
        db.serialize(function(){
            var res={};
            db.all("SELECT count(*) as total FROM parts_pack where name like '%"+data.search+"%'", function(err, row) {
                res.total=row[0].total;
            });
            db.all("SELECT * FROM parts_pack where name like '%"+data.search+"%' limit "+data.limit+" offset "+data.start, function(err, row) {
                 res.error=err;
                 res.data=row;
                 callback(res);
            });
        });
    }
    else if (url=="/get/Item"){
        db.serialize(function(){
            var res={};
            db.all("SELECT count(*) as total FROM parts_item where name like '%"+data.search+"%'", function(err, row) {
                res.total=row[0].total;
            });
            db.all("SELECT * FROM parts_item where name like '%"+data.search+"%' limit "+data.limit+" offset "+data.start, function(err, row) {
                    res.error=err;
                 res.data=row;
                 callback(res);
            });
        });
    }
    else if (url=="/get/UsePack"){
        var cmd="SELECT a.id,b.name,b.id as pack_id FROM parts_usepack as a,parts_pack as b where a.pack_id=b.id and a.contact_id="+data.contact_id+" limit "+data.limit+" offset "+data.start;
        console.log(cmd);
        db.all(cmd, function(err, row) {
             var res={};
             res.error=err;
             res.data=row;
             callback(res);
        });
    }
    else if (url=="/get/PackItem"){
    	var cmd="SELECT a.id,a.ct,a.quehuo,b.name,b.guige,b.bh,b.id as item_id FROM parts_packitem as a,parts_item as b where a.item_id=b.id and  a.pack_id="+data.pack_id+" limit "+data.limit+" offset "+data.start;
    	console.log(cmd);
        db.all(cmd, function(err, row) {
             var res={};
             res.error=err;
             res.data=row;
             callback(res);
        });
    }///post/UsePack
    else if (url=="/post/UsePack"){
        console.log(data);
        var cmd="insert into  parts_usepack(contact_id,pack_id) values("+data.contact_id+","+data.pack_id+")";
        console.log(cmd);
        db.serialize(function() {
            db.run(cmd);
            db.all("SELECT a.id,b.name,b.id as pack_id FROM parts_usepack as a,parts_pack as b where a.pack_id=b.id and a.contact_id="+data.contact_id+" and a.pack_id="+data.pack_id, function(err, row) {
                     var res={};
                     res.error=err;
                     res.data=row[0];
                     console.log(res);
                     callback(res);
            });
        });
    }
    else if (url=="/post/PackItem"){
        console.log(data);
        var cmd="insert into  parts_packitem(pack_id,item_id,ct,quehuo) values("+data.pack_id+","+data.item_id+",1,0)";
        console.log(cmd);
        db.serialize(function() {
            db.run(cmd);
            db.all("SELECT a.id,a.quehuo,a.ct,b.name,b.guige,b.bh,b.id as item_id FROM parts_packitem as a,parts_item as b where a.item_id=b.id and a.pack_id="+data.pack_id+" and a.item_id="+data.item_id, function(err, row) {
                     var res={};
                     res.error=err;
                     res.data=row[0];
                     console.log(res);
                     callback(res);
            });
        });
    }
    ///delete/UsePack
    else if (url=="/delete/UsePack"){
        console.log(data);
        db.serialize(function() {
            var cmd="delete from  parts_usepack where id="+data.id;
            db.run(cmd);
             var res={};
             res.success=true;
             res.message="ok";
             console.log(res);
             callback(res);
        });
    }
    else if (url=="/delete/PackItem"){
        console.log(data);
        db.serialize(function() {
            var cmd="delete from  parts_packitem where id="+data.id;
            db.run(cmd);
             var res={};
             res.success=true;
             res.message="ok";
             console.log(res);
             callback(res);
        });
    }///put/PackItem
    else if (url=="/put/PackItem"){//todo
        console.log(data);
        db.serialize(function() {
            var cmd="delete from  parts_packitem where id="+data.id;
            db.run(cmd);
             var res={};
             res.success=true;
             res.message="ok";
             console.log(res);
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
	// socket.emit("/get/PackItem",{pack_id:9,limit:2,start:0},(res)=>{
	// 	console.log(res);
	// });
    // socket.emit("/post/UsePack",{pack_id:82,contact_id:1},(res)=>{
    //   console.log(res);
    // });
    socket.emit("/delete/UsePack",{id:1082},(res)=>{
      console.log(res);
    });
    socket.emit("/get/UsePack",{contact_id:1},(res)=>{
      console.log(res);
    });
//});


