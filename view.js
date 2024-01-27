const logo = document.getElementsByClassName('logo')[0]
const main = document.querySelector('main')
const share_left = document.getElementById('share_left')
// const content_card_img = document.getElementById('content_card_img')
const banner = document.getElementById('banner')


const radios = document.querySelectorAll('input[type="radio"]')
const question = document.getElementsByClassName('question')[0]
const answers = document.getElementsByClassName('answer')
const show_answers = document.getElementsByClassName('show_answer')
const quiz_carousel = document.getElementsByClassName('ca_quiz')

const logoHeight = logo.offsetHeight;

const id = _getTheValueFromURLSearchParam('id')

const correctSVG = `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13 0C5.85 0 0 5.85 0 13C0 20.15 5.85 26 13 26C20.15 26 26 20.15 26 13C26 5.85 20.15 0 13 0ZM10.4 19.5L3.9 13L5.733 11.167L10.4 15.821L20.267 5.954L22.1 7.8L10.4 19.5Z" fill="#1298E3"/>
                    </svg>`

const wrongSVG = ` <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M22.262 3.79302C17.1921 -1.26434 8.87229 -1.26434 3.80241 3.79302C-1.26747 8.85037 -1.26747 17.1496 3.80241 22.207C8.87229 27.2643 17.0621 27.2643 22.132 22.207C27.2018 17.1496 27.3318 8.85037 22.262 3.79302ZM16.6721 18.4464L13.0322 14.8155L9.39227 18.4464L7.57232 16.6309L11.2122 13L7.57232 9.36908L9.39227 7.55362L13.0322 11.1845L16.6721 7.55362L18.4921 9.36908L14.8521 13L18.4921 16.6309L16.6721 18.4464Z" fill="#FF5C16"/>
                   </svg>`




setTheMarginTop(main, logoHeight)

function setTheMarginTop(element,height) {
    element.style.marginTop = height + 'px'
}

function setTheMarginbottom(element,height) {
    element.style.marginBottom = height + 'px'
}

function addAnimationToAnswersAndQuestion() {
    question.classList.add('fadeInTranslate')
    for (let i = 0; i < radios.length; i++) {
        radios[i].classList.add('fadeInTranslate')
        radios[i].checked = false
        answers[i].classList.add('fadeInTranslate')
    }
}

function removeAnimationFromAnswersAndQuestion() {
    question.classList.remove('fadeInTranslate')
    for (let i = 0; i < radios.length; i++) {
        radios[i].classList.remove('fadeInTranslate')
        answers[i].classList.remove('fadeInTranslate')

    }
}

// add click event to carousel indicator buttons
for (let i = 0; i < quiz_carousel.length; i++) {
    quiz_carousel[i].addEventListener('click', async () => {
        removeShowAnswers()
        removeAllActiveInQuizCarousel()

        quiz_carousel[i].classList.add('active_quiz')
        addAnimationToAnswersAndQuestion()
        setTimeout(removeAnimationFromAnswersAndQuestion, 500)
        generateQuiz(id,i)
    })
}

// add click event to answers
for (let i = 0; i < answers.length; i++) {
    
    answers[i].addEventListener('click', () => {
        for (let j = 0; j < answers.length; j++) {
            show_answers[j].classList.add('unhide_answer', 'fadeIn')
        }
        
    })
}

function removeAllActiveInQuizCarousel() {
    for (let i = 0; i < quiz_carousel.length; i++) {
        quiz_carousel[i].classList.remove('active_quiz')
    }
}

function removeShowAnswers() {
    for (let i = 0; i < show_answers.length; i++) {
        show_answers[i].classList.remove('unhide_answer', 'fadeIn')
    }
}

async function generateQuiz(quizId, index) {
    const data = await getQuiz(quizId)

    question.textContent = data[index].question
    for (let i = 0; i < answers.length; i++) {

        answers[i].textContent = `${data[index]["answer_" + i].answer}`
        if (data[index]["answer_" + i].isTrueAnswer) {
            show_answers[i].innerHTML = correctSVG
        } else {
            show_answers[i].innerHTML = wrongSVG
        }
        show_answers[i].classList.add('fadeIn')
    }
}

async function getQuiz(indexId) {
    const response = await fetch(`https://web-contest-6e6bd-default-rtdb.asia-southeast1.firebasedatabase.app/blogs/${parseInt(indexId)}/quizes.json`)
    const data = await response.json()
    return data
}



function _getTheValueFromURLSearchParam(value) {
    // Get the search query from the URL
    const searchQuery = window.location.search;

    // Create a URLSearchParams object with the search query
    const queryParams = new URLSearchParams(searchQuery);

    // Get the value of the parameter query
    const queryValue = queryParams.get(value);

    return queryValue
}