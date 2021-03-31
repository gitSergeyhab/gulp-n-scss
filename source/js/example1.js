const rangeField = document.querySelector('.cat-slider__range');
const rangeBar = rangeField.querySelector('.cat-slider__bar');
const rangeFieldLen = rangeField.offsetWidth;
let rangeBarLen = rangeBar.offsetWidth;

const catsContainer = document.querySelector('.cat-slider__images');
const fatCat = catsContainer.querySelector('.cat-slider__past-cat-block');



rangeField.addEventListener('mousedown', (evt) => {
  rangeBar.style.width = evt.offsetX + 'px';
})

rangeField.addEventListener('mouseup', (evt) => {
  rangeBarLen = evt.offsetX;
  rangeBar.style.width = rangeBarLen + 'px';
  const fatCatLen = Math.floor(rangeBarLen / rangeFieldLen * catsContainer.offsetWidth) +"px";
  fatCat.style.width = fatCatLen
  console.log(rangeBarLen)
})



const btnPast = document.querySelector('.cat-slider__button--past');
const btnNow = document.querySelector('.cat-slider__button--now');

btnPast.addEventListener('click', () => {
  rangeBar.style.width = '99%';
  fatCat.style.width = '99%';
})

btnNow.addEventListener('click', () => {
  rangeBar.style.width = '1%'
  fatCat.style.width = '1%'
})
