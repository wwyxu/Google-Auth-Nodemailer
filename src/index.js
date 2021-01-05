import React from "react";
import ReactDOM from "react-dom";
import Contact from "./components/Contact";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Contact />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
