import {
  newCategoryValidation,
  newDishValidation,
  newRestaurantValidation,
} from "./validation.js";

// Definición de un símbolo para uso interno en la clase ManagerView
const EXECUTE_HANDLER = Symbol("excecuteHandler");

// Definición de la clase ManagerView
class ManagerView {
  // Constructor de la clase
  constructor() {
    // Inicialización de propiedades de la clase
    this.categories = document.getElementById("categories");
    this.main = document.getElementsByTagName("main")[0];
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
      this.main.replaceChildren();
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
      this.main.replaceChildren();
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
      const links = navRest.nextElementSibling.querySelectorAll("a");

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
    const links = navCats.nextElementSibling.querySelectorAll("a");

    // Itera sobre los enlaces y agrega un evento 'click' a cada uno
    for (const link of links) {
      link.addEventListener("click", (event) => {
        // Obtiene la categoría del atributo 'data' del elemento clicado
        const { category } = event.currentTarget.dataset;

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

  bindAdminMenu(
    hNewCategory,
    hRemoveCategory,
    hNewDishForm,
    hRemoveDishForm,
    hNewRestaurant,
    hModifyMenu,
    hModifyCategories
  ) {
    const newCategoryLink = document.getElementById("lnewCategory");
    newCategoryLink.addEventListener("click", (event) => {
      this[EXECUTE_HANDLER](
        hNewCategory,
        [],
        "#new-category",
        { action: "newCategory" },
        "#",
        event
      );
    });
    const delCategoryLink = document.getElementById("ldelCategory");
    delCategoryLink.addEventListener("click", (event) => {
      this[EXECUTE_HANDLER](
        hRemoveCategory,
        [],
        "#remove-category",
        {
          action: "removeCategory",
        },
        "#",
        event
      );
    });
    const newDishLink = document.getElementById("lnewDish");
    newDishLink.addEventListener("click", (event) => {
      this[EXECUTE_HANDLER](
        hNewDishForm,
        [],
        "#new-dish",
        { action: "newdish" },
        "#",
        event
      );
    });
    const delDishLink = document.getElementById("ldelDish");
    delDishLink.addEventListener("click", (event) => {
      this[EXECUTE_HANDLER](
        hRemoveDishForm,
        [],
        "#remove-dish",
        { action: "removeDish" },
        "#",
        event
      );
    });
    const newRestaurantLink = document.getElementById("lnewRestaurant");
    newRestaurantLink.addEventListener("click", (event) => {
      this[EXECUTE_HANDLER](
        hNewRestaurant,
        [],
        "#new-restaurant",
        { action: "newRestaurant" },
        "#",
        event
      );
    });
    const modifyMenuLink = document.getElementById("lmodMenu");
    modifyMenuLink.addEventListener("click", (event) => {
      this[EXECUTE_HANDLER](
        hModifyMenu,
        [],
        "#modify-menu",
        { action: "modifyMenu" },
        "#",
        event
      );
    });
    const modifyCategoriesLink = document.getElementById("lmodCategory");
    modifyCategoriesLink.addEventListener("click", (event) => {
      this[EXECUTE_HANDLER](
        hModifyCategories,
        [],
        "#modify-categories",
        { action: "modifyCategories" },
        "#",
        event
      );
    });
  }

  bindNewCategoryForm(handler) {
    newCategoryValidation(handler);
  }

  bindRemoveCategoryForm(handler) {
    const removeContainer = document.getElementById("remove-category");
    const buttons = removeContainer.getElementsByTagName("button");
    for (const button of buttons) {
      button.addEventListener("click", function (event) {
        handler(this.dataset.category);
      });
    }
  }

  bindNewDishForm(handler) {
    newDishValidation(handler);
  }

  bindRemoveDishSelects(hCategories) {
    const rpCategories = document.getElementById("rpCategories");
    rpCategories.addEventListener("change", (event) => {
      this[EXECUTE_HANDLER](
        hCategories,
        [event.currentTarget.value],
        "#remove-dish",
        {
          action: "removeDishByCategory",
          category: event.currentTarget.value,
        },
        "#remove-dish",
        event
      );
    });
  }

  bindRemoveDish(handler) {
    const dishList = document.getElementById("dishes-list");
    const buttons = dishList.querySelectorAll("a.btn");
    for (const button of buttons) {
      button.addEventListener("click", function (event) {
        handler(this.dataset.serial);
        event.preventDefault();
      });
    }
  }

  bindNewRestaurantForm(handler) {
    newRestaurantValidation(handler);
  }

  bindModifyMenuSelects(mMenus) {
    const mdMenu = document.getElementById("mdMenu");
    mdMenu.addEventListener("change", (event) => {
      this[EXECUTE_HANDLER](
        mMenus,
        [event.currentTarget.value],
        "#modify-menu",
        {
          action: "modifyMenuByDish",
          menu: event.currentTarget.value,
        },
        "#modify-menu",
        event
      );
    });
  }

  bindModifyMenu(handler) {
    const mdMenu = document.getElementById("mdMenu");

    const button = document.querySelector(".assign-btn");
    button.addEventListener("click", function () {
      // Obtener el valor seleccionado del primer select
      const selectedMenu = mdMenu.value;

      // Obtener las opciones seleccionadas del segundo select
      const mdAssignDishes = document.getElementById("mdAssignDishes");
      const selectedOptions = Array.from(mdAssignDishes.selectedOptions).map(
        (option) => option.value
      );

      // Obtener las opciones seleccionadas del tercer select
      const mdNotAssignDishes = document.getElementById("mdNotAssignDishes");
      const selectedOptions2 = Array.from(
        mdNotAssignDishes.selectedOptions
      ).map((option) => option.value);

      // Aquí puedes llamar al manejador y pasarle los datos que has recogido
      handler(selectedMenu, selectedOptions, selectedOptions2);
    });
  }

  bindModifyCategoriesSelect(mCategories) {
    const mdCategories = document.getElementById("mdCategories");
    mdCategories.addEventListener("change", (event) => {
      this[EXECUTE_HANDLER](
        mCategories,
        [event.currentTarget.value],
        "#modify-categories",
        {
          action: "modifyDishByCategories",
          dish: event.currentTarget.value,
        },
        "#modify-categories",
        event
      );
    });
  }

  bindModifyCategories(handler) {
    const mdCategories = document.getElementById("mdCategories");

    const button = document.querySelector(".assign-btn");
    button.addEventListener("click", function () {
      // Obtener el valor seleccionado del primer select
      const selectedMenu = mdCategories.value;

      // Obtener las opciones seleccionadas del segundo select
      const mdAssignCategories = document.getElementById("mdAssignCategories");
      const selectedOptions = Array.from(
        mdAssignCategories.selectedOptions
      ).map((option) => option.value);

      // Obtener las opciones seleccionadas del tercer select
      const mdNotAssignCategories = document.getElementById(
        "mdNotAssignCategories"
      );
      const selectedOptions2 = Array.from(
        mdNotAssignCategories.selectedOptions
      ).map((option) => option.value);

      // Aquí puedes llamar al manejador y pasarle los datos que has recogido
      handler(selectedMenu, selectedOptions, selectedOptions2);
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
    const navCats = document.getElementById("navCats");
    const container = navCats.nextElementSibling;
    container.replaceChildren();
    for (const category of categories) {
      container.insertAdjacentHTML(
        "beforeend",
        `<li><a data-category="${category.name}" class="dropdown-item" href="#productlist">${category.name}</a></li>`
      );
    }
  }

  // Método para mostrar los restaurantes en el menú
  showRestaurantsInMenu(restaurants) {
    const navCats = document.getElementById("navRest");
    const container = navRest.nextElementSibling;
    container.replaceChildren();
    for (const restaurant of restaurants) {
      container.insertAdjacentHTML(
        "beforeend",
        `<li><a data-rest="${restaurant.Restaurant.name}" class="dropdown-item" href="#product-list">${restaurant.Restaurant.name}</a></li>`
      );
    }
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

  showAdminMenu() {
    const menuOption = document.createElement("li");
    menuOption.classList.add("nav-item");
    menuOption.classList.add("dropdown");

    menuOption.insertAdjacentHTML(
      "beforeend",
      `<a class="nav-link dropdown-toggle"
      href="#" id="navMenu" role="button"
      data-bs-toggle="dropdown" aria-expanded="false"
      style="text-decoration: none;color: #ffffff;
      font-weight: bold;
      transition: color 0.3s;">Administración</a>`
    );

    const suboptions = document.createElement("ul");
    suboptions.classList.add("dropdown-menu");
    suboptions.classList.add("bg-dark");
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="lnewDish" class="dropdown-item" href="#new-dish">Crear plato</a></li>'
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="ldelDish" class="dropdown-item" href="#del-dish">Eliminar plato</a></li>'
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="lnewCategory" class="dropdown-item" href="#new-category">Crear categoría</a></li>'
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="ldelCategory" class="dropdown-item" href="#del-categoría">Eliminar categoría</a></li>'
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="lnewRestaurant" class="dropdown-item" href="#new-restaurant">Crear restaurante</a></li>'
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="lmodMenu" class="dropdown-item" href="#mod-menu">Modificar menú</a></li>'
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="lmodCategory" class="dropdown-item" href="#mod-categoría">Modificar categoría</a></li>'
    );
    menuOption.append(suboptions);
    this.menu.append(menuOption);
  }

  showNewCategoryForm() {
    this.main.replaceChildren();
    if (this.categories.children.length > 0)
      this.categories.children[0].remove();

    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("my-3");
    container.id = "new-category";
    container.insertAdjacentHTML(
      "beforeend",
      '<h1 class="display-5 text-white">Nueva categoría</h1>'
    );
    container.insertAdjacentHTML(
      "beforeend",
      `<form name="fNewCategory" role="form" class="row g-3" novalidate>
      <div class="col-md-6 mb-3">
        <label class="form-label" for="ncName">Nombre *</label>
        <div class="input-group">
        <span class="input-group-text"><i class="bi bi-type"></i></span>
         <input type="text" class="form-control" id="ncName" name="ncName" placeholder="Nombre de categoría" value="" required>
        <div class="invalid-feedback">El nombre es obligatorio.</div>
        <div class="valid-feedback">Correcto.</div>
        </div>
      </div>
    <div class="col-md-12 mb-3">
      <label class="form-label" for="ncDescription">Descripción</label>
        <div class="input-group">
        <span class="input-group-text"><i class="bi bi-bodytext"></i></span>
        <input type="text" class="form-control" id="ncDescription" name="ncDescription" value="">
        <div class="invalid-feedback"></div>
        <div class="valid-feedback">Correcto.</div>
      </div>
    </div>
      <div class="mb-12">
        <button class="btn btn-primary" type="submit">Enviar</button>
        <button class="btn btn-primary" type="reset">Cancelar</button>
      </div>
    </form>`
    );
    this.main.append(container);
  }

  showNewCategoryModal(done, cat, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Nueva Categoría";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">La categoría <strong>${cat.name}</strong> ha sido creada correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> La categoría <strong>${cat.name}</strong> ya está creada.</div>`
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fNewCategory.reset();
      }
      document.fNewCategory.ncName.focus();
    };
    messageModalContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }

  showRemoveCategoryForm(categories) {
    this.main.replaceChildren();
    if (this.categories.children.length > 0)
      this.categories.children[0].remove();
    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("my-3");
    container.id = "remove-category";
    container.insertAdjacentHTML(
      "afterbegin",
      '<h1 class="display-5">Eliminar una categoría</h1>'
    );
    const row = document.createElement("div");
    row.classList.add("row");
    for (const category of categories) {
      row.insertAdjacentHTML(
        "beforeend",
        ` <div class="col-lg-3 col-md-6 bg-dark text-center">
        <a data-category="${category.name}" href="#category-list  " class="text-decoration-none">
            <div class="cat-list-image">
                <img alt="${category.name}" src="./img/${category.name}.jpg" />
            </div>
            <div class="cat-list-text text-white">
                <h3>${category.name}</h3>
                <div>${category.description}</div>
            </div>
      <div><button class="btn btn-primary" data-category="${category.name}" type='button'>Eliminar</button>
      </div></a>
      </div>`
      );
    }
    container.append(row);
    this.main.append(container);
  }

  showRemoveCategoryModal(done, cat, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");
    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Borrado de categoría";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">La categoría
    <strong>${cat.name}</strong> ha sido eliminada correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="bi bi-exclamationtriangle"></i> La categoría <strong>${cat.name}</strong> no se ha podido
    borrar.</div>`
      );
    }
    messageModal.show();
  }

  showNewDishForm(categories, allergens) {
    this.main.replaceChildren();
    if (this.categories.children.length > 0)
      this.categories.children[0].remove();

    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("my-3");
    container.id = "new-dish";

    container.insertAdjacentHTML(
      "afterbegin",
      '<h1 class="display-5">Nuevo producto</h1>'
    );

    const form = document.createElement("form");
    form.name = "fNewDish";
    form.setAttribute("role", "form");
    form.setAttribute("novalidate", "");
    form.classList.add("row");
    form.classList.add("g-3");

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-6 mb-3">
				<label class="form-label text-white" for="npName">Nombre</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-key"></i></span>
					<input type="text" class="form-control" id="npName" name="npName" value="" required>
					<div class="invalid-feedback">El nombre es obligatorio</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>`
    );
    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-6 mb-3">
				<label class="form-label text-white" for="npIngredients">Ingredientes *</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-hash"></i></span>
					<input type="text" class="form-control" id="npIngredients" name="npIngredients"
						placeholder="Ingredientes" value="" required>
					<div class="invalid-feedback">Se necesitan conocer los ingredientes del plato</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>`
    );
    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-7 mb-3">
				<label class="form-label text-white" for="npImage">Imagen *</label>
				<div class="input-group">
					<input type="url" class="form-control" id="npImage" name="npImage"
						placeholder="" value="" required>
					<div class="invalid-feedback">Debes poner la url de tu imagen.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>`
    );
    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-6 mb-3">
				<label class="form-label text-white" for="npCategories">Categorías *</label>
				<div class="input-group">
					<label class="input-group-text" for="npCategories"><i class="bi bi-card-checklist"></i></label>
					<select class="form-select" name="npCategories" id="npCategories" multiple required>
					</select>
					<div class="invalid-feedback">El producto debe pertenecer al menos a una categoría.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>`
    );
    const npCategories = form.querySelector("#npCategories");
    for (const category of categories) {
      npCategories.insertAdjacentHTML(
        "beforeend",
        `<option value="${category.name}">${category.name}</option>`
      );
    }
    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-6 mb-3">
				<label class="form-label text-white" for="npAllergens">Alérgenos *</label>
				<div class="input-group">
					<label class="input-group-text" for="npAllergens"><i class="bi bi-card-checklist"></i></label>
					<select class="form-select" name="npAllergens" id="npAllergens" multiple required>
					</select>
					<div class="invalid-feedback">El plato debe contener al menos un alérgeno</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>`
    );
    const npAllergens = form.querySelector("#npAllergens");
    for (const allergen of allergens) {
      npAllergens.insertAdjacentHTML(
        "beforeend",
        `<option value="${allergen.name}">${allergen.name}</option>`
      );
    }
    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-9 mb-3">
				<label class="form-label text-white" for="npDescription">Descripción</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-text-paragraph"></i></span>
					<textarea class="form-control" id="npDescription" name="npDescription" rows="4">
					</textarea>
					<div class="invalid-feedback"></div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>`
    );
    form.insertAdjacentHTML(
      "beforeend",
      `<div class="mb-12">
				<button class="btn btn-primary" type="submit">Enviar</button>
				<button class="btn btn-primary" type="reset">Cancelar</button>
			</div>`
    );

    container.append(form);
    this.main.append(container);
  }

  showNewDishModal(done, dish, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Producto creado";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">El plato <strong>${dish.name}</strong>ha sido creada correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i>El plato <strong>${dish.name}</strong> no ha podido crearse correctamente.</div>`
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fNewDish.reset();
      }
      document.fNewDish.npName.focus();
    };
    messageModalContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }

  showRemoveDishForm(categories) {
    this.main.replaceChildren();
    if (this.categories.children.length > 0)
      this.categories.children[0].remove();

    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("my-3");
    container.id = "remove-dish";

    container.insertAdjacentHTML(
      "afterbegin",
      '<h1 class="display-5">Eliminar un producto</h1>'
    );

    const form = document.createElement("form");
    form.name = "fNewDish";
    form.setAttribute("role", "form");
    form.setAttribute("novalidate", "");
    form.classList.add("row");
    form.classList.add("g-3");

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-6 mb-3">
				<label class="form-label" for="rpCategories">Categorías del producto</label>
				<div class="input-group">
					<label class="input-group-text" for="rpCategories"><i class="bi bi-card-checklist"></i></label>
					<select class="form-select" name="rpCategories" id="rpCategories">
						<option disabled selected>Selecciona una categoría</option>
					</select>
				</div>
			</div>`
    );
    const rpCategories = form.querySelector("#rpCategories");
    for (const category of categories) {
      rpCategories.insertAdjacentHTML(
        "beforeend",
        `<option value="${category.name}">${category.name}</option>`
      );
    }

    container.append(form);
    container.insertAdjacentHTML(
      "beforeend",
      '<div id="product-list" class="container my-3"><div class="row"></div></div>'
    );

    this.main.append(container);
  }

  showRemoveDishList(dishes) {
    const listContainer = document.getElementById("dishes-list");
    listContainer.replaceChildren();

    let exist = false;
    for (const dish of dishes) {
      exist = true;
      listContainer.insertAdjacentHTML(
        "beforeend",
        `<div class="col-md-4 rDish">
				<figure class="card card-product-grid card-lg"> <a data-serial="${dish.Dish.name}" href="#single-product" class="img-wrap "><img class="${dish.Dish.name}-style" src="${dish.Dish.image}"></a>
					<figcaption class="info-wrap">
						<div class="row">
							<div class="col-md-8"> <a data-serial="${dish.Dish.name}" href="#single-product" class="title text-decoration-none text-dark">${dish.Dish.name} </a> </div>
							<div class="col-md-4">
								<div class="rating text-right"> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> </div>
							</div>
						</div>
					</figcaption>
					<div class="bottom-wrap"> <a href="#" data-serial="${dish.Dish.name}" class="btn btn-primary float-right"> Eliminar </a>
					</div>
				</figure>
			</div>`
      );
    }
    if (!exist) {
      listContainer.insertAdjacentHTML(
        "beforeend",
        '<p class="text-danger"><i class="bi bi-exclamation-triangle"></i> No existen platos  para esta categoría o tipo.</p>'
      );
    }
  }

  showRemoveDishModal(done, dish, error) {
    const dishList = document.getElementById("dishes-list");
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Producto eliminado";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">El producto <strong>${dish.Dish.name}</strong> ha sido eliminado correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> El ${dish.Dish.name} no existe en el manager.</div>`
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        const button = dishList.querySelector(
          `a.btn[data-serial="${dish.Dish.name}"]`
        );
        button.parentElement.parentElement.parentElement.remove();
      }
    };
    messageModalContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }

  showNewRestaurantForm() {
    this.main.replaceChildren();
    if (this.categories.children.length > 0)
      this.categories.children[0].remove();

    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("my-3");
    container.id = "new-restaurant";
    container.insertAdjacentHTML(
      "beforeend",
      '<h1 class="display-5 text-white">Nuevo Restaurante</h1>'
    );
    container.insertAdjacentHTML(
      "beforeend",
      `<form name="fNewRestaurant" role="form" class="row g-3" novalidate>
      <div class="col-md-12 mb-3">
        <label class="form-label" for="nrName">Nombre *</label>
        <div class="input-group">
        <span class="input-group-text"><i class="bi bi-type"></i></span>
         <input type="text" class="form-control" id="nrName" name="nrName" placeholder="Nombre del restaurante" value="" required>
        <div class="invalid-feedback">El nombre es obligatorio.</div>
        <div class="valid-feedback">Correcto.</div>
        </div>
      </div>
      <div class="col-md-6 mb-3">
				<label class="form-label text-white" for="nrLatitude">Latitud </label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-type"></i></span>
					<input type="text" class="form-control" id="nrLatitude" name="nrLatitude"
						placeholder="Latitud" value="" required>
					<div class="invalid-feedback">Se necesitan la latitud</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
      <div class="col-md-6 mb-3">
				<label class="form-label text-white" for="nrLongitude">Longitud </label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-hash"></i></span>
					<input type="text" class="form-control" id="nrLongitude" name="nrLongitude"
						placeholder="Longitud" value="" required>
					<div class="invalid-feedback">Se necesitan conocer la longitud</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
    <div class="col-md-12 mb-3">
      <label class="form-label" for="nrDescription">Descripción</label>
        <div class="input-group">
        <span class="input-group-text"><i class="bi bi-bodytext"></i></span>
        <input type="text" class="form-control" id="nrDescription" name="nrDescription"  placeholder="Descripción" value="">
        <div class="invalid-feedback"></div>
        <div class="valid-feedback">Correcto.</div>
      </div>
    </div>
      <div class="mb-12">
        <button class="btn btn-primary" type="submit">Enviar</button>
        <button class="btn btn-primary" type="reset">Cancelar</button>
      </div>
    </form>`
    );
    this.main.append(container);
  }

  showNewRestaurantModal(done, rest, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Nuevo Restaurante";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">El restaurante <strong>${rest.name}</strong> ha sido creada correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> El restaurante <strong>${rest.name}</strong> ya está creado.</div>`
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fNewRestaurant.reset();
      }
      document.fNewRestaurant.nrName.focus();
    };
    messageModalContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }

  showModifyMenuForm(menus) {
    this.main.replaceChildren();
    if (this.categories.children.length > 0)
      this.categories.children[0].remove();

    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("my-3");
    container.id = "modify-menu";

    container.insertAdjacentHTML(
      "afterbegin",
      '<h1 class="display-5">Modificar un menú</h1>'
    );

    const form = document.createElement("form");
    form.name = "fModifyMenu";
    form.setAttribute("role", "form");
    form.setAttribute("novalidate", "");
    form.classList.add("row");
    form.classList.add("g-3");

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-6 mb-3">
				<label class="form-label" for="mdMenu">Platos</label>
				<div class="input-group">
					<label class="input-group-text" for="mdMenu"><i class="bi bi-card-checklist"></i></label>
					<select class="form-select" name="mdMenu" id="mdMenu">
						<option disabled selected>Selecciona un menú</option>
					</select>
				</div>
			</div>`
    );
    const mdMenu = form.querySelector("#mdMenu");
    for (const menu of menus) {
      mdMenu.insertAdjacentHTML(
        "beforeend",
        `<option value="${menu.Menu.name}">${menu.Menu.name}</option>`
      );
    }

    container.append(form);
    container.insertAdjacentHTML(
      "beforeend",
      '<div id="product-list" class="container my-3"><div class="row"></div></div>'
    );

    this.main.append(container);
  }

  showModifyMenuList(assignDishes, notassignDishes) {
    // Obtener el formulario del primer método
    const form = document.querySelector('form[name="fModifyMenu"]');

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-3 mb-3">
            <label class="form-label text-white" for="mdAssignDishes">Platos asignados *</label>
            <div class="input-group">
                <label class="input-group-text" for="mdAssignDishes"><i class="bi bi-card-checklist"></i></label>
                <select class="form-select" name="mdAssignDishes" id="mdAssignDishes" multiple required>
                </select>
                <div class="invalid-feedback">Debes modificar el menú</div>
                <div class="valid-feedback">Correcto.</div>
            </div>
        </div>`
    );

    const mdAssignDishes = form.querySelector("#mdAssignDishes");
    for (const dish of assignDishes) {
      mdAssignDishes.insertAdjacentHTML(
        "beforeend",
        `<option value="${dish.name}">${dish.name}</option>`
      );
    }

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-3 mb-3">
            <label class="form-label text-white" for="mdNotAssignDishes">Platos no asignados *</label>
            <div class="input-group">
                <label class="input-group-text" for="mdNotAssignDishes"><i class="bi bi-card-checklist"></i></label>
                <select class="form-select" name="mdNotAssignDishes" id="mdNotAssignDishes" multiple required>
                </select>
                <div class="invalid-feedback">Debes modificar el menú</div>
                <div class="valid-feedback">Correcto.</div>
            </div>
        </div>
        <div class="mb-12">
            <button class="btn btn-primary assign-btn" type="button">Enviar</button>
            <button class="btn btn-primary" type="reset">Cancelar</button>
        </div>`
    );

    const mdNotAssignDishes = form.querySelector("#mdNotAssignDishes");
    for (const dish of notassignDishes) {
      mdNotAssignDishes.insertAdjacentHTML(
        "beforeend",
        `<option value="${dish.name}">${dish.name}</option>`
      );
    }
  }
  showModifyMenuModal(done, menu, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Modificar menú";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">El menú <strong>${menu.Menu.name}</strong> ha sido modificado correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> El menú <strong>${menu.Menu.name}</strong> no se ha podido modificar.</div>`
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fModifyMenu.reset();
      }
      document.fModifyMenu.mdMenu.focus();
    };
    messageModalContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }

  showModifyCategoriesForm(dishes) {
    this.main.replaceChildren();
    if (this.categories.children.length > 0)
      this.categories.children[0].remove();

    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("my-3");
    container.id = "modify-categories";

    container.insertAdjacentHTML(
      "afterbegin",
      '<h1 class="display-5">Modificar categorías</h1>'
    );

    const form = document.createElement("form");
    form.name = "fModifyCategories";
    form.setAttribute("role", "form");
    form.setAttribute("novalidate", "");
    form.classList.add("row");
    form.classList.add("g-3");

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-6 mb-3">
				<label class="form-label" for="mdCategories">Platos</label>
				<div class="input-group">
					<label class="input-group-text" for="mdCategories"><i class="bi bi-card-checklist"></i></label>
					<select class="form-select" name="mdCategories" id="mdCategories">
						<option disabled selected>Selecciona un plato</option>
					</select>
				</div>
			</div>`
    );
    const mdCategories = form.querySelector("#mdCategories");
    for (const dish of dishes) {
      mdCategories.insertAdjacentHTML(
        "beforeend",
        `<option value="${dish.Dish.name}">${dish.Dish.name}</option>`
      );
    }

    container.append(form);
    container.insertAdjacentHTML(
      "beforeend",
      '<div id="product-list" class="container my-3"><div class="row"></div></div>'
    );

    this.main.append(container);
  }

  showModifyCategoryList(assignCategories, notassignedCategories) {
    // Obtener el formulario del primer método
    const form = document.querySelector('form[name="fModifyCategories"]');

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-3 mb-3">
            <label class="form-label text-white" for="mdAssignCategories">Categorias asignadas *</label>
            <div class="input-group">
                <label class="input-group-text" for="mdAssignCategories"><i class="bi bi-card-checklist"></i></label>
                <select class="form-select" name="mdAssignCategories" id="mdAssignCategories" multiple required>
                </select>
                <div class="invalid-feedback">Debes modificar el plato</div>
                <div class="valid-feedback">Correcto.</div>
            </div>
        </div>`
    );

    const mdAssignDisCategories = form.querySelector("#mdAssignCategories");
    for (const category of assignCategories) {
      mdAssignDisCategories.insertAdjacentHTML(
        "beforeend",
        `<option value="${category.name}">${category.name}</option>`
      );
    }

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-3 mb-3">
            <label class="form-label text-white" for="mdNotAssignCategories">Categorias no asignadas *</label>
            <div class="input-group">
                <label class="input-group-text" for="mdNotAssignCategories"><i class="bi bi-card-checklist"></i></label>
                <select class="form-select" name="mdNotAssignCategories" id="mdNotAssignCategories" multiple required>
                </select>
                <div class="invalid-feedback">Debes modificar el menú</div>
                <div class="valid-feedback">Correcto.</div>
            </div>
        </div>
        <div class="mb-12">
            <button class="btn btn-primary assign-btn" type="button">Enviar</button>
            <button class="btn btn-primary" type="reset">Cancelar</button>
        </div>`
    );

    const mdNotAssignCategories = form.querySelector("#mdNotAssignCategories");
    for (const category of notassignedCategories) {
      mdNotAssignCategories.insertAdjacentHTML(
        "beforeend",
        `<option value="${category.name}">${category.name}</option>`
      );
    }
  }

  showModifyCategoriesModal(done, dish, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Modificar categorías del plato";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">El plato <strong>${dish.Dish.name}</strong> ha sido modificado correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> El plato <strong>${dish.Dish.name}</strong> no se ha podido modificar.</div>`
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fModifyCategories.reset();
      }
      document.fModifyCategories.mdCategories.focus();
    };
    messageModalContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }
}
// Exporta la clase ManagerView
export default ManagerView;
