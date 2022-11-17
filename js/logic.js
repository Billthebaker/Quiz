// time and question variables
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;
//DOM element variables
var timerEl = document.getElementById('time');
var btnstart = document.getElementById('start');
var btnSubmit = document.getElementById('submit');
var choicesEl = document.getElementById('choices');
var questionEl = document.getElementById('questions');
var feedbackEl = document.getElementById('feedback');
var nameEl = document.getElementById('playerName');