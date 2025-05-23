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
    React.createElement(
      "div",
      {},
      React.createElement("img", {
        src: "https://images.pexels.com/photos/29546719/pexels-photo-29546719/free-photo-of-moody-foggy-path-in-dark-forest-landscape.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      })
    )
  );
};

const container = document.getElementById("root");
let root = ReactDOM.createRoot(container);
root.render(React.createElement(App));
