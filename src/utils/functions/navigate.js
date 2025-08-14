import { router } from "../routes/routes";

export const navigate = (e, route) => {
  e.preventDefault();
  window.history.pushState("", "", route.path);
  router();
}