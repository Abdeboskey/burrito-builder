import React, { Component } from 'react';
import { placeOrder } from '../../apiCalls'

class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      name: '',
      ingredients: [],
      error: ''
    };
  }


  handleSubmit = e => {
    e.preventDefault();
    if (this.state.ingredients.length > 0 && this.state.name) {
      placeOrder(this.state)
        .then(order => this.props.addNewOrder(order))
        .catch(error => this.setState({ error }))
    } else {
      this.setState({
        error: 'You must select at least one ingredient, and add your name to submit'
      })
      this.clearInputs();
    }
    this.clearInputs();
  }
  

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  handleIngredientChange = (e) => {
    e.preventDefault()
    this.setState({
      error: '',
      ingredients: [...this.state.ingredients, e.target.name]
    })
  }

  handleNameChange = e => {
    e.preventDefault()
    this.setState({
      error: '',
      name: e.target.value
    })
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} name={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        { ingredientButtons }

        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>
        {this.state.error && <p>{this.state.error}</p>}
        <button onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
      </form>
    )
  }
}

export default OrderForm;
