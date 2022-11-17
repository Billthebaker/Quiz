// time and question variables
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;
//DOM element variables
var timerEl = document.getElementById('time');
var btnStart = document.getElementById('start');
var btnSubmit = document.getElementById('submit');
var choicesEl = document.getElementById('choices');
var questionEl = document.getElementById('questions');
var feedbackEl = document.getElementById('feedback');
var nameEl = document.getElementById('playerName');
var sfxCorrect = new Audio('sfx/correct.mp3');
var sfxWrong = new Audio('sfx/wrong.mp3');

//Quiz start function
function startQuiz() {
    var beginScreenEl = document.getElementById('start-screen');
    beginScreenEl.setAttribute('class', 'hide');
    questionEl.removeAttribute('hide'); // come back to this one 
    timerId = setInterval(countDown, 1000);
    timerEl.textContent = time;
    getQuestion();


}
//Timer Function
function countDown() {
    time--;
    timerEl.textContent = time;

    if(time <=0){
        quizEnd();
    }
}
// pull question function
function getQuestion() {
var currentQuestion = questions[currentQuestionIndex]
var titleEl = document.getElementById('questions-title');
titleEl.textContent = currentQuestion.title;

choicesEl.innerHTML = '';

for (var i = 0; i < currentQuestion.choices.length; i++){
var choice = currentQuestion.choices[i];
var choiceNode = document.createElement('button');
choiceNode.setAttribute('class','choice');
choiceNode.setAttribute('value', choice);
choiceNode.textContent = i + 1 + '. ' + choice;
choicesEl.appendChild(choiceNode);
}
}
// click event functions (sound file also)
function questionClick(event) {
    var buttonEl = event.target;
    if (!buttonEl.matches('.choice')) {
        return;
    }
    if (buttonEl.value !== questions[currentQuestionIndex].answer){
        time -= 10;

        if(time<0){
            time =0;
        }
        timerEl.textContent = time;
        sfxWrong.play();
        feedbackEl.textContent = 'Incorrect.';
    }else{
        sfxCorrect.play();
        feedbackEl.textContent = 'That is Correct!!';
    }
    feedbackEl.setAttribute('class', 'feedback');
    setTimeout(function() {
        feedbackEl.setAttribute('class', 'feedback hide');
    }, 1000);
    
    currentQuestionIndex++;

    if (time <=0 || currentQuestionIndex === questions.length){
        quizEnd();
    }else{
        getQuestion();
    }
    }
// end quiz function
    function quizEnd ();{
        clearInterval(timerId);
        var endScreenEl = document.getElementById('end-screen');
        endScreenEl.removeAttribute('class');
        var finalScore = document.getElementById('final-score');
        finalScore.textContent = time;
        questionEl.setAttribute('class', 'hide');
    }

    //high score function

    function saveHiscore() {
        var playerNames = nameEl.value.trim();
        if (playerNames !== ''){
            var hiscores = JSON.parse(window.localStorage.getItem('hiscores')) || [];
            var newScore = {
                score: time,
                playerName: playerName,
            };
            highscores.push(newScore);
    window.localStorage.setItem('highscores', JSON.stringify(highscores)); // this might give you trouble come back to it
    window.location.href = 'hi-score.html';
            
        }

    }

    function checkForEnter(event) {
        if (event.key === 'Enter') {
          saveHiscore();
        }
      }

      btnSubmit.onclick = saveHiscore;
      btnStart.onclick = startQuiz;
      choicesEl.onclick = questionClick;
      nameEl.onkeyup = checkForEnter;








