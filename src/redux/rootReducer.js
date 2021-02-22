import { combineReducers } from "redux"
import authReducer from "./auth"
import vehiclesReducer from "./vehicles"

const rootReducer = combineReducers({
  auth: authReducer,
  vehicles: vehiclesReducer

  // other reducers will go here later
})
export default rootReducer