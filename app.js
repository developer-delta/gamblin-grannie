const wallet = document.querySelector('.wallet');
const STARTING_TOKENS = 10;


let luck = document.querySelector('.luck input[checked]').value;

const luckyButtons = document.querySelectorAll('.luck input');

const setLuck = (event) => {
  luck = event.currentTarget.value;
  console.log(luck)
}

for(let i = 0; i < luckyButtons.length; i++) {
  luckyButtons[i].addEventListener('click', setLuck);
}

const neutralLuckButton = document.querySelector('.luck #neutral');
const unLuckyButton = document.querySelector('.luck #unlucky');

const slotNums = document.querySelectorAll('.spinning-nums img');
const slotButtons = document.querySelectorAll('.spinning-nums button');
const numResults = document.querySelectorAll('.spinning-nums .result');
const lever = document.querySelector('.lever');
let finalResult = [];

//talk about why this needs to be a func over a variable
const tokens = () => {
  // talk about what the return statement does
  return document.querySelectorAll('.token');
}

const randomNum = () => {
 return Math.floor(Math.random() * luck);
}

const createToken = (i) => {
  const token = document.createElement('img');
  token.src = 'assets/token.png'
  token.classList += `token token-${i}`;
  return token;
}

const betToken = () => {
  document.querySelectorAll('.token')[0].remove();
}

const winToken = (x) => {
  for(let i = 0; i < x; i++) {
    // do we need the index here?
    wallet.append(createToken(i));
  }
}

const spin = () => {

  if(tokens().length === 0) {
    alert("Grannie, I think it's time to go home...");
    return;
  }

  finalResult = [];
  document.querySelector('.jackpot').classList.add('hidden');

  for(let i = 0; i < slotNums.length; i++) {
    slotNums[i].classList.remove('hidden');
    numResults[i].classList.add('hidden');
    slotButtons[i].classList.remove('disabled');
  }

  betToken();
}

const winCheck = (nums) => {
  for(let i = 0; i < nums.length; i++) {
    if(nums[i] !== nums[0]) {
      return false;
    }
  }
  return true;
}

const stopNum = (num) => {
  slotNums[num].classList.add('hidden');

  numResults[num].innerHTML = randomNum();
  finalResult.push(numResults[num].innerHTML);
  
  numResults[num].classList.remove('hidden');
  slotButtons[num].classList.add('disabled');

  if(finalResult.length === 3 && winCheck(finalResult)) {
    document.querySelector('.jackpot').classList.remove('hidden');
    winToken(15);
  }
}

lever.addEventListener('mousedown', spin);

slotButtons[0].addEventListener('click', () => stopNum(0));
slotButtons[1].addEventListener('click', () => stopNum(1));
slotButtons[2].addEventListener('click', () => stopNum(2));

winToken(STARTING_TOKENS);
