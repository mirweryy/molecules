/*
Функция для реализации столкновения объектов в массиве

Для корректной работы объекты должны быть круглыми и иметь стандартные 
свойства:
x,y 	- координаты
r   	- радиус
vx,vy 	- вектор скорости 
m		- масса

В функцию передаются следующий параметры:
in_array: массив объектов, для анализа
dt: промежуток времени между пересчетом 

*/

function apply_colliding(in_array, dt)
{
	for (let i=0; i<in_array.length; i++)
	{
		for (let j=i+1; j<in_array.length; j++)
		{
			if (in_array[i] instanceof Circles && in_array[j] instanceof Circles){
				apply_colliding_collides(in_array[i], in_array[j], dt)
			}
		}
	}
}

function apply_colliding_collides(ball0, ball1, dt) 
{
	let dx=ball1.x - ball0.x;
	let dy=ball1.y - ball0.y;
	let dist=Math.sqrt(dx * dx + dy * dy);

	//collision handling code here
	if (dist > ball0.r+ball1.r) return;
	
	//calculate angle, sine, and cosine
	let angle = Math.atan2(dy, dx);
	let sin = Math.sin(angle);
	let cos = Math.cos(angle); 

	//rotate ball0's position
	let pos0 = {x: 0, y: 0}; //point

	//rotate ball1's position
	let pos1 = apply_colliding_rotate(dx, dy, sin, cos, true);

	//rotate ball0's velocity
	let vel0 = apply_colliding_rotate(ball0.vx, ball0.vy, sin, cos, true);

	//rotate ball1's velocity
	let vel1 = apply_colliding_rotate(ball1.vx, ball1.vy, sin, cos, true);

	//collision reaction
	let vxTotal = vel0.x - vel1.x;
    vel0.x = ((ball0.m - ball1.m) * vel0.x + 2 * ball1.m * vel1.x) / (ball0.m + ball1.m);
    vel1.x = vxTotal + vel0.x;
	
    //rotate velocities back
    let vel0F = apply_colliding_rotate(vel0.x, vel0.y, sin, cos, false);
    let vel1F = apply_colliding_rotate(vel1.x, vel1.y, sin, cos, false);
    ball0.vx = vel0F.x;
    ball0.vy = vel0F.y;
    ball1.vx = vel1F.x;
    ball1.vy = vel1F.y;
	
	//Корректировка позиции для исключения пересечения объектов
	while (dist <= ball0.r+ball1.r)
	{
		ball0.x+=ball0.vx*dt;
		ball0.y+=ball0.vy*dt;
		ball1.x+=ball1.vx*dt; 
		ball1.y+=ball1.vy*dt;
		
		dist=Math.sqrt((ball1.x-ball0.x)**2 + (ball1.y - ball0.y)**2);		
	}
}

function apply_colliding_rotate(x, y, sin, cos, reverse) {
    return {
        x: (reverse) ? (x * cos + y * sin) : (x * cos - y * sin),
        y: (reverse) ? (y * cos - x * sin) : (y * cos + x * sin)
    };
}
