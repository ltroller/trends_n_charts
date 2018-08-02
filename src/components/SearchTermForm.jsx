import React, { Component } from "react";
import {
    Input,
    FormGroup,
    Button,
    InputGroup,
    InputGroupAddon,
    Badge
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

export class SearchTermForm extends Component {
    constructor(props) {
        super(props);
        this.title =
            this.props.type.charAt(0).toUpperCase() + this.props.type.slice(1);
        this.color = this.props.btColor ? this.props.btColor : "info";
        this.handleAddTerm = this.handleAddTerm.bind(this);
    }

    handleAddTerm(e) {
        e.preventDefault();

        let input = e.target.parentElement.previousSibling;
        let error = null;
        let value = null;
        if (input.value.length < 3) {
            error = `${this.title} should be at least 3 letters`;
        } else if (this.props.terms.includes(input.value)) {
            error = `${input.value} is already in ${this.type}`;
        } else {
            value = input.value;
            input.value = null;
        }

        this.props.addTerm(this.props.type, value, error);
    }

    renderSearchTerms(i, value, type) {
        return (
            <Badge key={i} color={this.color}>
                {value}
                <FontAwesomeIcon
                    onClick={e => this.props.removeTerm(e, value, type)}
                    icon="times-circle"
                />
            </Badge>
        );
    }

    render() {
        return (
            <div>
                <h4>{this.title}</h4>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <InputGroup>
                        <Input
                            type="text"
                            name={this.props.type}
                            placeholder={`Add a ${this.props.name}`}
                        />
                        <InputGroupAddon addonType="append">
                            <Button
                                onClick={this.handleAddTerm}
                                color={this.color}
                            >
                                +
                            </Button>
                        </InputGroupAddon>
                    </InputGroup>
                </FormGroup>
                <div className="search-term-list">
                    {this.props.terms.map((term, i) =>
                        this.renderSearchTerms(i, term, this.props.type)
                    )}
                </div>
            </div>
        );
    }
}

SearchTermForm.propTypes = {
    terms: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    addTerm: PropTypes.func.isRequired,
    removeTerm: PropTypes.func.isRequired,
    btColor: PropTypes.string
};
