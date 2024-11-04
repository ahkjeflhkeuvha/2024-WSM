// 각 페이지 요소 가져오자

const calendarDiv = document.getElementById("calendar");
const selectionWashingMachineTimeDiv = document.getElementById("selection-washingmachine-time");
const selectionRoomNameTimeDiv = document.querySelector("#selection-room-name");
const boardDiv = document.querySelector("#board");

const pageDivs = [calendarDiv, selectionWashingMachineTimeDiv, selectionRoomNameTimeDiv, boardDiv]
const selectionItemDivs = document.getElementsByClassName('selection-item')
console.log(selectionItemDivs);

// calendarDiv.style.display = "block";
// selectionWashingMachineTimeDiv.style.display = "block";

let allData; // 모든 초기화 정보 : 세탁기, 시간, 호실 정보
let weeklyReservation; // 미리 요일별로 지정된 예약 정보
let newReservation; // 사용자가 입력하고 있는 예약 정보
let reservations; // 사용자가 에약 완료한 정보들 저장

const initData = async () => {
    // allData 가져오기
    const getAllData = async (url) => {
        return fetch(url)
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.log(err))
    }
    // weeklyReservation 가져오기
    const getWeeklyReservation = async (url) => {
        try {
            const response = await fetch(url)
            const data = await response.json()
            return data
        } catch (error) {
            console.log(error)
        }
    }

    allData = await getAllData("js/allData.json")
    console.log(allData)
    weeklyReservation = await getWeeklyReservation("js/weekly-reservation.json")
    console.log(weeklyReservation)
}





const setPage = (page) => {
    // clear select
    // selectionItemDivs.toArray().forEach(selectionItem => {
    //     selectionItem.classList.remove("select")
    // })

    // 버튼 클릭 조절
    for(selectionItem of selectionItemDivs){
        selectionItem.classList.remove("select")
    }

    // real select
    if(selectionItemDivs.length >= page) { // 4페이지 selection은 없어서 undefined 에러 해결하기 위해서
        selectionItemDivs[page-1].classList.add("select")
    }
    

    pageDivs.forEach(pageDiv => {
        pageDiv.style.display = "none";
    })

    pageDivs[page-1].style.display = "block";
}


setPage(1)
initData()