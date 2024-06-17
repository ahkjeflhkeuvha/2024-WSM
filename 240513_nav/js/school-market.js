// data.json -> js -> html

let allData

const showData = (data) => {
    console.log(data)

        // data들을 하나씩 꺼내서
        // article 만들기
        // product-container에 추가

        let productContainerString = ""

        data.forEach((element) => {
            let articleStr = `<article class="product-item" >
                <img src="images/${element.image}" alt="">
                    <div class="name">${element.name}</div>
            </article>\n`
            productContainerString += articleStr
        })

        const productContainerDiv = document.getElementsByClassName('product-container')[0]
        productContainerDiv.innerHTML = productContainerString

}

const setData = (data) => {
    allData = data
    showData(data)
}

const getData = () => {
    const fileName = "js/data.json"

    fetch(fileName) // 백엔드가 있을 때는 backend api url 넣어주기~~
        .then((res) => res.json()) // json으로 바꾸고
        .then((data) => setData(data)) // 다른 함수로 쏘고~~
        .catch((error) => console.error(error))
}

getData()

const searchData = (query) => {
    if(query === "") showData(allData) // 아무것도 입력하지 않을 시 전체 데이터 출력
    else {
        let data = allData.filter((oneData) => oneData.name.includes(query) || oneData.category.includes(query))
        // 전체 데이터에서 하나 꺼내 name에 query가 있는지 확인~~
        showData(data)
    }
}
