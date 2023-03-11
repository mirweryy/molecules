btn.addEventListener('click', start);
inp_speed.addEventListener('change', function(){speed = inp_speed.value});
box.addEventListener('click', function(){obj.push(new Circles(event.clientX, event.clientY, size, 0, 0, 0))});
document.addEventListener('keydown', key_down, event); 
document.addEventListener('keyup', key_up, event); 

let a = 60;
let b = 0;
let time_prev;
let time_start = 0;
let t = 0;
let main_timer = 0;
let obj = [];
let pist = new Pistol(0, 0);
let size = 10;
let speed = inp_speed.value;

function key_down(e){
	if(e.code == "KeyA"){
		pist.vx = -250;
	}
	else if(e.code == "KeyD"){
		pist.vx = 250;
	}
}

function key_up(e){
	if(e.code == "KeyA"){
		pist.vx = 0;
	}
	else if(e.code == "KeyD"){
		pist.vx = 0;
	}
}


function start(){
	size = parseInt(size_id.value);
	let n1 = parseInt(n1_id.value);
	let n2 = parseInt(n2_id.value);
	if (n1 > 35){
		n1 = 35;
	}
	if (n2 > 50){
		n2 = 50;
	}
	clear();
	for(i = 0; i < n1; i++){
		for(j = 0; j < n2; j++){
			let x = parseInt(a+Math.random()*size);
			let y = parseInt(b+Math.random()*size);
			let num1 = parseInt(0+Math.random()*256);
			let num2 = parseInt(0+Math.random()*256);
			let num3 = parseInt(0+Math.random()*256);
			let vx = parseInt(-100+Math.random()*200);
			let vy = parseInt(-200+Math.random()*400);
			let circle = new Circles(x, y, size, num1, num2, num3);
			circle.vx = vx;
			circle.vy = vy;
			obj.push(circle);
			a += (size*2)+1;
			}
		a = 60;
		b += (size*2)+1;
	}
	time_prev = performance.now();
	time_start = performance.now();
	main_timer = setInterval(calculation, 10);
	render();
}

function clear(){
	while(0 < obj.length){
		obj[0].div.remove();
		obj.splice(0, 1);
	}
	a = 0;
	b = 0;
}

function one_step(dt){
	for (i = 0; i < obj.length; i++){
		obj[i].move(dt);
		obj[i].collision();
	}
	apply_colliding(obj, dt);	
	pist.move(dt);
}

function calculation()
{
	time_now=performance.now();		 		
	t=(time_now-time_start)/1000;
	let dt=(speed*(time_now-time_prev)/1000); 	
	one_step(dt);
	time_prev=time_now;
}

function render()
{
	for (i = 0; i < obj.length; i++){
		obj[i].render();
	}
	pist.render();
	requestAnimationFrame(render);
}