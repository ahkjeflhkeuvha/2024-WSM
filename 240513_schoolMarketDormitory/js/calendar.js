// 현재 날짜 구하자
currentDate = new Date();

// html -> js 변수 가져오기
const calendarHeader = document.getElementById("calendar-header");
const calendarHeaderH1 = calendarHeader.getElementsByTagName("h1")[0];
// const tempH1 = document.querySelector("#calender-header h1");

const calendarContainerDiv = document.querySelector("#calendar-container");

// 이전/다음 버튼을 클릭 했을 때 , 이전 달/다음 달로 변경하자
// html -> js 변수
// click event 발생했을 때, 해야할 일 정하자
const prevMonthBtn = document.getElementById("prev-month");
// prevMonthBtn.addEventListener("click", console.log("이전"));
prevMonthBtn.addEventListener("click", () => changeMonth(-1));

const nextMonthBtn = document.querySelector("#next-month");
nextMonthBtn.onclick = () => changeMonth(1);

// -1 : 이전 달, 0: 현재 달, 1: 다음 달
const changeMonth = (diff) => {
    currentDate.setMonth(currentDate.getMonth() + diff);
    // 년도 구하기
    const year = currentDate.getFullYear();
    // 월 구하기
    const month = currentDate.getMonth();
    // 제목 바꾸기
    // console.log(`${year}년 ${month + 1}월`);
    // js 변수에 innerHTML = `${year}년 ${month + 1}월`
    calendarHeaderH1.innerHTML = `<i>${year}년 ${month + 1}월</i>`;
    // 달력 새로 그리자
    setCalendar(currentDate);
}

const setCalendar = (date) => {
    // 현재 년
    const year = date.getFullYear();
    // 현재 월
    const month = date.getMonth();
    // 이번 달 마지막 날짜
    const lastDate = new Date(year, month + 1, 0);  // 다음 달 1일의 전날 => 년, 월 + 1, 1 -1
    const lastDateDate = lastDate.getDate();
    // 이번 달 마지막 날짜의 요일
    const lastDay = lastDate.getDay();
    // 이번 달 마지막 날짜
    const prevMonthLastDate = new Date(year, month, 0);
    const prevMonthLastDateDate = prevMonthLastDate.getDate();
    // 이번 달 첫날의 요일
    const firstDay = new Date(year, month, 1).getDay();



    // let weekNameString = `<div class="item week-name">일</div>
    //         <div class="item week-name">월</div>
    //         <div class="item week-name">화</div>
    //         <div class="item week-name">수</div>
    //         <div class="item week-name">목</div>
    //         <div class="item week-name">금</div>
    //         <div class="item week-name">토</div>`;

    // calendarContainerDiv.innerHTML = weekNameString;

    let weekNameString = "";
    const weekNames = "일월화수목금토"; // 주 이름을 문자열로 정의
    const weekNamesArray = weekNames.split(""); // -> ["일", "월", "화", "수", "목", "금", "토"] 배열로 변환

    // 주 이름을 포함한 div 문자열을 하나씩 weekNameString에 추가
    weekNamesArray.forEach((weekName) => {
        weekNameString += `<div class="item week-name">${weekName}</div>`;
    });

    // 최종 문자열을 calendarContainerDiv에 삽입
    calendarContainerDiv.innerHTML = weekNameString;

    

    // 이전 달의 뒷 날짜 표시하자
    for (let date = prevMonthLastDateDate - firstDay + 1; date <= prevMonthLastDateDate; date++) {
        let currentMonthDateDiv = document.createElement("div");     // <div></div>
        currentMonthDateDiv.className = "item other-month";    // <div class="item other-month"></div>
        currentMonthDateDiv.textContent = date;    // <div class="item other-month">날짜</div>
        calendarContainerDiv.appendChild(currentMonthDateDiv);    // <div id="calendar-continer"><div class="item">날짜</div></div>
    }

    // 이번 달의 모든 날짜 표시하자
    for (let date = 1; date <= lastDateDate; date++) {
        let currentMonthDateDiv = document.createElement("div");     // <div></div>
        currentMonthDateDiv.className = "item";    // <div class="item"></div>
        currentMonthDateDiv.dataset.date = `${year}-${month+1}-${date}`;    // <div class="item" data-date="년-월-일"></div>
        currentMonthDateDiv.onclick = (event) => clickDate(event);    // <div class="item" data-date="년-월-일" onclick(event) => clickDate(event)></div>
        currentMonthDateDiv.textContent = date;    // <div class="item">날짜</div>
        calendarContainerDiv.appendChild(currentMonthDateDiv);    // <div id="calendar-continer"><div class="item">날짜</div></div>
    }

    // 다음 달의 앞 날짜 표시하자
    for (let date = 1; date <= 6 - lastDay; date++) {
        let currentMonthDateDiv = document.createElement("div");     // <div></div>
        currentMonthDateDiv.className = "item other-month";    // <div class="item other-month"></div>
        currentMonthDateDiv.textContent = date;    // <div class="item other-month">날짜</div>
        calendarContainerDiv.appendChild(currentMonthDateDiv);    // <div id="calendar-continer"><div class="item">날짜</div></div>
    }


}

changeMonth(0); // 현재 달 출력
setCalendar(currentDate);   // 현재 달의 달력 보여주기

// const btns = document.getElementsByClassName("btn");
// for (let btn of btns) {
//     // 버튼 누르면 예약완료 창 뜨도록 도와주는 js
//     btn.onclick = () => alert('예약 완료');
// }