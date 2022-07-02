song1="";
song2="";
leftWrist_x=0;
leftWrist_y=0;
rightWrist_x=0;
rightWrist_y=0;

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotPoses);
}

function modelLoaded(){
    console.log("poseNet initialized");
}

function preload(){
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}

function draw(){
    image(video,0,0,600,500);
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        leftWrist_x=results[0].pose.leftWrist.x;
        leftWrist_y=results[0].pose.leftWrist.y;
        console.log("leftWrist x : "+leftWrist_x+" ,leftWrist y : "+leftWrist_y);

        rightWrist_x=results[0].pose.rightWrist.x;
        rightWrist_y=results[0].pose.rightWrist.y;
        console.log("rightWrist x : "+rightWrist_x+" ,rightWrist y : "+rightWrist_y);
    }
}

