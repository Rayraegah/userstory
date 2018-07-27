import "./font.css";
import "./app.css";
import Swal from "sweetalert2";
import Clipboard from "clipboard";

let copycmd = new Clipboard(".copy", {
	text: function() {
		return story.textContent;
	}
});

let blurredText = "";
const dataInput = document.querySelectorAll("[data-input]");
const story = document.querySelector(".story");
const inputElements = document.querySelectorAll("input");
const message = document.querySelector(".message");

let generatedStory = message.textContent;

dataInput.forEach(button => {
	return button.addEventListener("click", handleClick);
});

inputElements.forEach(el => {
	return el.addEventListener("focus", handleFocus);
});

inputElements.forEach(el => {
	return el.addEventListener("blur", handleBlur);
});

inputElements.forEach(el => {
	return el.addEventListener("keyup", handleKeyup);
});

copycmd.on("success", function() {
	Swal.fire("Copied!", story.textContent, "success");
});

copycmd.on("error", function() {
	Swal.fire(
		"Failed to copy",
		"Select the following text and press ctrl + c or cmd + c :" +
			story.textContent,
		"error"
	);
});

/**
 * @return {undefined}
 */
function handleClick() {
	const inlineText = document.querySelector(`.${this.dataset.input}`);
	inlineText.focus();
}

/**
 * @return {undefined}
 */
function handleFocus() {
	unFocusOthers();

	const text = document.querySelector(`.${this.dataset.textfield}`);
	text.classList.add("focused");
	blurredText = text.textContent;

	/** @type {string} */
	text.textContent = "";

	/** @type {string} */
	this.value = "";
	message.textContent = text.dataset.message;
}

/**
 * @return {undefined}
 */
function unFocusOthers() {
	const inputs = document.querySelectorAll(".focused");

	inputs.forEach(input => {
		return input.classList.remove("focused");
	});
}

/**
 * @return {undefined}
 */
function handleKeyup() {
	const input = document.querySelector(`.${this.dataset.textfield}`);
	input.textContent = this.value;
}

/**
 * @return {undefined}
 */
function handleBlur() {
	unFocusOthers();

	const text = document.querySelector(`.${this.dataset.textfield}`);
	if ("" === this.value) {
		text.textContent = blurredText;
	} else {
		text.textContent = this.value;
	}

	message.textContent = generatedStory;
}
