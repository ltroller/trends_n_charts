import React, { Component } from "react";
import {
    Container,
    Row,
    Col,
    Jumbotron,
    Input,
    FormGroup,
    Button,
    InputGroup,
    InputGroupAddon,
    Alert,
    Badge
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
        this.handleAddTag = this.handleAddTag.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleRemoveTag = this.handleRemoveTag.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
    }

    handleAddTag(e) {
        e.preventDefault();
        let input = e.target.parentElement.previousSibling;
        let type = input.getAttribute("name");
        let newState = { ...this.state };
        let cpName = type.charAt(0).toUpperCase() + type.slice(1);
        if (input.value.length < 3) {
            newState.error = `${cpName} should be at least 3 letters`;
        } else if (this.state[type].includes(input.value)) {
            newState.error = `${input.value} is already in ${type}`;
        } else {
            newState.error = null;
            this.state[type].push(input.value);
            input.value = null;
        }
        console.log(this.state, newState);

        this.setState(newState);
    }

    handleRemoveTag(e, value, type) {
        let ln = e.currentTarget;
        let badge = ln.parentElement;
        // remove event listener ?
        // ln.removeEventListener("click", this.handleRemoveTag);
        badge.classList.add("removed");
        api.delay(300).then(() => {
            this.setState({
                [type]: this.state[type].filter(val => val !== value)
            });
        });
    }

    renderSearchTerms(i, value, type) {
        let color = type === "keywords" ? "info" : "warning";
        return (
            <Badge key={i} color={color}>
                {value}
                <FontAwesomeIcon
                    onClick={e => this.handleRemoveTag(e, value, type)}
                    icon="times-circle"
                />
            </Badge>
        );
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
                                    <h4>Keywords</h4>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <InputGroup>
                                            <Input
                                                type="text"
                                                name="keywords"
                                                placeholder="Add a keyword"
                                            />
                                            <InputGroupAddon addonType="append">
                                                <Button
                                                    onClick={this.handleAddTag}
                                                    color="info"
                                                >
                                                    +
                                                </Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </FormGroup>
                                    <div className="search-term-list">
                                        {this.state.keywords.map((keyword, i) =>
                                            this.renderSearchTerms(
                                                i,
                                                keyword,
                                                "keywords"
                                            )
                                        )}
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <h4>Locations</h4>

                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <InputGroup>
                                            <Input
                                                type="text"
                                                name="locations"
                                                placeholder="Add a location"
                                            />
                                            <InputGroupAddon addonType="append">
                                                <Button
                                                    onClick={this.handleAddTag}
                                                    color="warning"
                                                >
                                                    +
                                                </Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </FormGroup>
                                    <div className="search-term-list">
                                        {this.state.locations.map(
                                            (location, i) =>
                                                this.renderSearchTerms(
                                                    i,
                                                    location,
                                                    "locations"
                                                )
                                        )}
                                    </div>
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
