// setting up the canvas
const canvas = document.querySelector('#space')
const c = canvas.getContext('2d')

canvas.width = 1024;
canvas.height = 576;

// creating a player class (image, radius, position, velocity)
class Player{
    constructor(){
        //this sprite
        const image = new Image()
        this.image = document.querySelector('#player')
        // this.width = 50;
        // this.height = 50;
        this.radius = 20;

        this.position = {
            x: canvas.width/2 - this.radius,
            y: canvas.height/2 - this.radius
        }
        
    
        this.velocity={
            x: 0,
            y: 0
        }
    }
    // a draw method to draw the play onto the canvas
    draw() {
        // c.fillStyle = 'red'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = 'pink';
        c.fill()
        c.drawImage(this.image, this.position.x, this.position.y,this.width, this.height)
    }
    // an update method to change the player position and then re-draw the player with new into
    update(){
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}

// creating our player OBJECT
const player = new Player();

// creating a key array to check which key is currently being pressed
const keys = {
    w:{
        pressed: false
    },
    s:{
        pressed: false
    },
    a:{
        pressed: false
    },
    d:{
        pressed: false
    },
    Shift:{
        pressed: false
    }
}

// creating an function to animate the canvas
function animate(){
    requestAnimationFrame(animate)
    c.fillStyle= 'black'
    c.fillRect(0,0, canvas.width, canvas.height)
    player.update();
    if (keys.w.pressed && player.position.y - player.radius>= 0){
        player.velocity.y = -5;
    }  
    else if(keys.s.pressed && player.position.y + player.radius <= canvas.height){
        player.velocity.y = 5;
    } 
    else{
        player.velocity.y = 0;
    }
    if (keys.a.pressed && player.position.x >= player.radius){
        player.velocity.x = -5;
    }  
    else if(keys.d.pressed && player.position.x + player.radius  <= canvas.width){
        player.velocity.x = 5;
    } 
    else{
        player.velocity.x = 0;
    }
    
}

// calling the animate function
animate();

// eventlistener for keypress
window.addEventListener('keydown', ({key}) =>{
    switch (key){
        case 'w':
            keys.w.pressed = true;
            break;
        case 's':
            keys.s.pressed = true;
            break;
        case 'a':
            keys.a.pressed = true;
            break;
        case 'd':
            keys.d.pressed = true;
            break;
        case 'Shift':
            keys.Shift.pressed = true;
            player.position.x = canvas.width/2;
            player.position.y = canvas.height/2;
            break;                     
    }
})

// eventlistener for keyreleased
window.addEventListener('keyup', ({key}) =>{
    switch (key){
        case 'w':
            keys.w.pressed = false;
            break;
        case 's':
                keys.s.pressed = false;
                break;
        case 'a':
            keys.a.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
        case 'Shift':
            keys.Shift.pressed = false;
            player.position.x = canvas.width/2;
            player.position.y = canvas.height/2;
            break;                     
    }
})