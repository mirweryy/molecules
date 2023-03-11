class Circles {
	x = 0;		
	y = 0;
	vx = 0;
	vy = 0;
	
	constructor(x, y, size, num1, num2, num3){
		let div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.left = x;
        div.style.top = y;
        div.style.width = `${size}px`;
        div.style.height = `${size}px`;
        div.style.borderRadius = `${size}px`;
        div.style.backgroundColor = `rgb(${num1}, ${num2}, ${num3})`;
        div.style.border = `1px solid rgb(${num1}, ${num2}, ${num3})`;
		document.body.append(div)
		
		this.div = div;
		this.x = x;
		this.y = y;
		this.r = size/2;
		this.m = 5*3;
	}
	
	render(){
		this.div.style.left = this.x - this.r;
		this.div.style.top = this.y - this.r;
	}
		
	move(dt){
		if (this.y + this.r < 400){
	}
		this.x += this.vx*dt;
		this.y += this.vy*dt;
	}	

	collision(){
		if (this.y < this.r){
			this.vy *=-1;
			this.y = this.r;
		}
		if (this.x < (pist.x+this.r+42)){
			this.vx = -1*(this.vx+pist.vx);
			this.x = pist.x+42+this.r;
		}
		if (this.x > 1000-this.r){
			this.vx *=-1;
			this.x = 1000-this.r;
		}
		if (this.y > 700-this.r){
			this.vy *=-1;
			this.y = 700-this.r;
		}
	}
}
