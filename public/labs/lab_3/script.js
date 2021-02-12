/* Put your javascript in here */
let position = 0;    
const listOfImages = document.querySelector('ul');
const listOfImageElems = document.querySelectorAll('li');
const imageArray = Array.from(listOfImageElems);

function movePictureRight() {
    imageArray.forEach(element => {
        position += 200;
        element.style.left = position + 'px'
        console.log(element);
    })
};

function clickToMove() {
    const rightArrow = document.querySelector('#right')
    rightArrow.addEventListener('click', (event) => {
        movePictureRight()
    })
}

window.onload = clickToMove;