import React from "https://esm.sh/react@19.1.0";
import ReactDOM from "https://esm.sh/react-dom@19.1.0/client";

const App = () => {
  return React.createElement(
    "div",
    { id: "MainContainer" },
    React.createElement(
      "div",
      { id: "childRoot" },
      React.createElement("h1", { id: "Logo" }, "Chai aur Cohort"),
      React.createElement(
        "div",
        { id: "AllLinks" },
        React.createElement("h4", null, "Home"),
        React.createElement("h4", null, "About"),
        React.createElement("h4", null, "Contect"),
        React.createElement("h4", null, "Login")
      )
    ),
    React.createElement("h1", {}, "Chai variation by chai code"),
    React.createElement("br", null),
    React.createElement("div", {}, React.createElement(Chai))
  );
};

const Chai = () => {
  return React.createElement(
    "div",
    { id: "chai" },
    React.createElement("h1", null, "Ginger cahi"),
    React.createElement("br", null),
    React.createElement("h1", null, "Massala cahi"),
    React.createElement("br", null),
    React.createElement("h1", null, "Lemon cahi"),
    React.createElement("br", null),
    React.createElement("h1", null, "Black cahi")
  );
};

const container = document.getElementById("root");
let root = ReactDOM.createRoot(container);
root.render(React.createElement(App));
