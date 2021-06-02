import {
	contentArray
}
from "./content.js";

let cartArray = [];
// PÁGINAS VAR
let cartPage = document.querySelector(".cart-page");
let menu = document.querySelector(".menu");
let cart = document.querySelector(".cart");

// BOTONES NAVEGACIÓN VAR
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

// BOTONES NAVEGACIÓN VAR

function init() {
	contentArray.forEach(function(contentItem, i) {
		let menuItem = createObjectMenu(contentArray[i]);
		count(menuItem, contentItem);
		printCount(contentItem, menuItem)
	});
}

function cartadd(menuItem, contentItem) {
	console.log(menuItem.getAttribute("data-id-dish"));
	let itemDish = contentArray.find(element)

	if (!(cartArray.includes(contentItem))) {
		cartArray.push(contentItem);
		printCount(contentItem, menuItem)

	}
	contentItem.count++;

}

function createObjectMenu(contentItem) {
	let menuItem = document.createElement("div");
	menuItem.className = "menu__item";
	menuItem.setAttribute("data-id-dish", contentItem.title);
	menuItem.innerHTML = `
	<div class="menu__item-img-container">
		<img class="menu__item-img" src="${contentItem.imgSrc}" alt="">
	</div>
  <div class="menu__item-text">
    <h3 class="menu__item-price">${contentItem.price + ".00"}</h3>
    <h3 class="menu__item-title">${contentItem.title}</h3>
    <p class="menu__item-desc">${contentItem.description}</p>
    <div class="menu__item-amount">
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



function count(menuItem, contentItem) {


	let buttonPlus = menuItem.querySelector(".menu__item-amount-plus");

	buttonPlus.addEventListener("click", cartadd(menuItem, contentItem));

	let buttonMinus = menuItem.querySelector(".menu__item-amount-minus");
	buttonMinus.addEventListener("click", function() {
		if (contentItem.count > 0) {
			contentItem.count--;

			printCount(contentItem, menuItem)
			updateCart(contentItem)
			console.log("finished update")
		}
	})
}

function printCount(contentItem, menuItem) {
	let countHTML = menuItem.querySelector(".menu__item-amount-count");
	if (contentItem.count < 10) {
		countHTML.textContent = "0" + contentItem.count;
	} else {
		countHTML.textContent = contentItem.count;
	}
}

function updateCart(contentItem) {
	let cartItem = document.createElement("div");
	cartItem.className = "cart__item";

	cartArray.forEach((cartArrayItem, i) => {
		console.log(cartArray);

		cartItem.innerHTML = `
			<div class="cart__item-img-container">
				<img class="cart__item-img" src="${contentItem.imgSrc}" alt="">
			</div>
		  <div class="cart__item-text">
		    <h3 class="cart__item-price">${contentItem.price + ".00"}</h3>
		    <h3 class="cart__item-title">${contentItem.title}</h3>
		    <p class="cart__item-desc">${contentItem.description}</p>
		    <div class="cart__item-amount">
		      <div class="cart__item-amount-minus">
		        <h3>-</h3>
		      </div>
		      <h3 class="cart__item-amount-count">${"0" + contentItem.count}</h3>
		      <div class="cart__item-amount-plus">
		        <h3>+</h3>
		      </div>
		    </div>
		  </div>
			`;
		cart.appendChild(cartItem);

	});
}


init();





// function checkIfInCart(item) {
// 	if (cartArray.includes(item)) {
//
// 	}
// }



// // ADD AND SUBSTRACT COUNT
// function addCountMenuItem(menuItem, i) {
//
// 	let itemCount = menuItem.querySelector(".menu__item-amount-count");
// 	let plusItemMenu = menuItem.querySelector(".menu__item-amount-plus");
// 	plusItemMenu.addEventListener("click", function() {
// 		addCount(itemCount, menuItem);
// 		let cartArrayAndCartItem = addToCartArray(menuItem);
// 		let cartArray = cartArrayAndCartItem[0];
// 		let cartItem = cartArrayAndCartItem[1];
//
// 		updateCount(cartItem, menuItem);
// 	})
// 	let minusItemMenu = menuItem.querySelector(".menu__item-amount-minus");
// 	minusItemMenu.addEventListener("click", function() {
// 		substractCount(itemCount, menuItem);
// 	})
// 	return cartArray;
// }
//
// // ADD COUNT FUNCTION
// function addCount(itemCount, menuItem) {
// 	let itemCountNum = parseInt(itemCount.textContent)
// 	if (itemCountNum < 9) {
// 		itemCountNum++
// 		itemCount.textContent = "0" + itemCountNum;
// 	} else {
// 		itemCountNum++
// 		itemCount.textContent = itemCountNum;
// 	}
// }
//
// // SUBSTRACT COUNT FUNCTION
// function substractCount(itemCount, menuItem) {
// 	let itemCountNum = parseInt(itemCount.textContent)
// 	if (itemCountNum > 10) {
// 		itemCountNum--
// 		itemCount.textContent = itemCountNum;
// 	} else if (itemCountNum <= 10 && itemCountNum > 0) {
// 		itemCountNum--
// 		itemCount.textContent = "0" + itemCountNum;
// 	}
// }
//
// // ADD ALL THE ELEMENTS WITH +1 COUNT TO AN ARRAY.
// function addToCartArray(menuItem) {
// 	let itemCount = menuItem.querySelector(".menu__item-amount-count");
// 	let cartItem;
// 	if (!(cartArray.includes(menuItem))) {
// 		cartArray.push(menuItem);
// 		cartItem = createObjectCart(menuItem);
// 	} //HERE IS THE PROBLEM
// 	//HERE IS THE PROBLEM
// 	//HERE IS THE PROBLEM
// 	//HERE IS THE PROBLEM
// 	//HERE IS THE PROBLEM
// 	//HERE IS THE PROBLEM
// 	return [cartArray, cartItem];
// }
//
// function createObjectCart(menuItem) {
// 	let cartItem = document.createElement('div');
// 	// HERE IS THE PROBLEM, DOUBLE PRINT ON CART. IF?? POP INSTEAD OF PRINT ALL.
// 	cartItem.className = "cart__item";
// 	cartItem.innerHTML = menuItem.innerHTML;
// 	cart.appendChild(cartItem);
// 	return cartItem
// }
//
// //
// function updateCount(cartItem, menuItem) {
// 	console.log(cartItem)
//
// 	let cartItemCount = cartItem.querySelector(".menu__item-amount-count");
// 	console.log(cartItemCount)
// 	let menuItemCount = menuItem.querySelector(".menu__item-amount-count");
// 	// cartItemCount.textContent = menuItemCount.textContent
//
// }