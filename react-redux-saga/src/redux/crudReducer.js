import { SET_FETCH_SERVICE,SET_CREATE_FETCH_SERVICE } from "./constant";

export const crudData = (data = [], action) => {
    switch (action.type) {
        case SET_FETCH_SERVICE:
            return [action?.data?.data?.rows]
       
        default:
            return data
    }
}