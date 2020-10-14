var colours = ["red", "green", "pink", "blue"];
var pattern = [];
var userpattern = [];
var isStarted = false;
var currLvl = 0;

$("button").click(function()
{
  if (!isStarted) {
    $(".score").text("LEVEL: " + currLvl);
    nextTurn();
    isStarted = true;
  }
});

$(".col-4").click(function()
{
  var chosenColour = $(this).text();
  userpattern.push(chosenColour);
  playSound();
  animate(chosenColour);
  checkValidity();
});

function nextTurn()
{
  userpattern = [];
  currLvl++;
  $(".score").text("LEVEL: " + currLvl);
  var num = Math.floor(Math.random() * 4);
  pattern.push(colours[num]);
  $("." + colours[num]).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound();
}

function checkValidity()
{
  if (pattern[userpattern.length - 1] === userpattern[userpattern.length - 1])
  {
    if (pattern.length === userpattern.length)
    {
      setTimeout(function() {
        nextTurn();
      }, 1000);
    }
  }
  else
  {
    var audio = new Audio("wrong.mp3");
    audio.play();
    $(".score").text("Game over, click on START GAME to play again");
    $("body").addClass("over");
    setTimeout(function() {
      $("body").removeClass("over");
    }, 500);
    reset();
  }
}

function animate(currentColor)
{
  $("." + currentColor).addClass("pressed");
  setTimeout(function() {
    $("." + currentColor).removeClass("pressed");
  }, 150);
}

function playSound()
{
  var audio = new Audio("correct.mp3");
  audio.play();
}

function reset()
{
  pattern = [];
  currLvl = 0;
  isStarted = false;
}
