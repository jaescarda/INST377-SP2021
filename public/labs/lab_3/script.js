/* Put your javascript in here */
let position = 0;
let width = 130;
let count = 3;
const listOfImages = document.querySelector('ul');
const listOfImageElems = document.querySelectorAll('li');
const imageArray = Array.from(listOfImageElems);

function movePictureRight() {
    imageArray.forEach(element => {
        position += 10;
        element.style.left = position + 'px';
        console.log(element);
    })
};

function movePictureLeft() {
    imageArray.forEach(element => {
        position -= 10;
        element.style.left = position + 'px';
        console.log(element);
    })
};


function clickToMove() {
    const rightArrow = document.querySelector('#next')
    const leftArrow = document.querySelector('#prev')
    rightArrow.addEventListener('click', (event) => {
        movePictureRight();
    })

    leftArrow.addEventListener('click', (event) => {
        movePictureLeft();
    })
}


window.onload = clickToMove; 