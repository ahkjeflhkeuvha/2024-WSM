const API_KEY = "52c619be75ee4eb086545c53c63af5cb" // 학교 급식 api key
const URL = "https://open.neis.go.kr/hub/mealServiceDietInfo" // 학교 급식 url
const ATPT_OFCDC_SC_CODE = "B10" // 교육청
const SD_SCHUL_CODE = "7011569" // 학교



let currentDate = new Date(); // 현재 날짜 저장


// 급식 정보 제목 표시하자~
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

// 급식 정보 날짜 바꾸자~
const changeDate = (diff) => {
    currentDate.setDate(currentDate.getDate() + diff)
    displayDate()

    const dateData = currentDate.toISOString().slice(0, 10).replace(/-/g, "")
    // 2024-05-23 -> 20240523
    getSchoolFoodMenu(dateData)

}

// 급식 API 이용해서 급식 정보  

const getSchoolFoodMenu = (dateData) => {
    let url = `${URL}?Type=json&KEY+${API_KEY}&pIndex=1&pSize=100&ATPT_OFCDC_SC_CODE=${ATPT_OFCDC_SC_CODE}&SD_SCHUL_CODE=${SD_SCHUL_CODE}&MLSV_YMD=${dateData}`  
    
    fetch(url) // 비동기로 url 호출
    .then((res) => res.json()) // 호출이 잘 되었다면 res를 json으로 실제 데이터 만 전달
    .then((data) => console.log(data)) // 위의 json을 전달된 res 출력
    .catch((error) => console.log(error)) // 만약 위에서 에러가 발생했다면 에러 출력
    
    console.log(url)
}
// 받아온 급식 정보 웹사이트에 표시하자


