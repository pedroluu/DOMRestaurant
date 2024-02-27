// Definición de un símbolo para uso interno en la clase ManagerView
const EXECUTE_HANDLER = Symbol("excecuteHandler");

// Definición de la clase ManagerView
class ManagerView {
  // Constructor de la clase
  constructor() {
    // Inicialización de propiedades de la clase
    this.categories = document.getElementById("categories");
    this.dishes = document.getElementById("dishes");
    this.menu = document.querySelector(".nav");
    this.ficha = document.getElementById("ficha-elemento");
    this.dishWindow = new Map(); // Utilización de Map para almacenar información sobre las ventanas de platos
  }

  // Método privado para ejecutar un manejador de eventos con funcionalidad compartida
  [EXECUTE_HANDLER](
    handler,
    handlerArguments,
    scrollElement,
    data,
    url,
    event
  ) {
    // Llama al manejador de eventos con los argumentos proporcionados
    handler(...handlerArguments);
    // Realiza un scroll a un elemento específico si existe
    const scroll = document.querySelector(scrollElement);
    if (scroll) scroll.scrollIntoView();
    // Actualiza el estado del historial del navegador
    history.pushState(data, null, url);
    // Previene el comportamiento predeterminado del evento
    event.preventDefault();
  }

  bindInit(handler) {
    // Agrega un evento 'click' al elemento con id 'init'
    document.getElementById("init").addEventListener("click", (event) => {
      // Llama al método [EXECUTE_HANDLER] con los parámetros necesarios
      this[EXECUTE_HANDLER](
        handler,
        [],
        "body",
        { action: "init" },
        "#",
        event
      );
    });
    // Agrega un evento 'click' al elemento con id 'logo'
    document.getElementById("logo").addEventListener("click", (event) => {
      // Llama al método [EXECUTE_HANDLER] con los parámetros necesarios
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
    // Obtiene la lista de categorías de platos
    const categoryList = document.getElementById("category-list");
    // Obtiene todos los elementos 'a' dentro de la lista de categorías
    const links = categoryList.querySelectorAll("a");
    // Itera sobre los enlaces y agrega un evento 'click' a cada uno
    for (const link of links) {
      link.addEventListener("click", (event) => {
        // Obtiene la categoría del atributo 'data' del elemento clicado
        const { category } = event.currentTarget.dataset;
        // Llama al método [EXECUTE_HANDLER] con los parámetros necesarios
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
    // Obtiene el elemento 'navAller'
    const navAller = document.getElementById("navAller");
    if (navAller && navAller.nextSibling) {
      // Obtiene todos los enlaces dentro del siguiente elemento al 'navAller'
      const links = navAller.nextSibling.querySelectorAll("a");
      // Itera sobre los enlaces y agrega un evento 'click' a cada uno
      for (const link of links) {
        link.addEventListener("click", (event) => {
          // Obtiene el alérgeno del atributo 'data' del elemento clicado
          const { allergen } = event.currentTarget.dataset;
          // Llama al método [EXECUTE_HANDLER] con los parámetros necesarios
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
    // Obtiene el elemento 'navMenu'
    const navMenu = document.getElementById("navMenu");
    if (navMenu && navMenu.nextSibling) {
      // Obtiene todos los enlaces dentro del siguiente elemento al 'navMenu'
      const links = navMenu.nextSibling.querySelectorAll("a");
      // Itera sobre los enlaces y agrega un evento 'click' a cada uno
      for (const link of links) {
        link.addEventListener("click", (event) => {
          // Obtiene el menú del atributo 'data' del elemento clicado
          const { menu } = event.currentTarget.dataset;
          // Llama al método [EXECUTE_HANDLER] con los parámetros necesarios
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
    // Obtiene el elemento 'navRest'
    const navRest = document.getElementById("navRest");
    if (navRest && navRest.nextSibling) {
      // Obtiene todos los enlaces dentro del siguiente elemento al 'navRest'
      const links = navRest.nextSibling.querySelectorAll("a");

      // Itera sobre los enlaces y agrega un evento 'click' a cada uno
      for (const link of links) {
        link.addEventListener("click", (event) => {
          // Obtiene el restaurante del atributo 'data' del elemento clicado
          const { rest } = event.currentTarget.dataset;

          // Llama al método [EXECUTE_HANDLER] con los parámetros necesarios
          this[EXECUTE_HANDLER](
            handler,
            [rest],
            "#restaurant-list",
            { action: "restaurantInMenu", rest },
            "#dishes-category-list",
            event
          );
        });
      }
    }
  }

  bindDishCategoryListInMenu(handler) {
    // Obtiene el elemento 'navCats'
    const navCats = document.getElementById("navCats");
    // Obtiene todos los enlaces dentro del siguiente elemento al 'navCats'
    const links = navCats.nextSibling.querySelectorAll("a");

    // Itera sobre los enlaces y agrega un evento 'click' a cada uno
    for (const link of links) {
      link.addEventListener("click", (event) => {
        // Obtiene la categoría del atributo 'data' del elemento clicado
        const { category } = event.currentTarget.dataset;
        console.log(event.currentTarget.dataset);

        // Llama al método [EXECUTE_HANDLER] con los parámetros necesarios
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
    // Obtiene el elemento 'dishes-list'
    const dishDetails = document.getElementById("dishes-list");
    // Obtiene todos los enlaces dentro del elemento 'dishes-list'
    const links = dishDetails.querySelectorAll("a");
    // Itera sobre los enlaces y agrega un evento 'click' a cada uno
    for (const link of links) {
      link.addEventListener("click", (event) => {
        // Obtiene el plato del atributo 'data' del elemento clicado
        const { dish } = event.currentTarget.dataset;

        // Llama al método [EXECUTE_HANDLER] con los parámetros necesarios
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
    // Obtiene el elemento 'dishes-list-category'
    const dishDetails = document.getElementById("dishes-list-category");
    // Obtiene todos los enlaces dentro del elemento 'dishes-list-category'
    const links = dishDetails.querySelectorAll("a");
    // Itera sobre los enlaces y agrega un evento 'click' a cada uno
    for (const link of links) {
      link.addEventListener("click", (event) => {
        // Obtiene el plato del atributo 'data' del elemento clicado
        const { dish } = event.currentTarget.dataset;

        // Llama al método [EXECUTE_HANDLER] con los parámetros necesarios
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
    // Obtiene el elemento 'dishes-list-category'
    const dishDetails = document.getElementById("dishes-list-category");
    // Obtiene todos los enlaces dentro del elemento 'dishes-list-category'
    const links = dishDetails.querySelectorAll("a");
    // Itera sobre los enlaces y agrega un evento 'click' a cada uno
    for (const link of links) {
      link.addEventListener("click", (event) => {
        // Obtiene el plato del atributo 'data' del elemento clicado
        const { dish } = event.currentTarget.dataset;

        // Llama al método [EXECUTE_HANDLER] con los parámetros necesarios
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
    // Obtiene el elemento 'dishes-list-category'
    const dishDetails = document.getElementById("dishes-list-category");
    // Obtiene todos los enlaces dentro del elemento 'dishes-list-category'
    const links = dishDetails.querySelectorAll("a");
    // Itera sobre los enlaces y agrega un evento 'click' a cada uno
    for (const link of links) {
      link.addEventListener("click", (event) => {
        // Obtiene el plato del atributo 'data' del elemento clicado
        const { dish } = event.currentTarget.dataset;

        // Llama al método [EXECUTE_HANDLER] con los parámetros necesarios
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
  // Método para vincular un evento para mostrar un plato en una nueva ventana
  bindShowDishInNewWindow(handler) {
    // Obtiene el elemento con id 'b-open'
    const dishOpen = document.getElementById("b-open");

    // Agrega un evento 'click' al elemento 'dishOpen'
    dishOpen.addEventListener("click", (event) => {
      // Obtiene el nombre del plato del atributo 'data' del elemento clicado
      const dishName = event.currentTarget.dataset.dish;

      // Busca si hay una ventana abierta para el plato actual
      let storedWindow = this.dishWindow.get(dishName);

      // Si existe una ventana almacenada y no está cerrada, la enfoca
      if (storedWindow && !storedWindow.closed) {
        storedWindow.focus();
      } else {
        // De lo contrario, abre una nueva ventana y la almacena
        const windowName = "DishWindow_" + dishName;
        const newWindow = window.open(
          "dish.html",
          windowName,
          "width=1400, height=1000, top=250, left=250, titlebar=yes, toolbar=no, menubar=no, location=no"
        );

        // Almacena la nueva ventana en el mapa de ventanas de platos
        this.dishWindow.set(dishName, newWindow);

        // Agrega un evento de carga a la nueva ventana
        newWindow.addEventListener("load", () => {
          // Ejecuta el manejador con el nombre del plato y la nueva ventana
          handler(dishName, newWindow);
        });
      }
    });
  }

  // Método para vincular un evento para cerrar ventanas en el menú
  bindCloseWindowInMenu(handler) {
    // Obtiene el elemento con id 'closeWindow'
    const closeWindow = document.getElementById("closeWindow");

    // Agrega un evento 'click' al elemento 'closeWindow'
    closeWindow.addEventListener("click", (event) => {
      // Itera sobre las ventanas de platos almacenadas y llama al manejador para cerrarlas
      for (const [key, value] of this.dishWindow) {
        handler(key, value);
      }
    });
  }

  // Método para mostrar las categorías de platos
  showCategories(categories) {
    // Elimina el contenido actual de la sección de categorías si existe
    if (this.categories.children.length > 0)
      this.categories.children[0].remove();

    // Crea un contenedor div para las categorías
    const container = document.createElement("div");
    container.id = "category-list";
    container.classList.add("row");

    // Itera sobre las categorías y agrega el HTML correspondiente al contenedor
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

    // Agrega el contenedor al elemento de categorías en el documento
    this.categories.append(container);
  }

  // Método para mostrar los platos
  showDishes(dishes) {
    // Elimina el contenido actual de la sección de platos si existe
    if (this.dishes.children.length > 0) this.dishes.children[0].remove();

    // Crea un contenedor div para los platos
    const container = document.createElement("div");
    container.id = "dishes-list";
    container.classList.add("row");
    container.insertAdjacentHTML(
      "afterbegin",
      `<h3 class="text-center text-white">Algunos de nuestros exquisitos platos</h3>`
    );

    // Itera sobre los platos y agrega el HTML correspondiente al contenedor
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

    // Agrega el contenedor al elemento de platos en el documento
    this.dishes.append(container);
  }
  // Método para mostrar los detalles de un plato
  showDish(dish) {
    // Elimina el contenido actual de la sección 'ficha' si existe
    if (this.ficha.children.length > 0) this.ficha.children[0].remove();
    // Elimina la clase 'oculto' de la sección 'ficha'
    this.ficha.classList.remove("oculto");

    // Crea un contenedor div para los detalles del plato
    const container = document.createElement("div");
    container.id = "dish-details";

    // Agrega el HTML correspondiente al contenedor
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

    // Agrega el contenedor a la sección 'ficha' en el documento
    this.ficha.append(container);
  }

  // Método para mostrar los detalles de un restaurante
  showRestaurant(restaurant) {
    // Elimina el contenido actual de la sección de categorías si existe
    if (this.categories.children.length > 0)
      this.categories.children[0].remove();

    // Crea un contenedor div para los detalles del restaurante
    const container = document.createElement("div");
    container.id = "restaurant-list";
    container.classList.add("row");

    // Agrega el HTML correspondiente al contenedor
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

    // Agrega el contenedor a la sección de categorías en el documento
    this.categories.append(container);
  }

  // Método para mostrar las categorías en el menú
  showCategoriesInMenu(categories) {
    // Crea un elemento de lista para las categorías en el menú
    const li = document.createElement("li");
    li.classList.add("nav-item");
    li.classList.add("dropdown");

    // Agrega el HTML correspondiente al elemento de lista
    li.insertAdjacentHTML(
      "beforeend",
      `<a class="nav-link dropdown-toggle" href="#" id="navCats" role="button" data-bs-toggle="dropdown" aria-expanded="false" style="text-decoration: none;color: #ffffff;font-weight: bold;transition: color 0.3s;">Categorías</a>`
    );

    // Crea un contenedor ul para las categorías en el menú
    const container = document.createElement("ul");
    container.classList.add("dropdown-menu");
    container.style.backgroundColor = "black";

    // Agrega las categorías al contenedor
    for (const category of categories) {
      container.insertAdjacentHTML(
        "beforeend",
        `<li><a data-category="${category.name}" class="dropdown-item" href="#category-list">${category.name}</a></li>`
      );
    }

    // Agrega el contenedor al elemento de lista
    li.append(container);

    // Agrega el elemento de lista al menú
    this.menu.append(li);
  }

  // Método para mostrar los restaurantes en el menú
  showRestaurantsInMenu(restaurants) {
    // Crea un elemento de lista para los restaurantes en el menú
    const li = document.createElement("li");
    li.classList.add("nav-item");
    li.classList.add("dropdown");

    // Agrega el HTML correspondiente al elemento de lista
    li.insertAdjacentHTML(
      "beforeend",
      `<a class="nav-link dropdown-toggle" href="#" id="navRest" role="button" data-bs-toggle="dropdown" aria-expanded="false" style="text-decoration: none;color: #ffffff;font-weight: bold;transition: color 0.3s;">Restaurantes</a>`
    );

    // Crea un contenedor ul para los restaurantes en el menú
    const container = document.createElement("ul");
    container.classList.add("dropdown-menu");
    container.style.backgroundColor = "black";

    // Agrega los restaurantes al contenedor
    for (const restaurant of restaurants) {
      container.insertAdjacentHTML(
        "beforeend",
        `<li><a data-rest="${restaurant.Restaurant.name}" class="dropdown-item" href="#restaurant-list">${restaurant.Restaurant.name}</a></li>`
      );
    }

    // Agrega el contenedor al elemento de lista
    li.append(container);

    // Agrega el elemento de lista al menú
    this.menu.append(li);
  }

  // Método para mostrar los alérgenos en el menú
  showAllergensInMenu(allergens) {
    // Crea un elemento de lista para los alérgenos en el menú
    const li = document.createElement("li");
    li.classList.add("nav-item");
    li.classList.add("dropdown");

    // Agrega el HTML correspondiente al elemento de lista
    li.insertAdjacentHTML(
      "beforeend",
      `<a class="nav-link dropdown-toggle" href="#" id="navAller" role="button" data-bs-toggle="dropdown" aria-expanded="false" style="text-decoration: none;color: #ffffff;font-weight: bold;transition: color 0.3s;">Alérgenos</a>`
    );

    // Crea un contenedor ul para los alérgenos en el menú
    const container = document.createElement("ul");
    container.classList.add("dropdown-menu");
    container.style.backgroundColor = "black";

    // Agrega los alérgenos al contenedor
    for (const allergen of allergens) {
      container.insertAdjacentHTML(
        "beforeend",
        `<li><a data-allergen="${allergen.name}" class="dropdown-item" href="#allergen-list">${allergen.name}</a></li>`
      );
    }

    // Agrega el contenedor al elemento de lista
    li.append(container);

    // Agrega el elemento de lista al menú
    this.menu.append(li);
  }
  // Método para mostrar los menús en el menú de navegación
  showMenusInMenu(menus) {
    // Crea un elemento de lista para los menús en el menú de navegación
    const li = document.createElement("li");
    li.classList.add("nav-item");
    li.classList.add("dropdown");

    // Agrega el HTML correspondiente al elemento de lista
    li.insertAdjacentHTML(
      "beforeend",
      `<a class="nav-link dropdown-toggle"
    href="#" id="navMenu" role="button"
    data-bs-toggle="dropdown" aria-expanded="false"
    style="text-decoration: none;color: #ffffff;
    font-weight: bold;
    transition: color 0.3s;">Menu</a>`
    );

    // Crea un contenedor ul para los menús en el menú de navegación
    const container = document.createElement("ul");
    container.classList.add("dropdown-menu");
    container.style.backgroundColor = "black";

    // Agrega los menús al contenedor
    for (const menu of menus) {
      container.insertAdjacentHTML(
        "beforeend",
        `<li><a data-menu="${menu.Menu.name}" class="dropdown-item" href="#menu-list">${menu.Menu.name}</a></li>`
      );
    }

    // Agrega el contenedor al elemento de lista
    li.append(container);
    // Agrega el elemento de lista al menú
    this.menu.append(li);
  }

  // Método para listar platos en una categoría específica
  listDishes(dishes, name) {
    // Reemplaza los hijos de 'categories' con un nuevo contenido
    this.categories.replaceChildren();
    // Elimina el contenido actual de 'categories' si existe
    if (this.categories.children.length > 0)
      this.categories.children[0].remove();

    // Crea un contenedor div para listar los platos
    const container = document.createElement("div");
    container.id = "dishes-list-category";
    container.classList.add("row");

    // Inserta el título de la categoría en el contenedor
    container.insertAdjacentHTML(
      "beforeend",
      `<h1 class="text-center text-white">${name}</h1>`
    );

    // Agrega cada plato al contenedor
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

    // Inserta el título de la categoría al inicio del contenedor
    container.insertAdjacentHTML("afterbegin", `<h1>${name}</h1>`);
    // Agrega el contenedor a 'categories'
    this.categories.append(container);
  }

  // Método para listar platos en un menú específico
  listDishesInMenu(dishes, name) {
    // Reemplaza los hijos de 'categories' con un nuevo contenido
    this.categories.replaceChildren();
    // Elimina el contenido actual de 'categories' si existe
    if (this.categories.children.length > 0)
      this.categories.children[0].remove();

    // Crea un contenedor div para listar los platos
    const container = document.createElement("div");
    container.id = "dishes-list-category";
    container.classList.add("row");

    // Inserta el título del menú en el contenedor
    container.insertAdjacentHTML(
      "beforeend",
      `<h1 class="text-center text-white">${name}</h1>`
    );

    // Agrega cada plato al contenedor
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

    // Inserta el título del menú al inicio del contenedor
    container.insertAdjacentHTML("afterbegin", `<h1>${name}</h1>`);
    // Agrega el contenedor a 'categories'
    this.categories.append(container);
  }

  // Método para mostrar los detalles de un plato en una nueva ventana
  showDishInNewWindow(dish, dishWindow, message) {
    // Reemplaza los hijos del elemento 'main' en la ventana del plato
    const main = dishWindow.document.querySelector("main");
    main.replaceChildren();
    let container;

    // Si existe el plato, muestra sus detalles en la ventana
    if (dish) {
      dishWindow.document.title = `${dish.name}`;

      // Crea un contenedor div para los detalles del plato
      container = document.createElement("div");
      container.id = "dish-details";

      // Inserta los detalles del plato en el contenedor
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
      // Si el plato no existe, muestra un mensaje en la ventana
      container = document.createElement("div");
      container.classList.add("container", "mt-5", "mb-5");
      container.insertAdjacentHTML(
        "beforeend",
        `<div class="row d-flex text-black justify-content-center"> ${message}</div>`
      );
    }

    // Agrega el contenedor a 'main' en la ventana del plato y lo hace visible
    main.append(container);
    dishWindow.document.body.scrollIntoView();
  }

  // Método para mostrar el botón para cerrar ventanas en el menú
  showWindowCloseInMenu() {
    // Crea un elemento de lista para el botón de cerrar ventanas
    const li = document.createElement("li");
    li.classList.add("nav_li");

    // Agrega el HTML correspondiente al elemento de lista
    li.insertAdjacentHTML(
      "beforeend",
      `<a id="closeWindow"  class="text-decoration-none" href="#">Cerrar ventanas</a>`
    );

    // Agrega el elemento de lista al menú
    this.menu.append(li);
  }
}
// Exporta la clase ManagerView
export default ManagerView;
