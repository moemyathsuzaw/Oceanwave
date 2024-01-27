const audio = document.getElementById('audio')
const content_title = document.getElementById('content_title')

const audio_player_img = document.getElementById('audio_player_img')
const audio_player_cover = document.getElementById('audio_player_cover')
const audio_current_time = document.getElementById('audio_current_time')
const audio_total_time = document.getElementById('audio_total_time')
const audio_indicator_btn = document.getElementById('audio_indicator_btn')
const content_views = document.getElementById('content_views')
const content_date = document.getElementById('content_date')


const prev_btn_wrapper = document.getElementById('prev_btn_wrapper')
const next_btn_wrapper = document.getElementById('next_btn_wrapper')

const next_btn = document.getElementById('next_btn')
const previous_btn = document.getElementById('previous_btn')
const heart_btn = document.getElementById('heart_btn')
const audio_state_btn = document.getElementById('audio_state_btn')

const loadingText = document.getElementsByClassName('loading_text')[0]


async function _generateContent(indexId) {
    main.style.display = 'none'
    loadingText.style.display = 'block'
    const response = await fetch(`https://web-contest-6e6bd-default-rtdb.asia-southeast1.firebasedatabase.app/blogs/${parseInt(indexId)}.json`)
    const data = await response.json()

    const randomNumber = Math.floor(Math.random() * 4)
    let randomNumberBanner = Math.floor(Math.random() * 4)

    for (let i = 0; i < 6; i++) {
        randomNumberBanner = Math.floor(Math.random() * 4)
    }

    const imageLink = data.image_links[randomNumber] ? data.image_links[randomNumber] : data.image_links[0]

    banner.style.backgroundImage = `url(${data.image_links[randomNumberBanner] ? data.image_links[randomNumberBanner] : data.image_links[0]})` 
    
    content_title.textContent = data.title
    audio_player_img.src = imageLink
    audio.src = data.voice_link
    
    audio_current_time.textContent = '--'
    audio_total_time.textContent = '--'
    content_views.textContent = `Views: ${data.views}` 
    content_date.textContent = `Last Modified: ${data.date}` 
    content_card_description.textContent = data.content 
    main.style.display = 'block'
    loadingText.style.display = 'none'
    question.textContent = data.quizes[0].question
    for (let i = 0; i < answers.length; i++) {
        answers[i].textContent = `${data.quizes[0]["answer_" + i].answer}`
        if (data.quizes[0]["answer_" + i].isTrueAnswer) {
            show_answers[i].innerHTML = correctSVG
        } else {
            show_answers[i].innerHTML = wrongSVG
        }
        show_answers[i].classList.add('fadeIn')
    }

}

_generateContent(id)



function _managePreviousAndNextBtn() {

    if (id === '0') {
        prev_btn_wrapper.classList.add('disabled')
        next_btn_wrapper.classList.remove('disabled')
    } else if(id === '9') {
        prev_btn_wrapper.classList.remove('disabled')
        next_btn_wrapper.classList.add('disabled') 
    }else {
        prev_btn_wrapper.classList.remove('disabled')
        next_btn_wrapper.classList.remove('disabled')
    }
}
_managePreviousAndNextBtn()

heart_btn.addEventListener('click', () => {
    heart_btn.classList.toggle('active')
    heart_btn.src = heart_btn.classList.contains('active') ? './images/filled-heart.png' : './images/empty_heart.png'
})


audio_state_btn.addEventListener('click', () => {
    audio_state_btn.classList.toggle('active')
    audio_player_cover.classList.toggle('rotate')
    audio_state_btn.src = audio_state_btn.classList.contains('active') ? './images/pause.png' : './images/play.png'
    audio_state_btn.classList.contains('active') ? audio.play() : audio.pause()
})

audio.ontimeupdate = updateCurrentTime


function updateAudioIndicator() {
    requestAnimationFrame(updateAudioIndicator);

    const playedPercentage = (audio.currentTime / audio.duration) * 100;
    
    audio_indicator_btn.style.width = `${playedPercentage}%`;
}

updateAudioIndicator();

audio.addEventListener('ended', () => {
    // Reset the audio
    audio.currentTime = 0; // Reset the playback position
    audio.pause(); // Pause the audio
    audio.load(); // Reload the audio source
    audio_current_time.textContent = '0:00' // reset current time 
    audio_player_cover.classList.remove('rotate')
    // reset button
    audio_state_btn.classList.remove('active')
    audio_state_btn.src = './images/play.png'
});

next_btn.addEventListener('click', () => {
    main.style.display = 'none'
    loadingText.style.display = 'block'
    next_btn.href = `./view.html?id=${parseInt(id) + 1}`
})

previous_btn.addEventListener('click', () => {
    main.style.display = 'none'
    loadingText.style.display = 'block'
    previous_btn.href = `./view.html?id=${parseInt(id) - 1}`

})

function updateCurrentTime() {
    const currentTime = formatTime(audio.currentTime)
    const totalTime = formatTime(audio.duration)
    audio_current_time.textContent = currentTime
    audio_total_time.textContent = totalTime
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

