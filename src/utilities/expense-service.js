import * as expenseAPI from './expense-api'
import { getUser } from './users-service'

export async function createExpense(expenseDetails) {
    console.log({...expenseDetails, 'createdBy':getUser()._id})
    return expenseAPI.createExpense({...expenseDetails, 'createdBy':getUser()._id})
}