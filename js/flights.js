$(document).ready(function(){				
	var $inputDatetator1 = $('#departingDate');
	var $inputDatetator2 = $('#returningDate');

	if ($inputDatetator1.data('datetator') === undefined) {
		$inputDatetator1.datetator({
			useDimmer: true
		});
	} else {
		$inputDatetator1.datetator('destroy');
	}	
	
	if ($inputDatetator2.data('datetator') === undefined) {
		$inputDatetator2.datetator({
			useDimmer: true
		});
	} else {
		$inputDatetator2.datetator('destroy');
	}
	
	$("#returnbtn").click(function(){
		$(this).addClass("rbtnselect");
		$("#onewaybtn").removeClass("rbtnselect");
		$("#returnDatetd").show();
		$("#returnDatetd").val("'");
		$("#flights_type").val("return");
	});
	
	$("#onewaybtn").click(function(){
		$(this).addClass("rbtnselect");
		$("#returnbtn").removeClass("rbtnselect");
		$("#returnDatetd").hide();
		$("#flights_type").val("oneway");
	});
	
	var exist_count = 0;
	
	$(":checkbox").change(function(){
		$('#result').fadeOut("slow",function(){
			updateResult();
			if (exist_count == 0){
				$('#result').fadeIn("slow");
			}
		});		
	});
	
	$("#btn_pay").click(function(){
		$("#paymentWindow").animate({
			"top": "+=500"
		},600);
		setTimeout(function() {
			$("#paymentWindow").hide();
		}, 1000);
		$("#completeMessage").html("Payment Successful");
		$("#complete_payment").css({height:$("body").height() + "px", top:"-100", position:"absolute"}).show(function() {
			$("#complete_payment").animate({
				"top": "125%"
			},800);	
		});	
		
		setTimeout(function() {
			$("#complete_payment").animate({
				"top": "+=500"
			}, 600);
			setTimeout(function() {
				$("#complete_payment").hide();
			}, 600);
			$("#lean_overlay").fadeOut(1200);
		}, 2000);
	});
	
	$(document).on('click', '.btn_select_flight', function(){ 
		$("#pm1").val("");
		$("#pm2").val("");
		$("#pm3").val("");
		$("#pm4").val("");
		$("#pm5").val("");
		$("#pm6").val("");
		$("#pm7").val("");
		$("a[rel*=leanModal]").leanModal({ 
			top: 110,
			overlay: 0.45
		});
	});
	
	$("#btn_search").click(function(){		
		$("#result_window").show();
		$("#stopFilter_0stop")[0].checked = true;
		$("#stopFilter_1stop")[0].checked = false;
		$("#stopFilter_2stop")[0].checked = false;
		$("#airlinesFilter_HKA")[0].checked = true;
		$("#airlinesFilter_CP")[0].checked = true;
		$("#airlinesFilter_D")[0].checked = true;
		$("#airlinesFilter_EVAA")[0].checked = true;
		$("#rankFilter_EF")[0].checked = true;
		$("#rankFilter_VGF")[0].checked = true;
		$("#rankFilter_GF")[0].checked = true;
		$("#rankFilter_BF")[0].checked = false;
		$("#timeFilter_0")[0].checked = true;
		$("#timeFilter_1")[0].checked = true;
		$("#timeFilter_2")[0].checked = true;
		$("#timeFilter_3")[0].checked = true;
		$('#result').fadeOut("slow",function(){
			updateResult();
			setTimeout(function(){
				$('#result').fadeIn("slow");
			},500);
		});		
	});	
	
	function updateResult(){
		setTimeout(function(){
			var stop0_count = 0;
			var stop1_count = 0;
			var stop2_count = 0;
			var hka_count = 0;
			var cp_count = 0;
			var d_count = 0;
			var evaa_count = 0;
			var ef_count = 0;
			var vgf_count = 0;
			var gf_count = 0;
			var bf_count = 0;	
			exist_count=0;		
			
			$.ajax({
				type: "POST",
				url: "./ajax/db.json",
				dataType: "json",
				success: function(data) {							
					$.each(data, function(key, value) {
						$("#result").html("");
						if(key=="flights"){
							for(i=0; i<value.length; i++){
								if(value[i].stop == "0")
									stop0_count++;							
								if(value[i].stop == "1")
									stop1_count++;		
								if(value[i].stop == "2")
									stop2_count++;
								if(value[i].airline == "Hong Kong Airlines")
									hka_count++;							
								if(value[i].airline == "Cathay Pacific")
									cp_count++;		
								if(value[i].airline == "Dragonair")
									d_count++;
								if(value[i].airline == "EVA Airways")
									evaa_count++;
								if (value[i].rank>=8.5){
									ef_count++;
								} else if (value[i].rank>=7.5) {
									vgf_count++;
								} else if (value[i].rank>=6.5) {
									gf_count++;
								} else if (value[i].rank<6.5) {
									bf_count++;
								}
								
								if($("#stopFilter_0stop")[0].checked != true){
									if(value[i].stop == "0")
										continue;
								}
								if($("#stopFilter_1stop")[0].checked != true){
									if(value[i].stop == "1")
										continue;
								}
								if($("#stopFilter_2stop")[0].checked != true){
									if(value[i].stop == "2")
										continue;
								}
								
								if($("#airlinesFilter_HKA")[0].checked != true){
									if(value[i].airline == "Hong Kong Airlines")
										continue;
								}
								if($("#airlinesFilter_CP")[0].checked != true){
									if(value[i].airline == "Cathay Pacific")
										continue;
								}
								if($("#airlinesFilter_D")[0].checked != true){
									if(value[i].airline == "Dragonair")
										continue;
								}
								if($("#airlinesFilter_EVAA")[0].checked != true){
									if(value[i].airline == "EVA Airways")
										continue;
								}
								
								if($("#rankFilter_EF")[0].checked != true){
									if(value[i].rank>=8.5)
										continue;
								}
								if($("#rankFilter_VGF")[0].checked != true){
									if(value[i].rank>=7.5&&value[i].rank<8.5)
										continue;
								}
								if($("#rankFilter_GF")[0].checked != true){
									if(value[i].rank>=6.5&&value[i].rank<7.5)
										continue;
								}
								if($("#rankFilter_BF")[0].checked != true){
									if(value[i].rank<6.5)
										continue;
								}
								if($("#timeFilter_0")[0].checked == true){
									if(value[i].start_time>="00:00" && value[i].start_time<"05:00")
										continue;
								}
								if($("#timeFilter_1")[0].checked != true){
									if(value[i].start_time>="05:00" && value[i].start_time<"12:00")
										continue;
								}
								if($("#timeFilter_2")[0].checked != true){
									if(value[i].start_time>="12:00" && value[i].start_time<"18:00")
										continue;
								}
								if($("#timeFilter_3")[0].checked != true){
									if(value[i].start_time>="18:00" && value[i].start_time<"24:00")
										continue;
								}
								
								if($("#flying_from").val()!=value[i].fly_from_country){
									continue;
								}
								
								if($("#departingDate").val()<value[i].start_date){
									continue;
								}
								if($("#preferred_class").val()!="all"){
									if(value[i].left[$("#preferred_class").val()]=="0"){
										continue;
									}
								}
								
								var flights_detail = "<div class='flight_div'><div class='logo'><figure><img src='./img/airplane.jpg'></figure></div>" +
									"<div class='flight_detail'>" +
									"<div>"+value[i].start_date+"<br/>"+value[i].start_time+" - "+value[i].arrive_time+
									"\t"+value[i].time_origin+"<br/>"+value[i].airline+"<br/></div>" +
									"<div>"+value[i].flight_time+"<br/>"+value[i].fly_from+" to Hong Kong Intl.<br/></div>" +
									"<div align='right'>"+value[i].price+"<br/><a href='#paymentWindow' rel='leanModal'>" +
									"<input type='button'  class='btn-blu btn_select_flight' value='Select' tabindex='6'></a></div>" +
									"<div>Seat Left:<br/>First Class ("+value[i].left["fc"]+")<br/>Business ("+value[i].left["b"]+")</div>" +
									"<div><br/>Economy/Coach ("+value[i].left["ec"]+")<br/>Premium Economy ("+value[i].left["pe"]+")<br/></div><div align='right'>";
									
								if(value[i].rank>=8.5) {
									flights_detail+="Excellent Flight";
								} else if (value[i].rank>=7.5) {
									flights_detail+="Very Good Flight";
								} else if (value[i].rank>=6.5) {
									flights_detail+="Good Flight";
								} else if (value[i].rank<6.5) {
									flights_detail+="Bad Flight";
								}
								
								flights_detail+="<br/>("+value[i].rank+" out of 10)</div></div></div>"
								
								$("#result").append(flights_detail);
								exist_count++;
							}
						}
					});
					$("#sf0stop").html("Direct ("+stop0_count+")");
					$("#sf1stop").html("1 Stop ("+stop1_count+")");
					$("#sf2stop").html("2 Stop ("+stop2_count+")");
					$("#afHKA").html("Hong Kong Airlines ("+hka_count+")");
					$("#afCP").html("Cathay Pacific ("+cp_count+")");
					$("#afD").html("Dragonair ("+d_count+")");
					$("#afEVAA").html("EVA Airways ("+evaa_count+")");
					$("#rfEF").html("Excellent Flight ("+ef_count+")");
					$("#rfVGF").html("Very Good Flight ("+vgf_count+")");
					$("#rfGF").html("Good Flight ("+gf_count+")");
					$("#rfBF").html("Bad Flight ("+bf_count+")");
				}
			});
			return this;
		},500);
	};
});	