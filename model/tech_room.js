/**
 * New node file
 */

  var mongoose = require('mongoose');
  //var superPagination = require('super-pagination').mongoose;
//Function to Export Create Schema::Deepak Tiwari

  
 
  
  var tech_room=new mongoose.Schema({
		
	
		  
		   room_name: { type: String, required: true, index: { unique: true } },
		   room_description:String,
		   room_tags:[],
	       room_guests: [{
	    	      
	    	      guest_email: String, 
	    	      guest_message:String,
	    	      guest_question:String,
	    	      
	       }],
	      
	      room_creationdate: { type: Date,Default:Date.now},
	      
	      room_questions:[
	        	          {
	        	        	 
	        	              question_from_email:{type:String,required: true},
	        	              question_content:{type:String,required: true},
	        	              question_answer_owner:{
	        	            	    answer_content:String,
		                    	    answer_rating:Number
	        	              },
	        	              question_type:String,
	        	              question_tags:{},
	        			      question_sentDate:{type: Date,Default:Date.now},
	        			      question_answers_others:[
	        			                       {
	        			                    	   
	        			                    	   answer_from_email:String,
	        			                    	   answer_content:String,
	        			                    	   answer_rating:Number
	        			                    	}
	        			                     ]
	        			
	        	       }]   ,
	       
	        	       
       room_experts:[
	                      {
                             expert_email: {type: String},
                             expert_key: String,
                             expert_name : String,
                             expert_answers: [
                                              {
                                            	   question:String,
                                            	   answer:String,
                                            	   answer_rating:Number
                                               }
                                            ]
	                }]          
		   
			   
	      
	     
	    
	   });
 
  

//  tech_room.plugin(superPagination, {
//	    theme : 'bootstrap'
//	});
  console.log("techroom created or schema created");
    

//function End
module.exports=mongoose.model('mytechroom',tech_room);

