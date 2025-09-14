export const createPage = (id) => {
  let app = document.querySelector("#app");

  if (!app) {
    app = document.createElement("div");
    app.id = "app";
    document.body.appendChild(app);
  }

  app.innerHTML = "";

  const pageDiv = document.createElement("div");
  pageDiv.id = id;

  app.appendChild(pageDiv);

  return pageDiv;
};