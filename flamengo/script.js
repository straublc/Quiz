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
    question: "Em qual ano o clube foi fundado?",
    answers: [
      {
        answer: "1975",
        correct: false,
      },
      {
        answer: "1985",
        correct: true,
      },
      {
        answer: "1983",
        correct: false,
      },
      {
        answer: "1973",
        correct: false,
      },
    ],
  },
  {
    question:
      "Contra quem o Flamengo disputou a final da Libertadores de 1981?",
    answers: [
      {
        answer: "Atlético-MG",
        correct: false,
      },
      {
        answer: "Olímpia",
        correct: false,
      },
      {
        answer: "Cerro Porteño",
        correct: false,
      },
      {
        answer: "Cobreloa",
        correct: true,
      },
    ],
  },
  {
    question: "Qual foi o placar da final do mundial de 1981?",
    answers: [
      {
        answer: "0 x 2",
        correct: false,
      },
      {
        answer: "1 x 3",
        correct: false,
      },
      {
        answer: "3 x 0",
        correct: true,
      },
      {
        answer: "2 x 1",
        correct: false,
      },
    ],
  },
  {
    question: "Em que ano o clube foi campeão da Mercosul?",
    answers: [
      {
        answer: "1999",
        correct: true,
      },
      {
        answer: "1982",
        correct: false,
      },
      {
        answer: "1996",
        correct: false,
      },
      {
        answer: "2000",
        correct: false,
      },
    ],
  },
  {
    question: "O Flamengo foi campeão do campenato brasileiro em quais anos?",
    answers: [
      {
        answer: "1980, 1981, 1982, 1983",
        correct: false,
      },
      {
        answer: "1980, 1982, 1983, 1987",
        correct: true,
      },
      {
        answer: "1981, 1987, 2009, 2019",
        correct: false,
      },
      {
        answer: "1983, 1992, 2003, 2020",
        correct: false,
      },
    ],
  },
  {
    question:
      "Com quantos pontos o Flamengo foi campeão do brasileirão em 2009?",
    answers: [
      {
        answer: "83",
        correct: false,
      },
      {
        answer: "72",
        correct: false,
      },
      {
        answer: "67",
        correct: true,
      },
      {
        answer: "71",
        correct: false,
      },
    ],
  },
  {
    question: "Em quais anos o Flamengo foi campeão da Copa do Brasil?",
    answers: [
      {
        answer: "1990, 2004, 2017, 2022",
        correct: false,
      },
      {
        answer: "1992, 2006, 2017, 2021",
        correct: false,
      },
      {
        answer: "1992, 2004, 2013, 2022",
        correct: false,
      },
      {
        answer: "1990, 2006, 2013, 2022",
        correct: true,
      },
    ],
  },
  {
    question: "Quem foi vice do Flamengo na final da Copa do Brasil 2006?",
    answers: [
      {
        answer: "Atlético-MG",
        correct: false,
      },
      {
        answer: "Atlético Paranaense",
        correct: false,
      },
      {
        answer: "São Paulo",
        correct: false,
      },
      {
        answer: "Vasco",
        correct: true,
      },
    ],
  },
  {
    question:
      "Com quantos pontos o Flamengo venceu o campeonato brasileiro de 2019?",
    answers: [
      {
        answer: "90",
        correct: true,
      },
      {
        answer: "92",
        correct: false,
      },
      {
        answer: "89",
        correct: false,
      },
      {
        answer: "95",
        correct: false,
      },
    ],
  },
  {
    question: "E no Rio não tem outro igual, só o Flamengo é...?",
    answers: [
      {
        answer: "Campeão da Libertadores",
        correct: false,
      },
      {
        answer: "Campeão Mundial",
        correct: true,
      },
      {
        answer: "Campeão da Copa do Brasil",
        correct: false,
      },
      {
        answer: "Campeão do Campeonato Carioca",
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
