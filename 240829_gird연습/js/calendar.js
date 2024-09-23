// 이전/다음 버튼 클릭하면 이전달/다음달로 변경

// 현재 날짜 구하기
var currentDate = new Date()

// 년 구하기
const year = currentDate.getFullYear()

// 월 구하기
const month = currentDate.getMonth()

// 제목 표시

const calendarHeader = document.getElementById('calendar-header')
const calendarTitle = calendarHeader.getElementsByTagName('h1')[0]
// const calendarTitle = document.querySelector("#calendar-header h1")

calendarTitle.innerText = `${year}년 ${month + 1}월`
// calendarTitle.innerHTML = `<h1>${year}년 ${month + 1}월</h1>`

const changeDate = (date) => {
    currentDate.setDate(currentDate.getDate() + date)
    calendarTitle.innerText = `${year}년 ${month + 1}월`
}