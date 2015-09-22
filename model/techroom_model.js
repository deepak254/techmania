/**
 * New node file
 */
//


 var exports = module.exports = {};
  var mongoose = require('mongoose');
 var db = mongoose.connect('mongodb://deepak:fcuk1234@ds049631.mongolab.com:49631/mytechroom');
 // var db = mongoose.connect('mongodb://localhost/mytechroom');
  exports.db=mongoose.connection;
  var techroom_schema=require('../model/tech_room');
  exports.rooms=techroom_schema;
  //   var x=5;

 //Function to Export Create Schema::Deepak Tiwari

  //mongo lab URI Cloud:: mongodb://deepak:fcuk1234@ds041603.mongolab.com:41603/techroom
   // local uri : mongodb://localhost/myroomweb'
 
 
  
  
 //exports.storeTechRoom=
function store(room_name,roomtags){
	 
	 
	 var techroom= new  techroom_schema({
	 room_name:room_name,
	 room_tags:roomtags
	  
	 
	 
	});
  techroom.save(function(err) {
     if (err){ throw err;}
  });

  
 console.log('room with name '+room_name+ ' saved...');
 
}

  


 
//var tags=['core java','j2ee','j2me','Strings','File Io','socket','jdbc','collections','generics','arrays','flow control',
//		'localization','interfaces','jsp','servlets','jpa','ejb','jaas','jms','java xml','jndi',
//		'jta','Strings','java mail','multithreading','struts','jsf','glassfish','tomcat'
//		];
//
////
//
//
//store('Java',tags);
//store('Automation Testing',tags);
//store('.Net',tags);
//store('Javascript',tags);
//store('Node js',tags);
//store('Sql',tags);
//store('Nosql',tags);
//store('Python',tags);
//store('Android',tags);
//store('Iphone',tags);

//Java
//Automation Testing
//.Net
//Javascript
//Node js
//Sql
//Nosql
//Python
//Android
//Iphone
 
//exports.storechatMessages=function(roomname,from,to,sentDate,type,content){
//
//	  _roomSchema.findOne({ 'room_name' :roomname},function(err, room){
//		 room.room_messages.push(
//					 {
//						  message_from :from,
//						  message_to :to,
//			              message_content :content,
//					      message_sentDate:sentDate,
//					      message_type:type
//                 });
//			 
//			 room.save(function(err){
//			 if(err){console.log("not saved due to error");}
//			 console.log('message saved in DB');
//		});
//
//	  }); 
//		//do something
//
//};