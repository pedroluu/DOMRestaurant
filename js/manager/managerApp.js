import Manager from "./manager.js";
import ManagerController from "./managerController.js";
import ManagerView from "./managerView.js";
import AuthenticationService from "../authentication/authentication.js";

const ManagerApp = new ManagerController(
  Manager.getInstance(),
  new ManagerView(),
  AuthenticationService.getInstance()
);

export default ManagerApp;
