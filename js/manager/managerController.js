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
    dish4.ingredients = " tomate, queso y albahaca";
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
    // // dish1.image = `https://via.placeholder.com/258x172.jpg?text=${dish1.name}`;

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

    const coordinate1 = new Coordinate(245, 512);
    restaurant1.setLocation(
      coordinate1.getLatitude(),
      coordinate1.getLongitude()
    );
    const coordinate2 = new Coordinate(666, 333);
    restaurant2.setLocation(
      coordinate2.getLatitude(),
      coordinate2.getLongitude()
    );
    const coordinate3 = new Coordinate(101, 110);
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

  onLoad = () => {
    this[LOAD_MANAGER_OBJECTS]();
    console.log(this[MODEL]);
  };

  onInit = () => {};

  handleInit = () => {
    this.onInit();
  };
}

export default ManagerController;