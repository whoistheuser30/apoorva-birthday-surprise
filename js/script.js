
const questionCards = document.querySelectorAll(".question-card");
const quizComplete = document.getElementById("quizComplete");

let completedQuestions = 0;

questionCards.forEach((card) => {
  const buttons = card.querySelectorAll(".answer-btn");
  const response = card.querySelector(".answer-response");

  let answeredCorrectly = false;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {

      // If already answered correctly, do nothing.
      if (answeredCorrectly) return;

      const isCorrect = button.dataset.correct === "true";

      // Clear previous selection styles so she can retry.
      buttons.forEach((btn) => {
        btn.classList.remove("wrong", "correct");
      });

      if (isCorrect) {
        answeredCorrectly = true;

        button.classList.add("correct");

        response.textContent =
          getCorrectResponse(card.dataset.question);

        // Lock the answers only after a correct choice.
        buttons.forEach((btn) => {
          btn.disabled = true;
        });

        completedQuestions++;

        // Show completion after every question is correct.
        if (completedQuestions === questionCards.length) {
          setTimeout(() => {
            if (quizComplete) {
              quizComplete.classList.add("visible");

              quizComplete.scrollIntoView({
                behavior: "smooth",
                block: "center"
              });
            }
          }, 700);
        }

      } else {
        // Wrong answers remain clickable.
        button.classList.add("wrong");

        response.textContent =
          getFunnyWrongResponse(card.dataset.question);
      }
    });
  });
});


function getCorrectResponse(question) {
  const responses = {
    "1":
      "Correct. Birthday records successfully verified. 🎂",

    "2":
      "Correct! 😂❤️ But honestly, your smile is guilty of stealing all the attention.",

    "3":
      "Correct. Time apparently behaves differently during those calls. 📞"
  };

  return responses[question] ||
    "Correct. Investigation continues.";
}


function getFunnyWrongResponse(question) {
  const responses = {
    "1":
      "Suspicious answer. 😂 Fortunately, the investigators aren't giving up. Try again!",

    "2":
      "Wrong answer! 😹 Try again, madam. The evidence against your cuteness is overwhelming!",

    "3":
      "Nice attempt. 😌 The historical evidence suggests otherwise. Try again!"
  };

  return responses[question] ||
    "Not quite. The Birthday Department has corrected the record.";
}
