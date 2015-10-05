/**
 * 
 */
/**
 * 
 */
// This File Contains all Route Handling related Stuff:: Deepak Tiwari
 var app=require('../app');
 var express = require('express');
 var flash = require('connect-flash');
 var router=express.Router();
 exports.router=router;
 var bodyParser=require('body-parser');
 var  passport = require('passport');
 var LocalStrategy = require('passport-local');
 var bCrypt = require('bcrypt-nodejs'); 
 var mongoose = require('mongoose');
 var socketio = require('socket.io');
 var url = require('url');
 var queryString = require( "querystring" );
 //var paginate = require('nodejs-yapaginate');
 
 
 var loggedInMember="";
 var currentRoom="";
 var allrooms=[];
 var roomQuestions=[];

 var questions_limit=0;
 var question_index=0;
//express().use(bodyParser.urlencoded());
express().use(bodyParser.json());



var mytechroom=require('../model/techroom_model');
//var tech_roomSchema=require('../model/tech_room');
 
var db = mytechroom.db;

db.on('error',function(msg){
		console.log(msg);
});
db.once('open',function(msg){
		console.log('connection succeeded');
});

//router.use(flash()); 

//function getNextQuestions(limit){
//	
//   if(questions.length<=limit){return questions;}
//	
//	var next_questions_to_send=[];
//	var new_limit_start_index=question_index+1;
//	
//	if(question_index > questions.length){
//		int remaining_questions=questions.length-question_index;
//		for(var i=0;i<limit;i++){
//			
//		} 
//		
//	}
//	for(var i=new_limit_start_index;i<limit;i++){
//		
//		next_questions_to_send.push(questions[i]);
//	}
//	return next_questions_to_send;
//}



function getRooms(){
	
	 mytechroom.rooms.find({}, function(err,rooms){
	      if(err){res.send("error");}
	      return rooms;
	  });
	
	
}

router.get('/flash', function(req, res){
	  // Set a flash message by passing the key, followed by the value, to req.flash().
	 // req.flash('info', 'Flash is back!');
	 // next();
	 res.redirect('/');
	});


// #1
 router.get('/', function(req,res){
	 
mytechroom.rooms.find({}, function(err,rooms){
	      if(err){res.send("error");}
	      allrooms= rooms;
	  });
	  res.render('index',{rooms:allrooms});
 
 
 });//req,res


//#2
router.get('/upload', function(req,res){
		
		res.render('./resources/uploadQA',{title:'myroom',expressFlash: req.flash('info')});
});


//#3
router.get('/getContact', function(req,res){
			
			res.render('contact_us');
	});
 
 
 router.get('/getlogin', function(req,res){
		
		res.render('login');
	});


 router.get('/store',function(req,res){
		
		res.render('./resources/store_room');
});

 
 
 
 
 router.get('/store_room',function(req,res){
	 
	 var room=req.body.room.name
	 mytechroom.storeTechRoom(room);
	 res.end('room with name '+room_name+ ' saved...');   	
});
 
 
 
//#2
 router.get('/chatroom', function(req,res){
 		
 		res.render('./resources/chat_room');
 });

 
 //route that loads and sends 10 questions on each ajax request..
 router.get('/load_more',function(req,res){
	 var more_questions=[];
	 question_index++;
	 var new_limit=questions_limit+2;
	 console.log(question_index);
	 console.log(questions.length);
	 question_index=question_index+questions.length;
	 if(question_index>questions.length){
		res.send('End Results...');
	 }
	 
	 for(var i=question_index;i<=new_limit;i++){
		 
		 if(i === questions.length){
			break;
		}
		else{
		  more_questions.push(questions[i]);
		}
	}
	 
	 res.send(more_questions);
	 
 });
 
 
 //#2
 router.get('/QA', function(req,res){
//	 
//	   mytechroom.rooms.findOne({room_name:'Java'}, function(err,room){
//	      if(err){res.send("error");}
//	      currentRoom=room;
//	      res.render('./resources/tech_QA',{room:currentRoom});
//	    });
	 
//	 questions_limit=2;
//	 var questions_to_send=[];
//	if(questions.length === 0){
//		
//		res.end('No questions available');
//	} 
//	else if(questions.length < 2){
//		
//		res.render('./resources/tech_QA',{room:currentRoom,roomquestions:questions});
//	}
//  else{
//	  for(question_index=0;question_index< questions_limit;question_index++)
//	 {	
//		  questions_to_send.push(questions[question_index]); 	
//	  }
	  res.render('./resources/tech_QA',{room:currentRoom,roomquestions:questions,expressFlash: req.flash('info')});
	   //console.log(currentRoom);
   //}	
 
});
 
 router.get('/table', function(req,res){
	 mytechroom.rooms.findOne({room_name:'Node js'}, function(err,room){
	      if(err){res.send("error");}
	      roomQuestions=room.room_questions;
	     res.render('./resources/all_questions',{questions:room.room_questions});
	  });
		
});
//#2
 
 
 router.get('/getdata',function(req,res){
	 
	 
	 mytechroom.rooms.findOne({ room_name : 'Java' },function(err,room){
		  if(err){throw err;}
		 res.send(room.room_questions);
		 
		 
	 });
 });
 
 
router.get('/typeahead',function(req,res){
	 
	 
	res.render('typeahead');
		 
		 
	
 });
 
 
router.post('/:id/addanswer',function(req,res){
	 //var theUrl = url.parse( req.url);
	  //console.log(theUrl);
    
	 // gets the query part of the URL and parses it creating an object
      //var queryObj = queryString.parse(theUrl.query);
     //console.log(queryObj);
	 //var add_answer_detail = JSON.parse(queryObj.jsonData);
	 //console.log(add_answer_detail);
	console.log(currentRoom.room_questions.id(req.params.id));
	 
	currentRoom.room_questions.id(req.params.id).question_answers_others.push({
		 answer_from_email:req.body.answer.email,
	     answer_content:req.body.answer.content,
  	    answer_time:Date.now(),
  	    answer_rating:0
	 });
	 
	currentRoom.save(function(err){
		if(err){throw err;}
	})
	 console.log(currentRoom.room_questions.id(req.params.id));
	 
	req.flash('info', 'you have successfully answered the question!!')
	 res.redirect('/QA');
	 
	// res.send(JSON.stringify(add_answer_detail));
	 
 }); 
	 
	 
	 



 router.get('/:id/like',function(req,res){
	 
	 var html="<html><body>"+req.params.id+" liked </body></html>"
	 
	//console.log(req.params.id + ' Q liked ') 
	 res.writeHeader(200, {"Content-Type": "text/html"});  
     res.write(html);  
     res.end();  
	//res.send(req.params.id);
 });
 
 
 //Route that handle ajax request for Questions search based on emails and tags.
router.get('/searching', function(req,res){
	
	
	var questions_based_on_email=[];
	var questions_based_on_tag=[];
	 //console.log(req.url);
	 var theUrl = url.parse( req.url);
	  //console.log(theUrl);
     
	 // gets the query part of the URL and parses it creating an object
     var queryObj = queryString.parse(theUrl.query);
     //console.log(queryObj);
	 var searchCriteria = JSON.parse(queryObj.jsonData);
	// console.log(obj);
	 console.log(searchCriteria.query);
	 console.log(searchCriteria.criteria);
	
  if(searchCriteria.criteria.localeCompare('email') === 0){	 
	 
	 for(var i=0;i<currentRoom.room_questions.length;i++){
		 
		 if(searchCriteria.query.localeCompare(currentRoom.room_questions[i].question_from_email) === 0){
			 questions_based_on_email.push(currentRoom.room_questions[i]);
		    }
		 }
	 console.log(questions_based_on_email);  
	  res.send(questions_based_on_email);
    }//if ends
  else{
	
	for(var i=0;i<currentRoom.room_questions.length;i++){
		if(currentRoom.room_questions[i].question_tags.length === 0){continue;}
		if(currentRoom.room_questions[i].question_tags.indexOf(searchCriteria.query) > 0){
			   console.log(currentRoom.room_questions[i].question_tags);	
			   questions_based_on_tag.push(currentRoom.room_questions[i]);
		 }
			
	 }//loop
	 console.log(questions_based_on_tag);  
	 res.send(questions_based_on_tag);
 }//else ends
	
 
	 // res.send(room.room_questions);
});
 
 


router.get('/getalltags',function(req,res){
	 
	var tagsToSend=[];
	 var theUrl = url.parse(req.url);
	  //console.log(theUrl);
    
	 // gets the query part of the URL and parses it creating an object
    var queryObj = queryString.parse(theUrl.query);
    //console.log(queryObj);
	 var searchCriteria = JSON.parse(queryObj.jsonData);
	// console.log(obj);
	 console.log(searchCriteria.query);
	 //console.log(currentRoom.room_tags.length);
//	 for(var i=0;i<currentRoom.room_tags.length;i++){
//		// console.log(currentRoom.room_tags[i]);
//			if(currentRoom.room_tags[i].startsWith(searchCriteria.query))
//			     tagsToSend.push(currentRoom.room_tags[i]);
//			
//		}
	console.log(tagsToSend); 
	res.send(currentRoom.room_tags) ;
	
});








/*
  ********************************* DATABASE ROUTE HANDLING ******************************************
  * */

 
 
router.post('/upload_question',function(req,res){
	 

	    //debugger;
	   // myroom.checkThisRoom(req,res);
	   //req.flash('info', 'user already there Dude !!');
	  mytechroom.rooms.findOne({'room_name':req.body.ques.room}, function(err,room){
		      if(err){res.send("error");}
		      	    if(room === null) {
		      	    					console.log('Room not found');
		      	  		 		 		 req.flash('info', 'Oops!! Room not found !!');
		      	  		  				 res.redirect('/upload');
		      	  		  	 }  
		      	  
		       else{
		    	   
		    	      room.room_questions.push(
		   				{
		   					
		   					  question_from_email:req.body.ques.email,
	        	              question_content:req.body.ques.question,
	        	              question_type:'interview',
	        	              question_tags:req.body.ques.tags,
	        			      question_sentDate:Date.now(),
	        			      question_answer_owner:{
	        			    	  answer_content:req.body.ques.answer,
	        			    	  answer_rating: 0
	        			      }
	        			      
	        			
		   		   });
		   		 
		   		room.save(function(err){
		   			 
		   			 if(err){throw err;}
		   			 
		   		 });
		   		 req.flash('info', 'Question Uploaded Successfully.Upload More.');
	   			 //res.redirect('/upload');  
	   			 res.redirect('back');
		       }				
		    });
		
}); //upload_question route end
 


router.get('/:id/add_answer',function(req,res){
	
	var subdoc=mytechrooms.rooms.status[0];
	console.log(subdoc);
		//subdoc.question_answers_others.push();
	
		 
	 });

 
 router.get('/:id/getQA',function(req,res){
	 
	 mytechroom.rooms.findOne({ '_id' : req.params.id },function(err,room){
		  if(err){throw err;}
		  currentRoom=room;
		  questions=room.room_questions
		  //int len=room.room_questions.length;
	      res.redirect('/QA');
		 
		 
	 });
	 
 });
 
 
 
 
 /*
  ********************************* DATABASE ROUTE HANDLING ******************************************
  *
  *
  *
  *
  *
  * */
 
 
 