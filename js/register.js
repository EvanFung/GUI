$(document).ready(function(){
	$("#register").click(function(){
		$("#fName").css("color","#798800").val("e.g: CHAN");
		$("#lName").css("color","#798800").val("e.g: Tai Man");
		$("#email").css("color","#798800").val("e.g: chantaiman@example.com");
		$("#rPassword").val("");
		$("#cPassword").val("");		
	});
	
	$("#fName").focus(function(){
		if($(this).val() == "e.g: CHAN"){
			$(this).css("color","#7988a3").val("");
		}
	});	
	$("#lName").focus(function(){
		if($(this).val() == "e.g: Tai Man"){
			$(this).css("color","#7988a3").val("");
		}
	});
	$("#email").focus(function(){
		if($(this).val() == "e.g: chantaiman@example.com"){
			$(this).css("color","#7988a3").val("");
		}
	});
	$("#fName").blur(function(){
		if($(this).val() == ""){
			$(this).css("color","#798800").val("e.g: CHAN");
		}
	});
	$("#lName").blur(function(){
		if($(this).val() == ""){
			$(this).css("color","#798800").val("e.g: Tai Man");
		}
	});
	$("#email").blur(function(){
		if($(this).val() == ""){
			$(this).css("color","#798800").val("e.g: chantaiman@example.com");
		}
	});
	
	$("#btn_register").click(function(e){	
		var error = false;
		var name = "";
		if($("#fName").val() == "e.g: CHAN" || $("#lName").val() == "e.g: Tai Man"){
			$("#nameWrongMsg").html("*Cannot be empty!");
			error = true;
		} else {
			$("#nameWrongMsg").html("*");
			name = $("#fName").val()+" "+$("#lName").val();
		}
	
		if($("#email").val() == "e.g: chantaiman@example.com"){
			$("#emailWrongMsg").html("*Cannot be empty!");
			error = true;
		} else if(!isValidEmailAddress($("#email").val())){
			$("#emailWrongMsg").html("*Wrong format!");
			error = true;
		} else {
			$("#emailWrongMsg").html("*");
		}
	
		if($("#rPassword").val() == " "){
			$("#pwdWrongMsg").html("*Cannot be empty!");
			error = true;
		} else if($("#cPassword").val() != "" && $("#rPassword").val() != $("#cPassword").val()){
			$("#pwdWrongMsg").html("*Passwords do not match!");
			error = true;
		} else {
			$("#pwdWrongMsg").html("*");
		}
	
		if($("#cPassword").val() == ""){
			$("#cPwdWrongMsg").html("*Cannot be empty!");
			error = true;
		} else {
			$("#cPwdWrongMsg").html("*");
		}
		
		if(error == false){
			$("#nav_login").hide();
			$("#nav_register").hide();
			$("#nav_logout").show();
			
			$("#registerWindow").animate({
				"top": "+=500"
			},600);
			setTimeout(function() {
				$("#registerWindow").hide();
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
		}
	});

	$("#register").leanModal({ 
		top: 110,
		overlay: 0.45				
	});

	$("#register").click(function(){
	});
	
	function isValidEmailAddress(emailAddress) {
		var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
		return pattern.test(emailAddress);
	};
});	