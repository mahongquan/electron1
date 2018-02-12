var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.sqlite');
var socket={
  emit:function(url,data,callback){
    console.log(url);
    console.log(data);
    if (url=="/get/Contact"){
	    db.all("SELECT * FROM parts_contact", function(err, row) {
	         var res={};
	         res.error=err;
	         res.data=row;
	         callback(res);
	    });
	}
	else if (url=="/get/Item"){
	    db.all("SELECT * FROM parts_item", function(err, row) {
	         var res={};
	         res.error=err;
	         res.data=row;
	         callback(res);
	    });
	}

  }
};
db.serialize(function() {

    // db.all("SELECT * FROM parts_item", function(err, row) {
    //         console.log(row);
    // });
 //    socket.emit("/get/Contact",{},(res)=>{
	// 	console.log(res);
	// });
	socket.emit("/get/Item",{},(res)=>{
		console.log(res);
	});
});


