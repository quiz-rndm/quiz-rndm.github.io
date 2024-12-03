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
const nextBtn = document.querySelector('.next-btn');
const optionList = document.querySelector('.option-list');

let shuffledQuestions = []; // Menyimpan urutan soal yang diacak
let questionCount = 0;
let questionNumb = 1; // Nomor soal mulai dari 1
let userScore = 0;

// Event listener untuk tombol start
startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
}

// Event listener untuk tombol exit
exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}

// Event listener untuk tombol continue
continueBtn.onclick = () => {
    shuffledQuestions = shuffleArray([...questions]); // Acak soal dan simpan urutan
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');

    showQuestions(0); // Tampilkan soal pertama
    questionCounter(1); // Tampilkan nomor soal pertama dimulai dari 1
    headerScore(); // Update skor di header
}

// Event listener untuk tombol try again
tryAgainBtn.onclick = () => {
    quizBox.classList.add('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

    questionCount = 0;
    questionNumb = 1; // Mulai dari soal 1
    userScore = 0;

    shuffledQuestions = shuffleArray([...questions]); // Acak soal lagi

    showQuestions(questionCount);
    questionCounter(questionNumb);
    headerScore();
}

// Event listener untuk tombol go home
goHomeBtn.onclick = () => {
    quizSection.classList.remove('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

    questionCount = 0;
    questionNumb = 1; // Mulai dari soal 1
    userScore = 0;

    shuffledQuestions = shuffleArray([...questions]); // Acak soal lagi

    showQuestions(questionCount);
    questionCounter(questionNumb);
    headerScore();
}

// Event listener untuk tombol next
nextBtn.onclick = () => {
    if (questionCount < shuffledQuestions.length - 1) {
        questionCount++;
        showQuestions(questionCount);
        questionNumb++;
        questionCounter(questionNumb);
        nextBtn.classList.remove('active');
    } else {
        showResultBox(); // Jika soal habis, tampilkan hasil
    }
}

// Fungsi untuk mengacak array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Tukar elemen
    }
    return array;
}

// Menampilkan soal dan opsi
function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
    const question = shuffledQuestions[index]; // Mengambil soal yang sudah diacak

    // Menampilkan nomor soal dan soal
    questionText.textContent = `${index + 1}. ${question.question}`;

    // Salin opsi dan acak
    let options = [...question.options];
    shuffleArray(options);

    // Buat opsi dengan label tetap (A, B, C, D)
    const labels = ['A', 'B', 'C', 'D'];
    let optionTag = options.map((option, i) =>
        `<div class="option"><span>${labels[i]}. ${option}</span></div>`
    ).join('');
    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll('.option');
    option.forEach((opt, i) => {
        opt.setAttribute('onclick', 'optionSelected(this)');
    });
}

// Menangani pilihan jawaban
function optionSelected(answer) {
    let userAnswer = answer.textContent.slice(3); // Mengambil teks jawaban tanpa label
    let correctAnswer = shuffledQuestions[questionCount].answer;

    let allOptions = optionList.children.length;

    if (userAnswer === correctAnswer) {
        answer.classList.add('correct');
        userScore += 1;
        headerScore();
    } else {
        answer.classList.add('incorrect');
        // Auto koreksi jawaban benar
        for (let i = 0; i < allOptions; i++) {
            if (optionList.children[i].textContent.slice(3) === correctAnswer) {
               // optionList.children[i].setAttribute('class', 'option correct');
            }
        }
    }

    // Nonaktifkan opsi lain
    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add('disabled');
    }

    nextBtn.classList.add('active');
}

// Fungsi untuk menampilkan nomor soal
function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} dari ${shuffledQuestions.length} Pertanyaan`;
}

// Update skor di header
function headerScore() {
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${shuffledQuestions.length}`;
}

// Menampilkan hasil akhir
function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

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

// Cegah salin teks di halaman
document.addEventListener('copy', function(e) {
    e.preventDefault(); // Mencegah tindakan salin
    alert("Salin teks tidak diizinkan.");
});
