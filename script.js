console.log("Linked!")
// import { Player } from './player.js';
// import { Controls } from './controls.js';

window.addEventListener('load', function(){
    const canvas = document.getElementById('world');
    const ctx = canvas.getContext('2d');
    canvas.width = 1024;
    canvas.height = 576;

    class Game{
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.player = new Player(this); // Might have to change this for multi classes
            this.projectile = new Projectile(this.player);
            this.control = new Controls();
        }

        update(){
            this.player.update(this.control.keys);
            this.projectile.update(this.control);
        }

        draw(context){
            this.player.draw(context);
            this.projectile.draw(context);
        }
    }

    const game = new Game(canvas.width, canvas.height);
    console.log(game);

    function animate(){
        ctx.fillStyle = 'black';
        ctx.fillRect(0,0, canvas.width, canvas.height)
        game.update();
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate();
});

class Player{
    constructor(game){
        this.game = game;
        // this.width = 50;
        // this.height = 50;
        this.radius = 20;
        this.x = (this.game.width/2) - (this.radius);
        this.y = (this.game.height/2) - (this.radius);
        // this.image = document.querySelector('#player');
        this.speed = 5;
}
    update(control){
        if(control.includes('d')){
            this.x += this.speed;
        }
        else if (control.includes('a')){
            this.x -= this.speed;
        }
        if (control.includes('w')){
            this.y -= this.speed;
        }
        else if (control.includes('s')){
            this.y += this.speed;
        }
        if(control.includes('Shift')){
            this.x = (this.game.width/2) - (this.radius/2);
            this.y = (this.game.height/2) - (this.radius/2);
            console.log(this.x, this.y)
        }
        
        if(this.x - this.radius < 0){
            this.x = this.radius;
        }
        if(this.x > this.game.width - this.radius){
            this.x = this.game.width - this.radius;
        }
        if(this.y - this.radius< 0){
            this.y = this.radius;
        }
        if(this.y > this.game.height - this.radius){
            this.y = this.game.height - this.radius;
        }
    }
    draw(context){
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = 'grey';
        context.fill()
        // context.fillStyle = "pink";
        // context.drawImage(this.image, this.x, this.y, 50, 50);
    }
};


// controls
class Controls{
    constructor(){
        this.keys = [];
        window.addEventListener('keydown', e =>{
            if((    e.key === 'w' ||
                    e.key === 's' ||
                    e.key === 'a' ||
                    e.key === 'd' ||
                    e.key === 'Shift'   
                ) && this.keys.indexOf(e.key) === -1){
                    this.keys.push(e.key);
                    }
            console.log(e.key, this.keys)
            });

        window.addEventListener('keyup', e =>{
            if(     e.key === 'w' ||
                    e.key === 's' ||
                    e.key === 'a' ||
                    e.key === 'd' ||
                    e.key === 'Shift'){
                this.keys.splice(this.keys.indexOf(e.key), 1);
                }
                console.log(e.key,this.keys)
            });
        }
    }
class Projectile {
    constructor(player){
        this.attacks=[]
        this.x = player.x;
        this.y = player.y;
        this.speed = player.speed;
        this.radius = 5;
    }
    draw(context){
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = 'red';
        context.fill()
    }
    update(control){
        this.x += 0;
        this.y += 0;
    }

}