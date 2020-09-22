import React from 'react'
import OrderForm from './OrderForm'
import { fireEvent, getByText, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import { placeOrder } from '../../apiCalls'
jest.mock("../../apiCalls");

describe('OrderForm', () => {
  it('should display the correct content when rendered', () => {
    const mockAddNewOrder = jest.fn()
    const { getByRole, getByPlaceholderText } = render(
      <MemoryRouter>
        <OrderForm addNewOrder={mockAddNewOrder}/>
      </MemoryRouter>
    )

    const nameInput = getByPlaceholderText(/name/i)
    const beansButton = getByRole('button', { name: /beans/i })
    const sourCreamButton = getByRole('button', { name: /sour cream/i })
    const submitButton = getByRole('button', { name: /submit order/i })
    
    expect(nameInput).toBeInTheDocument()
    expect(beansButton).toBeInTheDocument()
    expect(sourCreamButton).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
  })

  it('should update the value of the name form when typed into', () => {
    const mockAddNewOrder = jest.fn()
    const { getByRole, getByPlaceholderText } = render(
      <MemoryRouter>
        <OrderForm addNewOrder={mockAddNewOrder}/>
      </MemoryRouter>
    )

    const nameInput = getByPlaceholderText(/name/i)
    fireEvent.change(nameInput, { target: { value: 'Aaron' } })

    expect(nameInput.value).toEqual('Aaron')
  })

  it('should not allow a user to submit the form if a name has not been entered', () => {
    const mockAddNewOrder = jest.fn()
    const { getByRole, getByText } = render(
      <MemoryRouter>
        <OrderForm addNewOrder={mockAddNewOrder}/>
      </MemoryRouter>
    )

    const beansButton = getByRole('button', { name: /beans/i })
    fireEvent.click(beansButton)
    const submitButton = getByRole("button", { name: /submit order/i });
    fireEvent.click(submitButton)

    const errorMessage = getByText(/must select at least one ingredient/)
    expect(errorMessage).toBeInTheDocument()
  })

  it('should not allow a user to submit the form if at least one ingredient has not been selected', () => {
    const mockAddNewOrder = jest.fn()
    const { getByRole, getByPlaceholderText, getByText } = render(
      <MemoryRouter>
        <OrderForm addNewOrder={mockAddNewOrder}/>
      </MemoryRouter>
    )

    const nameInput = getByPlaceholderText(/name/i)
    fireEvent.change(nameInput, { target: { value: 'Aaron' } })
    const submitButton = getByRole('button', { name: /submit order/i });
    fireEvent.click(submitButton)

    const errorMessage = getByText(/must select at least one ingredient/)
    expect(errorMessage).toBeInTheDocument()
  })
})