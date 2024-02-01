/*
 * First things first - start your live server!
 * 
 * Note! If you haven't created an account for openweathermap.org
 * now would be perfect time to do so. Activating takes
 * a couple of hours. ->>>

 */

////////////// G U E S S I N G // G A M E ///////////////

/*
 * Within the guessing game your job is to pick a number
 * between one and ten and then let the user guess the number
 * until they pick it right. You can also start the game again.
 *
 * Maximum points: 4p
 *
 */

/*
 * Let's start! Do a variable in which
 * the guessed number will be saved later. The number needs
 * to be outside of the functions in order for it to be
 * accessed from all the functions.
 *
 * Documentation: https://www.w3schools.com/js/js_variables.asp
 *
 */

// Your code here!
let numberToGuess = 0;

/* Start function will be called right away when the site
 * is loaded. The variable where the number is stored
 * needs to be declared before that
 */

start();

/*
 * Write here the code which will pick a random number
 * and saves it to the variable above.
 * Math.random() is a great way to produce random numbers,
 * and for example Math.floor() is a convenient way to leave
 * the decimals out.
 */

function start() {
  console.log("Start");
  console.log("Your code here! 🎲");

  // Pick a random number and save it to the variable above
  numberToGuess = Math.round(Math.random() * 10 + 1);
  console.log(numberToGuess);
}

/*
 * This will be here already for you. 🥳 We have an event
 * listener which is calling the number guessing function
 * when the button is clicked.
 */

const guessButton = document.querySelector("#guessButton");
guessButton.addEventListener("click", function (event) {
  guessNumber();
});

/*
 * In the following function, write the code that takes the
 * value from text field. Then it should check, if the value
 * is bigger or smaller, or the right number.
 *
 * During the check it should give feedback to the user
 * into the feedback-div.
 *
 * You may add even a class to the feedback to indicate
 * with colors the situation to the user. The classess
 * are already declared in the css. Neat. 🔥🤪
 * Thanks Pekka for your design eye!
 *
 * You should clear the text field at the same time for
 * making the next guess.
 *
 * You can get the elements with document.getElementById()
 * -function. Also setting the text goes easiest with
 * innerHTML-value.
 */

function guessNumber() {
  console.log("Guess made");
  console.log("Your code here 🕵️");

  let guessInput = document.querySelector("#guess");
  let guess = guessInput.value;
  let feedback = document.querySelector("#feedback");

  console.log("Guess", guess);

  if (guess < numberToGuess) {
    feedback.innerHTML = "Too small";
    feedback.classList.add("too-small");
    feedback.classList.remove("too-big");
  } else if (guess > numberToGuess) {
    feedback.innerHTML = "Too big";
    feedback.classList.add("too-big");
    feedback.classList.remove("too-small");
  } else if (guess == numberToGuess) {
    feedback.innerHTML = "Right!";
    feedback.classList.remove("too-big");
    feedback.classList.remove("too-small");
  }

  guessInput.value = "";
}

/*
 * Add here same kind of event listener as in the code above,
 * but do it for the reset -button ( id resetButton ) and
 * call the reset function.
 */

// Your reset button event listener here
const resetButton = document.querySelector("#resetButton");
resetButton.addEventListener("click", function (event) {
  reset();
});
/* And you know what?! Even the reset function is still
 * undeclared.. 😑.
 *
 * Luckily you know some Javascript!
 *
 * Reset function should make the number picker look
 * untouched. Just like it was before you arrived. Exept it
 * should work otherwise 🙃
 *
 */

function reset() {
  console.log("Reset");
  console.log("Your code here 🪄");
  start();

  document.querySelector("#guess").value = "";
  let feedback = document.querySelector("#feedback");
  feedback.classList.remove("too-big");
  feedback.classList.remove("too-small");
  feedback.innerHTML = "";
}
