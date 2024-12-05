const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');

let shuffledQuestions = []; // Menyimpan urutan soal yang diacak
let questionCount = 0;
let questionNumb = 1; // Nomor soal mulai dari 1
let correctAnswers = []; // Array untuk menyimpan hasil jawaban

startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
};

exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
};

continueBtn.onclick = () => {
    shuffledQuestions = shuffleArray([...questions]); // Acak soal
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');
    showQuestions(0); // Tampilkan soal pertama
    questionCounter(1); // Tampilkan nomor soal pertama dimulai dari 1
    headerScore();
};

tryAgainBtn.onclick = () => {
    quizBox.classList.add('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');
    questionCount = 0;
    questionNumb = 1; // Mulai dari soal 1
    correctAnswers = []; // Reset jawaban
    shuffledQuestions = shuffleArray([...questions]); // Acak soal lagi
    showQuestions(questionCount);
    questionCounter(questionNumb);
    headerScore();
};

goHomeBtn.onclick = () => {
    quizSection.classList.remove('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');
    questionCount = 0;
    questionNumb = 1; // Mulai dari soal 1
    correctAnswers = []; // Reset jawaban
    shuffledQuestions = shuffleArray([...questions]); // Acak soal lagi
    showQuestions(questionCount);
    questionCounter(questionNumb);
    headerScore();
};

const nextBtn = document.querySelector('.next-btn');
nextBtn.onclick = () => {
    if (questionCount < shuffledQuestions.length - 1) {
        questionCount++;
        showQuestions(questionCount);
        questionNumb++;
        questionCounter(questionNumb);
        nextBtn.classList.remove('active');
    } else {
        showResultBox(); // Tampilkan hasil quiz
    }
};

const optionList = document.querySelector('.option-list');

// Fungsi untuk mengacak array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Menampilkan soal dan opsi
function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
    const question = shuffledQuestions[index]; // Mengambil soal yang sudah diacak

    questionText.textContent = `${index + 1}. ${question.question}`;

    let options = [...question.options];
    shuffleArray(options); // Acak opsi
    const labels = ['A', 'B', 'C', 'D'];
    let optionTag = options.map((option, i) =>
        `<div class="option"><span>${labels[i]}. ${option}</span></div>`
    ).join('');
    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick', 'optionSelected(this)');
    }
}

function optionSelected(answer) {
    let userAnswer = answer.textContent.slice(3); // Mengambil teks jawaban tanpa label
    let correctAnswer = shuffledQuestions[questionCount].answer;

    let allOptions = optionList.children.length;

    if (userAnswer === correctAnswer) {
        answer.classList.add('correct');
        correctAnswers.push(true); // Tambahkan hasil benar
    } else {
        answer.classList.add('incorrect');
        correctAnswers.push(false); // Tambahkan hasil salah
    }

    // Nonaktifkan opsi lain
    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add('disabled');
    }

    nextBtn.classList.add('active');
}

function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} dari ${shuffledQuestions.length} Pertanyaan`;
}

function headerScore() {
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ? / ${shuffledQuestions.length}`; // Tampilkan placeholder
}

function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    // Hitung jumlah jawaban benar
    let userScore = correctAnswers.filter(isCorrect => isCorrect).length;

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Score kamu ${userScore} dari ${shuffledQuestions.length}`;

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue = -1;
    let progressEndValue = Math.round((userScore / shuffledQuestions.length) * 100);
    let speed = 20;

    let progress = setInterval(() => {
        progressStartValue++;
        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(#c40094 ${progressStartValue * 3.6}deg, rgba(255, 255, 255, .1) 0deg)`;

        if (progressStartValue === progressEndValue) {
            clearInterval(progress);
        }
    }, speed);
                                                }
