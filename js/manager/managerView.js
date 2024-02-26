const EXECUTE_HANDLER = Symbol("excecuteHandler");

class ManagerView {
  constructor() {
    this.categories = document.getElementById("categories");
    this.dishes = document.getElementById("dishes");
    this.menu = document.querySelector(".nav");
    this.ficha = document.getElementById("ficha-elemento");
    this.dishWindow = new Map();
  }

  [EXECUTE_HANDLER](
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
      this[EXECUTE_HANDLER](
        handler,
        [],
        "body",
        { action: "init" },
        "#",
        event
      );
    });
    document.getElementById("logo").addEventListener("click", (event) => {
      this[EXECUTE_HANDLER](
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
        const { category } = event.currentTarget.dataset;
        this[EXECUTE_HANDLER](
          handler,
          [category],
          "#dishes-list-category",
          { action: "dishCategoryList", category },
          "#category-list",
          event
        );
      });
    }
  }

  bindDishAllergenList(handler) {
    const navAller = document.getElementById("navAller");
    if (navAller && navAller.nextSibling) {
      const links = navAller.nextSibling.querySelectorAll("a");
      // y obtenemos el valor de nuestra alergenos
      for (const link of links) {
        link.addEventListener("click", (event) => {
          // Obtenemos el alergeno
          const { allergen } = event.currentTarget.dataset;
          // Llamamos a nuestro metodo execute handler que declaramos anteriormente
          this[EXECUTE_HANDLER](
            handler,
            [allergen],
            "#dishes-list-category",
            { action: "dishAllergenList", allergen },
            "#category-list",
            event
          );
        });
      }
    }
  }

  bindDishMenuList(handler) {
    const navMenu = document.getElementById("navMenu");
    if (navMenu && navMenu.nextSibling) {
      const links = navMenu.nextSibling.querySelectorAll("a");
      // Recorremos los links que hemos recogido
      // y obtenemos el valor de nuestros menus
      for (const link of links) {
        link.addEventListener("click", (event) => {
          // Obtenemos los menus
          const { menu } = event.currentTarget.dataset;

          // Llamamos a nuestro metodo execute handler que declaramos anteriormente
          this[EXECUTE_HANDLER](
            handler,
            [menu],
            "#dishes-category-list",
            { action: "dishMenuList", menu },
            "#category-list",
            event
          );
        });
      }
    }
  }

  bindRestaurant(handler) {
    const navRest = document.getElementById("navRest");
    if (navRest && navRest.nextSibling) {
      const links = navRest.nextSibling.querySelectorAll("a");
      // Recorremos los links que hemos recogido
      // y obtenemos el valor de nuestros menus
      for (const link of links) {
        link.addEventListener("click", (event) => {
          // Obtenemos el objeto de restaurante
          const { rest } = event.currentTarget.dataset;

          // Llamamos a nuestro metodo execute handler que declaramos anteriormente
          this[EXECUTE_HANDLER](
            handler,
            [rest],
            "#restaurant-list",
            { action: "restaurantInMenu", rest },
            "#category-list",
            event
          );
        });
      }
    }
  }

  bindDishCategoryListInMenu(handler) {
    const navCats = document.getElementById("navCats");
    const links = navCats.nextSibling.querySelectorAll("a");

    // Recorremos los links que hemos recogido
    // y obtenemos el valor de nuestra categoria
    for (const link of links) {
      link.addEventListener("click", (event) => {
        // Obtenemos nuestra categoria
        const { category } = event.currentTarget.dataset;
        console.log(event.currentTarget.dataset);

        // Llamamos a nuestro metodo execute handler que declaramos anteriormente
        this[EXECUTE_HANDLER](
          handler,
          [category],
          "#dishes-category-list",
          { action: "dishCategoryList", category },
          "#category-list",
          event
        );
      });
    }
  }

  bindDishDetails(handler) {
    const dishDetails = document.getElementById("dishes-list");
    const links = dishDetails.querySelectorAll("a");
    // Recorremos los links
    for (const link of links) {
      link.addEventListener("click", (event) => {
        // Obtenemos los platos que se han generado anteriormente
        const { dish } = event.currentTarget.dataset;

        // Llamamos a nuestro metodo execute handler que declaramos anteriormente
        this[EXECUTE_HANDLER](
          handler,
          [dish],
          "#dishes-list-category",
          { action: "randomDishes", dish },
          "#dish-details",
          event
        );
      });
    }
  }

  bindDishDetailsByCategory(handler) {
    const dishDetails = document.getElementById("dishes-list-category");
    const links = dishDetails.querySelectorAll("a");
    // Recorremos los links que hemos recogido
    // y obtenemos el valor de nuestra categoria
    for (const link of links) {
      link.addEventListener("click", (event) => {
        // Obtenemos nuestra categoria
        const { dish } = event.currentTarget.dataset;

        // Llamamos a nuestro metodo execute handler que declaramos anteriormente
        this[EXECUTE_HANDLER](
          handler,
          [dish],
          "#dish-list",
          { action: "dishCategoryList", dish },
          "#dish-list",
          event
        );
      });
    }
  }

  bindDishDetailsByAllergen(handler) {
    const dishDetails = document.getElementById("dishes-list-category");
    const links = dishDetails.querySelectorAll("a");

    // Recorremos los links que hemos recogido
    // y obtenemos el valor de nuestra categoria
    for (const link of links) {
      link.addEventListener("click", (event) => {
        // Obtenemos nuestra categoria
        const { dish } = event.currentTarget.dataset;

        // Llamamos a nuestro metodo execute handler que declaramos anteriormente
        this[EXECUTE_HANDLER](
          handler,
          [dish],
          "#dish-list",
          { action: "dishAllergenList", dish },
          "#dish-list",
          event
        );
      });
    }
  }
  bindDishDetailsByMenu(handler) {
    const dishDetails = document.getElementById("dishes-list-category");
    const links = dishDetails.querySelectorAll("a");

    // Recorremos los links que hemos recogido
    // y obtenemos el valor de nuestra categoria
    for (const link of links) {
      link.addEventListener("click", (event) => {
        // Obtenemos nuestra categoria
        const { dish } = event.currentTarget.dataset;

        // Llamamos a nuestro metodo execute handler que declaramos anteriormente
        this[EXECUTE_HANDLER](
          handler,
          [dish],
          "#dish-list",
          { action: "dishAllergenList", dish },
          "#dish-list",
          event
        );
      });
    }
  }

  bindShowDishInNewWindow(handler) {
    const dishOpen = document.getElementById("b-open");

    dishOpen.addEventListener("click", (event) => {
      const dishName = event.currentTarget.dataset.dish;

      // Comprobamos si ya existe una ventana abierta para este plato
      let storedWindow = this.dishWindow.get(dishName);

      // Si la ventana ya está abierta, la enfocamos
      if (storedWindow && !storedWindow.closed) {
        storedWindow.focus();
      } else {
        // Si la ventana no está abierta, la creamos y la almacenamos
        const windowName = "DishWindow_" + dishName;
        const newWindow = window.open(
          "dish.html",
          windowName,
          "width=1400, height=1000, top=250, left=250, titlebar=yes, toolbar=no, menubar=no, location=no"
        );

        // Almacenamos la nueva ventana en el mapa
        this.dishWindow.set(dishName, newWindow);

        // Agregamos un evento cuando la ventana se cargue
        newWindow.addEventListener("load", () => {
          handler(dishName, newWindow);
        });
      }
    });
  }

  // Manejador para el elemento que tenemos en nuestro
  // nav para cerrar todas las ventanas
  bindCloseWindowInMenu(handler) {
    // Obtenemos el elemento
    const closeWindow = document.getElementById("closeWindow");
    // Creamos el evento para cuando hagamos click
    closeWindow.addEventListener("click", (event) => {
      // Recorremos nuestro mapa y le pasamos a nuestro handler
      // el nombre de los platos que tenemos abiertos y las ventanas para cerrarlas
      // key nombre plato
      // value la ventana
      for (const [key, value] of this.dishWindow) {
        handler(key, value);
      }
    });
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
                <a data-category="${category.name}" href="#category-list  " class="text-decoration-none">
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
                <a data-dish="${dish.Dish.name}" href="#dish-list" class="text-decoration-none">
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
              <a data-dish="${dish.Dish.name}" href="#dish-list" class="text-decoration-none">
                  <div class="dish-list-image">
                      <img alt="${dish.Dish.name}" src="${dish.Dish.image}" />
                  </div>
                  <div class="dish-list-text text-white">
                      <div>Descripción: ${dish.Dish.description}</div><br>
                      <div>Ingredientes: ${dish.Dish.ingredients}</div> 
                      <button id="b-open" data-dish="${dish.Dish.name}" class="btn btn-primary text-uppercase mr-2 px-4">Abrir en nueva ventana</button>
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
    container.id = "restaurant-list";
    container.classList.add("row");
    container.insertAdjacentHTML(
      "beforeend",
      `
          <div class="col-lg-3 col-md-6 bg-dark text-center">
          <h2 class="text-white">${restaurant.Restaurant.name}</h2>
              <a data-category="${restaurant.Restaurant.name}" href="#restaurant-list" class="text-decoration-none">
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
        `<li><a data-category="${category.name}" class="dropdown-item" href="#category-list">${category.name}</a></li>`
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
        `<li><a data-rest="${restaurant.Restaurant.name}" class="dropdown-item" href="#restaurant-list">${restaurant.Restaurant.name}</a></li>`
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
        `<li><a data-allergen="${allergen.name}" class="dropdown-item" href="#allergen-list">${allergen.name}</a></li>`
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
        `<li><a data-menu="${menu.Menu.name}" class="dropdown-item" href="#menu-list">${menu.Menu.name}</a></li>`
      );
    }
    li.append(container);
    this.menu.append(li);
  }

  listDishes(dishes, name) {
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
                <a data-dish="${dish.Dish.name}" href="#dish-details" class="text-decoration-none">
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
                <a data-dish="${dish.Dish.name}" href="#dish-list" class="text-decoration-none">
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

  showDishInNewWindow(dish, dishWindow, message) {
    const main = dishWindow.document.querySelector("main");
    main.replaceChildren();
    let container;

    if (dish) {
      dishWindow.document.title = `${dish.name}`;

      container = document.createElement("div");
      container.id = "dish-details";

      container.insertAdjacentHTML(
        "beforeend",
        `
          <div class="col col-md-6 bg-dark text-center justify-content-center">
          <h3 class="text-center text-white col">Nuestro ${dish.name}</h3>
              <a data-dish="${dish.name}" href="#dish-list" class="text-decoration-none">
                  <div class="dish-list-image">
                      <img alt="${dish.name}" src="${dish.image}" />
                  </div>
                  <div class="dish-list-text text-white">
                      <div>Descripción: ${dish.description}</div><br>
                      <div>Ingredientes: ${dish.ingredients}</div> 
                      <button id="b-open" data-serial="${dish.name}" class="btn btn-primary text-uppercase mr-2 px-4">Cerrar ventana</button>
                  </div>
              </a>
          </div>
      `
      );
      main.append(container);
    } else {
      // Definimos el elemento de neustro contenedor
      container = document.createElement("div");
      container.classList.add("container", "mt-5", "mb-5");
      // Insertamos el html
      container.insertAdjacentHTML(
        "beforeend",
        `<div class="row d-flex text-black justify-content-center"> ${message}</div>`
      );
    }
    main.append(container);
    dishWindow.document.body.scrollIntoView();
  }

  // Metodo para mostrar el elemento
  // de cerrar ventanas en nuestro nav
  showWindowCloseInMenu() {
    // Creamos el elemento de nuestro nav
    const li = document.createElement("li");
    // Definimos las class de nuestro li
    li.classList.add("nav_li");
    // Insertamos el contenido de nuestro li
    li.insertAdjacentHTML(
      "beforeend",
      `<a id="closeWindow"  class="text-decoration-none" href="#">Cerrar ventanas</a>`
    );
    // Lo insertamos en el menu
    this.menu.append(li);
  }
}

export default ManagerView;
