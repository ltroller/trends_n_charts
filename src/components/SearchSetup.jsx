import React, { Component } from "react";
import { Container, Row, Col, Jumbotron, Button, Alert } from "reactstrap";
import { SearchTermForm } from "./";

import api from "../api.js";

export class SearchSetup extends Component {
    constructor(props) {
        super(props);

        // set initial state
        this.state = {
            keywords: [],
            locations: [],
            error: null
        };

        // Bind functions
        this.handleAddTerm = this.handleAddTerm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRemoveTerm = this.handleRemoveTerm.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
    }

    handleAddTerm(type, value, error) {
        let newState = { ...this.state };
        newState.error = error;
        if (value) {
            newState[type].push(value);
        }

        this.setState(newState);
    }

    handleRemoveTerm(e, value, type) {
        let ln = e.currentTarget;
        let badge = ln.parentElement;
        // remove event listener ?
        // ln.removeEventListener("click", this.handleRemoveTag);
        // badge.classList.add("removed");
        this.setState({
            [type]: this.state[type].filter(val => val !== value)
        });
        // api.delay(400).then(() => {});
    }

    render() {
        return (
            <Container className="search-setup">
                <Row>
                    <Col>
                        <Jumbotron>
                            <h1 className="display-5">
                                Welcome to trends'n'charts
                            </h1>
                            <p className="lead">
                                My name is Ludwig and this is a little demo app
                                I cooked up for today
                            </p>
                            <hr className="my-2" />
                            <p>
                                The goal here was to make use of API data and
                                display it in D3 charts. It's really simple,
                                just add some keywords and some locations and
                                press start.
                            </p>
                            {this.state.error && (
                                <Alert color="danger">{this.state.error}</Alert>
                            )}

                            <Row>
                                <Col md={6}>
                                    <SearchTermForm
                                        name="keyword"
                                        type={"keywords"}
                                        terms={this.state.keywords}
                                        addTerm={this.handleAddTerm}
                                        removeTerm={this.handleRemoveTerm}
                                    />
                                </Col>
                                <Col md={6}>
                                    <SearchTermForm
                                        name="location"
                                        type={"locations"}
                                        terms={this.state.locations}
                                        btColor="warning"
                                        addTerm={this.handleAddTerm}
                                        removeTerm={this.handleRemoveTerm}
                                    />
                                </Col>
                            </Row>

                            <Button onClick={this.handleSubmit} color="success">
                                Let's go
                            </Button>
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>
        );
    }
}
