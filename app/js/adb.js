/*
FuckAdBlock 2.2.1
http://github.com/sitexw/FuckAdBlock
*/

function FuckAdBlock() {
	this.interval = 50;
	this.max = 200;
	this.end_reset = true;
	this.check_onready = true;
	var start = false;
	var func_true = [];
	var func_false = [];
	var div = null;
	var loop = null;
	var loo_n = null;
	var loop_func = function() {
		var div_temp = window.getComputedStyle(div,null);
		if(div.offsetParent === null
		|| div.offsetHeight == 0
		|| div.offsetLeft == 0
		|| div.offsetTop == 0
		|| div.offsetWidth == 0
		|| div.clientHeight == 0
		|| div.clientWidth == 0
		|| div_temp.getPropertyValue('display') == 'none'
		|| div_temp.getPropertyValue('visibility') == 'hidden') {
			exe(true);
		} else if(loo_n >= that.max) {
			exe(false);
		}
		loo_n += that.interval;
	}
	var exe = function(type) {
		if(type == true) {
			var array = func_true;
		} else {
			var array = func_false;
		}
		clearInterval(loop);
		document.body.removeChild(div);
		start = false;
		for(k in array) {
			array[k]();
		}
		if(that.end_reset == true) {
			func_true = [];
			func_false = [];
		}
	}
	this.add = function(type, func) {
		if(type == true) {
			func_true[func_true.length] = func;
		} else {
			func_false[func_false.length] = func;
		}
		return this;
	}
	this.removeAll = function() {
		func_true = [];
		func_false = [];
	}
	this.check = function() {
		try {
			if(start == true) { 
				return false; 
			}
			start = true;
			div = document.createElement('div');
			div.setAttribute('class', 'pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links');
			div.setAttribute('style', 'width: 1px !important; height: 1px !important; position: absolute !important; left: -1000px !important; top: -1000px !important;');
			document.body.appendChild(div);
			loo_n = 0;
			loop = setInterval(loop_func, this.interval);
			loop_func();
		} catch(e) {
			console.error(e);
		}
	}

	var that = this;
	window.addEventListener('load', function() {
		setTimeout(function() {
			if(that.check_onready === true) {
				fuckAdBlock.check();
			}
		}, 1);
	}, false);
}
var fuckAdBlock = new FuckAdBlock();
 fuckAdBlock.add(true, function() { document.querySelector(".blockPlusAlert").innerHTML = '<div class="win"><div class="adbtitle"><i class="fa fa-exclamation-triangle"></i> Adblock detected</div> <div class="adbcontent">Please turn off your adblock, this site has only income from the ads. By turning off the adblock, you will help this site to be continue. Thanks!</div> <div class="adbreload"><button onclick="location.reload()">OK</button></div> </div>';
 document.getElementById("wrapper").style.opacity = "0.3";  
});
 fuckAdBlock.add(false, function() { document.getElementById("adb").style.display = "none";
});

