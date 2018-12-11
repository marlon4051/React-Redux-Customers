import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import AppFrame from './../components/AppFrame';
import CustomerEdit from '../components/CustomerEdit';
import { insertCustomer } from './../actions/insertCustomer';



class NewCustomerContainer extends Component {
    handleSubmit = (values) => {
        return this.props.insertCustomer(values).then(v => v)
            .catch(err => {
                if (err.error) {
                    throw new SubmissionError(err.payload);
                }
            });
    }
    handleOnSubmitSuccess = () => {
        this.props.history.goBack();
    }
    handleOnBack = () => {
        this.props.history.goBack();
    }
    renderBody = () => {
        const newCustomer = {
            "id": "",
            "dni": "",
            "name": "",
            "age": 0,
        }
        return <CustomerEdit
            {...newCustomer}
            onSubmit={this.handleSubmit}
            onSubmitSuccess={this.handleOnSubmitSuccess}
            onBack={this.handleOnBack} />
    }

    render() {
        return (
            <div>
                <AppFrame
                    header={"Creación del cliente"}
                    body={this.renderBody()}
                ></AppFrame>
            </div>
        );
    }
}

NewCustomerContainer.propTypes = {
    insertCustomer: PropTypes.func.isRequired,
};

export default withRouter(connect(null, { insertCustomer })(NewCustomerContainer));