export const getOrders = () => {
  return fetch('http://localhost:3001/api/v1/orders')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
}

export const placeOrder = state => {
  return fetch('http://localhost:3001/api/v1/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: state.name,
      ingredients: state.ingredients
    })
  })
  .then(response => {
		if (response.ok) {
			return response.json()
		} else {
			throw response
		}
	})
}

export const deleteOrder = id => {
  return fetch(`http://localhost:3001/api/v1/orders/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
}

