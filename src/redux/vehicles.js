import initialState from "./initialState"
import { REQUEST_LOG_USER_OUT } from "./auth"
import vehiclesApiClient from "../services/vehiclesApiClient"


export const CREATE_VEHICLE = "@@vehicles/CREATE_VEHICLE"
export const CREATE_VEHICLE_SUCCESS = "@@vehicles/CREATE_VEHICLE_SUCCESS"
export const CREATE_VEHICLE_FAILURE = "@@vehicles/CREATE_VEHICLE_FAILURE"

export const FETCH_VEHICLE_BY_ID = "@@cleanings/FETCH_VEHICLE_BY_ID"
export const FETCH_VEHICLE_BY_ID_SUCCESS = "@@cleanings/FETCH_VEHICLE_BY_ID_SUCCESS"
export const FETCH_VEHICLE_BY_ID_FAILURE = "@@cleanings/FETCH_VEHICLE_BY_ID_FAILURE"
export const CLEAR_CURRENT_VEHICLE = "@@cleanings/CLEAR_CURRENT_VEHICLE"

export const FETCH_ALL_USER_VEHICLES = "@@cleanings/FETCH_ALL_USER_VEHICLES"
export const FETCH_ALL_USER_VEHICLES_SUCCESS = "@@cleanings/FETCH_ALL_USER_VEHICLES_SUCCESS"
export const FETCH_ALL_USER_VEHICLES_FAILURE = "@@cleanings/FETCH_ALL_USER_VEHICLES_FAILURE"

export default function vehiclesReducer(state = initialState.vehicles, action = {}) {
  switch (action.type) {
    case CREATE_VEHICLE:
      return {
        ...state,
        isLoading: true,
      }
    case CREATE_VEHICLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        data: {
          ...state.data,
          [action.data.id]: action.data,
        },
      }
    case CREATE_VEHICLE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }
    case FETCH_VEHICLE_BY_ID:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_VEHICLE_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        currentVehicle: action.data
      }
    case FETCH_VEHICLE_BY_ID_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        currentVehicle: {}
      }
    case CLEAR_CURRENT_VEHICLE:
      return {
        ...state,
        currentVehicle: null
      }
    case FETCH_ALL_USER_VEHICLES:
      return {
          ...state,
          isLoading: true,
        }
    case FETCH_ALL_USER_VEHICLES_SUCCESS:
      return {
          ...state,
          isLoading: false,
          error: null,
          data: {
            ...state.data,
            ...action.data.reduce((acc, vehicle) => {
              acc[vehicle.id] = vehicle
              return acc
            }, {}),
          },
        }
    case FETCH_ALL_USER_VEHICLES_FAILURE:
      return {
          ...state,
          isLoading: false,
          error: action.error,
        }
    case REQUEST_LOG_USER_OUT:
      return initialState.vehicles

    default:
      return state
    }
  }

export const Actions = {}
Actions.createVehicle = ({ new_vehicle }) => {
  return vehiclesApiClient({
    url: `/vehicles/`,
    method: `POST`,
    types: {
      REQUEST: CREATE_VEHICLE,
      SUCCESS: CREATE_VEHICLE_SUCCESS,
      FAILURE: CREATE_VEHICLE_FAILURE,
    },
    options: {
      data: { new_vehicle },
      params: {},
    },
  })
}


Actions.clearCurrentVehicle = () => ({ type: CLEAR_CURRENT_VEHICLE })

Actions.fetchVehicleById = ({ vehicle_id }) => {
  return vehiclesApiClient({
    url: `/vehicles/no/${vehicle_id}/`,
    method: `GET`,
    types: {
      REQUEST: FETCH_VEHICLE_BY_ID,
      SUCCESS: FETCH_VEHICLE_BY_ID_SUCCESS,
      FAILURE: FETCH_VEHICLE_BY_ID_FAILURE
    },
    options: {
      data: {},
      params: {}
    }
  })
}

Actions.fetchAllUserVehicles = () => {
    return vehiclesApiClient({
      url: `/vehicles/`,
      method: `GET`,
      types: {
        REQUEST: FETCH_ALL_USER_VEHICLES,
        SUCCESS: FETCH_ALL_USER_VEHICLES_SUCCESS,
        FAILURE: FETCH_ALL_USER_VEHICLES_FAILURE,
      },
      options: {
        data: {},
        params: {}
      },
    })
  }
  