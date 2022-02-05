const wrapper = document.getElementById('wrapper')
const up = document.getElementById('up')
const down = document.getElementById('down')
const li = document.querySelectorAll('li')
const nav = document.querySelector('nav')
const a = nav.querySelectorAll('a')
const aBtn = document.getElementById('a-button')
const bBtn = document.getElementById('b-button')
const gameDisplay = document.getElementById('right-display')
const outerShell = document.getElementById('outer-shell')
const home = document.getElementById('home')
const projects = document.getElementById('projects')
const about = document.getElementById('about')
const contact = document.getElementById('contact')
const loader = document.getElementById('loader')
const secret = document.getElementById('secret')
const loading = document.querySelectorAll('.loading')
const right = document.getElementById('right')
const left = document.getElementById('left')
const first = document.getElementById('first')
const second = document.getElementById('second')
const mobileNav = document.getElementById('mobile-nav')
const controls = document.getElementById('controls')
const mobileControls = document.getElementById('mobile-controls')
const footer = document.querySelector('footer')
const instructions = document.getElementById('instructions')
const isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;

class Sound {
    constructor(src) {
        this.sound = document.createElement('audio')
        this.sound.src = src
        this.sound.setAttribute('preload', 'auto')
        this.sound.setAttribute('controls', 'none')
        this.sound.style.display = 'none'
        document.body.appendChild(this.sound)
        this.play = function () {
            this.sound.play()
        }
        this.stop = function () {
            this.sound.pause()
        }
    }
}

let menuSelect = new Sound('../audio/menu-select.wav')
let menuMove = new Sound('../audio/menu-move.wav')
let secBtn = new Sound('../audio/sec-button.wav')
let marked = 0
let selection = 0
let secretLevel = 0
let secretLevel2 = 0
let keylog = ''


function mobileCheck() {
    if(isMobile) {
        footer.scrollIntoView({behavior: "smooth", block: "end", inline: "center"})
    }
}
// Commented out for development 
setTimeout(()=> {
    if(!isMobile) {
        controls.style.display = 'flex'
        window.addEventListener('mouseup', ()=> {
            controls.style.display = 'none'
        })
        window.addEventListener('keyup', ()=> {
            controls.style.display = 'none'
        })
    }else if(isMobile) {
        mobileControls.style.display = 'flex'
        window.addEventListener('mouseup', ()=> {
            mobileControls.style.display = 'none'
        })
    }
}, 2000)

function upChoice() {
    menuMove.play()
    li.forEach((item, i) => {
        if(item.className == 'check') {
            if(i - 1 >= 0) {
                marked = i
            } else {
                marked = 0
            }
        }
    })
    if(marked - 1 >= 0) {
        li[marked-1].className = 'check'
        li[marked].className = ' '
        a[marked-1].className = 'selected'
        a[marked].className = 'not-selected'
        selection = marked - 1

    }
} 

function downChoice() {
    menuMove.play()
    li.forEach((item, i) => {
        if(item.className == 'check') {
            if(i + 1 <= 3) {
                marked = i
            } else {
                marked = 3
            }
        }
    })
    if(marked + 1 <=3) {
        li[marked+1].className = 'check'
        li[marked].className = ' '
        a[marked+1].className = 'selected'
        a[marked].className = 'not-selected'
        selection = marked + 1
    }
} 

function pageDisplay() {
    loader.style.display = 'none'
    gameDisplay.scrollTo(0,0)
    if(selection == 0) {
        home.style.display = 'flex'
        projects.style.display = 'none'
        about.style.display = 'none'
        contact.style.display = 'none'
        home.focus()
    }
    if(selection == 1) {
        home.style.display = 'none'
        projects.style.display = 'block'
        about.style.display = 'none'
        contact.style.display = 'none'
        projects.focus()
    }
    if(selection == 2) {
        home.style.display = 'none'
        projects.style.display = 'none'
        about.style.display = 'block'
        contact.style.display = 'none'
        about.focus()
    }
    if(selection == 3) {
        home.style.display = 'none'
        projects.style.display = 'none'
        about.style.display = 'none'
        contact.style.display = 'block'
        contact.focus()
    }

    
}

function loadIt(i) {
    loading[i].className = 'loaded'
    if(i > 0) {
        loading[i -1].className = 'loading'
    }
}

function delay(msPeriod, i) 
{ 
  function delayPromiseHandler(resolve, reject) 
  { 
    function timeoutHandler(delayMs) 
    { 
      resolve(loadIt(i)) 
    } 
    setTimeout(timeoutHandler, msPeriod) 
  } 
  return new Promise(delayPromiseHandler) 
} 
 
async function op1() 
{ 
  return delay(50, 0) 
} 
 
async function op2() 
{ 
  return delay(750, 1) 
} 
 
async function op3() 
{ 
  return delay(750, 2) 
} 
async function op4() 
{ 
  return delay(750, 3) 
} 


 
async function main() {
    menuSelect.play()
    if (isMobile) {
        gameDisplay.scrollIntoView({behavior: "smooth", block: "end", inline: "center"})
      }
    secret.style.display = 'none'
    home.style.display = 'none'
    projects.style.display = 'none'
    about.style.display = 'none'
    contact.style.display = 'none'
    if(loading[3].className == 'loaded') {
        loading[3].className = 'loading'
    } 
    loader.style.display = 'flex'
    let op1Promise = op1() 
    await op1Promise 
    
    let op2Promise = op2() 
    await op2Promise 
    
    let op3Promise = op3() 
    await op3Promise 
    
    let op4Promise = op4()
    await op4Promise
    pageDisplay()
} 

function destroySecret() {
    setTimeout(()=> {
        secret.style.display = 'none'
        pageDisplay()
    },8000)
}

function secLev() {
    secBtn.play()
    secretLevel++
    if(secretLevel == 4 && secretLevel2 == 2) {
        secret.style.display = 'none'
        home.style.display = 'none'
        projects.style.display = 'none'
        about.style.display = 'none'
        contact.style.display = 'none'
        if (isMobile) {
            window.scrollTo(0, document.body.scrollHeight)
          }
        secret.style.display = 'flex'
        secret.focus()
        destroySecret()
    }
    first.innerText = secretLevel
    if(secretLevel > 9){
        secretLevel = 0
        first.innerText = secretLevel
    }
 }

function secLev2() {
    secBtn.play()
    secretLevel2++
    if(secretLevel == 4 && secretLevel2 == 2) {
        secret.style.display = 'none'
        home.style.display = 'none'
        projects.style.display = 'none'
        about.style.display = 'none'
        contact.style.display = 'none'
        if (isMobile) {
            window.scrollTo(0, document.body.scrollHeight)
          }
        secret.style.display = 'flex'
        secret.focus()
        destroySecret()        
    }
    if(secretLevel2 > 9) {
        secretLevel2 = 0
        second.innerText = secretLevel2
    }
    second.innerText = secretLevel2
}

function resetSecret() {
    secBtn.play()
    secretLevel2 = 0
    secretLevel = 0
    first.innerText = secretLevel
    second.innerText = secretLevel2
}

function bottomScroll() {
    footer.scrollIntoView({behavior: "smooth", block: "end", inline: "center"})
}

function openControls() {
    if(!isMobile) {
        controls.style.display = 'flex'

    } else if(isMobile) {
        mobileControls.style.display = 'flex'
    }
}


up.addEventListener('click', upChoice)
down.addEventListener('click', downChoice)
aBtn.addEventListener('click', main)
bBtn.addEventListener('click', secLev)
right.addEventListener('click', secLev2)
left.addEventListener('click', resetSecret)
mobileNav.addEventListener('click', bottomScroll)
instructions.addEventListener('click', openControls)
window.addEventListener('keydown', (e)=> {
    if(e.key == 'Control') {
        keylog = keylog + 'Control'
    }
    if(e.key == 'q') {
        keylog = keylog + 'q'
    }
    if(keylog.includes('Control') && keylog.includes('q')) {
        openControls()
        keylog = ''
        console.log(keylog, 'after launch')
    }
})
window.addEventListener('keyup', (e)=> {
    if(e.key == 'w') {
        upChoice()
    }else if(e.key == 's') {
        downChoice()
    }else if(e.key == 'a') {
        resetSecret()
    }else if(e.key == 'd') {
        secLev2()
    }else if(e.key == 'Enter') {
        main()
    }else if(e.key == 'Shift') {
        secLev()
    }
})

