const logo = document.getElementsByClassName('logo')[0]
const main = document.querySelector('main')

const blogWrapper = document.getElementsByClassName('blog_wrapper')[0]

const url = "https://web-contest-6e6bd-default-rtdb.asia-southeast1.firebasedatabase.app/blogs.json"


const logoHeight = logo.offsetHeight;

let blogs;


setTheMarginTopOfMain(logoHeight)

function setTheMarginTopOfMain(height) {
    main.style.marginTop = height + 'px'
}

async function generateBlogs() {
    
    const dataArr = await fetchDataFromFirebase(url)
    
    blogWrapper.innerHTML = ''

    for (const [i,data] of dataArr.entries()) {
        const randomNumber = Math.floor(Math.random() * 4)
        console.log(randomNumber)
        blogWrapper.innerHTML += `<div class="blog">
                <div class="image_wrapper">
                    <img src="${data.image_links[randomNumber] ? data.image_links[randomNumber] : data.image_links[0]}" alt="">
                </div>
                <div class="blog_content">
                    <a href="./view.html?id=${i}"><h2>${data.title}</h2></a>
                    <p>${data.description}</p>
                </div>
                
            </div>`
    }

}

async function fetchDataFromFirebase(url) {
    const data = await fetch(url)
    return data.json()
}


generateBlogs()