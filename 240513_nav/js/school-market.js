// data.json -> js -> html

const setData = (data) => {
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

const getData = () => {
    const fileName = "js/data.json"

    fetch(fileName) // 백엔드가 있을 때는 backend api url 넣어주기~~
        .then((res) => res.json()) // json으로 바꾸고
        .then((data) => setData(data)) // 다른 함수로 쏘고~~
        .catch((error) => console.error(error))
}

getData()
