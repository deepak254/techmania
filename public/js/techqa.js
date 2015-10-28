 function facebookLikeAndShare(d, s, id) {
	        		  var js, fjs = d.getElementsByTagName(s)[0];
	        		  if (d.getElementById(id)) return;
	        		  js = d.createElement(s); js.id = id;
	        		  js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.4";
	        		  fjs.parentNode.insertBefore(js, fjs);
	        		}	

 	
function getsummernote(){
	$(document).ready(function() {
	$('textarea').summernote({
		//airMode: true,
		focus:true,
		height: 100
		  
 });
});	
}

function destroySummernote(){
	$('.summernote').destroy();

}


jQuery(function($){
   
	
	
	
	//$('#flash').empty();
		
	facebookLikeAndShare(document, 'script', 'facebook-jssdk');
	 // getsummernote();
	  //destroySummernote();
	
 /*******************************************searching route  for email Ajax request starts***************************************/	 
	 
	
	 $('#search').keyup(function(e){
     // $('#searchEmailForm').submit(function(e){
		 destroySummernote();
	      e.preventDefault();
	      $('#question_area').empty();
	      //$('#question_area').html("<h3 class=text-info>LOADING...</h3>").animate();	
	    // $('#question_area').html("<img id=ajax_wait  src=/images/please-wait.gif layout=block></img>");
	      document.getElementById('question_area').innerHTML="<img src=/images/please-wait.gif layout=block></img>";
	     $('#result_end').empty();
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
	            		      	$('#question_area').html("<h3 class=text-info>WAIT FOR A WHILE</h3>");	
	            		      	new EJS({url: '/template/search_results.ejs'}).update('question_area',{from_email:queryData.query,searchquestions:data});
	 	        	       	  	// $('#question_area').html(f);
	            		      	//document.getElementById('question_area').innerHTML=html;
	            	   			}
	 	        	     }// if ends 
	 	        	else{
	 	        		
	 	        	    $('#question_area').html("<h3>"+data+"</h3>"); 
	 	        	}//else ends
	              },//ajax success function
	              complete: function( xhr, status ) {
	        			
		        	 //getsummernote();
		        }
	       }); //ajax request Done
     });//form Submission ends
   
/*******************************************searching route for email Ajax request completed***************************************/ 
 
	 
	 
/*******************************************searching route for tag link Ajax request starts***************************************/	 
 $(".nav").on("click",".info_link", function(e){ 
	
 //$('.info_link').click(function(e){
		  $('html,body').scrollTop(0); 
	      e.preventDefault();
	      $('#question_area').empty(); 
	      destroySummernote();
			//$('#question_area').html("<h3 class=text-info>LOADING...</h3>").animate();	
		 //$('#result_end').empty(); 
		 var queryData = {
		        type:'text',
			    query:$(this).text(),
			    criteria:'tag'
	        };
	    
	    $.ajax({
	       url: '/searching',
	       async: true,
	       type: 'GET',
	       dataType: 'json',
	       data: {jsonData:JSON.stringify(queryData)},
	       contentType: 'application/json',
	       beforeSend:function(){
	    	  
	    	   document.getElementById('question_area').innerHTML="<img src=/images/please-wait.gif layout=block></img>";
	       },
	       success: function(data){
		    	
	       	  	  if (data instanceof Array) {
	       			if(data.length === 0){
							$('#question_area').html("<div class=alert alert-danger><h4>No Question Posted with Tag <strong class=text-danger>"+queryData.query+"</strong></h4><a href=/QA>SHOW ALL QUESTIONS</a></div>");				            				
							$('#load_more_questions').hide();	
	       					}
	       			else{
	       				 if(data.length<=10){$('#load_more_questions').hide();}
	       		      	 var questions= JSON.stringify(data);
	       		        new EJS({url: '/template/search_results.ejs'}).update('question_area',{from_email:queryData.query,searchquestions:data});
	       		        
	       		     // var html= new EJS({url: '/template/search_results.ejs'}).render({from_email:queryData.query,searchquestions:data});
	       		     
	       		        // document.getElementById('question_area').innerHTML=html;  	
	       		      	//$('#question_area').html(html);
	       		    // facebookLikeAndShare(document, 'div', 'fb-like-share');
	       		 	//facebookLikeAndShare(document, 'div', 'facebook-jssdk');
	       	   			}
	        	     }// if ends 
	        	else{
	        		
	        	    $('#question_area').html("<h3>"+data+"</h3>"); 
	        	}//else ends
	         },//ajax success function
	        complete: function( xhr, status ) {
	        	//facebookLikeAndShare(document, 'div', 'facebook-jssdk');
	        	 //getsummernote();
	        }
	  }); //ajax request Done
	});

/*******************************************searching route for tag link Ajax request ends***************************************/
	 
 


/*******************************************route for get all tags Ajax request starts***************************************/	 
 


   // var tags = ["australia", "austria", "antartica", "argentina", "algeria"];
 
	 $('#remote').keyup(function(e){
		e.preventDefault();
		 $('#result_end').empty();
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

 
/******************************************* route for get all tags  Ajax request ends***************************************/ 


/*******************************************searching route for search tags form submit  Ajax request starts***************************************/
	 
	 

  	 $('#tag_search_form').submit(function(e){
  		 e.preventDefault();
  		$('#question_area').empty();
  		//$('#question_area').html("<img src=/images/please-wait.gif layout=block></img>");
  		//$('#question_area').html("<h3 class=text-info>LOADING...</h3>").animate();	
  		 $('#result_end').empty();  
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
	       beforeSend:function(){
	    	   document.getElementById('question_area').innerHTML="<img src=/images/please-wait.gif layout=block></img>";
	       },
		    success: function(data){
		    	
	       	  	  if (data instanceof Array) {
	       			if(data.length === 0){
							$('#question_area').html("<h4>No Question Posted with Tag <strong class=text-danger>"+queryData.query+"</strong></h4><a href=/QA>SHOW ALL QUESTIONS</a>");				            				
						    }
	       			else{ 
	       		      	 var questions= JSON.stringify(data);
	       		      $('#question_area').html("<h3 class=text-info>WAIT FOR A WHILE</h3>");	
	       		      new EJS({url: '/template/search_results.ejs'}).update('question_area',{from_email:queryData.query,searchquestions:data});
	        	       	  	// $('#question_area').html(html);
	       		       // document.getElementById('question_area').innerHTML=html;
	       		         getsummernote();
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




 	 $('#load_more_questions').click(function(e){
 		 e.preventDefault();
 		//$('#result_end').empty();
 		 //$('#result_end').html("<img src=/images/please-wait.gif layout=block></img>");
       var queryData = {
		        
 			    criteria:'question'
	        };
 		 
	     $.ajax({
	       url: '/load_more',
	       type: 'GET',
	       dataType: 'json',
	       data: {jsonData:JSON.stringify(queryData)},
	       beforeSend:function(){
	    	   document.getElementById('result_end').innerHTML="<img src=/images/please-wait.gif layout=block></img>";
	       },
	      success: function(data){
	       			
	    	  	  if (data instanceof Array) {
	    	  		  	if(data.length === 0){
	    	  		  	 // $('#result_end').empty();
	    	  		  	//document.getElementById('result_end').innerHTML="No more Questions"; 
	    	  		  	 $('#result_end').html("No More Questions");
	    	  		  	}
	    	  	else{		
	       		      	var questions= JSON.stringify(data);
	       		      	 // $('#question_area').html(" ");
	       		      	 var html= new EJS({url: '/template/load_more_questions.ejs'}).render({morequestions:data});
	       		          $('#question_area').append(html);
	        	          $('#result_end').empty();
	    	  	}		
	    	  	}
	        	     // if ends 
	        	else{
	        		 // $('#ajax_load').remove();  
	        	      $('#result_end').html("No More");
	        	    }//else ends
	         }//ajax success function
	    
	  }); //ajax request Done
 		 
  });//submit form ends here










/*******************************************route for load More Questions  Ajax request ends***************************************/

 	 
 	 
 	 
 	 $('#load_more_tags').click(function(e){
 		 e.preventDefault();
 		 $('#side-menu').append("<li id=wait><img src=/images/load-tag-wait.gif layout=block></img><li>");
 		// $('#more_tags').remove();
 		var queryData = {
		        
 			    criteria:'tag'
	        };
 		 
 		 $.ajax({
	       url: '/load_more',
	       type: 'GET',
	       dataType: 'json',
	       data: {jsonData:JSON.stringify(queryData)},
	       success: function(data){
	       			
	    	  	  if (data instanceof Array) {
	       			
	    	  		  	if(data.length === 0){
	    	  		  	    $('#wait').remove();
	    	  		  		$('#end').html("<span class=info_link text-left><small style=font-size:14px class=text-danger>no more tags</small></span>");
	    	  		  	 }
	    	  		  else{
	    	  		  	var tags= JSON.stringify(data);
	       		      	 $('#wait').remove();
	       		         for(var i=0;i<data.length;i++){
	       		        	 $('#side-menu').append("<li class=info_link text-left><a>"+data[i]+"</a></li>");
	       		            }
	       		           //$('#side-menu').append(" <li id=more_tags class="sidebar-search" ><button id=load_more_tags class=btn-sm btn-warning>load more</button></li>"); 
	       		         
	    	  		    }
	    	  		  }
	        	     // if ends 
	        	 else{
	        		 // $('#ajax_load').remove();  
	        	    //  $('#result_end').html(data);
	        	    }//else ends
	         }//ajax success function
	    
	  }); //ajax request Done
 		 
  });//submit form ends here 	 


 	$('a[name=add_answer]').click(function(e){
 		
 		 getsummernote();
 	});


});// outer most jquery
 
 
 

   