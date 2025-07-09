import EventBus from "./EventBus";
import ProjectsList from "./projectsList";

export default class LocalStorageHandler {
  constructor() {
    EventBus.addEventListener("updateProjList", (e) => {
      const stringified = JSON.stringify(e.detail);
      localStorage.setItem("projList", stringified);
    });
  }

  initializeProjectList() {
    const newProjectList = new ProjectsList();
    const storedProjectList = JSON.parse(localStorage.getItem("projList"));
    

    return new ProjectsList();
  }
}
