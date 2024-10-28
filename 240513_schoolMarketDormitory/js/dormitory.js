// 각 페이지 요소 가져오자

const calendarDiv = document.getElementById("calendar");
const selectionWashingMachineTimeDiv = document.getElementById("selection-washingmachine-time");
const selectionRoomNameTimeDiv = document.querySelector("#selection-room-name");
const boardDiv = document.querySelector("#board");

const pageDivs = [calendarDiv, selectionWashingMachineTimeDiv, selectionRoomNameTimeDiv, boardDiv]

// calendarDiv.style.display = "block";
// selectionWashingMachineTimeDiv.style.display = "block";


const setPage = (page) => {
    pageDivs.forEach(pageDiv => {
        pageDiv.style.display = "none";
    })

    pageDivs[page-1].style.display = "block";
}

setPage(1)