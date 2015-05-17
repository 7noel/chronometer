//Javascript
var old_minutes = parseFloat($("#minutes").val());
var startValue = parseFloat($("#minutes").val()) * 60; //Number of milliseconds
var time = parseFloat($("#minutes").val()) * 60;
var seconds_run = time;
var interv;
var is_run = false;
var is_paused = false;
$('.stop').hide();

$(function(){
	displayTime();
	$(".start").on("click", function(){
		message(0);
		if (is_run == false) {
			if (is_paused == false) {
				time = startValue;
			}
			runTime();
    	};
	});
	$(".stop").on("click", function(){
		if (seconds_run>time) {
			interv.cancel();
			is_run = false;
			time = startValue;
			$('.start').show();
			$('.stop').hide();
			displayTime();

		};
	});
	$(".pause").on("click", function(){
		interv.cancel();
		is_run = false;
		is_paused = true;
	});
	$(".reset").on("click", function(){
		time = startValue;
		//displayTime();
	});
	$("#send").on("click", function(){
		message(1);
	});
	$('#minutes').change(function(){
		//console.log('hola '+startValue);/*
		console.log(parseFloat($("#minutes").val()));
		if (isNaN( parseFloat( $("#minutes").val() ) )) {
			alert("Debe ingresar el número de minutos");
			$("#minutes").val(old_minutes);
			$("#minutes").focus();
			//return false;
		} else {
			old_minutes = parseFloat($("#minutes").val());
			startValue = parseFloat($("#minutes").val()) * 60;
		};
	});
});

function displayTime(){
	//var fullminutes = ;
	$(".time").text(pad(parseInt(time/60),2) + ":" + pad( (time%60),2 ) );
}
function pad (str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}
function runTime () {
	$(".message-danger").text('');
	displayTime();
	is_run = true;
	is_paused = false;
	$('.start').hide();
	$('.stop').show();
	seconds_run = time;
	interv = accurateInterval(1000,function() {
		time = time - 1;
		if(time<=0){
			message(3);
			interv.cancel();
			is_run = false;
		} else{
			if (time<=60 && time>=59) { message(2); }
		};
		displayTime();
	});
}
function message (tipo) {
	$(".label").text('');
	$(".label").removeClass("labelx");
	$(".label").hide();
	if (tipo==1) {
		if ($('#message').val()!="") { $(".message-primary").show(); };
		$(".message-primary").text($('#message').val());
		$(".message-primary").addClass("labelx");
	} else if(tipo==2) {
		$(".message-warning").show();
		$(".message-warning").text('LE FALTA UN MINUTO');
		$(".message-warning").addClass("labelx");
	} else if(tipo==3) {
		$(".message-danger").show();
		$(".message-danger").text('SU TIEMPO HA TERMINADO');
		$(".message-danger").addClass("labelx");
	};
}