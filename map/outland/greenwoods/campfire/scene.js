var scene = {
	"scenery":{
		"fire":{
			"type":"fire",
			"y":200,
			"x":300
		}
	},
	"items":{
		"lu":{
			"type":"hero",
			"y":300,
			"x":200,
			"action":"collect"
		},
		"shiny":{
			"type":"hero",
			"y":200,
			"x":160,
			"action":"collect"
		},
		"molly":{
			"type":"hero",
			"y":300,
			"x":400,
			"action":"collect"
		},
		"whitesword":{
			"type":"sword",
			"y":200,
			"x":440,
			"action":"collect"
		}
	},
	"steps":{
		"s1":{
			"url":{
				"world":"outland",
				"region":"greenwoods",
				"scene":"lake",
				"step":"s2"
			},
			"y":360,
			"x":100
		},
		"s2":{
			"next":"s3",
			"back":"s1",
			"y":380,
			"x":200
		},
		"s3":{
			"next":"s4",
			"back":"s2",
			"down":"s3-1",
			"y":400,
			"x":300
		},
		"s3-1":{
			"next":"s4",
			"back":"s2",
			"up":"s3",
			"y":500,
			"x":340
		},
		"s3-2":{
			"url":{
				"world":"/",
				"region":"",
				"scene":"entry",
				"step":"s2"
			},
			"y":600,
			"x":300
		},
		"s4":{
			"next":"s5",
			"back":"s4",
			"y":380,
			"x":400
		},
		"s5":{
			"url":{
				"world":"outland",
				"region":"greenwoods",
				"scene":"river",
				"step":"s2"
			},
			"y":360,
			"x":500
		}
	}
}


function openFire(){

	let allheroes = game.items.hero;

	const required = ["lu","shiny","molly","arthur","donna","sarah"];
	const estanTodas = required.every(clave => clave in allheroes);

	if(estanTodas === true){
		console.log("estanTodas"); // true

		document.querySelector("#fire").remove();

		let html = `<a id="fire" class="e scenery openfire" href="/map/kyrkogard/cloudland/start">open fire</a>`;
	    document.querySelector('#scene').insertAdjacentHTML("beforeend",html);

	     //x y
	    document.querySelector("#fire").style.top = scene.scenery.fire.y+"px";
	    document.querySelector("#fire").style.left = scene.scenery.fire.x+"px";

	} else {
		console.log("una faltan"); // true
	}

}
