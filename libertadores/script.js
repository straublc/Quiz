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
    question: "Qual foi o primeiro campeão?",
    answers: [
      {
        answer: "River Plate",
        correct: false,
      },
      {
        answer: "Peñarol",
        correct: true,
      },
      {
        answer: "Boca Juniors",
        correct: false,
      },
      {
        answer: "Independiente",
        correct: false,
      },
    ],
  },
  {
    question: "Qual clube brasileiro foi o primeiro campeão?",
    answers: [
      {
        answer: "Flamengo",
        correct: false,
      },
      {
        answer: "Grêmio",
        correct: false,
      },
      {
        answer: "São Paulo",
        correct: false,
      },
      {
        answer: "Santos",
        correct: true,
      },
    ],
  },
  {
    question: "Qual clube brasileiro que mais vezes participou?",
    answers: [
      {
        answer: "Santos",
        correct: false,
      },
      {
        answer: "Palmeiras",
        correct: true,
      },
      {
        answer: "Grêmio",
        correct: false,
      },
      {
        answer: "São Paulo",
        correct: false,
      },
    ],
  },
  {
    question: "Qual clube é o maior campeão?",
    answers: [
      {
        answer: "Boca juniorns",
        correct: false,
      },
      {
        answer: "Peñarol",
        correct: false,
      },
      {
        answer: "Independiente",
        correct: true,
      },
      {
        answer: "River Plate",
        correct: false,
      },
    ],
  },
  {
    question: "Qual é o maior artilheiro da história?",
    answers: [
      {
        answer: "Gabigol",
        correct: false,
      },
      {
        answer: "Zico",
        correct: false,
      },
      {
        answer: "Alberto Spencer",
        correct: true,
      },
      {
        answer: "Fernando Morena",
        correct: false,
      },
    ],
  },
  {
    question: "Qual clube que mais vezes chegou em finais?",
    answers: [
      {
        answer: "Independiente",
        correct: false,
      },
      {
        answer: "Boca juniors",
        correct: true,
      },
      {
        answer: "River Plate",
        correct: false,
      },
      {
        answer: "Peñarol",
        correct: false,
      },
    ],
  },
  {
    question: "Qual clube que possui mais vices?",
    answers: [
      {
        answer: "Boca Juniors",
        correct: true,
      },
      {
        answer: "Independiente",
        correct: false,
      },
      {
        answer: "Peñarol",
        correct: false,
      },
      {
        answer: "River Plate",
        correct: false,
      },
    ],
  },
  {
    question: "Qual estádio recebeu mais finais?",
    answers: [
      {
        answer: "Morumbi",
        correct: false,
      },
      {
        answer: "Estádio Centenário",
        correct: false,
      },
      {
        answer: "La Bombonera",
        correct: false,
      },
      {
        answer: "Estádio Nacional de Chile",
        correct: true,
      },
    ],
  },
  {
    question: "Qual clube possui apenas 2 Libertadores? (Não é o único)",
    answers: [
      {
        answer: "Grêmio",
        correct: false,
      },
      {
        answer: "Atlético-MG",
        correct: false,
      },
      {
        answer: "Cruzeiro",
        correct: true,
      },
      {
        answer: "Palmeiras",
        correct: false,
      },
    ],
  },
  {
    question: "Quantos anos o Vasco não ganha uma Libertadores?",
    answers: [
      {
        answer: "10 anos",
        correct: false,
      },
      {
        answer: "25 anos",
        correct: true,
      },
      {
        answer: "15 anos",
        correct: false,
      },
      {
        answer: "Nunca ganhou",
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
