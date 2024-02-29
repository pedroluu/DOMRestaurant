import {
  Dish,
  Menu,
  Category,
  Allergen,
  Restaurant,
  Coordinate,
} from "./manager.js";

const MODEL = Symbol("managerModel");
const VIEW = Symbol("managerView");
const LOAD_MANAGER_OBJECTS = Symbol("Load Manager Objects");

class ManagerController {
  constructor(modelManager, viewManager) {
    this[MODEL] = modelManager;
    this[VIEW] = viewManager;

    this.onLoad();
    this.onInit();
    this[VIEW].bindInit(this.handleInit);
  }

  [LOAD_MANAGER_OBJECTS]() {
    const category1 = this[MODEL].createCategory("Entrantes");
    const category2 = this[MODEL].createCategory("Segundos");
    const category3 = this[MODEL].createCategory("Postres");
    category1.description =
      "Son los platos de entrada al menú generalmente para compartir";
    category2.description = "Platos individuales donde realmente se come";
    category3.description = "Dulces y postres para finalizar el menú";
    const dish1 = this[MODEL].createDish("Ensalada César");
    const dish2 = this[MODEL].createDish("Sopa de tomate");
    const dish3 = this[MODEL].createDish("Pasta Alfredo");
    const dish4 = this[MODEL].createDish("Pizza margarita");
    const dish5 = this[MODEL].createDish("Filete de ternera");
    const dish6 = this[MODEL].createDish("Salmón a la parrilla");
    const dish7 = this[MODEL].createDish("Pollo al curry");
    const dish8 = this[MODEL].createDish("Cocido madrileño");
    const dish9 = this[MODEL].createDish("Flan");
    const dish10 = this[MODEL].createDish("Tarta de queso");
    const dish11 = this[MODEL].createDish("Helado de fresa");
    const dish12 = this[MODEL].createDish("Tiramisú");
    // dish1.image = `https://via.placeholder.com/258x172.jpg?text=${dish1.name}`;

    dish1.description =
      "Ensalada César con pollo, lechuga, crutones y aderezo César";
    dish2.description = "Sopa de tomates frescos";
    dish3.description = "pasta de la casa con salsa Alfredo casera";
    dish4.description = "pizza margarita con albahaca";
    dish5.description = "filete a la plancha con salsa al vino";
    dish6.description = "salmón cocinado a la parilla con salsa de limón";
    dish7.description = "pollo estilo asiático con curry";
    dish8.description = "Cocido madrileño en dos partes";
    dish9.description = "Flan casero con caramelo";
    dish10.description = "tarta de queso cabrales";
    dish11.description = "helado de fresa con láminas de galleta";
    dish12.description = "tiramisú con café colombiano";
    dish1.ingredients =
      "lechuga, pollo a la plancha, salsa césar, crutones de pan y pasas";
    dish2.ingredients = "tomates, ajo, cebolla, orégano y albahaca";
    dish3.ingredients = "tallarines al huevo, ternera, salsa Alfredo";
    dish4.ingredients = " tomate, queso y albahaca (opcional base de nata)";
    dish5.ingredients = "filete de ternera 250gr, queso y reduccion de vino";
    dish6.ingredients = "salmón salpimentado y salsa de limón ";
    dish7.ingredients =
      "pollo rebozado en panko y especias, arroz y salsa de curry";
    dish8.ingredients =
      "garbanzos, fideos, hueso de cerdo, morcilla, jamón y repollo";
    dish9.ingredients = "huevo y caramelo";
    dish10.ingredients = "base de galleta, queso cabrales y huevo ";
    dish11.ingredients = " bolas de helado de fresa, láminas de galleta";
    dish12.ingredients = " café, mascarpone, yemas de huevo y bizcochos";

    dish1.image = "./img/ensaladaCesar.jpg";
    dish2.image = "./img/sopa.jpg";
    dish3.image = "./img/PastaAlfredo.jpg";
    dish4.image = "./img/pizzamar.jpg";
    dish5.image = "./img/filete.jpg";
    dish6.image = "./img/salmon.jpg";
    dish7.image = "./img/pollo.jpg";
    dish8.image = "./img/cocido.jpg";
    dish9.image = "./img/flan.jpg";
    dish10.image = "./img/tartita.jpg";
    dish11.image = "./img/helado.jpg";
    dish12.image = "./img/tira.jpg";

    this[MODEL].assignCategoryToDish(category1, dish1, dish2, dish3, dish4);
    this[MODEL].assignCategoryToDish(category2, dish5, dish6, dish7, dish8);
    this[MODEL].assignCategoryToDish(category3, dish9, dish10, dish11, dish12);

    const allergen1 = this[MODEL].createAllergen("Frutos secos");
    const allergen2 = this[MODEL].createAllergen("Gluten");
    const allergen3 = this[MODEL].createAllergen("Lactosa");
    const allergen4 = this[MODEL].createAllergen("Mariscos");

    allergen1.description =
      "Esto incluye una gran variedad como nueces y semillas";
    allergen2.description =
      "Es una proteina presente en el trigo, cebada, centeno, etc.";
    allergen3.description = "es el azúcar presente en la leche y sus derivados";
    allergen4.description =
      "mariscos como langostinos, cangrejos y almejas pueden causar alergias alimentarias";

    this[MODEL].assignAllergenToDish(allergen1, dish1, dish7, dish10, dish8);
    this[MODEL].assignAllergenToDish(allergen2, dish3, dish4, dish9, dish8);
    this[MODEL].assignAllergenToDish(allergen3, dish7, dish10, dish12, dish11);
    this[MODEL].assignAllergenToDish(allergen4, dish6, dish3, dish4, dish7);

    const menu1 = this[MODEL].createMenu("Menú del día");
    const menu2 = this[MODEL].createMenu("Menú infantil");
    const menu3 = this[MODEL].createMenu("Menú gourmet");

    menu1.description =
      "Este menú es de lunes a viernes e incluye entrante, segundo, bebida y postre";
    menu2.description =
      "Este menú va dirigido hasta niños menores de 13 años e incluye entrante, segundo, bebida y postre";
    menu3.description =
      " Este menú eleva su precio al ofrecer unos alimentos más exclusivos";

    this[MODEL].assignDishToMenu(dish1, menu1)
      .assignDishToMenu(dish8, menu1)
      .assignDishToMenu(dish10, menu1);
    this[MODEL].assignDishToMenu(dish4, menu2)
      .assignDishToMenu(dish5, menu2)
      .assignDishToMenu(dish11, menu2);
    this[MODEL].assignDishToMenu(dish3, menu3)
      .assignDishToMenu(dish6, menu3)
      .assignDishToMenu(dish9, menu3);

    const restaurant1 = this[MODEL].createRestaurant("Las lomas");
    const restaurant2 = this[MODEL].createRestaurant("La cochera");
    const restaurant3 = this[MODEL].createRestaurant("Los brezos");

    const coordinate1 = new Coordinate("40.7128° N", "74.0060° W");
    restaurant1.setLocation(
      coordinate1.getLatitude(),
      coordinate1.getLongitude()
    );
    const coordinate2 = new Coordinate(" -33.8688° S", " 151.2093° E");
    restaurant2.setLocation(
      coordinate2.getLatitude(),
      coordinate2.getLongitude()
    );
    const coordinate3 = new Coordinate("51.5074° N", "0.1278° W");
    restaurant3.setLocation(
      coordinate3.getLatitude(),
      coordinate3.getLongitude()
    );

    restaurant1.description =
      "Cocina mediterránea fresca y saludable en un ambiente acogedor.";
    restaurant2.description =
      "Cocina internacional y ambiente animado en el corazón de la ciudad.";
    restaurant3.description =
      "Enfoque en la gastronomía local y los ingredientes frescos de temporada.";
  }
  // Método llamado al cargar la aplicación
  onLoad = () => {
    // Inicia la carga de objetos de gestión
    this[LOAD_MANAGER_OBJECTS]();
    // Agrega funciones de manejo de eventos para agregar categorías, alérgenos, menús y restaurantes
    this.onAddCategory();
    this.onAddAllergen();
    this.onAddMenu();
    this.onAddRestaurant();
    this[VIEW].showAdminMenu();
    // Establece una función de manejo de eventos para cerrar ventanas
    this.onCloseWindow();
    this[VIEW].bindAdminMenu(
      this.handleNewCategoryForm,
      this.handleRemoveCategoryForm,
      this.handleNewDishForm,
      this.handleRemoveDishForm,
      this.handleNewRestaurantForm,
      this.handleModifyMenuForm
    );
  };

  // Método llamado durante la inicialización de la aplicación
  onInit = () => {
    // Muestra las categorías y platos existentes en la vista
    this[VIEW].showCategories(this[MODEL].getCategories());
    this[VIEW].showDishes(this[MODEL].getRandomDishes());
    // Establece los enlaces de eventos para listar platos por categoría, mostrar detalles de platos,
    // listar platos por alérgeno, listar platos por menú y mostrar detalles de restaurantes
    this[VIEW].bindDishCategoryList(this.handleDishCategoryList);
    this[VIEW].bindDishDetails(this.handleDishDetails);
    this[VIEW].bindDishAllergenList(this.handleDishAllergenList);
    this[VIEW].bindDishMenuList(this.handleDishMenuList);
    this[VIEW].bindRestaurant(this.handleRestaurantDetails);
  };

  // Manejador de eventos que llama al método onInit
  handleInit = () => {
    this.onInit();
  };

  // Manejador de eventos para manejar la lista de platos por categoría
  handleDishCategoryList = (name) => {
    // Crea una categoría y obtiene los platos de esa categoría
    const category = this[MODEL].createCategory(name);
    const CategoryIterator = this[MODEL].getDishesInCategory(category);
    const dishes = [];
    // Itera sobre los platos y los agrega al array dishes
    for (const dishName of CategoryIterator) {
      dishes.push(this[MODEL].createDish(dishName));
    }
    // Lista los platos por categoría en la vista
    this[VIEW].listDishes(dishes, category.name);
    // Establece un enlace de evento para mostrar detalles de platos por categoría
    this[VIEW].bindDishDetailsByCategory(this.handleDishDetails);
  };

  // Manejador de eventos para manejar los detalles de un plato
  handleDishDetails = (name) => {
    // Crea un plato y muestra sus detalles en la vista
    console.log(name);
    const dish = this[MODEL].createDish(name);
    this[VIEW].showDish(dish);
    // Establece un enlace de evento para mostrar el plato en una nueva ventana
    this[VIEW].bindShowDishInNewWindow(this.handleDishInNewWindow);
  };
  // Manejador de eventos para mostrar detalles de un restaurante
  handleRestaurantDetails = (name) => {
    // Crea un restaurante y muestra sus detalles en la vista
    const rest = this[MODEL].createRestaurant(name);
    this[VIEW].showRestaurant(rest);
  };

  // Manejador de eventos para manejar la lista de platos por alérgeno
  handleDishAllergenList = (name) => {
    // Crea un alérgeno y obtiene los platos que contienen ese alérgeno
    const allergen = this[MODEL].createAllergen(name);
    const AllergenIterator = this[MODEL].getDishesWithAllergen(allergen);
    const dishes = [];
    // Itera sobre los platos y los agrega al array dishes
    for (const dishName of AllergenIterator) {
      dishes.push(this[MODEL].createDish(dishName));
    }
    // Lista los platos por alérgeno en la vista
    this[VIEW].listDishes(dishes, allergen.name);
    // Establece un enlace de evento para mostrar detalles de platos por alérgeno
    this[VIEW].bindDishDetailsByAllergen(this.handleDishDetails);
  };

  // Manejador de eventos para manejar la lista de platos por menú
  handleDishMenuList = (name) => {
    // Crea un menú y obtiene los platos que están en ese menú
    const menu = this[MODEL].createMenu(name);
    const MenuIterator = this[MODEL].getDishesInMenu(menu.Menu.name);
    const dishes = [];
    // Itera sobre los platos y los agrega al array dishes
    for (const dishName of MenuIterator) {
      dishes.push(this[MODEL].createDish(dishName));
    }
    // Lista los platos por menú en la vista
    this[VIEW].listDishesInMenu(dishes, menu.Menu.name);
    // Establece un enlace de evento para mostrar detalles de platos por menú
    this[VIEW].bindDishDetailsByMenu(this.handleDishDetails);
  };

  // Manejador de eventos para mostrar un plato en una nueva ventana
  handleDishInNewWindow = (name, newWindow) => {
    try {
      // Intenta crear un plato y mostrarlo en una nueva ventana
      const dish = this[MODEL].createDish(name);
      this[VIEW].showDishInNewWindow(dish.Dish, newWindow);
    } catch (error) {
      // Si no se encuentra el plato, muestra un mensaje de error en la nueva ventana
      this[VIEW].showDishInNewWindow(
        null,
        newWindow,
        "Actualmente no tenemos este plato en nuestro sistema."
      );
    }
  };

  // Manejador de eventos para cerrar una ventana abierta desde el menú
  handleCloseWindowInMenu = (dish, window) => {
    // Cierra la ventana y elimina la referencia al plato de la ventana en el mapa
    window.close();
    this[VIEW].dishWindow.delete(dish);
  };

  handleNewCategoryForm = () => {
    this[VIEW].showNewCategoryForm();
    this[VIEW].bindNewCategoryForm(this.handleCreateCategory);
  };

  handleCreateCategory = (name, desc) => {
    const cat = this[MODEL].createCategory(name);
    cat.description = desc;
    let done;
    let error;
    try {
      done = true;
      this.onAddCategory();
    } catch (exception) {
      done = false;
      error = exception;
    }
    this[VIEW].showNewCategoryModal(done, cat, error);
  };

  handleRemoveCategoryForm = () => {
    this[VIEW].showRemoveCategoryForm(this[MODEL].getCategories());
    this[VIEW].bindRemoveCategoryForm(this.handleRemoveCategory);
  };

  handleRemoveCategory = (name) => {
    let done;
    let error;
    let cat;
    try {
      cat = this[MODEL].createCategory(name);
      this[MODEL].removeCategory(cat);
      done = true;
      this.onAddCategory();
      this.handleRemoveCategoryForm();
    } catch (exception) {
      done = false;
      error = exception;
    }
    this[VIEW].showRemoveCategoryModal(done, cat, error);
  };

  handleNewDishForm = () => {
    this[VIEW].showNewDishForm(
      this[MODEL].getCategories(),
      this[MODEL].getAllergens()
    );
    this[VIEW].bindNewDishForm(this.handleCreateDish);
  };

  handleCreateDish = (
    name,
    ingredients,
    image,
    description,
    categories,
    allergens
  ) => {
    let done;
    let error;
    let dish;

    try {
      dish = this[MODEL].createDish(name);
      dish.description = description;
      dish.ingredients = ingredients;
      dish.image = image;
      categories.forEach((name) => {
        const category = this[MODEL].createCategory(name);
        this[MODEL].assignCategoryToDish(category, dish);
      });
      allergens.forEach((name) => {
        const allergen = this[MODEL].createAllergen(name);
        this[MODEL].assignAllergenToDish(allergen, dish);
      });
      done = true;
    } catch (exception) {
      done = false;
      error = exception;
    }

    this[VIEW].showNewDishModal(done, dish, error);
  };

  handleRemoveDishForm = () => {
    this[VIEW].showRemoveDishForm(this[MODEL].getCategories());
    this[VIEW].bindRemoveDishSelects(this.handleRemoveDishListByCategory);
  };

  handleRemoveDishListByCategory = (category) => {
    const cat = this[MODEL].createCategory(category);
    const CategoryIterator = this[MODEL].getDishesInCategory(cat);
    const dishes = [];
    // Itera sobre los platos y los agrega al array dishes
    for (const dishName of CategoryIterator) {
      dishes.push(this[MODEL].createDish(dishName));
    }
    this[VIEW].showRemoveDishList(dishes);
    this[VIEW].bindRemoveDish(this.handleRemoveDish);
  };

  handleRemoveDish = (name) => {
    let done;
    let error;
    let dish;
    try {
      dish = this[MODEL].createDish(name);
      this[MODEL].removeDish(dish);
      console.log(this[MODEL]);
      done = true;
    } catch (exception) {
      done = false;
      error = exception;
    }
    this[VIEW].showRemoveDishModal(done, dish, error);
  };

  handleNewRestaurantForm = () => {
    this[VIEW].showNewRestaurantForm();
    this[VIEW].bindNewRestaurantForm(this.handleCreateRestaurant);
  };

  handleCreateRestaurant = (name, desc) => {
    const rest = this[MODEL].createRestaurant(name);
    rest.description = desc;
    let done;
    let error;
    try {
      done = true;
      this.onAddRestaurant();
    } catch (exception) {
      done = false;
      error = exception;
    }
    this[VIEW].showNewRestaurantModal(done, rest, error);
  };

  handleModifyMenuForm = () => {
    this[VIEW].showModifyMenuForm(this[MODEL].getMenus());
    this[VIEW].bindModifyMenuSelects(this.handleDishesAssignedToMenu);
  };

  handleDishesAssignedToMenu = (menu) => {
    const men = this[MODEL].createMenu(menu);
    const MenuIterator = this[MODEL].getDishesInMenu(menu);
    const dishes = [];
    // Itera sobre los platos y los agrega al array dishes
    for (const dishName of MenuIterator) {
      dishes.push(this[MODEL].createDish(dishName).Dish);
    }
    const DishIterator = this[MODEL].getDishes();
    const allDishes = [];
    for (const dish of DishIterator) {
      allDishes.push(dish.Dish);
    }

    // Obtenemos los platos que no están en común entre dishes y allDishes
    const dishesNotInCommon = allDishes.filter((dish) => {
      // Verifica si el plato no está presente en el array dishes
      return !dishes.some((d) => d.name === dish.name); // Ajusta la comparación según la estructura de tus objetos dish
    });

    this[VIEW].showModifyMenuList(dishes, dishesNotInCommon);
    this[VIEW].bindModifyMenu(this.handleModifyMenu);
  };

  handleModifyMenu = (menu, assigns, notAssigns) => {
    let done;
    let error;
    let men;
    try {
      men = this[MODEL].createMenu(menu);
      for (const dish of assigns) {
        const object = this[MODEL].createDish(dish).Dish;
        this[MODEL].deassignDishToMenu(men, object);
      }

      for (const dish of notAssigns) {
        const object = this[MODEL].createDish(dish).Dish;
        this[MODEL].assignDishToMenu(object, men.Menu);
      }
      console.log(this[MODEL]);

      done = true;
    } catch (exception) {
      done = false;
      error = exception;
    }
    this[VIEW].showModifyMenuModal(done, men, error);
  };

  // Método para agregar categorías
  onAddCategory = () => {
    // Muestra las categorías en el menú y establece enlaces de eventos para manejar las acciones relacionadas con las categorías
    this[VIEW].showCategoriesInMenu(this[MODEL].getCategories());
    this[VIEW].bindDishCategoryListInMenu(this.handleDishCategoryList);
    this[VIEW].bindDishAllergenList(this.handleDishAllergenList);
    this[VIEW].bindDishMenuList(this.handleDishMenuList);
  };

  // Método para agregar alérgenos
  onAddAllergen = () => {
    // Muestra los alérgenos en el menú
    this[VIEW].showAllergensInMenu(this[MODEL].getAllergens());
  };

  // Método para agregar menús
  onAddMenu = () => {
    // Muestra los menús en el menú
    this[VIEW].showMenusInMenu(this[MODEL].getMenus());
  };

  // Método para agregar restaurantes
  onAddRestaurant = () => {
    // Muestra los restaurantes en el menú
    this[VIEW].showRestaurantsInMenu(this[MODEL].getRestaurants());
  };

  // Método para cerrar ventanas abiertas desde el menú
  onCloseWindow = () => {
    // Muestra la opción de cerrar ventanas en el menú y establece un enlace de evento para manejar esta acción
    this[VIEW].showWindowCloseInMenu();
    this[VIEW].bindCloseWindowInMenu(this.handleCloseWindowInMenu);
  };
}
export default ManagerController;
