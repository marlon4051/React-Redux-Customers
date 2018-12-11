import React, { Component } from 'react';
import AppFrame from './../components/AppFrame';
import CustomersActions from './../components/CustomersActions';
import { withRouter } from 'react-router-dom';


class HomeContainer extends Component {
    handleOnClick = () => {
        console.log("HandleOnClick");
        this.props.history.push('/customers');
    }
    render() {
        return (
            <div>
                <AppFrame
                    header='Home'
                    body={
                        <div>
                            Esta es la pantalla inicial
                            <CustomersActions>
                                <button onClick={this.handleOnClick}>
                                    Listado de clientes
                                </button>
                            </CustomersActions>
                        </div>
                    }>
                </AppFrame>
            </div>
        );
    }
}


export default withRouter(HomeContainer);