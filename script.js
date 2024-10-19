let count = 1;
document.getElementById("radio1").checked = true;

setInterval(function(){
 nextImage();
}, 5000)


function nextImage(){
    count++;
    if(count>4){
     count = 1;
    }
    document.getElementById("radio" + count).checked = true;
}

var end = new Date("sep 06, 2024 22:30:00").getTime();

var x = setInterval(function(){
var now = new Date().getTime();
var diff = now - end;

var day = Math.floor(diff/(1000*3600*24));
var hour = Math.floor(diff % (1000*3600*24)/(1000*3600));
var min = Math.floor(diff % (1000*3600)/(1000*60));
var sec = Math.floor(diff % (1000*60)/1000);

if(day < 10){
    day = '0' + day
}

if(hour < 10){
    hour = '0' + hour
}

if(min < 10){
    min = '0' + min
}

if(sec < 10){
    sec = '0' + sec
}

myh3 = document.getElementById("count");
myh3.innerHTML = `${day} dias ${hour}:${min}:${sec}`


},1000);
