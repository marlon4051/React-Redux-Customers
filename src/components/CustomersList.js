import React from 'react';
import PropTypes from 'prop-types';
import CustomerListItem from './CustomerListItem';
import { accessControl } from './../helpers/accessControl';
import { CUSTOMER_LIST } from './../constants/permissions';
const CustomersList = ({ customers, urlPath }) => {
    return (
        <div className="customers-CustomersList">
            {
                customers.map(c =>
                    <CustomerListItem
                        key={c.id}
                        dni={c.dni}
                        name={c.name}
                        editAction={'Editar'}
                        delAction={'eliminar'}
                        urlPath={urlPath}
                    >
                    </CustomerListItem>)
            }
        </div>
    );
};

CustomersList.propTypes = {
    customers: PropTypes.array.isRequired,
    urlPath: PropTypes.string.isRequired,
};

export default accessControl([CUSTOMER_LIST])(CustomersList);