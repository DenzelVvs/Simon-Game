const buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameHasStarted = false;
var level = 0;

var redAudio = new Audio('sounds/red.mp3');
var blueAudio = new Audio('sounds/blue.mp3');
var greenAudio = new Audio('sounds/green.mp3');
var yellowAudio = new Audio('sounds/yellow.mp3');
var wrongAudio = new Audio('sounds/wrong.mp3');

function playSound(name) {
  switch (name) {
    case "red":
      redAudio.play();
      break;
    case "blue":
      blueAudio.play();
      break;
    case "green":
      greenAudio.play();
      break;
    case "yellow":
      yellowAudio.play();
      break;
    default: console.log("Audio for " + name + " not found.");
  }
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  },100);
}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4); // Between 0 and 3 inclusive

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100); // Gives button flash effect

  playSound(randomChosenColour);

  level++;

  $("h1").text("Level " + level);   // Update H1 text
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] != gamePattern[currentLevel]) {
    wrongAudio.play();
    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    },200);

    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }

  if (currentLevel + 1 === level) {
    setTimeout(nextSequence, 1000);
    userClickedPattern = [];
  }
}

function startOver() {
  level = 0;
  userClickedPattern = [];
  gamePattern = [];
  gameHasStarted = false;
}

// Adds event listener to buttons
$(".btn").click(function(event) {
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

// Listens for keyboard press to start game
$(document).keypress(function() {
  if (!gameHasStarted) {
    gameHasStarted = true;
    $("h1").text("Level " + level);
    nextSequence();
  }
})
