// JavaScript

// 1. html에 있는 요소를 js 변수로 가져온다
// 2. 이벤트 처리한다 -> click, focus, mouseup...
// 3. class를 수정하여 style을 적용한다

// HTML .nav-toggle -> js 변수      navToggleDiv
// HTML .nav-list -> js 변수        navListUl
// HTML .nav-toggle > i -> js 변수  toggleI

// navToggleDiv 클릭 이벤트 처리

    // navListUl을 보이자 -> show-menu 클래스 추가하자!
    // toggleI .bi-list <-> .bi-x-lg


function toggleMenu(){
    const navToggleDiv = document.getElementsByClassName('nav-toggle')[0]
    const navListUl = document.getElementsByClassName('nav-list')[0]
    const toggleI = navToggleDiv.getElementsByTagName('i')[0]


    navToggleDiv.onclick = (event) => {
        navListUl.classList.toggle('show-menu')

        toggleI.classList.toggle('bi-list')
        toggleI.classList.toggle('bi-x-lg')
        // toggleI.classList.toggle('bi-x-lg')
    }
}
toggleMenu()


