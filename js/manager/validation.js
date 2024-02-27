function showFeedBack(input, valid, message) {
  const validClass = valid ? "is-valid" : "is-invalid";
  const messageDiv = valid
    ? input.parentElement.querySelector("div.valid-feedback")
    : input.parentElement.querySelector("div.invalid-feedback");
  for (const div of input.parentElement.getElementsByTagName("div")) {
    div.classList.remove("d-block");
  }
  messageDiv.classList.remove("d-none");
  messageDiv.classList.add("d-block");
  input.classList.remove("is-valid");
  input.classList.remove("is-invalid");
  input.classList.add(validClass);
  if (message) {
    messageDiv.innerHTML = message;
  }
}
function defaultCheckElement(event) {
  this.value = this.value.trim();
  if (!this.checkValidity()) {
    showFeedBack(this, false);
  } else {
    showFeedBack(this, true);
  }
}

function newCategoryValidation(handler) {
  const form = document.forms.fNewCategory;
  form.setAttribute("novalidate", true);
  form.addEventListener("submit", function (event) {
    let isValid = true;
    let firstInvalidElement = null;
    this.ncDescription.value = this.ncDescription.value.trim();
    showFeedBack(this.ncDescription, true);
    if (!this.ncName.checkValidity()) {
      isValid = false;
      showFeedBack(this.ncName, false);
      firstInvalidElement = this.ncName;
    } else {
      showFeedBack(this.ncName, true);
    }
    if (!isValid) {
      firstInvalidElement.focus();
    } else {
      handler(this.ncName.value, this.ncDescription.value);
    }
    event.preventDefault();
    event.stopPropagation();
  });
  form.addEventListener("reset", function (event) {
    for (const div of this.querySelectorAll(
      "div.valid-feedback, div.invalid-feedback"
    )) {
      div.classList.remove("d-block");
      div.classList.add("d-none");
    }
    for (const input of this.querySelectorAll("input")) {
      input.classList.remove("is-valid");
      input.classList.remove("is-invalid");
    }
    this.ncName.focus();
  });
  form.ncName.addEventListener("change", defaultCheckElement);
}

export { newCategoryValidation };
