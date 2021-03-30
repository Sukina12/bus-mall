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
  'wine-glass',
  'water-can'
];
// console.log(names);

// Global Variables
const leftImage = document.getElementById('left-image');
const middleImage = document.getElementById('middle-image');
const rightImage = document.getElementById('right-image');
const imageSection = document.getElementById('image-section');
// const resultButton = document.getElementById('buttonRe');
let leftIndex;
let middleIndex;
let rightIndex;
let temporaryIndex=[];
let votes=[];
let shows=[];
let voteNum = 1;
let totalNum = 25;


// Constructor Function
function Products (name){
  this.name = name;
  this.path = `./assets/${name}.jpg`;
  this.votes = 0;
  this.shownTimes=0;
  Products.all.push(this);
}
Products.all=[];

function settingItem(){
  let data= JSON.stringify(Products.all);
  localStorage.setItem('products',data);
}


function gettingItem(){
  let stringObj = localStorage.getItem('products');
  let normalObj = JSON.parse (stringObj);
  if (normalObj !== null)
  {
    Products.all = normalObj;
  }
  resultFunction();
  chartRender();
  render();
}


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
  if (rightIndex === leftIndex || rightIndex === middleIndex || leftIndex === middleIndex){
    render();
  }
  else{
    if (temporaryIndex.includes (leftIndex) || temporaryIndex.includes (middleIndex) || temporaryIndex.includes (rightIndex)){
      render();
    }
    else {
      temporaryIndex = [];
      temporaryIndex.push (leftIndex);
      temporaryIndex.push (middleIndex);
      temporaryIndex.push (rightIndex);
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
      settingItem();
    }
  }
}
// Event Function
imageSection.addEventListener('click',handelClick);
function handelClick (event){
  event.preventDefault();
  if (event.target.id !== 'image-section'){
    if (voteNum < totalNum){
      voteNum++;
      if (event.target.id === leftImage.id){
        Products.all[leftIndex].votes++;
      }
      else if (event.target.id === middleImage.id){
        Products.all[middleIndex].votes++;
      }
      else {
        Products.all[rightIndex].votes++;
      }
      render();
    }
    else {
      if (event.target.id === leftImage.id){
        Products.all[leftIndex].votes++;
      }
      else if (event.target.id === middleImage.id){
        Products.all[middleIndex].votes++;
      }
      else {
        Products.all[rightIndex].votes++;
      }
      imageSection.removeEventListener('click', handelClick);
      // resultButton.addEventListener('click',resultFunction);
      settingItem();
      gettingItem();
    }
  }
}
render();

// resultButton.addEventListener('click',resultFunction);
// // Button Part
const container=document.getElementById('result-section');
function resultFunction(){
  const h3El=document.createElement('h3');
  container.appendChild(h3El);
  h3El.textContent =('Products Result');
  h3El.id = 'product-List-h3';
  const ulEl=document.createElement('ul');
  container.appendChild(ulEl);
  ulEl.id = 'product-List-ul';
  for (let y=0; y<Products.all.length; y++)
  {
    votes.push(Products.all[y].votes);
    shows.push(Products.all[y].shownTimes);
    const liEl = document.createElement('li');
    ulEl.appendChild(liEl);
    liEl.textContent =(`(${Products.all[y].name}) had (${Products.all[y].votes}) votes, and was seen (${Products.all[y].shownTimes}) times.`);
  }
}


// Chart Function
function chartRender(){
  let ctx = document.getElementById('myChart').getContext('2d');
  let chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
      labels: names,
      datasets: [{
        label: 'Votes',
        backgroundColor: 'purple',
        borderColor: 'rgb(255, 99, 132)',
        data: votes
      },
      {
        label: 'Shown Times',
        backgroundColor: 'green',
        borderColor: 'rgb(255, 99, 132)',
        data: shows
      }]
    },

    // Configuration options go here
    options: {}
  });
}