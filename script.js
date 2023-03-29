// setting up the canvas
const canvas = document.querySelector('#space')
const c = canvas.getContext('2d')

canvas.width = innerWidth;
canvas.height = innerHeight;

// creating a player class (image, radius, position, velocity)
class Player{
    constructor(){
        //this sprite
        const image = new Image()
        // this.image = document.querySelector('#player')
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
        c.fillStyle = 'yellow';
        c.fill()
        // c.drawImage(this.image, this.position.x, this.position.y,this.width, this.height)
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
    attacks.forEach(attack => {attack.update() })
    mobs.forEach(enimies=> {enimies.update() })

    // control update
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

//Attacks

class Attack{
    constructor(player, x, y, radius, color, velocity, speed){
        let rgb = ['red','blue', 'green', 'purple', 'white']
        this.player = player
        this.x = player.position.x;
        this.y = player.position.y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.speed = speed
    }

    draw() {
        // c.fillStyle = 'red'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill()
        // c.drawImage(this.image, thisx, this.y,this.width, this.height)
    }

    update(){
        this.x = this.x + this.velocity.x * this.speed;
        this.y = this.y + this.velocity.y * this.speed;
        this.draw();
    }
}

class Enemy{
        constructor(player, x, y, radius, color, velocity, speed){
            let rgb = ['red','blue', 'green', 'purple', 'white']
            this.player = player
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = color;
            this.velocity = velocity;
            this.speed = speed
        }
    
        draw() {
            // c.fillStyle = 'red'
            // c.fillRect(this.position.x, this.position.y, this.width, this.height)
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            c.fillStyle = this.color;
            c.fill()
            // c.drawImage(this.image, thisx, this.y,this.width, this.height)
        }
    
        update(){
            if(this.x > player.position.x){
                this.x -= this.velocity.x * this.speed;  
            }
            else if(this.x < player.position.x){
            this.x += this.velocity.x * this.speed;
            }
            if(this.y > player.position.y){
                this.y -= this.velocity.y * this.speed;  
            }
            else if(this.y < player.position.y){
            this.y += this.velocity.y * this.speed;
            }
            this.draw();
        }
    }

function spawnEnemies(){
    setInterval(()=>{
        const x = 0;
        const y = 0;
        const radius = 40;
        const color = 'pink';
        const speed = 5d;
            
        const angle = Math.atan2(y + player.position.y, x + player.position.x);
        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        };
        mobs.push(new Enemy(player, x, y, radius, color, velocity, speed))

        },1000)
    }


// const attack = new Attack(player, canvas.width/2, canvas.height/2, 5, 'red', {x:1, y:1})
const attacks = [];
const mobs = [];

// let the player cast an ATTACK once the mouse is clicked
addEventListener('click', (e) =>{
        const angle = Math.atan2(e.clientY - player.position.y, e.clientX - player.position.x )
        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }
        let rgb = ["red", "blue", "green", "purple", "white"];
        let colorRandom = rgb[Math.round((Math.random()* 4))];
        console.log(colorRandom)
        console.log(e.clientX,e.clientY)
        attacks.push(new Attack(player, player.position.x , player.position.y, (Math.random()* 50) + 5, colorRandom, velocity, Math.random()* 50))
    })
// calling the animate function
animate();
spawnEnemies();
