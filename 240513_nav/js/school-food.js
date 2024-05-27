let currentDate = new Date(); // 현재 날짜 저장

const displayDate = () => {
    let days = "일월화수목금토" // 요일
    let month = currentDate.getMonth() + 1 // 월
    let date = currentDate.getDate() // 일
    let day = currentDate.getDay() // 요일 (0이 일요일)

    days = days.split('') // 연결되어 있던 문자열을 ''을 기준으로 나누어줌

    const schoolFoodTitleHeader = document.getElementsByClassName('school-food-title')[0]
    const titleText = `🍚 ${days[day]}요일 (${month}/${date})의 메뉴 🍚`

    schoolFoodTitleHeader.innerText = titleText
}

const changeDate = (diff) => {
    currentDate.setDate(currentDate.getDate() + diff)
    const dateDate = currentDate.toISOString().slice(0, 10).replace(/-/g, "")
    // 2024-05-23 -> 20240523

    displayDate()
    
}