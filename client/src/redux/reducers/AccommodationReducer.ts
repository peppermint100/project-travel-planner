import { SET_ACCOMMODATION_CHECK_OUT_DATE } from '../actions/AccomodationAction';
import { AccommodationFormType } from "../../types/detail/FormType";
import { ADD_ACCOMMODATION_FEATURE, IAccommodationFormAction, REMOVE_ACCOMMODATION_FEATURE, SET_ACCOMMODATION_CHECK_IN_TIME, SET_ACCOMMODATION_CHECK_OUT_TIME, SET_ACCOMMODATION_NAME } from "../actions/AccomodationAction";

const initialState: AccommodationFormType = {
    accommodationName: "",
    checkInTime: "00:00:00",
    checkOutTime: "00:00:00",
    checkOutDate: "0000:00:00",
    features: []
}

const AccommodationFormReducer = (state = initialState, action: IAccommodationFormAction) => {

    switch(action.type){
        case SET_ACCOMMODATION_NAME:
            return {
                ...state,
                accommodationName: action.accommodationName
            }
        case SET_ACCOMMODATION_CHECK_IN_TIME:
            return {
                ...state,
                checkInTime: action.checkInTime
            }

        case SET_ACCOMMODATION_CHECK_OUT_TIME:
            return {
                ...state,
                checkOutTime: action.checkOutTime
            }

        case SET_ACCOMMODATION_CHECK_OUT_DATE:
            return {
                ...state,
                checkOutDate: action.checkOutDate
            }
      
        case ADD_ACCOMMODATION_FEATURE:
            return {
                ...state,
                features: [...state.features, action.addedFeature]
            }

        case REMOVE_ACCOMMODATION_FEATURE:
            const beforeRemove = state.features
            const target = action.removedFeature
            const removedFeatures = beforeRemove.filter((c:any) => c !== target)

            return {
                ...state,
                features: removedFeatures
            }
        default:
            return state;
    }
}

export default AccommodationFormReducer;