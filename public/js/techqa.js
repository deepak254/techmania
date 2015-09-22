 jQuery(function($){
   
	   
	 
	 
	   //var rooms= <%- JSON.stringify(roomquestions) %>;
	   //JSON.stringify(rooms);
	   //alert(rooms);
 	   //alert(JSON.stringify(rooms));
	
	 
	 $('#search').keyup(function(e){
     // $('#searchEmailForm').submit(function(e){
          
	      e.preventDefault();
	      $('#question_area').html("<img src=/images/please-wait.gif layout=block></img>");
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
   
 
 
 
 //2
	 
	 $('.info_link').click(function(e){
		    
		  e.preventDefault();
		  alert($(this).text());
		  $('#question_area').html("<img src=/images/please-wait.gif layout=block></img>");
	    var queryData = {
		        type:"text",
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
	  });
 
 
 
 
 
 
 
 
 });// outer most jquery

   