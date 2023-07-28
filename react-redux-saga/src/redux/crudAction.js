import { FETCH_SERVICE,CREATE_FETCH_SERVICE,UPDATE_SERVICE,DELETE_SERVICE } from "./constant";

export const serviceList = () => {
    return {
        type: FETCH_SERVICE,
    }
}

export const createService = (data) => {
    return {
        type: CREATE_FETCH_SERVICE,
        data
    }
}

export const updateService = (data) => {
    return {
        type: UPDATE_SERVICE,
        data
    }
}

export const deleteService = (data) => {
    return {
        type: DELETE_SERVICE,
        data
    }
}