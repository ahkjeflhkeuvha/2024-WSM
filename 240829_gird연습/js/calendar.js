const calendarHeader = document.getElementById('calendar-header')
const calendarTitle = calendarHeader.getElementsByTagName('h1')[0]
// const calendarTitle = document.querySelector('#calendar-header h1')

const calendarContainer = document.querySelector('#calendar-container')

// addEventListener는 (이벤트, 리턴 값) -> 호출하면 안 되고 리턴 값이 있어야 하기 때문에 arrow function 사용
const prevMonthButton = document.getElementById('prev-month')
prevMonthButton.addEventListener('click', () => changeMonth(-1))

const nextMonthButton = document.getElementById('next-month')
nextMonthButton.onclick = () => changeMonth(1)

// 현재 날짜 구하기
var currentDate = new Date()

// click event 발생했을 때, 해야할 일 정하자
const changeMonth = (diff) => {
    currentDate.setMonth(currentDate.getMonth() + diff)

    // 년 구하기
    const year = currentDate.getFullYear()

    // 월 구하기
    const month = currentDate.getMonth()

    calendarTitle.innerText = `${year}년 ${month + 1}월`

    // 달력 새로 그리자
    setCalendar(currentDate)
}

const setCalendar = (date) => {
    // 이번 달 마지막 날짜 -> 다음 달 1일의 전날 => 년, 월, 월 + 1, -1
    const year = date.getFullYear()
    const month = date.getMonth()

    const lastDate = new Date(year, month + 1, 0)
    const lastDateDate = lastDate.getDate()
    const lastDay = lastDate.getDay()

    /* let weekName = `<div class="item week-name">일</div>
    <div class="item week-name">월</div>
    <div class="item week-name">화</div>
    <div class="item week-name">수</div>
    <div class="item week-name">목</div>
    <div class="item week-name">금</d/iv>
    <div class="item week-name">토</div>`
    calendarContainer.innerHTML = weekName */

    const weekNames = "일월화수목금토"
    const weekNamesArray = weekNames.split("")
    let weekNameString = ""

    weekNamesArray.forEach((val) => {
        weekNameString += `<div class=item week-name">${val}</div>\n`
    })

    calendarContainer.innerHTML = weekNameString

    // 이전 달의 뒷날짜 표시
    const prevMonthLastDate = new Date(year, month, 0) // 저번 달의 마지막 날짜
    const prevMonthLastDateDate = prevMonthLastDate.getDate()
    const firstDay = new Date(year, month, 1).getDay()

    for (let date = prevMonthLastDateDate - firstDay + 1; date <= prevMonthLastDateDate; date++) {
        let currentMonthDateDiv = document.createElement("div")
        currentMonthDateDiv.className = "item other-month"
        currentMonthDateDiv.textContent = date
        calendarContainer.appendChild(currentMonthDateDiv)          
    }

    // 이번 달의 모든 날짜 표시

    for (let date = 1; date <= lastDateDate; date++) {
        /// <div></div>
        let currentMonthDateDiv = document.createElement("div")
        
        // <div class="item"></div>
        currentMonthDateDiv.className = "item"

        // <div class="item">날짜</div>
        currentMonthDateDiv.textContent = date;

        // <div id="calendar-container"><div class="item">날짜</div></div>
        calendarContainer.appendChild(currentMonthDateDiv)
    }

    // 다음 달의 앞날짜 표시


    for(let date = 1; date <= (6 - lastDay); date++){
        let currentMonthDateDiv = document.createElement("div")
        currentMonthDateDiv.className = "item other-month"
        currentMonthDateDiv.textContent = date
        calendarContainer.appendChild(currentMonthDateDiv)
    }    
}

setCalendar(currentDate)

changeMonth(0)
