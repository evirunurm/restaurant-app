///////////////// CATEGORIZE /////////////////
import {
	contentArray
}
from "./content.js";

function startCategorization() {
	let categories = Array.from(document.querySelectorAll(".clasification__item"));
	let categoryTurnedOn = false;

	categories.forEach((item, i) => {
		let categoryName = item.getAttribute(`data-category`); //GET ALL CATEGORIES PRESENT ON HTML
		let categoryButton = document.querySelector(`[data-category="${categoryName}"]`) //GET ALL HTML BUTTONS FOR CATEGORIES

		categoryButton.addEventListener("click", function() {
			let categoryArray = getItemsCategory(categoryName, categories); //GET AN ARRAY WITH ALL THE ITEMS PERTENECIENTES TO THE CATEGORY

			if (categoryTurnedOn) { // TOGGLE THE CATEGORY BUTTON
				categoryTurnedOn = false;
				changeColorCategoryButton(categoryTurnedOn, categoryButton); // TOGGLE THE CATEGORY BUTTON COLOR
				showAllItems(categoryArray, categoryName); // SHOW ALL THE ITEMS
			} else {
				categoryTurnedOn = true;
				changeColorCategoryButton(categoryTurnedOn, categoryButton);
				hideAlienItems(categoryArray, categoryName);
			}
		});
	});
}

function getItemsCategory(categoryName, categories) {
	let categoryArray; // CREATE VARIABLE FOR THE ARRAY
	for (let i = 0; i < categories.length; i++) { // LOOP THROUGH ALL THE CATEGORIES ON EACH ITEM(i)
		categoryArray = contentArray.filter(contentItem => contentItem.type[i] == categoryName); // FILTER IN CONTENT ONLY THE ONES THAT HAS THE SAME TYPE AS SELECTED CATEGORY
		if (categoryArray.length > 0) { // IF THE REOULTED ARRAY HAS ANY ELEMENT
			return categoryArray;
		}
	}
}

function hideAlienItems(categoryArray, categoryName) {
	let itemsHTML = Array.from(document.querySelectorAll(`.menu__item`)); // FIND ALL HTML DISHES
	let alienItems = []; // CREATE VARIABLE FOR THE ARRAY OF NON SELECTED DISHES
	itemsHTML.forEach((itemHTML, i) => { // LOOP THROUGH ALL DISHES IN EXISTANCE
		itemHTML.style.display = "none"; // HIDE ALL OF THEM
		for (let i = 0; i < categoryArray.length; i++) { // LOOP THOUGHT ALL SELECTED ITEMS
			if (itemHTML.getAttribute("data-content_id") == categoryArray[i].id) { // CHECK EACH HTML ITEM, IF IT HAS THE SANE ID AS THE SELECTED ONES
				itemHTML.style.display = "flex"; // IF IT HAS --> MAKE IT APPEAR
			}
		}
	});
}

function showAllItems() {
	let itemsHTML = Array.from(document.querySelectorAll(`.menu__item`)); // FIND ALL HTML DISHES
	itemsHTML.forEach((itemHTML, i) => { // SHOW THEM ALL
		itemHTML.style.display = "flex";
	});
}

function changeColorCategoryButton(categoryTurnedOn, categoryButton) {
	if (categoryTurnedOn) { // IF THE CATEGORY IS SELECTED
		categoryButton.style.backgroundColor = "grey"; // COLOR --> GREY
	} else { // IF NOT
		categoryButton.style.backgroundColor = "white"; // COLOR --> WHITE
	}
}
export {
	startCategorization
};