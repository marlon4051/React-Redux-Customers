
import { createAction } from 'redux-actions';
import { INSERT_CUSTOMER } from '../constants';
import { apiPost } from '../api';
import { urlCustomers } from './../api/urls';


export const insertCustomer = createAction(INSERT_CUSTOMER,
    customer => apiPost(urlCustomers, customer)());