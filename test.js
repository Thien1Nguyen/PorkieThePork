let num = 1;
let delay = 1000;

function loop(){
    console.log(num)
    num++;

    if(delay > 100){
    delay = delay - 100;
    }
    setTimeout(()=>{loop();},delay)
}

loop();