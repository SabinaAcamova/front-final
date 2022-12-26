let singleprod = document.createElement('tr')
singleprod.classList.add('pro-desc')
singleprod.classList.add('shopcard__rows')
singleprod.innerHTML = `  <tr class="pro-desc shopcard__rows">
<td class="image">
    <img src=""
        alt="">
</td>
<td class="pro-name">
   
</td>
<td class="pro-ID">
    Product <span class="id"></span>
</td>
<td class="pro-count">
    <div class="input-group">
        <input type="text" placeholder="">
        <button class="refresh-btn"><i class="fa-solid fa-rotate"></i></button>
        <button class="remove-btn"><i class="bi bi-x-circle"></i></button>
    </div>
</td>
<td class="pro-price price">
    <span class="price"></span>
</td>
<td class="pro-total-price price"></td>
</tr>
`
let prodImg = singleprod.querySelector('.image img');
let prodName = singleprod.querySelector('.pro-name');
let prodId = singleprod.querySelector('.pro-ID .id')
let prodCount = singleprod.querySelector('.pro-count input')
let prodPrice = singleprod.querySelector('.pro-price .price')
let prodsTotalPrice = singleprod.querySelector(' .pro-total-price')

addProductToCard()
deleteToCard()
function addProductToCard() {
    basket = JSON.parse(localStorage.getItem('basket'))
    const row = document.querySelector('.shoptable tbody')


    basket.forEach(product => {
        let totalPrice = product.count * product.price;

        prodImg.src = product.image
        prodName.innerHTML = product.name;
        prodId.innerHTML = product.id
        prodCount.placeholder = product.count
        prodPrice.innerHTML = '$' + product.price;
        prodsTotalPrice.innerHTML = '$' + totalPrice;
        row.innerHTML += singleprod.outerHTML

    });
}
function deleteToCard() {
    let basket = JSON.parse(localStorage.getItem('basket'))
    let deleteBtns = document.querySelectorAll('.remove-btn')

    deleteBtns.forEach((deleteBtn) => {
        deleteBtn.addEventListener('click', function () {
            let prodId = deleteBtn.parentElement.parentElement.previousElementSibling.firstElementChild.innerText;
            let deletedElement = basket.find((element) => {
                return element.id == prodId
            })
            basket.splice(basket.indexOf(deletedElement), 1)
            localStorage.setItem('basket', JSON.stringify(basket))
            deleteBtn.parentElement.parentElement.parentElement.remove()
            window.location.reload()

        })
    })
} changeCount()
function changeCount() {
    let basket = JSON.parse(localStorage.getItem('basket'))
    let refreshBtns = document.querySelectorAll('.refresh-btn')
    refreshBtns.forEach((refreshBtn) => {
        refreshBtn.addEventListener('click', function () {
            console.log('sa');

            let id = refreshBtn.parentElement.parentElement.previousElementSibling.firstElementChild.innerText;
            let newCount = refreshBtn.previousElementSibling.value
            console.log(newCount);
            basket.map((element) => {
                element.id === id ? element.count = newCount : false;
                localStorage.setItem('basket', JSON.stringify(basket))
                window.location.reload()

            })
        })
    })
}
ChangeStyle()
function ChangeStyle() {
    let shopCard = document.querySelector('.shopCard')
    let errorPage = document.querySelector('.error-page')
    let basket = JSON.parse(localStorage.getItem('basket'))
    if (basket.length!=0) {
        shopCard.style.display = 'block'
        errorPage.style.display = 'none'
    } else {
        shopCard.style.display = 'none'
        errorPage.style.display = 'block'
    }
}
Sub()
function Sub(){
    let subTotal = document.querySelector('.SumTable .sub')
    let total = SubTotal();
    subTotal.innerText = '$' + total 
    function SubTotal() {
        let basket = JSON.parse(localStorage.getItem('basket'))
    
        let subTotal = basket.reduce((t, element) => {
            return t += element.count * element.price
        }, 0)
        let subtotalsection = document.getElementById('total-price')
        subtotalsection.innerText = '$' + subTotal
        return subTotal;
    
    }
}
