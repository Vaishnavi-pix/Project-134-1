img="";
status="";
alarm="";
object=[];
function preload(){
    alarm=loadSound("alarm.mp3");
}
function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    video.size(380,380);
 objectDected=ml5.objectDetector("cocossd",modelLoaded);
 document.getElementById("status").innerHTML="Status: Detecting Objects";
}
function modelLoaded(){
    console.log("Model Loaded");
    
    status=true;
}
function gotResults(error,results){
if(error){
    console.log(error);
}
else{
    console.log(results);
    object=results;
}
}
function draw(){
    image(video,0,0,580,400);
    if(status != ""){
        objectDected.detect(video,gotResults);
        r=random(255);
g=random(255);
b=random(255);
        for(i=0;i<object.length;i++){
            
            document.getElementById("status").innerHTML="Objects Detected";
            fill(r,g,b);
            percent=floor(object[i].confidence*100);
            text(object[i].label + " " + percent + "%", object[i].x+15, object[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);

            
        }
        if(object.length <= 0){
            document.getElementById("baby_detected").innerHTML="Baby not found";
            alarm.play();
        }
        else{
document.getElementById("baby_detected").innerHTML="Baby found";
alarm.stop();
        
        }
    }
    }