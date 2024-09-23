const calendarHeader = document.getElementById('calendar-header')
const calendarTitle = calendarHeader.getElementsByTagName('h1')[0]

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
}

changeMonth(0)
