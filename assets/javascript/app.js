var card = $("#quiz-area");
var startCount = 30;


// creating my questions and saving it to a variable called Myquestions
var myQuestions = [
    {
        question: "What is Gus' Super Power?",
        answers: [ "His sweet jazzy voice", "Financial stability","Super Sniffer", "Pyschic"],
        correct: 'Super Sniffer',
        images: "assets/images/super_sniffer.gif"
    },
    {
        question: "What does Gus do for a living?",
        answers: {
            a: "Professional Tap dancer",
            b: "Pluto Activist",
            c: "lead psychic detective in a hit show",
            d: "Pharmaceutical Rep",
        },
        correct: 'd',
    }



];

var timer;

var game = {
    myQuestions: myQuestions,
    currentQuestion: 0,
    counter: startCount,
    correct: 0,
    incorrect: 0,

    countDown : function (){
        game.counter--;
        $("#time-remaining").text(game.counter);
        if (game.counter === 0) {
            console.log("STOP, You've Run Out of Time");
            game.timeUp();
        }
    },
    loadQuestion: function() {
        timer = setInterval(game.countdown,1000);
        $("#displayQuestion").html("<h2>" + myQuestions[this.currentQuestion].question + "</h2>");
        console.log(myQuestions[this.currentQuestion].answers);
        for (var i = 0; i < myQuestions[this.currentQuestion].answers.length; i++) {
            $("#answers").append("<button class='answer-button' id='button' data-name='" + myQuestions[this.currentQuestion].answers[i] + ">" + myQuestions[this.currentQuestion].answers[i]+ "</button>");
        }

    },
    nextQuestion: function(){
        game.counter = startCount;
        $("#time-remaining").text(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
    },

    timeUp: function(){
        clearInterval(timer);
        $("#time-remaining").html(game.counter);
        card.html("<h2> Your Time Here Has Ended! </h2>");
        card.append("<h3> What You Wanted To Put Was:" + myQuestions[this.currentQuestion].correctAnswer);
        card.append("<img src='" + myQuestions[this.currentQuestion].image +"' />" );
        
        if(game.currentQuestion === myQuestions.length - 1){
            setTimeout(game.results, 3 * 1000);
        }
        else{
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },

    results: function() {
        clearInterval(timer);
        card.html("<h2> All Done, Here is the true proof of your PSYCH-O-NESS </h2>");

        $("#time-remaining").text(game.counter);
        $("#correct").append("<h3>Correct Answers: " + game.correct + "</h3>");
        $("#wrong").append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
        $("#un-answered").append("<h3>Unanswered: " + (questions.length - (game.incorrect + game.correct)) + "</h3>");
        $("#start-over").append("<br><button id='start-over'>Start Over?</button>");
    },

    clicked: function(e) {
        clearInterval(timer);
        if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer){
            this.isCorrect();
        }
        else{
            this.isWrong();
        }
    },

    isCorrect : function() {
        clearInterval(timer);
        game.correct++ ;
        card.html("<h2> Correct!</h2>");
        card.append("<img src = '" + myQuestions[game.currentQuestion].image + " ' />");
        if (game.currentQuestion === questions.length -1 ) {
            setTimeout(game.results, 3 * 1000);
        }
        else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    isWrong : function() {
        game.incorrect++ ; 
        clearInterval(timer);
        card.html("<h2> Wrong!</h2>");
        card.append("<h3> Correct Answer was : " + myQuestions[game.currentQuestion].correctAnswer + "</h3>");
        card.append("<img src = '" + myQuestions[game.currentQuestion].image + " ' />");
        if (game.currentQuestion === questions.length -1 ) {
            setTimeout(game.results, 3 * 1000);
        }
        else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    reset: function() {
        this.currentQuestion = 0;
        this.counter = startCount;
        this.correct = 0;
        this.incorrect = 0;
        this.loadQuestion();
      }
};
$(document).on("click", "#start-over", function() {
    game.reset();
  });
  
  $(document).on("click", ".answer-button", function(e) {
    game.clicked(e);
  });
  
  $(document).on("click", "#start-button", function() {
    console.log(game.counter);
    $('#time-remaining').text(game.counter);
    game.loadQuestion();
  });



