import "./styles.css";

import TodoItem from "./todoItem.js";
import Project from "./project.js";
import ProjectsList from "./projectsList.js";

import TodoItemDOMHandler from "./todoItemDOMHandler.js";
import ProjectDOMHandler from "./projectDOMHandler.js";
import ProjectsListDOMHandler from "./projectsListDOMHandler.js";
import { format } from "date-fns";

const PJ = new Project(`Home`);
const PJ2 = new Project(`Room`);
const PJ3 = new Project(`Kitchen`);
const PJ4 = new Project(`Bedroom`);

PJ.addTodoItem(
  new TodoItem(
    `Implement Todo App`,
    `For Odin Project`,
    format(new Date(2025, 6, 26), "dd/MM/yyyy"),
    5
  )
);
PJ.addTodoItem(
  new TodoItem(
    `Design Landing Page`,
    `Create responsive layout`,
    format(new Date(2025, 6, 27), "dd/MM/yyyy"),
    2
  )
);
PJ.addTodoItem(
  new TodoItem(
    `Write Project README`,
    `Add instructions and screenshots`,
    format(new Date(2025, 6, 28), "dd/MM/yyyy"),
    3
  )
);
PJ.addTodoItem(
  new TodoItem(
    `Fix Webpack Config`,
    `Resolve dev server and asset issues`,
    format(new Date(2025, 6, 29), "dd/MM/yyyy"),
    1
  )
);

PJ.addTodoItem(
  new TodoItem(
    `Refactor JS Classes`,
    `Improve structure and reusability`,
    format(new Date(2025, 6, 30), "dd/MM/yyyy"),
    2
  )
);

PJ3.addTodoItem(
  new TodoItem(
    `Refactor JS2 Classes`,
    `Improve structure and reusability`,
    format(new Date(2025, 6, 30), "dd/MM/yyyy"),
    2
  )
);

PJ2.addTodoItem(
  new TodoItem(
    `Deploy to GitHub Pages`,
    `Final step before submission`,
    format(new Date(2025, 6, 31), "dd/MM/yyyy"),
    0
  )
);

const PL = new ProjectsList();
PL.addProject(PJ);
PL.addProject(PJ2);
PL.addProject(PJ3);

const PLDM = new ProjectsListDOMHandler(PL);
PL.addProject(PJ4);
PLDM.refresh();

const TDiv = new ProjectDOMHandler(PJ);
const TodoDiv = new TodoItemDOMHandler(PJ.getAllTodos()[0]);
