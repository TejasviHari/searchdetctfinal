status="";
objects=[];

function setup(){
    canvas=createCanvas(380,300);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,300);
    video.hide();
}

function draw(){
    image(video,0,0,380,300);
    if(status!=""){
        
        objectDetector.detect(video,gotResults);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="Status:Objects detected!";
            

            fill("#C1292E");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x, objects[i].y);
            noFill();
            stroke("#C1292E");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        if(objects[i].label==object_name){
            video.stop();
            objectDetector.detect(video,gotResults);
            document.getElementById("found").innerHTML=object_name+" Found!"
            synth=window.speechSynthesis;
            utterThis=new SpeechSynthesisUtterance(object_name+"found");
            synth.speak(utterThis);
        }
        else{
            document.getElementById("found").innerHTML=object_name+"  not found"   
        }
        }
    }
}

function start(){
    objectDetector=ml5.objectDetector("cocossd",modeloaded);
   document.getElementById("status").innerHTML="Status:Detcting Objects";
   object_name=document.getElementById("object").value;
}

function modeloaded(){
    console.log("Model loaded!");

    status=true;
    
}

function gotResults(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}
