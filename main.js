let imgName = [
  "hamburger",
  "chicken",
  "Jajangmyeon",
  "pizza",
  "meat",
  "ramen",
  "soup",
  "kimbap",
];
let foodName = [
  "햄버거",
  "치킨",
  "짜장면",
  "피자",
  "고기",
  "라면",
  "국밥",
  "김밥",
];
let number = [0, 1, 2, 3, 4, 5, 6, 7];

let firstImg = document.querySelector(".first");
let secondImg = document.querySelector(".second");
let thirdImg = document.querySelector(".third");
let fourthImg = document.querySelector(".fourth");

//첫번째 화면 클릭하거나 3초 뒤 게임화면으로 넘어간다.
setTimeout(() => {
  firstImg.classList.add("oZero");
}, 3000);
firstImg.addEventListener("click", () => {
  firstImg.classList.add("oZero");
});
//게임 클리어화면, 클릭시 새로고침
secondImg.addEventListener("click", () => {
  window.location.reload();
});
//3번틀릴시 화면, 클릭시 새로고침
fourthImg.addEventListener("click", () => {
  window.location.reload();
});
//답안 클릭시 화면, 클릭시 새로고침
thirdImg.addEventListener("click", () => {
  window.location.reload();
});
//정답 확인하기
document.querySelector(".confirm").addEventListener("click", () => {
  document.querySelectorAll(".foodList li input").forEach((data) => {
    data.checked = true;
  });
  setTimeout(() => {
    thirdImg.classList.add("oOne");
  }, 2000);
});
//다시하기
document.querySelector(".again").addEventListener("click", () => {
  window.location.reload();
});

//배열안의 내용을 섞는 함수
function numberShuffling(number) {
  number.sort(() => Math.random() - 0.5);
  return number;
}

//드래곤의 좋아하는 음식은 1 싫어하는 음식은 0인 배열을 만들어준다.
function dragonRandomLikeFood() {
  let dragonLikeFoodCount = numberShuffling(number)[0] + 1;
  let arr = [];
  for (let i = 0; i < 8; i++) {
    if (dragonLikeFoodCount > 0) {
      arr.push(1);
      dragonLikeFoodCount--;
    } else {
      arr.push(0);
    }
  }
  arr = numberShuffling(arr);
  return arr;
}

//배열안에 1의 개수를 반환하는 함수
function oneCount(arr) {
  return arr.filter((data) => {
    if (data == 1) return data;
  }).length;
}

function ramdomFoodShow() {
  let foods = document.querySelectorAll(".food");
  let disLikeCount = 0;
  let likeCount = 0;
  let randomNumber = numberShuffling(number);
  let dragonLikeFood = dragonRandomLikeFood();
  foods.forEach((data, i) => {
    //음식 클래스 이름 추가
    data.classList.add(imgName[randomNumber[i]]);

    //음식 설명 글 추가
    data.querySelector(".introduce").innerHTML = foodName[randomNumber[i]];

    //드레곤이 좋아하는 음식, 싫어하는 음식에 해당하는 클래스 추가
    if (dragonLikeFood[i]) data.classList.add("like");
    else data.classList.add("dislike");

    //드래곤이 좋아하는 음식 수 표시
    document.querySelector(".foodCount strong").innerHTML =
      oneCount(dragonLikeFood);

    let check = data.querySelector(".check");
    data.addEventListener("click", () => {
      //틀린 횟수 및 접근성을 위한 맞았는지 틀렸는지 표기
      if (data.classList.contains("dislike")) {
        if (!data.classList.contains("validation")) {
          disLikeCount += 1;
          data.classList.add("validation");
          check.innerHTML = "틀렸습니다.";
        }
      } else {
        if (!data.classList.contains("validation")) {
          likeCount += 1;
          data.classList.add("validation");
          check.innerHTML = "맞았습니다.";
        }
      }
      if (disLikeCount >= 3) {
        fourthImg.classList.add("oOne");
      } else if (likeCount == oneCount(dragonLikeFood)) {
        secondImg.classList.add("oOne");
      }
    });
  });
}

ramdomFoodShow();
