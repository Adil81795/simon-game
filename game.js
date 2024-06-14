var buttonColours = ["red","blue","green","yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;




document.addEventListener("click", function() {
    if(!started) {

        $("#level-title").text("level "+ level);
        nextSequence();
        started = true;
    }
});



$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);

});


function nextSequence(){

    userClickedPattern = [];

    level++;

    $("#level-title").text("level "+ level);
    $("#level-title").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    setTimeout(function() {
        var randomNumber = Math.floor(Math.random()*4);

    var randomChosencolour = buttonColours[randomNumber];
    console.log(randomChosencolour);
    gamePattern.push(randomChosencolour);

    $("#" + randomChosencolour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosencolour);
    },1000);
    

}

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");

        if(userClickedPattern.length === gamePattern.length){

            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    
    }
    else{
        startOver();

        var audio = new Audio("sounds/wrong.mp3");
        audio.play();

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("#level-title").css("font-size","60px");
        
    }

}


function playSound(name) {

    var audio = new Audio("sounds/"+ name +".mp3");
    audio.play();

}

function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}


function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}






