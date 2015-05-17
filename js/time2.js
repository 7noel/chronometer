//Javascript
var old_minutes = parseFloat($("#minutes").val());
var startValue = parseFloat($("#minutes").val()) * 60 * 1000; //Number of milliseconds
var time = new Date(startValue);
var interv;
var is_run = false;
var is_paused = false;
$('.stop').hide();

$(function(){
	displayTime();
	$(".start").on("click", function(){
		message(0);
		if (is_run==false) {
			if (is_paused==false) {
				time = new Date(startValue);
			}
			runTime();
    	};
	});
	$(".stop").on("click", function(){
		clearInterval(interv);
		is_run = false;
		time = new Date(startValue);
		$('.start').show();
		$('.stop').hide();
		displayTime();
	});
	$(".pause").on("click", function(){
		clearInterval(interv);
		is_run = false;
		is_paused = true;
	});
	$(".reset").on("click", function(){
		time = new Date(startValue);
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
			startValue = parseFloat($("#minutes").val()) * 60 * 1000;
		};
	});
});

function displayTime(){
	//var fullminutes = ;
    $(".time").text(fillZeroes( (time.getHours()-19)*60 + time.getMinutes() ) + ":" + fillZeroes(time.getSeconds()));
}

function fillZeroes(t){
    t = t+"";
    if (t.length==1) {return "0" + t;} else{return t;};
}
function runTime () {
	$(".message-danger").text('');
	displayTime();
	is_run = true;
	is_paused = false;
	$('.start').hide();
	$('.stop').show();
	interv = setInterval(function(){
		time = new Date(time - 1000);
		if(time<=0){
			message(3);
			clearInterval(interv);
			is_run = false;
		} else{
			if (time<=60000 && time>=59000) { message(2); }
		};
		displayTime();
	}, 991);
}
function message (tipo) {
	$(".label").text('');
	$(".label").hide();
	if (tipo==1) {
		if ($('#message').val()!="") { $(".message-info").show(); };
		$(".message-info").text($('#message').val());
	} else if(tipo==2) {
		$(".message-warning").show();
		$(".message-warning").text('LE QUEDA MENOS DE UN MINUTO');
	} else if(tipo==3) {
		$(".message-danger").show();
		$(".message-danger").text('SU TIEMPO HA TERMINADO');
	};
}