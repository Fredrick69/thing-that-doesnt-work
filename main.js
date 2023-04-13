objects = [];
status = "";
video = "";
function preload() {
    video=createVideo("video.mp4");

}

function setup() {
    canvas=createCanvas(550,550);
    canvas.center();
    video.hide();
    
}



function draw() {
    image(video,0,0,550,550);
    if(status!=""){
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML="status: object detected";
            document.getElementById("numberofobjects").innerHTML="number of objects detected: " + objects.length;
            fill("red");
            percent=floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    
          }
    }

}

function start()
{
    objectDetector=ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML="status: dectecting objects.";
}

function modelLoaded()
{
    console.log("model loaded.");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);

}

function gotResult(error, results)
{
    if(error){
        console.log(error);
    }
     
    console.log(results);

}


