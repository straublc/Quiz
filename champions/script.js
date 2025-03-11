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
    question: "Quem foi o primeiro time a ganhar?",
    answers: [
      {
        answer: "Barcelona",
        correct: false,
      },
      {
        answer: "Milan",
        correct: false,
      },
      {
        answer: "Real Madrid",
        correct: true,
      },
      {
        answer: "Liverpool",
        correct: false,
      },
    ],
  },
  {
    question: "Quem é o maior vencedor?",
    answers: [
      {
        answer: "Milan",
        correct: false,
      },
      {
        answer: "Real Madrid",
        correct: true,
      },
      {
        answer: "Bayern de Munique",
        correct: false,
      },
      {
        answer: "Liverpool",
        correct: false,
      },
    ],
  },
  {
    question: "Quem é o maior artilheiro?",
    answers: [
      {
        answer: "Lionel Messi",
        correct: false,
      },
      {
        answer: "Luis Suárez",
        correct: false,
      },
      {
        answer: "Neymar",
        correct: false,
      },
      {
        answer: "Cristiano Ronaldo",
        correct: true,
      },
    ],
  },
  {
    question: "Quem tem gol em final?",
    answers: [
      {
        answer: "Casemiro",
        correct: true,
      },
      {
        answer: "Ronaldo Fenômeno",
        correct: false,
      },
      {
        answer: "Zlatan Ibrahimović",
        correct: false,
      },
      {
        answer: "Xavi",
        correct: false,
      },
    ],
  },
  {
    question: "Qual estádio recebeu mais finais?",
    answers: [
      {
        answer: "Heysel",
        correct: false,
      },
      {
        answer: "Wembley",
        correct: true,
      },
      {
        answer: "San Siro",
        correct: false,
      },
      {
        answer: "Santiago Bernabéu",
        correct: false,
      },
    ],
  },
  {
    question: "Qual clube que mais sofreu gols na história?",
    answers: [
      {
        answer: "Dynamo Kyiv",
        correct: false,
      },
      {
        answer: "Real Mdrid",
        correct: true,
      },
      {
        answer: "Bayern de Munich",
        correct: false,
      },
      {
        answer: "Ajax",
        correct: false,
      },
    ],
  },
  {
    question: "Quem possui mias assistências?",
    answers: [
      {
        answer: "Lionel Messi",
        correct: false,
      },
      {
        answer: "Neymar",
        correct: false,
      },
      {
        answer: "Cristiano Ronaldo",
        correct: true,
      },
      {
        answer: "Xavi",
        correct: false,
      },
    ],
  },
  {
    question: "Qual técnico que mais vezes ganhou?",
    answers: [
      {
        answer: "Alex Ferguson",
        correct: false,
      },
      {
        answer: "Zidane",
        correct: false,
      },
      {
        answer: "Pep Guardiola",
        correct: false,
      },
      {
        answer: "Carlo Ancelotti",
        correct: true,
      },
    ],
  },
  {
    question: "Quem é maior vice?",
    answers: [
      {
        answer: "Bayern de Munique",
        correct: false,
      },
      {
        answer: "Juventus",
        correct: true,
      },
      {
        answer: "Benfica",
        correct: false,
      },
      {
        answer: "Milan",
        correct: false,
      },
    ],
  },
  {
    question: "Quem possui mais títulos?",
    answers: [
      {
        answer: "Toni Kross",
        correct: true,
      },
      {
        answer: "Barcelona",
        correct: false,
      },
      {
        answer: "Manchester City",
        correct: false,
      },
      {
        answer: "Atlético de Madrid",
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
