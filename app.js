const wallet = document.querySelector('.wallet');

/******* HELPER FUNCTIONS ********/

const randomNum = () => {
  return Math.floor(Math.random() * luck);
 }

/*********************************/


/************* LUCK **************/

let luck = document.querySelector('.luck input[checked]').value;

const luckyButtons = document.querySelectorAll('.luck input');

const setLuck = (event) => {
  luck = event.currentTarget.value;
  console.log(luck)
}

for(let i = 0; i < luckyButtons.length; i++) {
  luckyButtons[i].addEventListener('click', setLuck);
}

/***********************************/


const slotNums = document.querySelectorAll('.spinning-nums img');
const slotButtons = document.querySelectorAll('.spinning-nums button');
const numResults = document.querySelectorAll('.spinning-nums .result');
const lever = document.querySelector('.lever');
let finalResult = [];

/************* TOKENS **************/

const tokens = () => {
  return document.querySelectorAll('.token');
}

const createToken = () => {
  const token = document.createElement('img');
  token.src = 'assets/token.png'
  token.classList = 'token';
  return token;
}

const betToken = () => {
  document.querySelector('.token').remove();
}

const winTokens = (amount) => {
  for(let i = 0; i < amount; i++) {
    wallet.append(createToken());
  }
}

/***********************************/


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
    winTokens(15);
  }
}

lever.addEventListener('mousedown', spin);

slotButtons[0].addEventListener('click', () => stopNum(0));
slotButtons[1].addEventListener('click', () => stopNum(1));
slotButtons[2].addEventListener('click', () => stopNum(2));

winTokens(10);
