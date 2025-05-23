const startBtn = document.getElementById("startbtn");
const main = document.getElementById("main");
const quiz = document.getElementById("quiz");
const finishBtn = document.getElementById("finishbtn");
const modal = document.getElementById("modal");
const scoreDisplay = document.getElementById("scoreDisplay");
const modalCloseBtns = document.getElementById("modal-close-btns");
const radios = document.querySelectorAll('input[type="radio"]');

startBtn.addEventListener("click", function(){
main.style.display = "none";
    quiz.style.display = "block";

});


function calculateScore() {
    const correctAnswers = {
        q1: "sugar",
        q2: "candy",
        q3: "mixcoffee",
        q4: "ninesix",
        q5: "coat"
    };

    let totalScore = 0;
    let correctCount = 0;

    for (let key in correctAnswers) {
        const selected = document.querySelector(`input[name="${key}"]:checked`);
        if (selected && selected.value === correctAnswers[key]) {
            correctCount++;
            totalScore += 20; 
        }
    }

    return { correctCount, totalScore };
}



finishBtn.addEventListener("click", function(e){
    e.preventDefault();

        const radios = document.querySelectorAll('input[type="radio"]');
    let allAnswered = true;  


    for (let i = 0; i < radios.length; i++) {
        const radio = radios[i];
        const questionName = radio.name;  
        
       
        if (!document.querySelector(`input[name="${questionName}"]:checked`)) {
            allAnswered = false;
            break;  
        }
    }

   
    if (!allAnswered) {
        alert("모든 문제를 선택해주세요.");
        return;  
    }

    main.style.display = "none";
    modal.style.display = "block";
    
    const scoreData = calculateScore();
    scoreDisplay.innerHTML = 
    `
<div id="totalscore">
<h2>당신의 결과는!</h2>
    <h2>총 ${scoreData.correctCount}문제 정답!</h2>
    <h2 id="scoreNumber"> 점수는 ${scoreData.totalScore}점입니다 🎉</h2>
</div>
    `;

    animateScore(scoreData.totalScore);

    setTimeout(() => {
        const modalInner = document.getElementById("modal-inner");
        modalInner.innerHTML = `
            <form id="form">
                <h2 id ="gifttext">경품 응모 🎉</h2>
                <img id=giftimage src="gift.png"/>
                <input type="text" id="name" name="name" placeholder="이름" required/>
                <input type="email" id="email" name="email" placeholder="이메일" required/>
                <input type="tel" id="phone" name="phone" placeholder="전화번호" required/>
                <button type="submit" id="submitbtn">응모하기</button>
                <p id=popuptext> <b>※ 입력하신 정보는 경품 발송 및 이벤트 안내 용도로만 사용됩니다.</b></p>
                <p id="form-message" style="margin-top: 10px; font-weight: bold;"></p>
            </form>
        `;
    
        
        const form = document.getElementById("form");
    
        form.addEventListener("submit", function (e) {
            e.preventDefault();
    
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const message = document.getElementById("form-message");
    
            const nameRegex = /^[가-힣]+$/;
            const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
            const phoneRegex = /^010\d{7,8}$/;
    
            if (!name || !email || !phone) {
                message.style.color = "red";
                message.textContent = "모든 항목을 입력해주세요.";
                return;
            }
    
            if (!nameRegex.test(name)) {
                message.style.color = "red";
                message.textContent = "이름은 한글만 입력해주세요.";
                return;
            }
    
            if (!emailRegex.test(email)) {
                message.style.color = "red";
                message.textContent = "올바른 이메일 형식을 입력해주세요.";
                return;
            }
    
            if (!phoneRegex.test(phone)) {
                message.style.color = "red";
                message.textContent = "전화번호는 010으로 시작하는 숫자만 입력해주세요.";
                return;
            }
    
            
            alert("응모가 완료되었습니다! 감사합니다 😊");
            form.reset();

            modal.style.display = "none";
            quiz.style.display = "none";
            main.style.display = "block";
             main.style.textAlign = "center";
        });

        const modalCloseBtn = document.getElementById("modal-close-btn");
modalCloseBtn.disabled = false;

// modalCloseBtn.addEventListener("click", function () {
//     modal.style.display = "none";
    

// });


    }, 4000);
 
});

function animateScore(finalScore) {
    const scoreElement = document.getElementById("scoreNumber");

    if (finalScore === 0) {
        scoreElement.innerText = `점수는 0점입니다 🎉`;
        return;
    }

    let score = 0;
    scoreElement.classList.add("score-animate");

    const interval = setInterval(() => {
        score++;
        scoreElement.innerText = `점수는 ${score}점입니다 🎉`;
        
        if (score === finalScore) {
            clearInterval(interval);
        }
    }, 30);
}

const emotionRadios = document.getElementById("quiz");

emotionRadios.addEventListener("change", function (e) {
  const radios = document.getElementsByClassName("radio");
  for (let radio of radios) {
    radio.classList.remove("highlight");
  }

  const selectedElement = document.getElementById(e.target.id);
  const selectedParentEl = selectedElement.parentElement;
  selectedParentEl.classList.add("highlight");
});



