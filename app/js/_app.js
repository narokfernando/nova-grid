function save(id,json){
    localStorage.setItem(id,JSON.stringify(json));
}

function reset(e){
	if(e){
		localStorage.removeItem(url);
    	location.reload();
	} else {
		localStorage.clear();
    	location.reload();
	}
}

function load(e,v){
	if(v){
		let raw = localStorage.getItem(v);
		if(raw){
			window[e] = JSON.parse(raw); 
		} else {
			save(v,window[e]);
		}
	} else {
		let raw = localStorage.getItem(e);
		if(raw){
			window[e] = JSON.parse(raw); 
		} else {
			save(e,window[e]);
		}
	}
}

function render(e){
    let list = scene[e];
    if(list){
        for (const[id,data] of Object.entries(list)) {

        	//elem
            let html = `<div id="${id}" class="e ${e} ${data.type}">${id}</div>`;
            document.querySelector('#scene').insertAdjacentHTML("beforeend",html);

            //action
            let a = data.action;
            if(a){
            	document.querySelector("#"+id).setAttribute("onclick",a+"('"+id+"','"+data.type+"')");
            } else {
            	document.querySelector("#"+id).setAttribute("onclick","shine('"+id+"')");
            }

            //if step & goto
            if(data.url){
            	document.querySelector("#"+id).remove();
            	
            	let destination = "/map/"+data.url.world+"/"+data.url.region+"/"+data.url.scene;
            	if(data.url.world == "/"){
            		destination = "/";
            	}

            	let html = `<a id="${id}" class="e ${e}" href="${destination}">${id}</a>`;
            	document.querySelector('#scene').insertAdjacentHTML("beforeend",html);
            }

            //x y
            document.querySelector("#"+id).style.top = data.y+"px";
            document.querySelector("#"+id).style.left = data.x+"px";

        }
    }

    if(url == "/"){
    	document.querySelector("#scenerycss").setAttribute("href","/map/outland/greenwoods/_scenery/_scenery.css");
    } else {
    	document.querySelector("#scenerycss").setAttribute("href","../_scenery/_scenery.css");
    }
}

//actions
function shine(id){
	document.querySelector("#"+id).classList.add("shine");
	setTimeout(removeClass,1000,id,"shine");
}
function collect(id,type){
	
	//check
	let raw = game.items[type];
	if(!raw){
		game.items[type] = {};
	}

	//save
	game.items[type][id] = db[type][id];
	save("game",game);

	//remove
	delete scene.items[id];
	save(url,scene);
	document.querySelector("#"+id).remove();
}
function removeClass(id,c){
	document.querySelector("#"+id).classList.remove(c);
}


var url = location.pathname

//load
load("game");
load("scene",url);

//render
render("steps");
render("items");
render("scenery");





