import "./styles.css";

import Project from "./project.js";
import ProjectsList from "./projectsList.js";
import ProjectsListDOMHandler from "./projectsListDOMHandler.js";

const PJ = new Project(`Home`);
const PJ2 = new Project(`Room`);
const PJ3 = new Project(`Kitchen`);

const PL = new ProjectsList();
PL.addProject(PJ);
PL.addProject(PJ2);
PL.addProject(PJ3);

const PLDM = new ProjectsListDOMHandler(PL);
