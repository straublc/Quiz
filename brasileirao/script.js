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
    question: "Qual foi o primeiro time a ganhar?",
    answers: [
      {
        answer: "Atlético-MG",
        correct: true,
      },
      {
        answer: "Flamengo",
        correct: false,
      },
      {
        answer: "Santos",
        correct: false,
      },
      {
        answer: "São Paulo",
        correct: false,
      },
    ],
  },
  {
    question: "Qual time possui mais títulos?",
    answers: [
      {
        answer: "Flamengo",
        correct: false,
      },
      {
        answer: "Santos",
        correct: false,
      },
      {
        answer: "São Paulo",
        correct: false,
      },
      {
        answer: "Palmeiras",
        correct: true,
      },
    ],
  },
  {
    question: "Quem é o maior artilheiro na era dos mata-mata?",
    answers: [
      {
        answer: "Zico",
        correct: false,
      },
      {
        answer: "Roberto Dinamite",
        correct: true,
      },
      {
        answer: "Romário",
        correct: false,
      },
      {
        answer: "Pelé",
        correct: false,
      },
    ],
  },
  {
    question: "Quem é o maior artilheiro na era dos pontos corridos?",
    answers: [
      {
        answer: "Luis Fabiano",
        correct: false,
      },
      {
        answer: "Gabigol",
        correct: false,
      },
      {
        answer: "Fred",
        correct: true,
      },
      {
        answer: "Diego Souza",
        correct: false,
      },
    ],
  },
  {
    question: "Qual time fez mais pontos na história?",
    answers: [
      {
        answer: "Internacional",
        correct: false,
      },
      {
        answer: "Corinthians",
        correct: false,
      },
      {
        answer: "São Paulo",
        correct: true,
      },
      {
        answer: "Flamengo",
        correct: false,
      },
    ],
  },
  {
    question: "Qual time fez mais pontos em uma única ediçao?",
    answers: [
      {
        answer: "Palmeiras",
        correct: false,
      },
      {
        answer: "Flamengo",
        correct: true,
      },
      {
        answer: "São Paulo",
        correct: false,
      },
      {
        answer: "Internacional",
        correct: false,
      },
    ],
  },
  {
    question:
      "Qual time foi mais vezes rebaixado? (Está empatado com outros times, com o mesmo número de rebaixamentos)",
    answers: [
      {
        answer: "Améria-MG",
        correct: true,
      },
      {
        answer: "Vasco",
        correct: false,
      },
      {
        answer: "Santa Cruz",
        correct: false,
      },
      {
        answer: "Avaí",
        correct: false,
      },
    ],
  },
  {
    question: "Qual time que mais sofreu goleadas?",
    answers: [
      {
        answer: "Juventude",
        correct: false,
      },
      {
        answer: "Athletico-PR",
        correct: false,
      },
      {
        answer: "Goiás",
        correct: false,
      },
      {
        answer: "Vasco",
        correct: true,
      },
    ],
  },
  {
    question: "Qual time possui a maior torcida?",
    answers: [
      {
        answer: "Corinthians",
        correct: false,
      },
      {
        answer: "Flamengo",
        correct: true,
      },
      {
        answer: "Botafogo",
        correct: false,
      },
      {
        answer: "Fluminense",
        correct: false,
      },
    ],
  },
  {
    question: "Qual time é mundialmente conhecido por NÃO ter mundial?",
    answers: [
      {
        answer: "São Paulo",
        correct: false,
      },
      {
        answer: "Flamengo",
        correct: false,
      },
      {
        answer: "Palmeiras",
        correct: true,
      },
      {
        answer: "Santos",
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
