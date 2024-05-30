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
    .then((data) => setSchoolFoodMenu(data)) // 위의 json을 전달된 res 출력
    .catch((error) => console.log(error)) // 만약 위에서 에러가 발생했다면 에러 출력
}

// 받아온 급식 정보 웹사이트에 표시하자
const setSchoolFoodMenu = (data) => {

    // breakfastMenuUl 가져오자
    const breakfastMenuUl = document.getElementsByClassName('menu breakfast')[0]  
    // lunchMenuUl 가져오자
    const lunchMenuUl = document.getElementsByClassName('menu lunch')[0]
    // dinnerMenuUl 가져오자
    const dinnerMenuUl = document.getElementsByClassName('menu dinner')[0]

    const menuData = data["mealServiceDietInfo"][1]["row"]
    console.log(menuData)


    // data에서 메뉴를 가져오자(조, 중, 석식)
    
    menuData.forEach((menuRow)=>{
        // 하나씩 돌면서 clean 작업 -> (...) 없애기, . 없애기, <br /> 태그로 나누기, 빈칸 제거, <li class = "menu-food">에 넣기
        
        let cleanedMenu = menuRow.DDISH_NM
        cleanedMenu = cleanedMenu.replace(/\([^\)]*\)/g, "")) // 소괄호 연 문자로 시작 \( \) ~ 소괄호 닫은 문자를 제외한 문자 0~n개 [a문자 or b문자], 소괄호 닫는 문장 -> [^\)]* *은 여러개를 의미
        cleanedMenu = cleanedMenu.replace(/\./g, "")
    })

    // 조식 -> breakfastMenuUl에 넣기

    // 중식 -> breakfastMenuUl에 넣기

    // 석식 -> breakfastMenuUl에 넣기   
    
}

changeDate(0)

