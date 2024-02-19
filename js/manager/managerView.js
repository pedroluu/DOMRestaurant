class ManagerView {
  constructor() {
    this.categories = document.getElementById("categories");
    this.dishes = document.getElementById("dishes");
    this.menu = document.querySelector(".nav");
  }

  bindInit(handler) {
    document.getElementById("init").addEventListener("click", (event) => {
      handler();
    });
    document.getElementById("logo").addEventListener("click", (event) => {
      handler();
    });
  }

  bindDishCategoryList(handler) {
    const categoryList = document.getElementById("category-list");
    const links = categoryList.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        handler(event.currentTarget.dataset.category);
      });
    }
  }
  bindDishCategoryListInMenu(handler) {
    const navCats = document.getElementById("navCats");
    const links = navCats.nextSibling.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        handler(event.currentTarget.dataset.category);
      });
    }
  }

  showCategories(categories) {
    if (this.categories.children.length > 0)
      this.categories.children[0].remove();

    const container = document.createElement("div");
    container.id = "category-list";
    container.classList.add("row");
    container.style.maxWidth = "1200px"; // Ancho máximo del contenedor
    container.style.marginTop = "5%";
    container.style.marginBottom = "5%";
    container.style.marginLeft = "25%"; // Margen izquierdo automático
    container.style.marginRight = "auto"; // Margen derecho automático

    for (const category of categories) {
      container.insertAdjacentHTML(
        "beforeend",
        `
            <div class="col-lg-3 col-md-6 bg-dark text-center">
                <a data-category="${category.name}" href="#product-list" class="text-decoration-none">
                    <div class="cat-list-image">
                        <img alt="${category.name}" src="./img/${category.name}.jpg" />
                    </div>
                    <div class="cat-list-text text-white">
                        <h3>${category.name}</h3>
                        <div>${category.description}</div>
                    </div>
                </a>
            </div>
        `
      );
    }

    this.categories.append(container);
  }

  showDishes(dishes) {
    if (this.dishes.children.length > 0) this.dishes.children[0].remove();

    const container = document.createElement("div");
    container.id = "dishes-list";
    container.classList.add("row");
    container.style.maxWidth = "1200px"; // Ancho máximo del contenedor
    container.style.marginTop = "5%";
    container.style.marginBottom = "5%";
    container.style.marginLeft = "25%"; // Margen izquierdo automático
    container.style.marginRight = "auto"; // Margen derecho automático

    for (const dish of dishes) {
      container.insertAdjacentHTML(
        "beforeend",
        `
            <div class="col-lg-3 col-md-6 bg-dark text-center">
                <a dish-category="${dish.Dish.name}" href="#product-list" class="text-decoration-none">
                    <div class="dish-list-image">
                        <img alt="${dish.name}" src="${dish.Dish.image}" />
                    </div>
                    <div class="dish-list-text text-white">
                        <h3>${dish.Dish.name}</h3>
                        <div>${dish.Dish.description}</div>
                    </div>
                </a>
            </div>
        `
      );
    }

    this.dishes.append(container);
  }

  showCategoriesInMenu(categories) {
    const li = document.createElement("li");
    li.classList.add("nav-item");
    li.classList.add("dropdown");
    li.insertAdjacentHTML(
      "beforeend",
      `<a class="nav-link dropdown-toggle"
      href="#" id="navCats" role="button"
      data-bs-toggle="dropdown" aria-expanded="false"
      style="text-decoration: none;color: #ffffff;
      font-weight: bold;
      transition: color 0.3s;">Categorías</a>`
    );
    const container = document.createElement("ul");
    container.classList.add("dropdown-menu");
    container.style.backgroundColor = "black";
    for (const category of categories) {
      container.insertAdjacentHTML(
        "beforeend",
        `<li><a data-category="${category.name}" class="dropdown-item" href="#categories">${category.name}</a></li>`
      );
    }
    li.append(container);
    this.menu.append(li);
  }

  listDishes(dishes, name) {
    console.log(dishes);
    this.categories.replaceChildren();
    if (this.categories.children.length > 0)
      this.categories.children[0].remove();

    const container = document.createElement("div");
    container.id = "dish-list";
    container.classList.add("row");
    container.style.maxWidth = "1200px"; // Ancho máximo del contenedor
    container.style.marginTop = "5%";
    container.style.marginBottom = "5%";
    container.style.marginLeft = "18%"; // Margen izquierdo automático
    container.style.marginRight = "auto"; // Margen derecho automático

    for (const dish of dishes) {
      container.insertAdjacentHTML(
        "beforeend",
        `
            <div class="col-lg-3 col-md-6 bg-dark text-center">
                <a dish-category="${name}" href="#product-list" class="text-decoration-none">
                    <div class="dish-list-image">
                        <img alt="${dish.Dish.name}" src="${dish.Dish.image}" />
                    </div>
                    <div class="dish-list-text text-white">
                        <h3>${dish.Dish.name}</h3>
                        <div>${dish.Dish.description}</div>
                    </div>
                </a>
            </div>
        `
      );
    }
    container.insertAdjacentHTML("afterbegin", `<h1>${name}</h1>`);
    this.categories.append(container);
  }
}

export default ManagerView;
