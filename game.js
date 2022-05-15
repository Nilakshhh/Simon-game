var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started=false;
var level=0;
var score=0;
var bestScore=0;

$(".buttS").click(function(Event){
    if(!started){
        $("h1").text("Level" + level);
        nextSequence();
        started=true;
        $("a").addClass("invisible");
    }
})

$(".btno").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
            score++;
            if(score>bestScore){bestScore=score;}
            $("h2").text("Score: " + score + "Best Score: " + bestScore);
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game ended. Press any key to restart.");
        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 500);
          startOver();
    }
}

function nextSequence()
{
    level++;
    userClickedPattern = [];
    $("h1").text("Level" + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomColourChosen = buttonColours[randomNumber];
gamePattern.push(randomColourChosen);
$("#"+randomColourChosen).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomColourChosen);
};


function playSound(name){
    var audio = new Audio("audio/" + name + ".mp3")
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
      }, 100);
}

function startOver(){
    level=0;
    gamePattern=[];
    score=0;
    $("a").removeClass("invisible");
    $("h2").text("Score: " + score + "Best Score: " + bestScore);
    started = false;
}
