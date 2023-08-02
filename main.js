song_1 = "";
song_2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rigthWristY = 0;
scoreRightWrist = 0;
songStatus = "";
scoreLeftWrist = 0;
function preload(){
    song_1 = loadSound("music2.mp3")
    song_2 = loadSound("music.mp3")
}

function setup(){
    canvas = createCanvas(600, 500)
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log('PoseNet Is Initialized');
}

function draw(){
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");
    songStatus_1 = song_1.isPlaying();
    songStatus_2 = song_2.isPlaying();
    console.log(songStatus_1);

    if(scoreLeftWrist > 0.2){
        circle(leftWristX,leftWristY,20);
        song_2.stop();
        if(songStatus_1 == false){
            song_1.play();
        }
        else{
            console.log("Song Name: Peter Pan Song");
            document.getElementById("song_id").innerHTML = "Song Name: Peter Pan Song";
        }
    }
    if(scoreRightWrist > 0.2){
        circle(rightWristX, rightWristY,20);
        song_1.stop();
        if(songStatus_2 == false){
            song_2.play();
        }
        else{
            console.log("Song Name: Harry Potter Theme Song");
            document.getElementById("song_id").innerHTML = "Song Name: Harry Potter Theme Song";
        }

    }
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log(scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);
    }
}