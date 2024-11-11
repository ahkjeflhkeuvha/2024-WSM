// 각 페이지 가져오기
const calendarDiv = document.getElementById("calendar");
const selectionWashingmachineTimeDiv = document.getElementById("selection-washingmachine-time");
const selectionRoomNameDiv = document.querySelector("#selection-room-name");
const boarDiv = document.querySelector("#board");

const pageDivs = [calendarDiv, selectionWashingmachineTimeDiv, selectionRoomNameDiv, boarDiv];

const washingmachineSelect = document.getElementById("washingmachine");
const timeSelect = document.getElementById("time");

// 셀렉션 세개
const selectionItemDivs = document.getElementsByClassName("selection-item");

// calendarDiv.style.display = "block";
// selectionWashingmachineTimeDiv.style.display = "block";
// selectionRoomNameDiv.style.display = "block";
// boarDiv.style.display = "block";

let allData; //모든 초기화 정보 세탁기, 시간, 호실 정보
let weeklyReservation; //미리 요일별로 예약된 정보
let newResvation; //사용자가 입력하고 있는 예약 정보
let reservations; //사용자가 예약 완료한 정보들

const initData = async () => {
    // allData 가져오기
    const getAllData = async (url) => {
        return fetch(url)
            .then(response => response.json())
            .then((data => { return data }))
            .catch(error => console.error(error.message));
    }

    // weeklyReservation 가져오기
    const getWeeklyReservation = async (url) => {
        try {
            const response = await fetch(url); // await 추가
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error.message);
        }
    }

    // allData 호출 (구현 내용은 비어 있음)
    const allData = await getAllData("js/allData.json"); // 비어있는 함수 호출
    // weeklyReservation 호출
    const weeklyReservations = await getWeeklyReservation("js/weekly-reservation.json");
}

const setPage = (page) => {
    //clear selection
    for (const selectionItemDiv of selectionItemDivs) {
        selectionItemDiv.classList.remove("select");
    }
    //select selection
    if (selectionItemDivs.length >= page) {  // 4page selection은 없음
        selectionItemDivs[page - 1].classList.add("select");
    }


    // clear pagas
    pageDivs.forEach(pageDiv => {
        pageDiv.style.display = "none"; // 모든 페이지 안 보이게 처리
    })

    // show pagas
    pageDivs[page - 1].style.display = "block";

    if (page === 2) {    //세탁기 ,, 시간
        // 1,2,3 세탁기 / 1,2,3 시간 초기화
        let allWashingmachineTime = {"1": ["1", "2", "3"], "2": ["1", "2", "3"], "3": ["1", "2", "3"]};
        // 클릭한 날짜의 요일 구하기
        // 예약된 시간을 확인하고, 세탁기가 있으면 초기화에서 제외
        // 사용자가 예약한 예약을 보고 예약된 세탁기, 시간이 있으면 초기화 항목에서 제외
        // 초기화 항목에서 예약된 시간 뺀 후, 모든 시간이 없는 세탁기 제외
        // 세탁기 select에 option 만들기
        let washingmachines = Object.keys(allWashingmachineTime);   //key만 가져옴
        washingmachines.forEach(washingmachine => {
            let newOption = document.createElement("option");   //<option></>
            newOption.value = washingmachine;   //<option value="세탁기번호"></>
            newOption.textContent = `${washingmachine}번 세탁기`;    //<option value="세탁기번호">세탁기번호 세탁기</>
            washingmachineSelect.appendChild(newOption);    //washingmachineSelect에 자식으로 넣자
        });
        // 시간 select에 option 만들기
        // [다음] 클릭 => 세탁기 번호, 시간 번호 보관 => setPage(3)
    } else if (page === 3) {    //호실, 이름

    } else if (page === 4) {    //세탁기 예약 현황표

    }
}

const clickDate = (event) => {
    console.log(event);
    console.log(event.target.textContent);
    console.log(event.target.dataset.date); //div에 클래스에 아이템에 아이디 뭐시기...텍스트 뭐시기 뽑음.
    newResvation = {
        "date": undefined,
        "washingmachine": undefined,
        "time": undefined,
        "room": undefined,
        "name": undefined,
        "notification": undefined,
    }
    newResvation.date = event.target.dataset.date;  //클릭한 날짜 정보 새 예약에 기록하기
    setPage(2);
}

initData();
setPage(1);