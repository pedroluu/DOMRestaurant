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

  showCategories(categories) {
    if (this.categories.children.length > 0)
      this.categories.children[1].remove();

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
    if (this.dishes.children.length > 0) this.dishes.children[1].remove();

    const container = document.createElement("div");
    container.id = "category-list";
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
                <a data-category="${dish.Dish.name}" href="#product-list" class="text-decoration-none">
                    <div class="cat-list-image">
                        <img alt="${dish.name}" src="${dish.Dish.image}" />
                    </div>
                    <div class="cat-list-text text-white">
                        <h3>${dish.Dish.name}</h3>
                        <div>${dish.Dish.description}</div>
                    </div>
                </a>
            </div>
        `
      );
    }

    this.categories.append(container);
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
      console.log(category);
      container.insertAdjacentHTML(
        "beforeend",
        `<li><a datacategory="${category.name}" class="dropdown-item" href="#productlist">${category.name}</a></li>`
      );
    }
    li.append(container);
    this.menu.append(li);
  }
}

export default ManagerView;
