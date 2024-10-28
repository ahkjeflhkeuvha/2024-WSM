// 각 페이지 요소 가져오자

const calendarDiv = document.getElementById("calendar");
const selectionWashingMachineTimeDiv = document.getElementById("selection-washingmachine-time");
const selectionRoomNameTimeDiv = document.querySelector("#selection-room-name");
const boardDiv = document.querySelector("#board");
const selectionItemDivs = document.getElementsByClassName('selection-item')
console.log(selectionItemDivs);

const pageDivs = [calendarDiv, selectionWashingMachineTimeDiv, selectionRoomNameTimeDiv, boardDiv]

// calendarDiv.style.display = "block";
// selectionWashingMachineTimeDiv.style.display = "block";


const setPage = (page) => {
    // clear select
    // selectionItemDivs.toArray().forEach(selectionItem => {
    //     selectionItem.classList.remove("select")
    // })

    for(selectionItem of selectionItemDivs){
        selectionItem.classList.remove("select")
    }

    // real select
    selectionItemDivs[page-1].classList.add("select")

    pageDivs.forEach(pageDiv => {
        pageDiv.style.display = "none";
    })

    pageDivs[page-1].style.display = "block";
}


setPage(1)