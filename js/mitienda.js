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
};

window.addEventListener("popstate", (event) => {
  if (event.state) {
    historyActions[event.state.action](event);
  }
});

history.replaceState({ action: "init" }, null);
