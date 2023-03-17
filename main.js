song1 = "";
song2 = "";

song1_status = "";
song2_status = "";

video="";

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function preload(){
	song1 = loadSound("Lace.mp3");
	song2 = loadSound("Bonebottom.mp3");
}

function setup(){
    canvas=createCanvas(600,450);
    canvas.parent('canvas');
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
    
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreRightWrist =  results[0].pose.keypoints[10].score;
	    scoreLeftWrist =  results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("Left Wrist X= "+leftWristX+" & Left Wrist Y= "+leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("Right Wrist X= "+rightWristX+" & Right Wrist Y= "+rightWristY)

       
        
    }
}

function modelLoaded(){
    console.log("Model is loaded");
}

function draw(){
    song1_status = song1.isPlaying();
	song2_status = song2.isPlaying();

    image(video,0,0,600,450);
    fill("#000000");
    stroke("#FFFFFF");
    circle(leftWristX,leftWristY,20);
    circle(rightWristX,rightWristY,20);

    if(scoreRightWrist > 0.2)
	{ 
		circle(rightWristX,rightWristY,20);

			song2.stop();

		if(song1_status == false)
		{
			song1.play();
			document.getElementById("song_name").innerHTML = "Playing - Lace Theme"
		}
	}

	if(scoreLeftWrist > 0.2)
	{
		circle(leftWristX,leftWristY,20);

			song1.stop();

		if(song2_status == false)
		{
			song2.play();
			document.getElementById("song_name").innerHTML = "Playing - Bonebottom Theme"
		}
	}
}
