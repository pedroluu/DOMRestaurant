import RestaurantManager from "./manager.js";
import ManagerController from "./managerController.js";
import ManagerView from "./managerView.js";

const ManagerApp = new ManagerController(
  RestaurantManager.getInstance(),
  new ManagerView()
);

export default ManagerApp;
