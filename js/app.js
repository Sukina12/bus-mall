'use strict';

// Products Name
const names=[
  'bag',
  'banana',
  'bathroom',
  'boots',
  'breakfast',
  'bubblegum',
  'chair',
  'cthulhu',
  'dog-duck',
  'dragon',
  'pen',
  'pet-sweep',
  'scissors',
  'shark',
  'sweep',
  'tauntaun',
  'unicorn',
  'usb',
  'water-can',
  'wine-glass'
];
// console.log(names);

// Global Variables
const leftImage = document.getElementById('left-image');
const middleImage = document.getElementById('middle-image');
const rightImage = document.getElementById('right-image');
const imageSection = document.getElementById('image-section');
const resultButton = document.getElementById('buttonRe');
let leftIndex;
let middleIndex;
let rightIndex;

let voteNum = 0;
let totalNum = 26;

// Constructor Function
function Products (name){
  this.name = name;
  this.path = `./assets/${name}.jpg`;
  this.votes = 0;
  this.shownTimes=0;
  Products.all.push(this);
}

Products.all=[];

// Build Objects
for (let i=0; i<names.length; i++){
  new Products (names[i]);
}
// console.table (Products.all);

// random function
function randomNumber (min,max){
  return Math.floor(Math.random() * (max - min) ) + min;
}

// render function
function render (){
  leftIndex = randomNumber (0,Products.all.length-1);
  middleIndex = randomNumber (0,Products.all.length-1);
  rightIndex = randomNumber (0,Products.all.length-1);

  while (rightIndex === leftIndex || rightIndex === middleIndex || leftIndex === middleIndex){
    leftIndex = randomNumber (0,Products.all.length-1);
    middleIndex = randomNumber (0,Products.all.length-1);
    rightIndex = randomNumber (0,Products.all.length-1);
  }
  leftImage.src=Products.all[leftIndex].path;
  leftImage.alt=Products.all[leftIndex].name;
  leftImage.title=Products.all[leftIndex].name;
  Products.all[leftIndex].shownTimes++;
  middleImage.src=Products.all[middleIndex].path;
  middleImage.alt=Products.all[middleIndex].name;
  middleImage.title=Products.all[middleIndex].name;
  Products.all[middleIndex].shownTimes++;
  rightImage.src=Products.all[rightIndex].path;
  rightImage.alt=Products.all[rightIndex].name;
  rightImage.title=Products.all[rightIndex].name;
  Products.all[rightIndex].shownTimes++;
}


imageSection.addEventListener('click',handelClick);
function handelClick (event){
  if (voteNum < totalNum){
    if (event.target.id !== 'image-section'){
      if (event.target.id === leftImage.id){
        Products.all[leftIndex].votes++;
      }
      else if (event.target.id === middleImage.id){
        Products.all[middleIndex].votes++;
      }
      else {
        Products.all[rightIndex].votes++;
      }
    }
    voteNum++;
    render();
  }
  else {
    resultButton.classList.remove ('hide');
    resultButton.addEventListener('click',resultFunction);
  }
}

// Button Part
const container=document.getElementById('result-section');
function resultFunction(){
  const h3El=document.createElement('h3');
  container.appendChild(h3El);
  h3El.textContent =('Products Result');

  const ulEl=document.createElement('ul');
  container.appendChild(ulEl);
  for (let y=0; y<Products.all.length; y++)
  {
    const liEl = document.createElement('li');
    ulEl.appendChild(liEl);
    liEl.textContent =(`(${Products.all[y].name}) had (${Products.all[y].votes}) votes, and was seen (${Products.all[y].shownTimes}) times.`);
  }

}

render();












