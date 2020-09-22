import React from 'react'
import App from './App'
import { fireEvent, waitFor, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import { placeOrder, getOrders, deleteOrder } from '../../apiCalls'
jest.mock('../../apiCalls')

describe('App', () => {

  let existingOrders, newOrder

  beforeEach(() => {
    existingOrders = {
      orders: [
        {
          id: 1,
          name: 'Bubs',
          ingredients: ['beans', 'queso fresco']
        },
        {
          id: 2,
          name: 'Jimmy',
          ingredients: ['carnitas', 'hot sauce', 'cilantro']
        },
        {
          id: 3,
          name: 'Xadie',
          ingredients: ['sofritas', 'lettuce', 'guacamole']
        }
      ]
    }
    newOrder = {
      id: 24,
      name: 'Bat Man',
      ingredients: ['carnitas', 'guacamole']
    }
  })

  it('should display saved orders when component is loaded', async () => {
    getOrders.mockResolvedValueOnce(existingOrders)
    const { findByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    const bubsOrder = await findByRole('heading', { name: /bubs/i })
    const jimmyOrder = await findByRole('heading', { name: /jimmy/i })
    const xadieOrder = await findByRole('heading', { name: /xadie/i })
  })

  it('should display a new order when one has been successfully placed', async () => {
    getOrders.mockResolvedValueOnce(existingOrders)
    placeOrder.mockResolvedValueOnce(newOrder)
    const { findByRole, getByPlaceholderText, getByRole  } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    const nameInput = getByPlaceholderText(/name/i);
    fireEvent.change(nameInput, { target: { value: "Bat Man" } });

    const carnitasButton = getByRole("button", { name: /carnitas/i });
    fireEvent.click(carnitasButton);

    const guacamoleButton = getByRole("button", { name: /guacamole/i });
    fireEvent.click(guacamoleButton);

    const submitButton = getByRole("button", { name: /submit order/i });
    fireEvent.click(submitButton)

    const successfulOrder = await findByRole('heading', {name: /bat man/i})

    expect(successfulOrder).toBeInTheDocument()
  })

  it('should remove an order when the "Order Ready" button has been clicked', async () => {
    getOrders.mockResolvedValueOnce(existingOrders)
    placeOrder.mockResolvedValueOnce(newOrder)
    deleteOrder.mockResolvedValueOnce({})
    const { findByRole, getByPlaceholderText, getByRole, getAllByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    const nameInput = getByPlaceholderText(/name/i);
    fireEvent.change(nameInput, { target: { value: "Bat Man" } });

    const carnitasButton = getByRole("button", { name: /carnitas/i });
    fireEvent.click(carnitasButton);

    const guacamoleButton = getByRole("button", { name: /guacamole/i });
    fireEvent.click(guacamoleButton);

    const submitButton = getByRole("button", { name: /submit order/i });
    fireEvent.click(submitButton)

    const successfulOrder = await findByRole('heading', {name: /bat man/i})
    expect(successfulOrder).toBeInTheDocument()

    const removeOrderButtons = getAllByRole('button', { name: /order ready/i})
    fireEvent.click(removeOrderButtons[3])

    await waitFor(() => {
      expect(successfulOrder).not.toBeInTheDocument();
    })
  })
})