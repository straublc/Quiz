// Declaração de variáveis
const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const letters = ["a", "b", "c", "d"];
let points = 0;
let actualQuestion = 0;

// Perguntas
const questions = [
  {
    question: "Qual foi a primeira seleção a conquistar?",
    answers: [
      {
        answer: "Brasil",
        correct: false,
      },
      {
        answer: "Argentina",
        correct: true,
      },
      {
        answer: "Uruguai",
        correct: false,
      },
      {
        answer: "Colômbia",
        correct: false,
      },
    ],
  },
  {
    question:
      "Qual seleção é a maior campeã? (Não é a única com esse número de títulos)",
    answers: [
      {
        answer: "Venezuela",
        correct: false,
      },
      {
        answer: "Brasil",
        correct: false,
      },
      {
        answer: "Colômbia",
        correct: false,
      },
      {
        answer: "Uruguai",
        correct: true,
      },
    ],
  },
  {
    question:
      "Quem é o maior artilheiro? (Não é o único com esse número de gols)",
    answers: [
      {
        answer: "Eduardo Vargas",
        correct: false,
      },
      {
        answer: "Zizinho",
        correct: true,
      },
      {
        answer: "Lionel Messi",
        correct: false,
      },
      {
        answer: "Teodoro Fernández",
        correct: false,
      },
    ],
  },
  {
    question: "Quem ganhou a edição de 1975?",
    answers: [
      {
        answer: "Brasil",
        correct: false,
      },
      {
        answer: "Peru",
        correct: true,
      },
      {
        answer: "Argentina",
        correct: false,
      },
      {
        answer: "Paraguai",
        correct: false,
      },
    ],
  },
  {
    question: "Quem ganhou a edição de 1979?",
    answers: [
      {
        answer: "Paraguai",
        correct: true,
      },
      {
        answer: "Argentina",
        correct: false,
      },
      {
        answer: "Uruguai",
        correct: false,
      },
      {
        answer: "Colômbia",
        correct: false,
      },
    ],
  },
  {
    question: "Quem ganhou a edição de 1995?",
    answers: [
      {
        answer: "Colômbia",
        correct: false,
      },
      {
        answer: "Venezuela",
        correct: false,
      },
      {
        answer: "Brasil",
        correct: false,
      },
      {
        answer: "Uruguai",
        correct: true,
      },
    ],
  },
  {
    question: "Quem ganhou a edição de 1999?",
    answers: [
      {
        answer: "Venezuela",
        correct: false,
      },
      {
        answer: "Peru",
        correct: false,
      },
      {
        answer: "Brasil",
        correct: true,
      },
      {
        answer: "Uruguai",
        correct: false,
      },
    ],
  },
  {
    question: "Quem ganhou a edição de 2001",
    answers: [
      {
        answer: "Colômbia",
        correct: true,
      },
      {
        answer: "Brasil",
        correct: false,
      },
      {
        answer: "Peru",
        correct: false,
      },
      {
        answer: "Chile",
        correct: false,
      },
    ],
  },
  {
    question: "Quem ganhou a edição de 2015?",
    answers: [
      {
        answer: "Brasil",
        correct: false,
      },
      {
        answer: "Argentina",
        correct: false,
      },
      {
        answer: "Chile",
        correct: true,
      },
      {
        answer: "Colômbia",
        correct: false,
      },
    ],
  },
  {
    question: "Quem ganhou a edição de 2019?",
    answers: [
      {
        answer: "Uruguai",
        correct: false,
      },
      {
        answer: "Argentina",
        correct: false,
      },
      {
        answer: "Brasil",
        correct: true,
      },
      {
        answer: "Chile",
        correct: false,
      },
    ],
  },
];

// Substituição do layout pela primeira questão
function init() {
  createQuestion(0);
}

// Create a question
function createQuestion(i) {
  // Limpa questão anterior
  const oldButtons = answersBox.querySelectorAll("button");

  oldButtons.forEach(function (btn) {
    btn.remove();
  });

  // Altera texto da pergunta
  const questionText = question.querySelector("#question-text");
  const questionNumber = question.querySelector("#question-number");

  questionText.textContent = questions[i].question;
  questionNumber.textContent = i + 1;

  // Insere alternativas
  questions[i].answers.forEach(function (answer, i) {
    // Altera texto do template
    const answerTemplate = document
      .querySelector(".answer-template")
      .cloneNode(true);

    const letterBtn = answerTemplate.querySelector(".btn-letter");
    const answerText = answerTemplate.querySelector(".question-answer");

    letterBtn.textContent = letters[i];
    answerText.textContent = answer["answer"];

    answerTemplate.setAttribute("correct-answer", answer["correct"]);

    // remove classe de hide e template do template
    answerTemplate.classList.remove("hide");
    answerTemplate.classList.remove("answer-template");

    // Insere template na tela
    answersBox.appendChild(answerTemplate);
  });

  // Cria evento em todos os botões
  const buttons = answersBox.querySelectorAll("button");

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      checkAnswer(this, buttons);
    });
  });

  // Incrementa o número atual de questões
  actualQuestion++;
}

// Verificando se resposta está correta
function checkAnswer(btn, buttons) {
  // Exibir respostas erradas e a certa
  buttons.forEach(function (button) {
    if (button.getAttribute("correct-answer") === "true") {
      button.classList.add("correct-answer");
      // checa se o usuário acertou
      if (btn === button) {
        // incrementa os pontos
        points++;
      }
    } else {
      button.classList.add("wrong-answer");
    }
  });

  nextQuestion();
}

// Exibe a próxima pergunta
function nextQuestion() {
  // Timer para ver se acertou ou errou
  setTimeout(function () {
    // checa se ainda há mais perguntas
    if (actualQuestion >= questions.length) {
      // apresenta msg de sucesso
      showSuccessMessage();
      return;
    }

    createQuestion(actualQuestion);
  }, 1000);
}

// Tela final
function showSuccessMessage() {
  hideOrShowQuizz();

  // calc score
  const score = ((points / questions.length) * 100).toFixed(2);
  const scoreDisplay = document.querySelector("#display-score span");

  scoreDisplay.textContent = score.toString();

  // alterar número de perguntas corretas
  const correctAnswers = document.querySelector("#correct-answers");
  correctAnswers.textContent = points;

  // alterar total de perguntas
  const totalQuestions = document.querySelector("#questions-qty");
  totalQuestions.textContent = questions.length;
}

// Reiniciar Quizz
const restartBtn = document.querySelector("#restart");

restartBtn.addEventListener("click", function () {
  actualQuestion = 0;
  points = 0;
  hideOrShowQuizz();
  init();
});

// Mostra ou exibe o quizz
function hideOrShowQuizz() {
  quizzContainer.classList.toggle("hide");
  scoreContainer.classList.toggle("hide");
}

// Inicialização
init();
