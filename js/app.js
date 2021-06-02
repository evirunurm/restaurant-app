import {
	contentArray
}
from "./content.js";

let cartArray = [];
let arrayPrintedCart = [];
// PÁGINAS VAR
let menu = document.querySelector(".menu");
let cart = document.querySelector(".cart");

// BOTONES NAVEGACIÓN VAR
let cartPage = document.querySelector(".cart-page");
let buttonCart = document.querySelector(".boton-cart");
let buttonMain = document.querySelector(".cart-nav__back");

// BOTONES NAVEGACIÓN FUNCTIONES Y LISTENERS
buttonCart.addEventListener("click", function() {
	changePage(cartPage);
});
buttonMain.addEventListener("click", function() {
	changePage(cartPage);
});

function changePage(page) {
	if (window.getComputedStyle(page).display == "block") {
		page.style.display = "none";
	} else if (window.getComputedStyle(page).display == "none") {
		page.style.display = "block";
	}
}



function translateElementToID(element) {
	let elementID = element.parentNode.getAttribute("data-content_id");
	return elementID;
}

function addItem(element) {
	let elementID = translateElementToID(element);
	let contentItem = contentArray.find(contentItem => contentItem.id == elementID)
	if (isItemInCart(elementID)) {
		contentItem.count++
		updateCount(contentItem);
	} else {
		contentItem.count++
		cartArray.push(contentItem);
		updateCount(contentItem);
		printCart(contentItem);
	}
}

function isItemInCart(elementID) {
	if (cartArray.find(cartItem => cartItem.id == elementID)) {
		return true;
	}
	return false;
}

function removeItem(element) {
	let elementID = translateElementToID(element);
	let contentItem = contentArray.find(contentItem => contentItem.id == elementID)

	if (contentItem.count == 1) {
		contentItem.count--
		removeFromCartArray(contentItem)
	} else if (contentItem.count == 0) {

	} else {
		contentItem.count--
		updateCount(contentItem);
	}
	return
}

function removeFromCartArray(contentItem) {
	let indexItem = cartArray.indexOf(contentItem);
	cartArray.splice(indexItem, 1);
}

function printCart(item) {
	createItem(item)
}

function updateCount(itemToUpdate) {
	HERE TO CONTINUE
}

function createItem(item) {
	let cartItem = document.createElement("div");
	cartItem.className = "cart__item";
	cartItem.innerHTML = `
		<div class="cart__item-img-container">
			<img class="cart__item-img" src="${item.imgSrc}" alt="">
		</div>
		<div class="cart__item-text">
			<h3 class="cart__item-price">${item.price + ".00"}</h3>
			<h3 class="cart__item-title">${item.title}</h3>
			<p class="cart__item-desc">${item.description}</p>
			<div class="cart__item-amount" data-content_id='${item.id}'>
				<div class="cart__item-amount-minus">
					<h3>-</h3>
				</div>
				<h3 class="cart__item-amount-count">${"0" + item.count}</h3>
				<div class="cart__item-amount-plus">
					<h3>+</h3>
				</div>
			</div>
		</div>
		`;
	cart.appendChild(cartItem);
}

start();
// LOAD THE DATA INTO THE MENU PAGE
function start() {
	contentArray.forEach(function(contentItem, i) {
		let menuItem = printData(contentArray[i]); // PRINT THE DATA AND SET EACH ITEM TO MANU ITEM
		let plusButton = menuItem.querySelector(".menu__item-amount-plus");
		let minusButton = menuItem.querySelector(".menu__item-amount-minus");
		plusButton.addEventListener("click", function() {
			addItem(this);
		});
		minusButton.addEventListener("click", function() {
			removeItem(this);
		});
	});
}


// PRINT THE DATA INTO THE MENU PAGE
function printData(contentItem) {
	let menuItem = document.createElement("div");
	menuItem.className = "menu__item";
	menuItem.innerHTML = `
		<div class="menu__item-img-container">
			<img class="menu__item-img" src="${contentItem.imgSrc}" alt="">
		</div>
	  <div class="menu__item-text">
	    <h3 class="menu__item-price">${contentItem.price + ".00"}</h3>
	    <h3 class="menu__item-title">${contentItem.title}</h3>
	    <p class="menu__item-desc">${contentItem.description}</p>
	    <div class="menu__item-amount" data-content_id='${contentItem.id}'>
	      <div class="menu__item-amount-minus">
	        <h3>-</h3>
	      </div>
	      <h3 class="menu__item-amount-count">${"0" + contentItem.count}</h3>
	      <div class="menu__item-amount-plus">
	        <h3>+</h3>
	      </div>
	    </div>
	  </div>
		`;
	menu.appendChild(menuItem);
	return menuItem;
}




// addCart()
//
// function addCart(contentItem) {
// 	contentArray.find(element => element.id === 5000);
// }
//
//
// if (!(cartArray.includes(contentItem))) {
// 	cartArray.push(contentItem);
// }
// start();









// BOTONES NAVEGACIÓN VAR

// function init() {
// 	contentArray.forEach(function(contentItem, i) {
// 		let menuItem = createObjectMenu(contentArray[i]);
// 		count(menuItem, contentItem);
// 		printCount(contentItem, menuItem)
// 	});
// }
//
// function cartadd(menuItem, contentItem) {
// 	console.log(menuItem.getAttribute("data-id-dish"));
// 	let itemDish = contentArray.find(element)
//
// 	if (!(cartArray.includes(contentItem))) {
// 		cartArray.push(contentItem);
// 		printCount(contentItem, menuItem)
//
// 	}
// 	contentItem.count++;
// }
//
// function createObjectMenu(contentItem) {
// 	let menuItem = document.createElement("div");
// 	menuItem.className = "menu__item";
// 	menuItem.setAttribute("data-id-dish", contentItem.title);
// 	menuItem.innerHTML = `
// 	<div class="menu__item-img-container">
// 		<img class="menu__item-img" src="${contentItem.imgSrc}" alt="">
// 	</div>
//   <div class="menu__item-text">
//     <h3 class="menu__item-price">${contentItem.price + ".00"}</h3>
//     <h3 class="menu__item-title">${contentItem.title}</h3>
//     <p class="menu__item-desc">${contentItem.description}</p>
//     <div class="menu__item-amount">
//       <div class="menu__item-amount-minus">
//         <h3>-</h3>
//       </div>
//       <h3 class="menu__item-amount-count">${"0" + contentItem.count}</h3>
//       <div class="menu__item-amount-plus">
//         <h3>+</h3>
//       </div>
//     </div>
//   </div>
// 	`;
// 	menu.appendChild(menuItem);
// 	return menuItem;
// }
//
//
//
// function count(menuItem, contentItem) {
//
//
// 	let buttonPlus = menuItem.querySelector(".menu__item-amount-plus");
//
// 	buttonPlus.addEventListener("click", cartadd(menuItem, contentItem));
//
// 	let buttonMinus = menuItem.querySelector(".menu__item-amount-minus");
// 	buttonMinus.addEventListener("click", function() {
// 		if (contentItem.count > 0) {
// 			contentItem.count--;
//
// 			printCount(contentItem, menuItem)
// 			updateCart(contentItem)
// 			console.log("finished update")
// 		}
// 	})
// }
//
// function printCount(contentItem, menuItem) {
// 	let countHTML = menuItem.querySelector(".menu__item-amount-count");
// 	if (contentItem.count < 10) {
// 		countHTML.textContent = "0" + contentItem.count;
// 	} else {
// 		countHTML.textContent = contentItem.count;
// 	}
// }
//
// function updateCart(contentItem) {
// 	let cartItem = document.createElement("div");
// 	cartItem.className = "cart__item";
//
// 	cartArray.forEach((cartArrayItem, i) => {
// 		console.log(cartArray);
//
// 		cartItem.innerHTML = `
// 			<div class="cart__item-img-container">
// 				<img class="cart__item-img" src="${contentItem.imgSrc}" alt="">
// 			</div>
// 		  <div class="cart__item-text">
// 		    <h3 class="cart__item-price">${contentItem.price + ".00"}</h3>
// 		    <h3 class="cart__item-title">${contentItem.title}</h3>
// 		    <p class="cart__item-desc">${contentItem.description}</p>
// 		    <div class="cart__item-amount">
// 		      <div class="cart__item-amount-minus">
// 		        <h3>-</h3>
// 		      </div>
// 		      <h3 class="cart__item-amount-count">${"0" + contentItem.count}</h3>
// 		      <div class="cart__item-amount-plus">
// 		        <h3>+</h3>
// 		      </div>
// 		    </div>
// 		  </div>
// 			`;
// 		cart.appendChild(cartItem);
//
// 	});
// }
//
// init();