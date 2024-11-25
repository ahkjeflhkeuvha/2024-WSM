// 각 페이지 가져오기
const calendarDiv = document.getElementById("calendar");
const selectionWashingmachineTimeDiv = document.getElementById("selection-washingmachine-time");
const selectionRoomNameDiv = document.querySelector("#selection-room-name");
const boarDiv = document.querySelector("#board");
const boardContainer = document.querySelector("#board > .board-container")

const pageDivs = [calendarDiv, selectionWashingmachineTimeDiv, selectionRoomNameDiv, boarDiv];

const washingmachineSelect = document.getElementById("washingmachine");
const timeSelect = document.getElementById("time");
const roomSelect = document.querySelector('.selection-room > select')
const nameInput = document.querySelector('.input-name > input')

// 셀렉션 세개
const selectionItemDivs = document.getElementsByClassName("selection-item");

// calendarDiv.style.display = "block";
// selectionWashingmachineTimeDiv.style.display = "block";
// selectionRoomNameDiv.style.display = "block";
// boarDiv.style.display = "block";

let allData; //모든 초기화 정보 세탁기, 시간, 호실 정보
let weeklyReservation; //미리 요일별로 예약된 정보
let newReservation; //사용자가 입력하고 있는 예약 정보
let reservations = []; //사용자가 예약 완료한 정보들
let allWashingmachineTime;
let weeklyReservations;

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
    allData = await getAllData("js/allData.json"); // 비어있는 함수 호출
    console.log(allData)
    // weeklyReservation 호출
    weeklyReservations = await getWeeklyReservation("js/weekly-reservation.json");
    console.log(weeklyReservations)
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
    if (page === 1) {
        // reservations 요청해서 가져오자
        let storedReservations = localStorage.getItem("reservations")
        if (storedReservations) { // 저장된 reservations가 있을 때
            reservations = JSON.parse(storedReservations) // reservations에서 꺼내서 .date에 있는 string -> date 객체
            reservations.map((reservation) => {
                console.log(reservation)
                reservation.date = new Date(reservation.date)
            })
            console.log(reservations)
        } else { // 저장된 reservations가 없을 때 
            storedReservations = []
        }
    }
    else if (page === 2) {    //세탁기 ,, 시간

        initWashingmachine();
        // [다음] 클릭 => 세탁기 번호, 시간 번호 보관 => setPage(3)
    } else if (page === 3) {    //호실, 이름
        newReservation.washingmachine = washingmachineSelect.value
        newReservation.time = timeSelect.value
        initRoomName()
    } else if (page === 4) {    //세탁기 예약 현황표
        newReservation.room = roomSelect.value
        newReservation.name = nameInput.value

        reservations.push(newReservation)

        initTable()
    }
}

const clickDate = (event) => {
    console.log(event);
    console.log(event.target.textContent);
    console.log(event.target.dataset.date); //div에 클래스에 아이템에 아이디 뭐시기...텍스트 뭐시기 뽑음.
    newReservation = {
        "date": undefined,
        "washingmachine": undefined,
        "time": undefined,
        "room": undefined,
        "name": undefined,
        "notification": true,
    }
    // event.target.dataset.date
    let dateString = event.target.dataset.date
    newReservation.date = new Date(dateString);  //클릭한 날짜 정보 새 예약에 기록하기
    setPage(2);
}

const initWashingmachine = () => {
    // 1,2,3 세탁기 / 1,2,3 시간 초기화
    allWashingmachineTime = {};
    allData.washingmachine.forEach((washingmachine) => {
        allWashingmachineTime[washingmachine] = Object.keys(allData.time)
    })
    
    console.log(allWashingmachineTime)

    let weekday = newReservation.date.getDay()
    
    // 초기 세팅하자 
    weeklyReservations.forEach((weeklyReservation) => {
        if(weekday === weeklyReservation.weekday) {
            // 초기화 한 데이터에서 weeklyReservation에 예약된 번호의 시간 번호를 빼자

            const { washingmachine, time } = weeklyReservation
            const index = allWashingmachineTime[washingmachine].indexOf(String(time))

            if(index > -1) allWashingmachineTime[washingmachine].splice(index, 1)

            console.log(washingmachine, time, index)
        }
    })

    // let allWashingmachineTime = {"1": ["1", "2", "3"], "2": ["1", "2", "3"], "3": ["1", "2", "3"]};
    // 클릭한 날짜의 요일 구하기
    // 예약된 시간을 확인하고, 세탁기가 있으면 초기화에서 제외
    // 사용자가 예약한 예약을 보고 예약된 세탁기, 시간이 있으면 초기화 항목에서 제외
    reservations.forEach((reservation) => {
        if (newReservation.date.getFullYear() == reservation.date.getFullYear()
            && newReservation.date.getMonth() == reservation.date.getMonth()
            && newReservation.date.getDate() == reservation.date.getDate()) {
                const { washingmachine, time } = reservation    
                
                const index = allWashingmachineTime[washingmachine].indexOf(String(time))

            if(index > -1) allWashingmachineTime[washingmachine].splice(index, 1)

            console.log(washingmachine, time, index)
            }
    })

    // 초기화 항목에서 예약된 시간 뺀 후, 모든 시간이 없는 세탁기 제외
    // 세탁기 select에 option 만들기
    
    
    let washingmachines = Object.keys(allWashingmachineTime).filter((washingmachine) => allWashingmachineTime[washingmachine].length > 0)    
    
    // console.log(washingmachines) // 가져온 key들
    washingmachineSelect.innerHTML = "";
    // washingmachines = Object.keys(allWashingmachineTime); //key만 가져옴
    washingmachines.forEach(washingmachine => {
        let newOption = document.createElement("option"); //<option></>
        newOption.value = washingmachine; //<option value="세탁기번호"></>
        newOption.textContent = `${washingmachine}번 세탁기`; //<option value="세탁기번호">세탁기번호 세탁기</>
        washingmachineSelect.appendChild(newOption); //washingmachineSelect에 자식으로 넣자
    });
    // 시간 select에 option 만들기
    const setTimeSelect = (event) => {
        timeSelect.innerHTML = "";
        const selectedWashingmachine = washingmachineSelect.value; // <option></option>
        let times = allWashingmachineTime[selectedWashingmachine]; // 만약 2번키라면 2번 세탁기의 값들을 가져옴
        console.log(times);
        times.forEach((time) => {
            let newOption = document.createElement("option");
            newOption.value = time; // 시간 값 <option value="(시간값)1, 2, 3 중 하나"></option>
            newOption.textContent = allData["time"][time]; // 시간 값 <option value="(시간값)1, 2, 3 중 하나">진짜 시간</option>

            // time : "1" -> "7시 ~ 8시 10분"으로 바꾸는 작업 필요
            timeSelect.appendChild(newOption);
        });
    };
    setTimeSelect();
    // 세탁기 번호 바뀌면, setTimeSelect 호출하자
    washingmachineSelect.onchange = (event) => setTimeSelect(event);
}


const initRoomName = () => {
    // 모든 호실 표시하지
    let rooms = allData["room"]

    // createElement -> select.append
    roomSelect.innerHTML = ""
    // rooms.forEach((room) => {
    //     let roomOption = document.createElement('option')
    //     roomOption.value = room
    //     roomOption.textContent = room + "호"

    //     roomSelect.appendChild(roomOption)
    // })

    // string -> select.append

    // let roomString = ""
    // rooms.forEach((room) => {
    //     let roomOption = `<option value=${room}>${room + "호"}</option>`
    //     roomString += roomOption
    // })
    // roomSelect.innerHTML = roomString

    // map()
    let roomOp = rooms.map((room) => `<option value="${room}">${room + "호"}</option>`).join("\n")
    roomSelect.innerHTML = roomOp

    nameInput.value = ""
}

const initTable = () => {
    let tableString = `<div class="item board-item header">이름</div>
    <div class="item board-item header">호실</div>
    <div class="item board-item header">날짜</div>
    <div class="item board-item header">시간</div>
    <div class="item board-item header">세탁기</div>
    <div class="item board-item header">알림</div>`

    
    console.log(reservations)
    
    reservations.forEach((reservation) => {
        tableString += `<div class="item">${reservation.name}</div>
        <div class="item board-item">${reservation.room + "호"}</div>
        <div class="item board-item">${reservation.date.getFullYear() + "년 " + (reservation.date.getMonth() + 1) + "월 " + reservation.date.getDate() + "일"}</div>
        <div class="item board-item">${allData["time"][reservation.time]}</div>
        <div class="item board-item">${reservation.washingmachine + "번 세탁기"}</div>
        <div class="item board-item">${reservation.notification ? "🔔" : "✖️"}</div>`
    })
    boardContainer.innerHTML = tableString
}

const finishReservation = () => {
    localStorage.setItem("reservations", JSON.stringify(reservations))
    alert("예약 완료")
}

initData();
setPage(1);