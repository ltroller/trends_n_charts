import React, { Component } from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class Header extends Component {
    render() {
        return (
            <Navbar color="dark" dark expand="md">
                <NavbarBrand>
                    <FontAwesomeIcon icon="chart-line" />
                    Trends'n'Charts
                </NavbarBrand>
            </Navbar>
        );
    }
}
