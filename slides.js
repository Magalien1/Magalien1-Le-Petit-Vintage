const nextButtons = document.getElementsByClassName('next');
const slideContainer = document.getElementById('slide-container');
const dots = document.getElementsByClassName('dot');
const submitButton = document.querySelector('.submit');
const errorDisplays = document.getElementsByClassName('error-display');
const timeline = document.querySelector('.timeline');
const containerView = document.getElementsByClassName('window')[0];
const slides = document.getElementsByClassName('slide');
let containerViewWidth;
let lastWindowPX;
let leftInterval ="0px";
let dotIndex = 0;
function lastWindowPXCalculator (windowWidth){
 return '-'+parseInt(windowWidth)*4+'px';
}
function sizeAdjustment (){
    containerViewWidth = window.innerWidth *5/6;
    timeline.style.width = containerViewWidth+"px";
    lastWindowPX = lastWindowPXCalculator(containerViewWidth);
    containerView.style.width = containerViewWidth+"px";
    slideContainer.style.left = "-"+dotIndex * containerViewWidth+"px";
    for (const slide of slides) {
        slide.style.width = containerViewWidth+"px";
    }
}
sizeAdjustment();
window.addEventListener('resize',sizeAdjustment);

for (let nextButton of nextButtons) {
    nextButton.addEventListener('click',(e)=>{
        let rightInterval = slideContainer.offsetLeft -containerViewWidth;
        slideContainer.style.left = rightInterval.toString()+"px";
        let dotIndexToFill = parseInt(e.target.id.charAt(6));
        dots[dotIndexToFill].classList.add('dot-ok');
        dots[dotIndexToFill].classList.remove('dot-current');
        dots[dotIndexToFill+1].classList.add('dot-current');
        dots[dotIndexToFill].classList.remove('dot-incomplete')
        errorDisplays[dotIndexToFill].classList.add('inactive');
    });
}

for (let dot of dots) {
     dot.addEventListener('click',(e)=>{
        dotIndex = parseInt(e.target.id.charAt(3));
        leftInterval = (dotIndex * -containerViewWidth).toString()+"px";
        slideContainer.style.left = leftInterval;
        let dotCurrentToRemove = document.querySelector('.dot-current');
        dotCurrentToRemove.classList.remove('dot-current');
        e.target.classList.add('dot-current');
    })
};

submitButton.addEventListener('click',(e)=>{
    let count = 0;
    for(let i = 0; i < dots.length-1; i++) {
        if (!dots[i].classList.contains('dot-ok')) {
            count++;
            dots[i].classList.add('dot-incomplete');
            errorDisplays[i].classList.remove('inactive');
        }
    }
    if (count === 0){
        dots[3].classList.add('dot-ok');
        slideContainer.style.left=lastWindowPX;
        timeline.classList.add('timeline-ok');
        for (let dot of dots) {
        dot.replaceWith(dot.cloneNode(true));
        }
        //To remove the event listener
    }
})
