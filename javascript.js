let currentQuizIndex = 0;
let answersLists = [];
var marks = 0;

async function loadData() {
    const response = await fetch("https://raw.githubusercontent.com/ATPaing/web_contest_data_JSON/main/web_contest.json");
    return response.json();
  }

function loadNextQuiz(){
    calculateResult(answersLists);
    console.log("data type: "+ typeof answersLists[0])
    console.log("marks "+ marks);
    // console.log("current quiz index" + currentQuizIndex);
    currentQuizIndex ++;
    if(currentQuizIndex > 2){
        changeResultPage();
    }
    loadQuiz();
}

function restartQuiz(){
    currentQuizIndex = 0;
    loadNextQuiz();
}

async function loadQuiz() {
    try {
    
      const jsonData = await loadData();
      const questionDiv = document.getElementById('question');
      const progressBars = document.querySelectorAll('.progressMiniBar');

      progressBars.forEach(bar=>{
        bar.classList.remove('bgBlack', 'bgWhite');
        bar.classList.add('bgWhite');
      })

      const answer1Label = document.querySelector('label[for="answer-1"]');
      const answer2Label = document.querySelector('label[for="answer-2"]');
      const answer3Label = document.querySelector('label[for="answer-3"]');
      const answer4Label = document.querySelector('label[for="answer-4"]');

      const currentQuiz = jsonData.blogs[0].quizes[currentQuizIndex];

      progressBars[currentQuizIndex].classList.remove('bgWhite');
      progressBars[currentQuizIndex].classList.add('bgBlack');
 
      questionDiv.innerHTML = `<h1>${currentQuiz.question}</h1>`;
      const answers = [currentQuiz.answer_one.isTrueAnswer, currentQuiz.answer_two.isTrueAnswer, currentQuiz.answer_three.isTrueAnswer, currentQuiz.answer_four.isTrueAnswer];
    //   checkResult(answers);
        answersLists = [];  
        answersLists.push(...answers);

      answer1Label.innerHTML = currentQuiz.answer_one.answer;
      answer2Label.innerHTML = currentQuiz.answer_two.answer;
      answer3Label.innerHTML = currentQuiz.answer_three.answer;
      answer4Label.innerHTML = currentQuiz.answer_four.answer;

    } catch (e) {
      console.log('ERROR');
      console.log(e);
    }
}

  function startQuiz(){
    var quizArea = document.getElementById('quizArea');
    var startArea = document.getElementById('startArea');
    var buttonArea = document.getElementById('buttonArea');

    quizArea.style.display = quizArea.style.display === 'none' ? 'block': 'none';
    startArea.style.display = startArea.style.display === 'none' ? 'block': 'none';
    buttonArea.style.display = buttonArea.style.display === 'none' ? 'block' : 'none';

    loadQuiz();
}  

function changeResultPage(){
    var questionDiv = document.getElementById('questionAndAnswer');
    var resultDiv = document.getElementById('result');
    var nextButton = document.getElementById('nextButton');

    questionDiv.style.display = questionDiv.style.display === 'none' ? 'block': 'none';
    resultDiv.style.display = resultDiv.style.display === 'none' ? 'block': 'none';
    nextButton.style.display = nextButton.style.display === 'none' ? 'block': 'none';

    var description = document.getElementById('description');
    var marksResult = document.getElementById('marksResult');
    marksResult.innerHTML = `${marks} out of  3 questions correct!`;

    if(marks === 3){
        description.innerHTML = "Fish Expert";
    }else if(marks ===2 || marks === 1) {
        description.innerHTML = "You got it good!";
    }else{
        description.innerHTML = `<h2>Fish Nomie</h2>`;
    }
}

// function getCurrentQuizAnswers(currentQuiz) {
//     // Extract and return the answers array from the current quiz
//     return [currentQuiz.answer_one.isTrueAnswer, currentQuiz.answer_two.isTrueAnswer, currentQuiz.answer_three.isTrueAnswer, currentQuiz.answer_four.isTrueAnswer];
// }

// function checkResult(array) {
//     var value;
//     var marks = 0;
//     var ans = document.getElementsByName('quizAns');

//     for (i = 0; i < ans.length; i++) {
//         if (ans[i].checked){

//             for(j = 0; j < array.length; j++){
//                 if(array[j] == true){
//                     console.log("Correct Ans" + j);
//                     value = j
//                 }
//             }
//             console.log(ans[i].value);
//             if(ans[i].value == value){
//                 marks = marks + 1; 
//             } else{
//                 marks = marks + 0;
//                 break;
//             }
//         }
//     }
//     console.log("Current Mark" + marks);
    
// }

function calculateResult(answers){
    var number;
    try{
        if (document.getElementById('answer-1').checked) {
            console.log("answer-1 is checked");
            number = 0;
          }
        else if(document.getElementById('answer-2').checked){
            console.log("answer-2 is checked");
            number = 1;
        }
        else if(document.getElementById('answer-3').checked){
            console.log("answer 3 is checked");
            number = 2;

        }
        else{
            console.log("answer-4 is checked");
            number = 3;
        }

        for(var i = 0; i < answers.length; i ++){
            console.log("i am in looping");
            if(answers[i] == true){
                if(i == number){
                    marks = marks + 1;
                }else{
                    marks = marks + 0;
                }
            }
        }

        console.log("answers " + answers);
    } catch(e){
 
    }
}


