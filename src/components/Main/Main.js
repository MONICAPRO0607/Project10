import "./Main.css";

export const Main = () => {
  let main = document.querySelector("main");
  if (!main) {
    main = document.createElement("main");
    main.id = "app";
    document.body.append(main);
  }
  return main;
};