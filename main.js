noseX = 0;
noseY = 0;
difference = 0;
leftWristX = 0;
rightWristX = 0;

function setup()
{
    video = createCapture(VIDEO);
    video.size(550, 500);

    canvas = createCanvas(550, 550);
    canvas.position(560, 150);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log('PoseNet is Initialized');
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("noseX = " + noseX + "noseY" + noseY);

        leftWristX = results[0].pose.leftWristX.x;
        rightWristX = results[0].pose.rightWristX.x;
        difference = floor(leftWristX - rightWristX);
        console.log("leftWristX = " + leftWristX + "rightWristX = " + rightWristX);
    }
}

function draw()
{
    background('#969A97');

    document.getElementById("square_side").innerHTML = "Width and Height of the Square will be = " + difference + "px";
    fill('#f90093');
    stroke('#f90093');
    square(noseX, noseY, difference); 
}