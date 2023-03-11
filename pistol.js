class Pistol {
	x = 0;		
	y = 0;
	vx = 0;
	
	constructor(x, y){
		let div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.left = x;
        div.style.top = y;
        div.style.width = `30px`;
        div.style.height = `700px`;
        div.style.border = `5px solid black`;
		div.style.backgroundColor = "black";
		document.body.append(div)
		
		this.div = div;

	}
	
	render(){
		this.div.style.left = this.x;
		this.div.style.top = this.y;
	}

    move(dt){
		if (this.x < 400){
	}
		this.x += this.vx*dt;
	}	

}