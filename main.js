song1="";
song2="";
leftWrist_x=0;
leftWrist_y=0;
rightWrist_x=0;
rightWrist_y=0;
leftWrist_score=0;
rightWrist_score=0;
songstatus_1="";
songstatus_2="";

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
    stroke("darkblue");
    fill("darkblue");
    songstatus_1=song1.isPlaying();
    songstatus_2=song2.isPlaying();

    if(leftWrist_score>0.2){
        circle(leftWrist_x,leftWrist_y,20);
        song1.stop();
        if(songstatus_2==false){
            song2.play();
            document.getElementById("song_name").innerHTML="Song Name : Peter Pan Song";
        }
    }
    if(rightWrist_score>0.2){
        circle(rightWrist_x.rightWrist_y,20);
        song2.stop();
        if(songstatus_1==false){
            song1.play();
            document.getElementById("song_name").innerHTML="Song Name : Harry Potter Theme Song";
        }
    }
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

        leftWrist_score=results[0].pose.keypoints[9].score;
        console.log(leftWrist_score);

        rightWrist_score=results[0].pose.keypoints[10].score;
        console.log(rightWrist_score);
    }
}

