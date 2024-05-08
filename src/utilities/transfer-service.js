import * as transferAPI from './transfer-api'
import { getUser } from './users-service'

export async function createTransfer(transferDetails) {
    return transferAPI.createTransfer({...transferDetails, 'from':getUser()._id})
}

