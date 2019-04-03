


// creating my questions and saving it to a variable called Myquestions
var myQuestions = [
    {
        question: "What is Gus' Super Power?",
        answers: ["His sweet jazzy voice", "Financial stability", "Super Sniffer", "Pyschic"],
        correct: 'Super Sniffer',
        images: "assets/images/super_sniffer.gif"
    },
    {
        question: "What does Gus do for a living?",
        answers: ["Professional Tap dancer", "Pluto Activist", "lead psychic detective in a hit show", "Pharmaceutical Rep"],
        correct: 'Pharmaceutical Rep',
        images: "assets/images/jazzHands.gif"
    },
    {
        question: "What is the fruit that is feautured in very episode?",
        answers: ["Melon", "Banana", "Guava", "Pineapple"],
        correct: 'Pineapple',
        images: "assets/images/Shawn_Pineapple.gif"
    },
    {
        question: "In what season does Shawn and O'hara begin to date?",
        answers: ["8", "1", "3", "5"],
        correct: '5',
        images: "assets/images/Ohara.gif"
    },
    {
        question: "What blood type is Lassiter?",
        answers: ["A-", "O+", "A+", "O-"],
        correct: 'O-',
        images: "assets/images/lassiter.gif"
    },
    {
        question: "What is one of Gus' most popular nicknames",
        answers: ["Whipper Snipper", "Toe's of Steel", "Jazzy Jeff", "Magic Head"],
        correct: 'Magic Head',
        images: "assets/images/magic_head.gif"
    }




];
var card = $("#quiz-area");
var timer;
var startCount = 30;
var intervalId;
var clockRunning = false;
var game = {

    myQuestions: myQuestions,
    currentQuestion: 0,
    counter: startCount,
    correct: 0,
    incorrect: 0,

    countDown: function () {
        game.counter--;
        console.log("BEGIN COUNTDOWN")
        $("#time-remaining").text(game.counter);
        if (game.counter === 0) {
            clearInterval(intervalId);
            clockRunning= false;
            console.log("STOP, You've Run Out of Time");
            game.timeUp();
        }
    },
    loadQuestion: function () {
        intervalId = setInterval(game.countDown, 1000);
        card.html("<h2>" + myQuestions[this.currentQuestion].question + "</h2>");
        console.log(myQuestions[this.currentQuestion].answers);
        for (var i = 0; i < myQuestions[this.currentQuestion].answers.length; i++) {
            card.append("<br><button class='btn btn-primary btn-lg btn-block' type='button' id='answer-button' data-name='" + myQuestions[this.currentQuestion].answers[i] + "'>" + myQuestions[this.currentQuestion].answers[i] + "</button><br>");

        }

    },
    nextQuestion: function () {
        clearInterval(intervalId);
        $("#time-remaining").html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
    },

    timeUp: function () {
        clearInterval(timer, 1000);
        $("#time-remaining").html(game.counter);
        card.html("<h2> Your Time Here Has Ended! </h2>");
        card.append("<h3> What You Wanted To Put Was:" + myQuestions[this.currentQuestion].correct);
        card.append("<img src='" + myQuestions[this.currentQuestion].images + "' />");

        if (game.currentQuestion === myQuestions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        }
        else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },

    results: function () {
        clearInterval(timer, 1000);
        card.append(game.counter);
        card.html("<h2> All Done, Here is the true proof of your PSYCH-O-NESS </h2>");
        card.append("<h3>Correct Answers: " + game.correct + "</h3>");
        card.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
        card.append("<h3>Unanswered: " + (myQuestions.length - (game.incorrect + game.correct)) + "</h3>");
        card.append("<br><button id='start-over'>Start Over?</button>");
        if (game.correct > 5) {
            card.append("<h3>Jazz Hands For You mY True Psych-O!!!</h3>");
            card.append("<br><img src='assets/images/jazzHands.gif' alt='jazzhands'>");

        } else {
            card.append("<h3>You Made Gus Sad With Your Lack Of Knowledge</h3>");
            card.append("<br><img src='assets/images/gus_sad.gif' alt='jazzhands'>");
        }




    },

    clicked: function (e) {
        clearInterval(intervalId);
        if ($(e.target).attr("data-name") === myQuestions[this.currentQuestion].correct) {
            this.isCorrect();
        }
        else {
            this.isWrong();
        }
    },

    isCorrect: function () {
        clearInterval(intervalId);
        game.correct++;
        card.html("<h2> Correct!</h2>");
        card.append("<img src='" + myQuestions[game.currentQuestion].images + "'/>");
        if (game.currentQuestion === myQuestions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        }
        else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    isWrong: function () {
        game.incorrect++;
        clearInterval(intervalId);
        card.html("<h2> Wrong!</h2>");
        card.append("<h3> Correct Answer was : " + myQuestions[game.currentQuestion].correct + "</h3>");
        card.append("<img src ='" + myQuestions[game.currentQuestion].images + "'/>");
        if (game.currentQuestion === myQuestions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        }
        else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    reset: function () {
        this.currentQuestion = 0;
        this.counter = 30;
        this.correct = 0;
        this.incorrect = 0;
        this.loadQuestion();
    }
};
$(document).on("click", "#start-over", function () {
    game.reset();
});

$(document).on("click", "#answer-button", function (e) {
    game.clicked(e);
});

$(document).on("click", "#start-button", function () {
    console.log(game.counter);
    $('#time-remaining').text(game.counter);
    game.loadQuestion();
});



