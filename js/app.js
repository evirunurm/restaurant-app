import {
	contentArray
}
from "./content.js";

// BUTTONS NAVEGATION VAR
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

//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////
let subTotalSum = 0;
let cartArray = [];
let arrayPrintedCart = [];

// PAGES VAR
let menu = document.querySelector(".menu");
let cart = document.querySelector(".cart");

// LOAD THE DATA INTO THE MENU PAGE
function start() {
	contentArray.forEach(function(contentItem, i) { //TAKE EACH DATA
		let menuItem = printData(contentArray[i]); // PRINT THE DATA AND SET EACH ITEM TO MANU ITEM
		let plusButton = menuItem.querySelector(".menu__item-amount-plus");
		let minusButton = menuItem.querySelector(".menu__item-amount-minus");
		plusButton.addEventListener("click", function() { // EVENT LISTENER TO INTERACT WITH + BUTTONS
			addItem(this);
		});
		minusButton.addEventListener("click", function() { // EVENT LISTENER TO INTERACT WITH - BUTTONS
			removeItem(this);
		});
	});
}

// FUNCTION TO PRINT AN ITEM IN THE MAIN MENU PAGE IN START PAGE
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

// TRANSLATE SELECTED ITEMS'S PLUS / MINUS TO THE ELEMENT'S ID
function translateElementToID(element) {
	let elementID = element.parentNode.getAttribute("data-content_id");
	return elementID;
}

// SUM COUNT IN CASE +
function addItem(element) {
	let elementID = translateElementToID(element);
	let contentItem = contentArray.find(contentItem => contentItem.id == elementID)
	if (isItemInCart(elementID)) { // ASK IF IT'S IN THE CART TO KNOW IF WE SHOULD ADD IT OR NOT
		contentItem.count++
		updateCount(contentItem, elementID);
	} else {
		contentItem.count++
		cartArray.push(contentItem);
		updateCount(contentItem, elementID);
		printItemCart(contentItem)
	}
	sumTotalPrice(contentItem, true)
}

// SUBSTRACT COUNT IN CASE -
function removeItem(element) {
	let elementID = translateElementToID(element);
	let contentItem = contentArray.find(contentItem => contentItem.id == elementID)

	if (contentItem.count == 1) {
		contentItem.count--
		updateCount(contentItem, elementID);
		removeFromCartArray(contentItem);
		removeFromCart(elementID);
		sumTotalPrice(contentItem, false);
	} else if (contentItem.count == 0) {

	} else {
		contentItem.count--
		updateCount(contentItem, elementID);
		sumTotalPrice(contentItem, false);
	}

	return
}
// REMOVE ITEM FROM ARRAY CART IN CASE 0
function removeFromCartArray(contentItem) {
	let indexItem = cartArray.indexOf(contentItem);
	cartArray.splice(indexItem, 1);
}

// REMOVE ITEM FROM HTML CART IN CASE 0
function removeFromCart(elementID) {
	let element = document.querySelector(`.cart__item[data-content_id="${elementID}"]`);
	element.remove();
}

// UPDATE THE COUNT IN CART AND MENU
function updateCount(itemToUpdate, elementID) {
	// MENU
	let countContentArray = document.querySelectorAll(".menu__item-amount-count");
	countContentArray.forEach((countItem, i) => {
		if (countItem.parentNode.getAttribute("data-content_id") == itemToUpdate.id) {
			if (itemToUpdate.count < 10) {
				countItem.textContent = "0" + itemToUpdate.count;
			} else {
				countItem.textContent = itemToUpdate.count;
			}
		}

	});
	// CART
	let countCartArray = document.querySelectorAll(".cart__item-amount-count");
	countCartArray.forEach((countItem, i) => {
		if (countItem.parentNode.getAttribute("data-content_id") == itemToUpdate.id) {
			if (itemToUpdate.count < 10) {
				countItem.textContent = "0" + itemToUpdate.count;
			}
		}
	});
}

// ASK IF THE ITEM IS ON THE CART
function isItemInCart(elementID) {
	if (cartArray.find(cartItem => cartItem.id == elementID)) {
		return true;
	}
	return false;
}

// PRINT HTML ITEM IN CART
function printItemCart(dataToPrint) {
	let cartItem = document.createElement("div");
	cartItem.className = "cart__item";
	cartItem.setAttribute("data-content_id", `${dataToPrint.id}`);
	cartItem.innerHTML = `
		<div class="cart__item-img-container">
			<img class="cart__item-img" src="${dataToPrint.imgSrc}" alt="">
		</div>
		<div class="cart__item-text">
			<h3 class="cart__item-price">${dataToPrint.price + ".00"}</h3>
			<h3 class="cart__item-title">${dataToPrint.title}</h3>
			<p class="cart__item-desc">${dataToPrint.description}</p>
			<div class="cart__item-amount" data-content_id='${dataToPrint.id}'>
				<div class="cart__item-amount-minus">
					<h3>-</h3>
				</div>
				<h3 class="cart__item-amount-count">${"0" + dataToPrint.count}</h3>
				<div class="cart__item-amount-plus">
					<h3>+</h3>
				</div>
			</div>
		</div>
		`;
	cart.appendChild(cartItem);
	let plusButtonCart = cartItem.querySelector(".cart__item-amount-plus");
	let minusButtonCart = cartItem.querySelector(".cart__item-amount-minus");
	plusButtonCart.addEventListener("click", function() { // EVENT LISTENER TO INTERACT WITH + BUTTONS
		addItem(this);
	});
	minusButtonCart.addEventListener("click", function() { // EVENT LISTENER TO INTERACT WITH - BUTTONS
		removeItem(this);
	});
}

//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////

function sumTotalPrice(item, identifier) {
	if (identifier && subTotalSum >= 0) {
		subTotalSum += item.price;
	} else if (!(identifier) && subTotalSum > 0) {
		subTotalSum -= item.price;
	}
	printSubtotalPrice(subTotalSum);
}

function printSubtotalPrice(subTotalSum) {
	let subtotalPriceDOM = document.querySelector(".summary__total__price");
	// HERE GO FEE + DELIVERY
	switch (subTotalSum.toString().split("").length) {
		case 1:
			subtotalPriceDOM.textContent = "0" + subTotalSum + ".00";
			break;
		case 2:
			subtotalPriceDOM.textContent = subTotalSum + ".00";
			break;
		case 3:
		case 4:
			subtotalPriceDOM.textContent = subTotalSum + ".00";
			break;
		default:
	}
}









start();









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