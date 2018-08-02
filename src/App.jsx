import React, { Component } from "react";
// import logo from "./logo.svg";

import "bootstrap/dist/css/bootstrap.min.css";
import "./main.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChartLine, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { Header, SearchSetup } from "./components";

library.add(faChartLine, faTimesCircle);

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header />
                <div id="main-body">
                    <SearchSetup />
                </div>
            </div>
        );
    }
}

export default App;
