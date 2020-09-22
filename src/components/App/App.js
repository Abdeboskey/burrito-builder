import React, { Component } from 'react';
import './App.css';
import { getOrders, deleteOrder } from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      orders: []
    }
  }

  componentDidMount() {
    getOrders()
      .then(orders => {
        this.addExistingOrders(orders.orders)
      })
      .catch(err => console.error('Error fetching:', err));
  }

  addExistingOrders = orders => {
    this.setState({
      orders
    })
  }

  addNewOrder = order => {
    this.setState({
      orders: [...this.state.orders, order] 
    })
  }

  removeOrder = id => {
    deleteOrder(id)
      .then(() => {
        const remainingOrders = this.state.orders.filter(order => {
          return order.id !== id
        }) 
        this.setState({
          orders: remainingOrders
        })
      })
      .catch(error => console.log(error))
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm addNewOrder={this.addNewOrder} />
        </header>

        <Orders 
          orders={this.state.orders}
          removeOrder={this.removeOrder}  
        />
      </main>
    );
  }
}


export default App;
