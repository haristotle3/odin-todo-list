import "./styles.css";

import TodoItemDOMHandler from "./todoItemDOMHandler.js";
import ProjectDOMHandler from "./projectDOMHandler.js";
import ProjectsListDOMHandler from "./projectsListDOMHandler.js";
import LocalStorageHandler from "./localStorageHandler.js";

const LSH = new LocalStorageHandler();
const projectList = LSH.initializeProjectList();

const projectListDom = new ProjectsListDOMHandler(projectList);
const tasksDiv = new ProjectDOMHandler(projectList.getAllProjects()[0]);
const todoItemDiv = new TodoItemDOMHandler(projectList.getAllProjects()[0].getAllTodos()[0]);
