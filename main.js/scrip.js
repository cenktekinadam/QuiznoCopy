const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz');
const quizBox = document.querySelector('.quiz__box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');
const border = document.querySelector('.border');
const changeQuizBox =document.querySelector('.quiz');  

startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
}
exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}

continueBtn.onclick = () => {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');
    showQuestions(0);
    questionCounter(1);
    headerScore();
}

tryAgainBtn.onclick = () => {
    quizBox.classList.add('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');


    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);
    headerScore();
}
goHomeBtn.onclick = () => {
    quizSection.classList.remove('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');


    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
}
let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

const nextBtn = document.querySelector('.next-btn');

nextBtn.onclick = () => {
    if (questionCount < questions.length - 1) {
        questionCount++;
        showQuestions(questionCount);
        questionNumb++;
        questionCounter(questionNumb);
        nextBtn.classList.remove('active');
    }
    else {
        console.log("Sorular Bİtti")
        showResultBox();
    }

}

const optionList = document.querySelector('.question__option');


//Getting Qeuestions and options from array 
function showQuestions(index) {
    const questionText = document.querySelector('.question__text');
    questionText.textContent = `${questions[index].numb}.${questions[index].question}`;
    let optionTag = `<div class="question__option-choice"><span>${questions[index].options[0]}</span> </div>
   <div class="question__option-choice">  <span>${questions[index].options[1]}</span> </div>
    <div class="question__option-choice"> <span>${questions[index].options[2]}</span> </div>
    <div class="question__option-choice"> <span>${questions[index].options[3]}</span> </div>`;
    optionList.innerHTML = optionTag;
    const option = document.querySelectorAll('.question__option-choice');


    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick', 'optionSelected(this)');
    }

}
// FOr Selected Answer options
function optionSelected(answer) {
    let correctAnswer = questions[questionCount].answer;
    let userAnswer = answer.textContent.trim();
    let allOptions = optionList.children.length;
    //Here for add classNAme in Css
    if (userAnswer == correctAnswer) {
        answer.classList.add('correct');
        userScore += 1;
        headerScore();
    }
    else {
        answer.classList.add('incorrect');
        //if answer is Wrong,auto selected correct answer
        for (let i = 0; i < allOptions; i++) {
            if (optionList.children[i].textContent.trim() == correctAnswer) {

                optionList.children[i].setAttribute('class', 'question__option-choice correct');
            }
        }
    }
    // if user has selected Disabled all options
    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add('disabled');
    }
    nextBtn.classList.add('active');
}
function questionCounter(index) {

    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} Questionsss`
}
function headerScore() {
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length} `
}
function showResultBox() {
    quizBox.classList.remove('active')
    resultBox.classList.add('active')

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`;
    const circularProgresss = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue = -1;
    let progressEndValue = (userScore / questions.length) * 100;
    let speed = 20;

    let progress = setInterval(() => {
        progressStartValue++;

        progressValue.textContent = `${progressStartValue}%`
        circularProgresss.style.background = `conic-gradient(#c40094 ${progressStartValue * 3.6}deg, rgba(255, 255, 255, .1) 0deg)`;


        if (progressStartValue == progressEndValue) {
            clearInterval(progress);
        }
    }, speed);
}
/// İncele
var countdown; // Geri sayım için değişken
var originalHTML = quizSection; // Önceki içeriği saklamak için bir değişken

// Mouse div üzerine geldiğinde başlat
changeQuizBox.addEventListener("mouseleave", function () {
    console.log("Adım 1 Çıkış Yaptı")
    // alert("Mouse div üzerinden çıkıldı!"); // Uyarı göster 

    // Eğer daha önce başlatılmış bir geri sayım varsa, iptal et
    if (countdown) {
        clearTimeout(countdown);
    }

    // Önceki içeriği sakla
    originalHTML = changeQuizBox.innerHTML;

    // Geri sayım fonksiyonunu başlat
    countdown = startCountdown();
});

// Geri sayım fonksiyonu
function startCountdown() {
    var seconds = 10; // Geri sayım süresi (saniye)

    function updateCountdown() {
        changeQuizBox.innerHTML = "Yan Sekmeye Gidemezsin Son " + seconds + " saniye <br> Aksi Takdirde Sınavın İptal olacak ";

        // Geri sayımı 1 saniye azalt
        seconds--;

        // Mouse div üzerine gelindiğinde eski haline dön
        changeQuizBox.addEventListener("mouseenter", function () {
            console.log("Mouse Div'e Geldi. Geri Sayım İptal Edildi.");
            changeQuizBox.innerHTML = originalHTML;

            // Eğer daha önce başlatılmış bir geri sayım varsa, iptal et
            if (countdown) {
                clearTimeout(countdown);
            }
        });

        // Geri sayım sıfıra ulaştığında anasayfaya yönlendir
        if (seconds < 0) {
            alert("Sınavın İptal Oldu")
          window.location.href = "https://udemig.com/"; // Anasayfanın URL'si 
        } else {
            // Geriye sayıyor
            countdown = setTimeout(updateCountdown, 1000); 
            console.log("Geri Sayıyor");
        }
    }

    // İlk çağrıyı yap
    updateCountdown();

    // Timeout ID'sini döndür
    return countdown;
}