import ManagerApp from "./manager/managerApp.js";

const historyActions = {
  init: () => {
    ManagerApp.handleInit();
  },
  dishCategoryList: (event) =>
    ManagerApp.handleDishCategoryList(event.state.category),
  dishAllergenList: (event) =>
    ManagerApp.handleDishAllergenList(event.state.allergen),
  dishMenuList: (event) => ManagerApp.handleDishMenuList(event.state.menu),
  restaurantInMenu: (event) =>
    ManagerApp.handleRestaurantDetails(event.state.rest),
  randomDishes: (event) => ManagerApp.handleDishDetails(event.state.dish),
  newCategory: () => ManagerApp.handleNewCategoryForm(),
  removeCategory: () => ManagerApp.handleRemoveCategoryForm(),
  newDish: () => ManagerApp.handleNewDishForm(),
  removeDish: () => ManagerApp.handleRemoveDishForm(),
  removeDishByCategory: (event) => {
    ManagerApp.handleRemoveDishForm();
    ManagerApp.handleRemoveDishListByCategory(event.state.category);
  },
  newRestaurant: () => ManagerApp.handleNewRestaurantForm(),
  modifyMenu: () => ManagerApp.handleModifyMenuForm(),
  modifyMenuByDish: (event) => {
    ManagerApp.handleModifyMenuForm();
    ManagerApp.handleDishesAssignedToMenu(event.state.menu);
  },
  modifyCategories: () => ManagerApp.handleModifyCategoriesForm(),
  modifyDishByCategories: (event) => {
    ManagerApp.handleModifyMenuForm();
    ManagerApp.handleCategoriesAssignedToDish(event.state.dish);
  },
};

window.addEventListener("popstate", (event) => {
  if (event.state) {
    historyActions[event.state.action](event);
  }
});

history.replaceState({ action: "init" }, null);
