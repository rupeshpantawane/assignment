import {combineReducers} from 'redux'
import { cartData } from './reducer'
import {productData} from './productReducer'
import { crudData } from './crudReducer'
export default combineReducers({
    cartData,
    productData,
    crudData
})