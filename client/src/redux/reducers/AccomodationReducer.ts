import { SET_ACCOMODATION_CHECK_OUT_DATE } from './../actions/AccomodationAction';
import { AccomodationFormType } from "../../types/detail/FormType";
import { ADD_ACCOMODATION_FEATURE, IAccomodationFormAction, REMOVE_ACCOMODATION_FEATURE, SET_ACCOMODATION_CHECK_IN_TIME, SET_ACCOMODATION_CHECK_OUT_TIME, SET_ACCOMODATION_NAME } from "../actions/AccomodationAction";

const initialState: AccomodationFormType = {
    accomodationName: "",
    checkInTime: "00:00:00",
    checkOutTime: "00:00:00",
    checkOutDate: "0000:00:00",
    features: []
}

const AccomodationFormReducer = (state = initialState, action: IAccomodationFormAction) => {

    switch(action.type){
        case SET_ACCOMODATION_NAME:
            return {
                ...state,
                accomodationName: action.accomodationName
            }
        case SET_ACCOMODATION_CHECK_IN_TIME:
            return {
                ...state,
                checkInTime: action.checkInTime
            }

        case SET_ACCOMODATION_CHECK_OUT_TIME:
            return {
                ...state,
                checkOutTime: action.checkOutTime
            }

        case SET_ACCOMODATION_CHECK_OUT_DATE:
            return {
                ...state,
                checkOutDate: action.checkOutDate
            }
      
        case ADD_ACCOMODATION_FEATURE:
            return {
                ...state,
                features: [...state.features, action.addedFeature]
            }

        case REMOVE_ACCOMODATION_FEATURE:
            const beforeRemove = state.features
            const target = action.removedFeature
            const removedFeatures = beforeRemove.filter(c => c !== target)

            return {
                ...state,
                features: removedFeatures
            }
        default:
            return state;
    }
}

export default AccomodationFormReducer;