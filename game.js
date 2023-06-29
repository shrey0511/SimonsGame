
var arrColors = ["red","blue","green","yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

document.addEventListener("keydown",function (event) {
    if(!started){
        $("h1").text("Level "+level)
        nextSequence();
        started = true;
    }
});


$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animate(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
})


function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
        console.log("Success");

        if(gamePattern.length==userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }    
    }else{
        console.log("Wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");    
        }, 200);
        $("h1").text("Game Over , Press Any Key to Restart");
        startOver();
    }
}


function nextSequence(){
    userClickedPattern=[];

    level=level+1;

    $("h1").text("Level "+level);
    
    var ranSequence = Math.random();
    ranSequence = Math.floor(ranSequence*4);

    var ranColor = arrColors[ranSequence];

    gamePattern.push(ranColor);

    // animate
    $("#"+ranColor).fadeIn(100).fadeOut(100).fadeIn(100);

    // playSound
    playSound(ranColor);
    
}

function startOver() {
    level=0;
    gamePattern=[];
    started=false;
}

function playSound(name) {
    // playSound
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}
    
function animate(chosenColor) {
    $("#"+chosenColor).addClass("pressed");
    setTimeout(function(){
        $("#"+chosenColor).removeClass("pressed");
    }, 100);
}        


    
    



