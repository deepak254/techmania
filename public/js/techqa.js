 




jQuery(function($){
   
	   
 /*******************************************searching route  for email Ajax request starts***************************************/	 
	 
	   //var rooms= <%- JSON.stringify(roomquestions) %>;
	   //JSON.stringify(rooms);
	   //alert(rooms);
 	   //alert(JSON.stringify(rooms));
	
	 
	 $('#search').keyup(function(e){
     // $('#searchEmailForm').submit(function(e){
          
	      e.preventDefault();
	      $('#question_area').html("<img id=ajax_wait  src=/images/please-wait.gif layout=block></img>");
 		 var queryData = {
		        type:"text",
			    query:$('#search').val(),
			    criteria:'email'
	        };
	      // alert(JSON.stringify(queryData));
	       //send ajax request on search form submission and handle in the 
	       // server side route /searching in tec_route file
	        $.ajax({
	            url: '/searching',
	            type: 'GET',
	            dataType: 'json',
	            data: {jsonData:JSON.stringify(queryData)},
	            contentType: 'application/json',
			    success: function(data){
			    	$('#question_area').html("<h3 class=text-info>WAIT FOR A WHILE</h3>");	
	            	  	  if (data instanceof Array) {
	            			if(data.length === 0){
								$('#question_area').html("<h4>No Question Posted by this Email</h4><a href=/QA>SHOW ALL QUESTIONS</a>");				            				
							    }
	            			else{ 
	            		      	 var questions= JSON.stringify(data);
	            		      	 // $('#question_area').html(" ");
	            		      	var html= new EJS({url: '/template/search_results.ejs'}).render({from_email:queryData.query,searchquestions:data});
	 	        	       	  	 $('#question_area').html(html);
	            	   			}
	 	        	     }// if ends 
	 	        	else{
	 	        		
	 	        	    $('#question_area').html("<h3>"+data+"</h3>"); 
	 	        	}//else ends
	              }//ajax success function
	       }); //ajax request Done
     });//form Submission ends
   
/*******************************************searching route for email Ajax request completed***************************************/ 
 
	 
	 
/*******************************************searching route for tag link Ajax request starts***************************************/	 
	 
$('.info_link').click(function(e){
		    
		 //alert($(this).text());
		  e.preventDefault();
		  $('#question_area').html("<img src=/images/please-wait.gif layout=block></img>");
	      var queryData = {
		        type:'text',
			    query:$(this).text(),
			    criteria:'tag'
	        };
	    
	    $.ajax({
	       url: '/searching',
	       type: 'GET',
	       dataType: 'json',
	       data: {jsonData:JSON.stringify(queryData)},
	       contentType: 'application/json',
		    success: function(data){
		    	$('#question_area').html("<h3 class=text-info>WAIT FOR A WHILE</h3>");	
	       	  	  if (data instanceof Array) {
	       			if(data.length === 0){
							$('#question_area').html("<div class=alert alert-danger><h4>No Question Posted with Tag <strong class=text-danger>"+queryData.query+"</strong></h4><a href=/QA>SHOW ALL QUESTIONS</a></div>");				            				
						    }
	       			else{ 
	       		      	 var questions= JSON.stringify(data);
	       		      	 // $('#question_area').html(" ");
	       		      	var html= new EJS({url: '/template/search_results.ejs'}).render({from_email:queryData.query,searchquestions:data});
	        	       	  	 $('#question_area').html(html);
	       	   			}
	        	     }// if ends 
	        	else{
	        		
	        	    $('#question_area').html("<h3>"+data+"</h3>"); 
	        	}//else ends
	         }//ajax success function
	  }); //ajax request Done
	});

/*******************************************searching route for tag link Ajax request ends***************************************/
	 
 


/*******************************************searching route for load more tags  Ajax request starts***************************************/	 
 


   // var tags = ["australia", "austria", "antartica", "argentina", "algeria"];
 
	 $('#remote').keyup(function(e){
		e.preventDefault();
		//alert($("#remote").val());
		 var queryData = {
			        type:'text',
				    query:$("#remote").val()
				 };
		 
		 $.ajax({
		       url: '/getalltags',
		       type: 'GET',
		       dataType: 'json',
		       data: {jsonData:JSON.stringify(queryData)},
		       contentType: 'application/json',
			   success: function(data){
				   		//var questions= JSON.stringify(data);
				   	    $("#remote").autocomplete({
				   	     source:data
				   	  });
			   }
		  }); //ajax request Done
		 
	 });
//	 var tags="/getalltags";
//    $("#remote").autocomplete({
//    	   
//      });

 
/*******************************************searching route for search tags  Ajax request ends***************************************/ 
/*******************************************searching route for search tags  Ajax request starts***************************************/
	 

  	 $('#tag_search_form').submit(function(e){
  		 e.preventDefault();
  		 $('#question_area').html("<img src=/images/please-wait.gif layout=block></img>");
	      var queryData = {
		        type:'text',
			    query:$("#remote").val(),
			    criteria:'tag'
	        };
	    
	    $.ajax({
	       url: '/searching',
	       type: 'GET',
	       dataType: 'json',
	       data: {jsonData:JSON.stringify(queryData)},
	       contentType: 'application/json',
		    success: function(data){
		    	$('#question_area').html("<h3 class=text-info>WAIT FOR A WHILE</h3>");	
	       	  	  if (data instanceof Array) {
	       			if(data.length === 0){
							$('#question_area').html("<h4>No Question Posted with Tag <strong class=text-danger>"+queryData.query+"</strong></h4><a href=/QA>SHOW ALL QUESTIONS</a>");				            				
						    }
	       			else{ 
	       		      	 var questions= JSON.stringify(data);
	       		      	 // $('#question_area').html(" ");
	       		      	var html= new EJS({url: '/template/search_results.ejs'}).render({from_email:queryData.query,searchquestions:data});
	        	       	  	 $('#question_area').html(html);
	       	   			}
	        	     }// if ends 
	        	else{
	        		
	        	    $('#question_area').html("<h3>"+data+"</h3>"); 
	        	}//else ends
	         }//ajax success function
	  }); //ajax request Done
  		 
   });//submit form ends here

 
/*******************************************searching route for search tags  Ajax request ends***************************************/





/*******************************************route for load More Questions  Ajax request starts***************************************/



$(function () { 
 	 $('#load_more_questions').click(function(e){
 		 e.preventDefault();
 		
 		 $('#question_area').append("<img id=ajax_load src=/images/please-wait.gif layout=block></img>");
	     $.ajax({
	       url: '/load_more',
	       type: 'GET',
	      success: function(data){
	       			
	    	  		if (data instanceof Array) {
	       			if(data.length === 0){
							$('#question_area').html("<h4>No Question Posted with Tag <strong class=text-danger>"+queryData.query+"</strong></h4><a href=/QA>SHOW ALL QUESTIONS</a>");				            				
						    }
	       			else{ 
	       				
	       		      	 var questions= JSON.stringify(data);
	       		      	 // $('#question_area').html(" ");
	       		      	var html= new EJS({url: '/template/load_more_questions.ejs'}).render({morequestions:data});
	       		          $('#ajax_load').remove();  
	        	       	 $('#question_area').append(html);
	       	   			}
	        	     }// if ends 
	        	else{
	        		$('#ajax_load').remove(); 
	        		$('#result_end').remove(); 
	        	    $('#question_area').append("<h3 id=result_end>"+data+"</h3>"); 
	        	}//else ends
	         }//ajax success function
	    
	  }); //ajax request Done
 		 
  });//submit form ends here
});










/*******************************************route for load More Questions  Ajax request ends***************************************/


});// outer most jquery
 
 
 

   