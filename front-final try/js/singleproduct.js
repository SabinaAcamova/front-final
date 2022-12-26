$("#owl").owlCarousel({
  loop: true,
  margin: 10,
  nav: true,
  responsive: {
    0: {
      items: 2,
    },
    600: {
      items: 3,
    },
    1000: {
      items: 4,
    },
  },
});

$("#owl-four").owlCarousel({
  loop: true,
  margin: 10,
  nav: true,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 2,
    },
    1000: {
      items: 4,
    },
  },
});


let menubtn = document.querySelector('.menuwrapper')
let closemenubtn = document.querySelector('.top-menu-closer i')
let mobilemenu = document.querySelector('.mobile-menu')
let body = document.querySelector('body')
menubtn.addEventListener('click', function () {
  mobilemenu.style.transform = 'translateX(0)'
  closemenubtn.addEventListener('click', () => {
    mobilemenu.style.transform = 'translateX(-100%)'
  })

})
let searchbtn = document.querySelector('.bi-search')
let search = document.querySelector('.search')
searchbtn.addEventListener('click', () => {
  search.classList.toggle('active')
  // body.addEventListener('click', () => {
  //     search.classList.remove('active')
  // }, true)
})
let registersection = document.querySelector('.register i')
let registerdrop = document.querySelector('.register-dropdown')
registersection.addEventListener('click', () => {
  registerdrop.classList.toggle('active')
  // registerdrop.style.border = '1px solid rgb(96, 96, 96)'
  // body.addEventListener('click', () => {
  //     registerdrop.classList.toggle('active')
  //     // registerdrop.style.border = 'none'
  // }, true)
})
let basketbtn = document.getElementById('basketbtn')
let cardbox = document.querySelector('.cardbox')
basketbtn.addEventListener('click', function () {

  cardbox.classList.toggle('active')
})

let header = document.querySelector('header')
document.addEventListener('scroll', function () {
  if (window.scrollY > header.offsetHeight) {
    header.classList.add('headeractive')
  }
  else {
    header.classList.remove('headeractive')

  }
})
//#region  basket
let addBtns = document.querySelectorAll('.product-wrapper .addbtn')
function SetId() {
  let id = 0;
  addBtns.forEach((addBtn) => {
    id++
    addBtn.parentElement.setAttribute("id", id);
  })
}
SetId();
let basket = JSON.parse(localStorage.getItem('basket')) || [];
let basketSpan = document.getElementById('basketCount')
basketSpan.innerText = basket.length;
addBtns.forEach((addBtn) => {
  addBtn.addEventListener('click', function () {
    let basket = JSON.parse(localStorage.getItem('basket')) || [];
    let productName = addBtn.previousElementSibling.firstElementChild.innerText;
    let productPrice = addBtn.previousElementSibling.lastElementChild.innerText.slice(1);
    let productImage = addBtn.parentElement.previousElementSibling.firstElementChild.src;
    let productId = addBtn.parentElement.getAttribute('id');
    let product = {
      name: productName,
      price: productPrice,
      count: 1,
      id: productId,
      image: productImage
    }
    let existed = basket.find((product) => {
      return product.id == productId
    })
    var basketElement = document.createElement('div');

    if (!existed) {
      basket.push(product)
      basketElement.classList.add('row')
      basketElement.classList.add('cardbox__row')
      basketElement.innerHTML = `
                    <div class="cardbox__row__image col-3">
                        <img src="${product.image}"
                            alt="img">
                    </div>
                    <div class="cardbox__row__desc col-6">
                        <span class="count"> ${product.count} X</span>
                        <span class="name">${product.name} </span>
                        <span class="price">$${product.price}</span>
                        <span class= "id">${productId}</span>
                    </div>
                    <div class="cardbox__row__delete-btn col-3">
                        <span class="deleteItem" ><i class="bi bi-x"></i></span>
                    </div>`
      cardbox.prepend(basketElement)
    }
    else {
      existed.count++
      document.querySelectorAll('.cardbox__row .id').forEach((element) => {
        element.innerText == existed.id ? element.parentElement.firstElementChild.innerText = existed.count + "X" : false;
      })
    }


    localStorage.setItem("basket", JSON.stringify(basket))
    let basketSpan = document.getElementById('basketCount')
    basketSpan.innerText = basket.length;
    deleteItem()
    emptyCard()

    SubTotal()
  })

})

SetBasketElements()

function SetBasketElements() {
  let basket = JSON.parse(localStorage.getItem('basket'))
  basket.forEach((element) => {
    var basketElement = document.createElement('div');
    basketElement.classList.add('row')
    basketElement.classList.add('cardbox__row')

    basketElement.innerHTML = `
                <div class="cardbox__row__image col-3">
                    <img src="${element.image}"
                        alt="img">
                </div>
                <div class="cardbox__row__desc col-6">
                    <span id="elementCount" class="count"> ${element.count} X</span>
                    <span class="name">${element.name}</span>
                    <span class="price">$${element.price}</span>
                    <span class= "id">${element.id}</span>

                </div>
                <div class="cardbox__row__delete-btn col-3">
                    <span class="deleteItem"><i class="bi bi-x"></i></span>
                </div>`
    cardbox.prepend(basketElement)
  })

}
SubTotal()
function SubTotal() {
  let basket = JSON.parse(localStorage.getItem('basket'))

  let subTotal = basket.reduce((t, element) => {
    return t += element.count * element.price
  }, 0)
  let subtotalsection = document.getElementById('total-price')
  subtotalsection.innerText = '$' + subTotal
  return subTotal;

}
deleteItem()
function deleteItem() {

  let basket = JSON.parse(localStorage.getItem('basket'))
  let deleteBtns = document.querySelectorAll('.deleteItem')
  if (deleteBtns) {
    deleteBtns.forEach((deleteBtn) => {
      deleteBtn.addEventListener('click', function () {
        let deleteId = deleteBtn.parentElement.previousElementSibling.lastElementChild.innerText
        let mapbasket = basket.map((element) => {
          if (element.id !== deleteId) {
            return element
          }

        })
        let filtered = mapbasket.filter((element) => {
          return element
        })
        basket = filtered
        localStorage.setItem('basket', JSON.stringify(basket))
        deleteBtn.parentElement.parentElement.remove()
        let basketSpan = document.getElementById('basketCount')
        basketSpan.innerText = basket.length;
        SubTotal()
        emptyCard()

      })
    })
  }

}
emptyCard()
function emptyCard() {
  let cardboxContent = document.querySelector('.cardbox__content')
  let emptyCard = document.querySelector('.cardbox__empty')
  let basket = JSON.parse(localStorage.getItem('basket'))
  if (basket.length == 0) {
    emptyCard.classList.remove('active')
    cardboxContent.classList.add('active')

  }
  else {
    emptyCard.classList.add('active')
    cardboxContent.classList.remove('active')
  }
}
//#endregion
