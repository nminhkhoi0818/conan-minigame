//Call games
const memoryGame = document.querySelector('.memory-game');
const TicTacToe = document.querySelector('.tic-tac-toe');
const quizGame = document.querySelector('.quiz-game');

const introButton = document.querySelector('.intro-btn');
const introPart = document.querySelector('.intro');

//Memory game
const cardArray = [
    {
        name: 'fries',
        img: 'images/fries.png',
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png',
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png',
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png',
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png',
    },
    {
        name: 'pizza',
        img: 'images/pizza.png',
    },
    {
        name: 'fries',
        img: 'images/fries.png',
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png',
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png',
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png',
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png',
    },
    {
        name: 'pizza',
        img: 'images/pizza.png',
    }
]


//Shorcut random các giá trị của hàm
cardArray.sort(() => 0.5 - Math.random())
// console.log(cardArray);

//Gọi các ID và các mảng
const gridDisplay = document.querySelector('.grid');
const resultDisplay = document.querySelector('#result');
const restart = document.querySelector('.btn');
let cardsChosen = [];
let cardsChosenIds = [];
const cardsWon = [];

//Hàm tạo bảng mới 
function createBoard () {
    for(let i = 0 ; i < cardArray.length ; i++) {
        const card = document.createElement('img');
        card.setAttribute('src', 'images/blank.png');
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipCard);
        gridDisplay.append(card);
    }
}

createBoard();


function checkMatch() {
    const cards = document.querySelectorAll('img');
    const optionOneId = cardsChosenIds[0];
    const optionTwoId = cardsChosenIds[1];
    //Trường hợp bấm 2 lần một ô thì lật lại
    if(optionOneId == optionTwoId){
        cards[optionOneId].setAttribute('src', 'images/blank.png');
    }
    //Trường hợp 2 ô giống nhau và khác vị trí
    else if( cardsChosen[0] == cardsChosen[1] && optionOneId !== optionTwoId){
        cards[optionOneId].setAttribute('src', 'images/white.png');
        cards[optionTwoId].setAttribute('src', 'images/white.png');
        cards[optionOneId].removeEventListener('click', flipCard);
        cards[optionTwoId].removeEventListener('click', flipCard);
        //Cộng điểm
        cardsWon.push(cardsChosen);
    } 
    //Trường hopwk 2 ô khác nhau
    else if( cardsChosen[0] !== cardsChosen[1]) {
        cards[optionOneId].setAttribute('src', 'images/blank.png');
        cards[optionTwoId].setAttribute('src', 'images/blank.png');
    }
    resultDisplay.textContent = cardsWon.length;
    cardsChosen = [];
    cardsChosenIds = [];

    if(cardsWon.length == cardArray.length/2){
        resultDisplay.innerHTML = 'Chúc mừng bạn đã vượt qua thử thách đầu tiên, gợi ý cho bạn đây là một nhân vật nữ trong truyện Conan';
        gridDisplay.classList.add('hide');
        setTimeout(win1 ,5000);
    }
}   

function win1 () {
    memoryGame.remove();
    TicTacToe.classList.remove('hide');
}


function flipCard() {
    //this là chỉ đến ô mà ta click vào
    const cardId = this.getAttribute('data-id');
    //push các phần tử vào mảng
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenIds.push(cardId);
    this.setAttribute('src', cardArray[cardId].img);
    //Khi lật 2 ô thì gọi hàm checkMath
    if(cardsChosen.length === 2){
        setTimeout(checkMatch, 500);
    }
}   

function Restart () {
    restart.addEventListener('click', clearBoard);
}

function clearBoard() {
    const cards = document.querySelectorAll('img');
    for( let i = 0 ; i < cards.length ; i ++ ) {
        cards[i].setAttribute('src', 'images/blank.png');
    }
}

Restart();


//Tic tac toe game
const fields = document.querySelectorAll('.field');
const winner = document.querySelector('.winner');
const xDisplay = document.querySelector('.x-text');
const oDisplay = document.querySelector('.o-text');
const restartButton = document.querySelector('.restart');
const drawDisplay = document.querySelector('.draw');
const clue2 = document.querySelector('.clue-2');


let check = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
let count = 0;

function doTurn() {
    let text;
    fields.forEach(field => {
        field.addEventListener('click', (text) => {
            const fieldID = field.getAttribute('id');
            if(check[fieldID - 1] === ' '){
                if(count % 2 === 0){
                    text = 'X';
                }
                count++;  
                check[fieldID - 1] = text;
                field.textContent = check[fieldID - 1];
                doEnemyTurn();
                console.log(count);
                if(count < 9){
                    checkWin();
                }
                else{
                    Draw();
                }
            }
            restartButton.addEventListener('click', () => {
                check = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
                count = 0;
                fields.forEach(field => {
                    const fieldID = field.getAttribute('id');
                    field.textContent = check[fieldID - 1];
                })
            })
        })
    })
}

function doEnemyTurn() {
    fields.forEach(field => {
        const fieldID = field.getAttribute('id');
        if(check[fieldID - 1] === ' ' && count % 2 !== 0){
            count++;  
            check[fieldID - 1] = 'O';
            field.textContent = check[fieldID - 1]; 
        }
    })
}

function checkWin () {
    //Check p1 win
    if(check[0]==='X' && check[1]==='X' && check[2]==='X'){
        p1Win();
    }
    else if(check[3]==='X' && check[4]==='X' && check[5]==='X'){
        p1Win();
    }
    else if(check[6]==='X' && check[7]==='X' && check[8]==='X'){
        p1Win();
    }
    else if(check[0]==='X' && check[3]==='X' && check[6]==='X'){
        p1Win();
    }
    else if(check[1]==='X' && check[4]==='X' && check[7]==='X'){
        p1Win();
    }
    else if(check[2]==='X' && check[5]==='X' && check[8]==='X'){
        p1Win();
    }
    else if(check[0]==='X' && check[4]==='X' && check[8]==='X'){
        p1Win();
    }
    else if(check[2]==='X' && check[4]==='X' && check[6]==='X'){
        p1Win();
    }
    //Check p2 win
    else if(check[0]==='O' && check[1]==='O' && check[2]==='O'){
        p2Win();
    }
    else if(check[3]==='O' && check[4]==='O' && check[5]==='O'){
        p2Win();
    }
    else if(check[6]==='O' && check[7]==='O' && check[8]==='O'){
        p2Win();
    }
    else if(check[0]==='O' && check[3]==='O' && check[6]==='O'){
        p2Win();
    }
    else if(check[1]==='O' && check[4]==='O' && check[7]==='O'){
        p2Win();
    }
    else if(check[2]==='O' && check[5]==='O' && check[8]==='O'){
        p2Win();
    }
    else if(check[0]==='O' && check[4]==='O' && check[8]==='O'){
        p2Win();
    }
    else if(check[2]==='O' && check[4]==='O' && check[6]==='O'){
        p2Win();
    }
}

function p1Win () {
    winner.classList.remove("hide");
    xDisplay.classList.remove("hide");
    setTimeout(removeEffectX, 1500);
    setTimeout(() => {
        clue2.classList.remove('hide');
    }, 3000);    
    setTimeout(nextGame, 10000);
}

function removeEffectX () {
    winner.classList.add("hide");
    xDisplay.classList.add("hide");
}

function p2Win () {
    winner.classList.remove("hide");
    oDisplay.classList.remove("hide");
    setTimeout(removeEffectY, 1500);
    setTimeout(nextGame, 1500);
}

function removeEffectY () {     
    winner.classList.add("hide");
    oDisplay.classList.add("hide");
}

function nextGame () {
    TicTacToe.classList.add('hide');
    quizGame.classList.remove('hide');
}

function Draw () {
    drawDisplay.classList.remove('hide');
    setTimeout(() => {
        drawDisplay.classList.add('hide');
    }, 1500);
    setTimeout(nextGame, 1500);
}

doTurn();


//Quiz game


const questionNumber=document.querySelector(".question-number");
const questionText=document.querySelector(".question-text");
const optionContainer=document.querySelector(".option-container");
const homeBox=document.querySelector(".home-box");
const quizBox=document.querySelector(".quiz-box");
const resultBox=document.querySelector(".result-box");




let questionCounter=0;
let currentQuestion;
let availableQuestions=[];
let availableOptions=[];
let correctAnswer = 0;

let attemp = 0;


function setAvailableQuestions() {
	const totalQuestion=quiz.length;
	for(let i=0;i<totalQuestion;i++){
		availableQuestions.push(quiz[i])
	}
}

function getNewQuestion(){
    questionNumber.innerHTML="Question " + (questionCounter + 1) + " of " +quiz.length;
    
    const questionIndex=availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    currentQuestion=questionIndex;
    questionText.innerHTML=currentQuestion.q;
    const index1=availableQuestions.indexOf(questionIndex);
    //remove not repeat
    availableQuestions.splice(index1,1);
    

    const optionLen=currentQuestion.options.length
    

    for(let i=0;i<optionLen;i++){
    	availableOptions.push(i)
    }
    optionContainer.innerHTML='';
     let animationDelay=0.15;

    for(let i=0;i<optionLen;i++){
    	const optonIndex=availableOptions[Math.floor(Math.random()*availableOptions.length)];
    	
    	const index2=availableOptions.indexOf(optonIndex);
    	availableOptions.splice(index2,1);
    	const option=document.createElement("div");
    	option.innerHTML=currentQuestion.options[optonIndex];
    	option.id=optonIndex;
    	option.style.animationDelay=animationDelay +'s';
    	animationDelay=animationDelay+0.15;
    	option.className="option";
    	optionContainer.appendChild(option)
    	option.setAttribute("onclick", "getResult(this)");
    }



    questionCounter++
}  

function getResult(element){
	const id=parseInt(element.id);
	if(id === currentQuestion.answer){
		element.classList.add("correct");
		correctAnswer++;
		console.log("correct" + correctAnswer)
	}
	else{
		element.classList.add("wrong");

      

        const optionLen=optionContainer.children.length;
        for(let i=0;i<optionLen;i++){
        	if(parseInt(optionContainer.children[i].id) ===  currentQuestion.answer){
        		optionContainer.children[i].classList.add("correct");
        	} 
        }

	}
    attemp++;
	unclickableOptions();
}


function unclickableOptions(){
	const optionLen=optionContainer.children.length;
	for(let i=0;i<optionLen;i++){
		optionContainer.children[i].classList.add("already-answered")
	}
}



function next(){
	if(questionCounter === quiz.length){
		console.log("quiz over");
		quizOver();
	}
	else {
		getNewQuestion();
	}
}


function quizOver(){
    quizBox.classList.add("hide");
    resultBox.classList.remove("hide");
    quizResult();

}

function quizResult(){
	resultBox.querySelector(".total-question").innerHTML =quiz.length;
	resultBox.querySelector(".total-attempt").innerHTML =attemp;
	resultBox.querySelector(".total-correct").innerHTML = correctAnswer;
	resultBox.querySelector(".total-wrong").innerHTML = attemp - correctAnswer;
	const percentage = (correctAnswer/quiz.length) * 100;
	resultBox.querySelector(".percentage").innerHTML = percentage.toFixed() + "%";
    if(correctAnswer >= quiz.length - 2)
	    resultBox.querySelector(".total-score").innerHTML = 'Từng là thành viên của tổ chức Áo Đen';
    else
    resultBox.querySelector(".total-score").innerHTML = 'Thử lại để nhận manh mối';
}

function resetQuiz() {
	 questionCounter=0;
     correctAnswer = 0;
     attemp = 0;
}


function tryAgainQuiz() {
	resultBox.classList.add("hide");

	quizBox.classList.remove("hide");
	resetQuiz();
	startQuiz();
}

function answerLastQuestion() {
	resultBox.classList.add("hide");

	questionPart.classList.remove("hide");
}



function startQuiz() 
{
    homeBox.classList.add("hide");
    quizBox.classList.remove("hide");

	setAvailableQuestions();


	getNewQuestion();

}

window.onload=function(){
	homeBox.querySelector(".total-question").innerHTML=quiz.length;
}

//Set up minigame
//Call


introButton.addEventListener('click', () => {
    introPart.classList.add('hide');
    memoryGame.classList.remove('hide');
})


//End game
const questionPart = document.querySelector('.question-full');
const ans1 = document.querySelector('.answer-1');
const ans2 = document.querySelector('.answer-2');
const ans3 = document.querySelector('.answer-3');
const cgr = document.querySelector('.congrats');
const rgt = document.querySelector('.regret');


ans1.addEventListener('click', () => {
    hideQuestion();
    congrats();
})

ans2.addEventListener('click', () => {
    hideQuestion();
    regrets();
})

ans3.addEventListener('click', () => {
    hideQuestion();
    regrets();
})

function hideQuestion() {
    questionPart.classList.add('hide');
}

function congrats () {
    cgr.classList.remove('hide');
}

function regrets () {
    rgt.classList.remove('hide');
}