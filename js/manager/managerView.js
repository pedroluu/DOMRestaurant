const EXCECUTE_HANDLER = Symbol("excecuteHandler");

class ManagerView {
  constructor() {
    this.categories = document.getElementById("categories");
    this.dishes = document.getElementById("dishes");
    this.menu = document.querySelector(".nav");
    this.ficha = document.getElementById("ficha-elemento");
  }

  [EXCECUTE_HANDLER](
    handler,
    handlerArguments,
    scrollElement,
    data,
    url,
    event
  ) {
    handler(...handlerArguments);
    const scroll = document.querySelector(scrollElement);
    if (scroll) scroll.scrollIntoView();
    history.pushState(data, null, url);
    event.preventDefault();
  }

  bindInit(handler) {
    document.getElementById("init").addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        handler,
        [],
        "body",
        { action: "init" },
        "#",
        event
      );
    });
    document.getElementById("logo").addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        handler,
        [],
        "body",
        { action: "init" },
        "#",
        event
      );
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

  bindDishAllergenList(handler) {
    const navAller = document.getElementById("navAller");
    if (navAller && navAller.nextSibling) {
      const links = navAller.nextSibling.querySelectorAll("a");
      for (const link of links) {
        link.addEventListener("click", (event) => {
          handler(event.currentTarget.dataset.allergen);
        });
      }
    }
  }

  bindDishMenuList(handler) {
    const navMenu = document.getElementById("navMenu");
    if (navMenu && navMenu.nextSibling) {
      const links = navMenu.nextSibling.querySelectorAll("a");
      for (const link of links) {
        link.addEventListener("click", (event) => {
          handler(event.currentTarget.dataset.menu);
        });
      }
    }
  }

  bindRestaurant(handler) {
    const navRest = document.getElementById("navRest");
    if (navRest && navRest.nextSibling) {
      const links = navRest.nextSibling.querySelectorAll("a");
      for (const link of links) {
        link.addEventListener("click", (event) => {
          handler(event.currentTarget.dataset.rest);
        });
      }
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

  bindDishDetails(handler) {
    const dishDetails = document.getElementById("dishes-list");
    const links = dishDetails.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        console.log(event.currentTarget);
        handler(event.currentTarget.getAttribute("dish-category")); // Utilizar getAttribute
      });
    }
  }

  bindDishDetailsByCategory(handler) {
    const dishDetails = document.getElementById("dishes-list-category");
    const links = dishDetails.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        handler(event.currentTarget.getAttribute("dish-category")); // Utilizar getAttribute
      });
    }
  }

  bindDishDetailsByAllergen(handler) {
    const dishDetails = document.getElementById("dishes-list-category");
    const links = dishDetails.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        handler(event.currentTarget.getAttribute("dish-category")); // Utilizar getAttribute
      });
    }
  }

  showCategories(categories) {
    if (this.categories.children.length > 0)
      this.categories.children[0].remove();

    const container = document.createElement("div");
    container.id = "category-list";
    container.classList.add("row");

    for (const category of categories) {
      container.insertAdjacentHTML(
        "beforeend",
        `
            <div class="col-lg-3 col-md-6 bg-dark text-center">
                <a data-category="${category.name}" href="#categories" class="text-decoration-none">
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
    container.insertAdjacentHTML(
      "afterbegin",
      `<h3 class="text-center text-white">Algunos de nuestros exquisitos platos</h3>`
    );

    for (const dish of dishes) {
      container.insertAdjacentHTML(
        "beforeend",
        `
            <div class="col-lg-3 col-md-6 bg-dark text-center">
                <a dish-category="${dish.Dish.name}" href="#dish-list" class="text-decoration-none">
                    <div class="dish-list-image">
                        <img alt="${dish.Dish.name}" src="${dish.Dish.image}" />
                    </div>
                    <div class="dish-list-text text-white">
                        <h3>${dish.Dish.name}</h3>
                    </div>
                </a>
            </div>
        `
      );
    }

    this.dishes.append(container);
  }

  showDish(dish) {
    if (this.ficha.children.length > 0) this.ficha.children[0].remove();
    this.ficha.classList.remove("oculto");

    const container = document.createElement("div");
    container.id = "dish-details";

    container.insertAdjacentHTML(
      "beforeend",
      `
          <div class="col col-md-6 bg-dark text-center justify-content-center">
          <h3 class="text-center text-white col">Nuestro ${dish.Dish.name}</h3>
              <a dish-category="${dish.Dish.name}" href="#dish-list" class="text-decoration-none">
                  <div class="dish-list-image">
                      <img alt="${dish.name}" src="${dish.Dish.image}" />
                  </div>
                  <div class="dish-list-text text-white">
                      <div>Descripción: ${dish.Dish.description}</div><br>
                      <div>Ingredientes: ${dish.Dish.ingredients}</div>
                  </div>
              </a>
          </div>
      `
    );

    this.ficha.append(container);
  }

  showRestaurant(restaurant) {
    if (this.categories.children.length > 0)
      this.categories.children[0].remove();

    const container = document.createElement("div");
    container.id = "category-list";
    container.classList.add("row");
    container.insertAdjacentHTML(
      "beforeend",
      `
          <div class="col-lg-3 col-md-6 bg-dark text-center">
          <h2 class="text-white">${restaurant.Restaurant.name}</h2>
              <a data-category="${restaurant.Restaurant.name}" href="#categories" class="text-decoration-none">
                  <div class="cat-list-image">
                      <img alt="${restaurant.Restaurant.name}" src="./img/${restaurant.Restaurant.name}.jpg" />
                  </div>
                  <div class="cat-list-text text-white">
                      <div>${restaurant.Restaurant.description}</div>
                      <div>${restaurant.Restaurant.location}</div>
                  </div>
              </a>
          </div>
      `
    );

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
      container.insertAdjacentHTML(
        "beforeend",
        `<li><a data-category="${category.name}" class="dropdown-item" href="#categories">${category.name}</a></li>`
      );
    }
    li.append(container);
    this.menu.append(li);
  }

  showRestaurantsInMenu(restaurants) {
    const li = document.createElement("li");
    li.classList.add("nav-item");
    li.classList.add("dropdown");
    li.insertAdjacentHTML(
      "beforeend",
      `<a class="nav-link dropdown-toggle"
      href="#" id="navRest" role="button"
      data-bs-toggle="dropdown" aria-expanded="false"
      style="text-decoration: none;color: #ffffff;
      font-weight: bold;
      transition: color 0.3s;">Restaurantes</a>`
    );
    const container = document.createElement("ul");
    container.classList.add("dropdown-menu");
    container.style.backgroundColor = "black";
    for (const restaurant of restaurants) {
      container.insertAdjacentHTML(
        "beforeend",
        `<li><a data-rest="${restaurant.Restaurant.name}" class="dropdown-item" href="#categories">${restaurant.Restaurant.name}</a></li>`
      );
    }
    li.append(container);
    this.menu.append(li);
  }

  showAllergensInMenu(allergens) {
    const li = document.createElement("li");
    li.classList.add("nav-item");
    li.classList.add("dropdown");
    li.insertAdjacentHTML(
      "beforeend",
      `<a class="nav-link dropdown-toggle"
      href="#" id="navAller" role="button"
      data-bs-toggle="dropdown" aria-expanded="false"
      style="text-decoration: none;color: #ffffff;
      font-weight: bold;
      transition: color 0.3s;">Alérgenos</a>`
    );
    const container = document.createElement("ul");
    container.classList.add("dropdown-menu");
    container.style.backgroundColor = "black";
    for (const allergen of allergens) {
      container.insertAdjacentHTML(
        "beforeend",
        `<li><a data-allergen="${allergen.name}" class="dropdown-item" href="#categories">${allergen.name}</a></li>`
      );
    }
    li.append(container);
    this.menu.append(li);
  }
  showMenusInMenu(menus) {
    const li = document.createElement("li");
    li.classList.add("nav-item");
    li.classList.add("dropdown");
    li.insertAdjacentHTML(
      "beforeend",
      `<a class="nav-link dropdown-toggle"
      href="#" id="navMenu" role="button"
      data-bs-toggle="dropdown" aria-expanded="false"
      style="text-decoration: none;color: #ffffff;
      font-weight: bold;
      transition: color 0.3s;">Menu</a>`
    );
    const container = document.createElement("ul");
    container.classList.add("dropdown-menu");
    container.style.backgroundColor = "black";
    for (const menu of menus) {
      container.insertAdjacentHTML(
        "beforeend",
        `<li><a data-menu="${menu.Menu.name}" class="dropdown-item" href="#categories">${menu.Menu.name}</a></li>`
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
    container.id = "dishes-list-category";
    container.classList.add("row");
    container.insertAdjacentHTML(
      "beforeend",
      `<h1 class="text-center text-white">${name}</h1>`
    );

    for (const dish of dishes) {
      container.insertAdjacentHTML(
        "beforeend",
        `
            <div class="col-lg-3 col-md-6 bg-dark text-center">
                <a dish-category="${dish.Dish.name}" href="#dish-list" class="text-decoration-none">
                    <div class="dish-list-image">
                        <img alt="${dish.Dish.name}" src="${dish.Dish.image}" />
                    </div>
                    <div class="dish-list-text text-white">
                        <h3>${dish.Dish.name}</h3>
                    </div>
                </a>
            </div>
        `
      );
    }
    container.insertAdjacentHTML("afterbegin", `<h1>${name}</h1>`);
    this.categories.append(container);
  }

  listDishesInMenu(dishes, name) {
    console.log(dishes);
    this.categories.replaceChildren();
    if (this.categories.children.length > 0)
      this.categories.children[0].remove();

    const container = document.createElement("div");
    container.id = "dishes-list-category";
    container.classList.add("row");
    container.insertAdjacentHTML(
      "beforeend",
      `<h1 class="text-center text-white">${name}</h1>`
    );

    for (const dish of dishes) {
      container.insertAdjacentHTML(
        "beforeend",
        `
            <div class="col  bg-dark text-center">
                <a dish-category="${dish.Dish.name}" href="#dish-list" class="text-decoration-none">
                    <div class="dish-list-image">
                        <img alt="${dish.Dish.name}" src="${dish.Dish.image}" />
                    </div>
                    <div class="dish-list-text text-white">
                        <h3>${dish.Dish.name}</h3>
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
