import React, {useState} from 'react'
import * as expenseService from "../../utilities/expense-service"

export default function Expense() {

  const [expenseDetails, setExpenseDetails] = useState({category: 'travel'})
  const [error, setError] = useState('')
  const [category, setCategory] = useState('Travel')

  function handleSelect(evt) {
    setCategory(evt.target.value)
    setExpenseDetails({...expenseDetails, [evt.target.name]: evt.target.value})
  }

  function handleChange(evt) {
    setExpenseDetails({...expenseDetails, [evt.target.name]: evt.target.value})
    setError('')
  }

  function handleSubmit(evt){
    evt.preventDefault()
    try {
      expenseService.createExpense(expenseDetails)
    } catch (error) {
      setError('Expense failed to log')
    }

  }

  return (
    <div>
        <div className='form-container'>
            <form autoComplete='off' onSubmit={handleSubmit}>
                <label>Date:</label>
                <input type='date' name='incurredDate' onChange={handleChange} required></input>
                <br />
                <label>Category</label>
                <select name='category' value={category} onChange={handleSelect} required>
                  <option value='Travel'>Travel</option>
                  <option value='Food'>Food</option>
                  <option value='Accommodation'>Accommodation</option>
                </select>
                <br />
                <label>Amount</label>
                <input type='number' name='amount' onChange={handleChange} required></input>
                <br />
                <label>Shared with:</label>
                <br />
                <label>Description</label>
                <input type='text' name='description' onChange={handleChange}></input>
                <div>
                <button type='submit'>+ Add expense</button>
                </div>
            </form>
        </div>
    </div>
  )
}
