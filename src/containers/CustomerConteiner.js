import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, withRouter } from 'react-router-dom';
import { SubmissionError } from 'redux-form';
import AppFrame from './../components/AppFrame';
import { getCustomerByDni } from '../selectors/customers';
import CustomerEdit from './../components/CustomerEdit';
import CustomerData from './../components/CustomerData';
import { fetchCustomers } from './../actions/fetchCustomers';
import { updateCustomer } from './../actions/updateCustomer';
import { deleteCustomer } from './../actions/deleteCustomer';


class CustomerConteiner extends Component {
    componentDidMount() {
        if (!this.props.customer) {
            this.props.fetchCustomers();
        }
    }

    handleSubmit = values => {
        console.log(JSON.stringify(values));
        const { id } = values;
        return this.props.updateCustomer(id, values)
            .then(v => v)
            .catch(err => {
                if (err.error) {
                    throw new SubmissionError(err.payload);
                }
            });
    }

    handleOnBack = () => {
        this.props.history.goBack();
    };

    handleOnSubmitSuccess = () => {
        this.props.history.goBack();
    }

    handleOnDelete = (id) => {
        console.log("HandleOnDelete");
        //this.props.deleteCustomer(30);
        return this.props.deleteCustomer(id)
            .then(v => {
                this.props.history.goBack();
            })
            .catch(err => {
                if (err.error) {
                    throw new SubmissionError(err.payload);
                }
            });
    }

    renderCustomerControl = (isEdit, isDelete, customer) => {
        if (this.props.customer) {
            const CustomerControl = isEdit ? CustomerEdit : CustomerData;
            return <CustomerControl {...customer}
                onSubmit={this.handleSubmit}
                onSubmitSuccess={this.handleOnSubmitSuccess}
                onBack={this.handleOnBack}
                isDeleteAllow={!!isDelete}
                onDelete={this.handleOnDelete} />
        }
        return null;
    }

    renderBody = (customer) => (
        <Route path="/customers/:dni/edit" children={
            ({ match: isEdit }) => (
                <Route path="/customers/:dni/del" children={
                    ({ match: isDelete }) => (
                        this.renderCustomerControl(isEdit, isDelete, customer)
                    )

                } />
            )
        } />
    )

    //<p>Datos del cliente "{this.props.customer.name}"</p>
    render() {
        return (
            <div>
                <AppFrame
                    header={`Cliente ${this.props.dni}`}
                    body={this.renderBody(this.props.customer)}
                ></AppFrame>
            </div>
        );
    }
}

CustomerConteiner.propTypes = {
    dni: PropTypes.string.isRequired,
    customer: PropTypes.object,
    fetchCustomers: PropTypes.func.isRequired,
    updateCustomer: PropTypes.func.isRequired,
    deleteCustomer: PropTypes.func.isRequired,
};

const mapStateTOProps = (state, props) => ({
    customer: getCustomerByDni(state, props)
});

export default withRouter(connect(mapStateTOProps, {
    fetchCustomers,
    updateCustomer,
    deleteCustomer
})(CustomerConteiner));