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


const setPage = (page) => {
    // clear select
    // selectionItemDivs.toArray().forEach(selectionItem => {
    //     selectionItem.classList.remove("select")
    // })

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