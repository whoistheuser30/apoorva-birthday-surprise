const questionCards =
  document.querySelectorAll(".question-card");

const quizComplete =
  document.getElementById("quizComplete");

let completedQuestions = 0;


questionCards.forEach((card) => {

  const buttons =
    card.querySelectorAll(".answer-btn");

  const response =
    card.querySelector(".answer-response");

  let answered = false;


  buttons.forEach((button) => {

    button.addEventListener("click", () => {

      if (answered) {
        return;
      }

      answered = true;

      const isCorrect =
        button.dataset.correct === "true";


      buttons.forEach((btn) => {
        btn.disabled = true;
      });


      if (isCorrect) {

        button.classList.add("correct");

        response.textContent =
          getCorrectResponse(card.dataset.question);

      } else {

        button.classList.add("wrong");

        const correctButton =
          card.querySelector(
            '[data-correct="true"]'
          );

        correctButton.classList.add("correct");

        response.textContent =
          getFunnyWrongResponse(
            card.dataset.question
          );
      }


      completedQuestions++;


      if (
        completedQuestions ===
        questionCards.length
      ) {

        setTimeout(() => {

          quizComplete.classList.add("visible");

          quizComplete.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });

        }, 500);
      }

    });

  });

});


function getCorrectResponse(question) {

  const responses = {

    "1":
      "Correct. Birthday records successfully verified. 🎂",

    "2":
      "Exactly. The evidence is frankly overwhelming. 😹",

    "3":
      "Correct. Time apparently behaves differently during those calls. 📞"

  };

  return responses[question] ||
    "Correct. Investigation continues.";

}


function getFunnyWrongResponse(question) {

  const responses = {

    "1":
      "Suspicious answer. Fortunately, the investigators have the correct date.",

    "2":
      "Interesting theory, but Exhibit A has already destroyed your defence.",

    "3":
      "Nice attempt. Historical evidence suggests otherwise. 😌"

  };

  return responses[question] ||
    "Not quite. The Birthday Department has corrected the record.";

}
