$(document).ready(function(){					
	$("#btn_login").click(function(e){	
		$("#wrongMessage").hide();				
		var username = $("#username").val();
		var password = $("#password").val();
		var error = true;
		var name = "";
		$.ajax({
			type: "POST",
			url: "./ajax/db.json",
			dataType: "json",
			success: function(data) {							
				$.each(data, function(key, value) {
					if(key=="clients"){
						for(i=0; i<value.length; i++){
							if(username == value[i].Email && password == value[i].password){
								error = false;
								name = value[i].FName+" "+value[i].LName;
							}
						}
					}
				});
				
				if(error == false) {
					$("#nav_login").hide();
					$("#nav_register").hide();
					$("#nav_logout").show();
					
					$("#space").show();
					$("#wrongMessage").hide();
					$("#loginWindow").animate({
						"top": "+=500"
					},600);
					setTimeout(function() {
						$("#loginWindow").hide();
					}, 1000);
					$("#welcomeMessage").html("Welcome<br/>"+ name);
					$("#welcome").css({height:$("body").height() + "px", top:"-100", position:"absolute"}).show(function() {
						$("#welcome").animate({
							"top": "225px"
						},800);	
					});	
					
					setTimeout(function() {
						$("#welcome").animate({
							"top": "+=500"
						}, 600);
						setTimeout(function() {
							$("#welcome").hide();
						}, 600);
						$("#lean_overlay").fadeOut(1200);
					}, 2000);
				} else {							
					$("#wrongMessage").fadeIn(500);	
					$("#space").hide();
				}
			}
		});
	});

	$("#login").leanModal({ 
		top: 110,
		overlay: 0.45				
	});

	$("#login").click(function(){
		$("#wrongMessage").hide();
		$("#space").show();
	});
	
	$("#logout").click(function(){
		$("#nav_login").show();
		$("#nav_register").show();
		$("#nav_logout").hide();
	});
});	