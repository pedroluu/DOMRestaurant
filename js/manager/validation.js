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
function checkFileExtension(file, allowedExtensions) {
  let fileExtension = file.name.split(".").pop().toLowerCase();
  return allowedExtensions.some((extension) => {
    return extension === fileExtension;
  });
}
function checkFileSize(file, size) {
  return file.size > size * 1024;
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

function newDishValidation(handler) {
  const form = document.forms.fNewDish;
  form.setAttribute("novalidate", "");

  form.addEventListener("submit", function (event) {
    let isValid = true;
    let firstInvalidElement = null;

    this.npDescription.value = this.npDescription.value.trim();
    showFeedBack(this.npDescription, true);

    if (!this.npAllergens.checkValidity()) {
      isValid = false;
      showFeedBack(this.npAllergens, false);
      firstInvalidElement = this.npAllergens;
    } else {
      showFeedBack(this.npAllergens, true);
    }

    if (!this.npCategories.checkValidity()) {
      isValid = false;
      showFeedBack(this.npCategories, false);
      firstInvalidElement = this.npCategories;
    } else {
      showFeedBack(this.npCategories, true);
    }

    if (!this.npIngredients.checkValidity()) {
      isValid = false;
      showFeedBack(this.npIngredients, false);
      firstInvalidElement = this.npIngredients;
    } else {
      showFeedBack(this.npIngredients, true);
    }

    if (!this.npName.checkValidity()) {
      isValid = false;
      showFeedBack(this.npName, false);
      firstInvalidElement = this.npName;
    } else {
      showFeedBack(this.npName, true);
    }

    if (!isValid) {
      firstInvalidElement.focus();
    } else {
      const categories = [...this.npCategories.selectedOptions].map(
        (option) => option.value
      );
      const allergens = [...this.npAllergens.selectedOptions].map(
        (option) => option.value
      );
      handler(
        this.npName.value,
        this.npIngredients.value,
        this.npImage.value,
        this.npDescription.value,
        categories,
        allergens
      );
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
    this.npName.focus();
  });

  form.npName.addEventListener("change", defaultCheckElement);
  form.npIngredients.addEventListener("change", defaultCheckElement);
  form.npDescription.addEventListener("change", defaultCheckElement);

  form.npImage.addEventListener("change", function (event) {
    const size = 100;
    if (!this.value) {
      const message = "Adjuntar un fichero es obligatorio.";
      showFeedBack(this, false, message);
    } else if (!checkFileExtension(this.files[0], ["jpg", "png", "gif"])) {
      const message =
        "Debe seleccionar un archivo con extensión jpg, png ogif.";
      showFeedBack(this, false, message);
    } else if (checkFileSize(this.files[0], size)) {
      const message = `El archivo ${this.files[0].name} no debe ser mayor a
    ${size}KB`;
      showFeedBack(this, false, message);
    } else {
      showFeedBack(this, true);
    }
  });
}

function newRestaurantValidation(handler) {
  const form = document.forms.fNewRestaurant;
  form.setAttribute("novalidate", true);
  form.addEventListener("submit", function (event) {
    let isValid = true;
    let firstInvalidElement = null;
    this.nrDescription.value = this.nrDescription.value.trim();
    showFeedBack(this.nrDescription, true);
    if (!this.nrName.checkValidity()) {
      isValid = false;
      showFeedBack(this.nrName, false);
      firstInvalidElement = this.ncTitle;
    } else {
      showFeedBack(this.nrName, true);
    }
    if (!isValid) {
      firstInvalidElement.focus();
    } else {
      handler(this.nrName.value, this.nrDescription.value);
    }
    event.preventDefault();
    event.stopPropagation();
  });
  form.addEventListener("reset", function (event) {
    for (const div of this.querySelectorAll(
      "div.valid-feedback,div.invalid-feedback"
    )) {
      div.classList.remove("d-block");
      div.classList.add("d-none");
    }
    for (const input of this.querySelectorAll("input")) {
      input.classList.remove("is-valid");
      input.classList.remove("is-invalid");
    }
    this.nrName.focus();
  });
  form.nrName.addEventListener("change", defaultCheckElement);
}

export { newCategoryValidation, newDishValidation, newRestaurantValidation };
