/**
 * New node file
 */

  var mongoose = require('mongoose');

//Function to Export Create Schema::Deepak Tiwari

    
var room=new mongoose.Schema({
		
	       room_name:   { type: String, required: true, index: { unique: true } },
	       room_guests: [{
	    	      
	    	      guest_email: String, 
	    	      guest_message:String,
	    	      guest_question:String,
	    	      
	       }],
	      
	      room_creationdate: { type: Date,Default:Date.now},
	      
	       room_experts:[
		   {
			   expert_email: String,
			   expert_key: String,
			   expert_name : String,
			   expert_questions : [{type: String}],
		 	   expert_answers: [{question:String,
		 		                 answer:String}]
		     }
	      ],
	     
	      
	      room_messages:[
	          {
	              message_from:String,
	              message_to:String,
	              message_content:String,
			      message_sentDate:{type: Date,Default:Date.now},
			      message_type:String
			
	       }]   
	   });
 

  console.log("room1 created or schema created");
    

//function End
module.exports=mongoose.model('mytechroom',room);

