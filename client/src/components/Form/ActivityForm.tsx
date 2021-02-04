import { Input, TimePicker } from "antd";
import moment from "moment";
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash"
import { RootReducerType } from "../../redux/reducers/rootReducer";
import { MapStateType } from "../../types/map/MapType";
import { _setMapState } from "../../redux/actions/MapAction";
import { ActivitiyFormType } from "../../types/detail/FormType";
import { _setActivityName, _setActivityTime } from "../../redux/actions/ActivityFormAction";
import MarkableMap from "../Map/MarkableMap";
import { _addAccomodationFeature, _removeAccomodationFeature, _setAccomodationCheckInTime, _setAccomodationCheckOutDate, _setAccomodationCheckOutTime, _setAccomodationName } from "../../redux/actions/AccomodationAction";

const ActivityForm = React.memo(() => {
    const dispatch = useDispatch()
    const mapState = useSelector((state: RootReducerType) => state.MapReducer)
    const setMapState = useCallback((state: MapStateType) => {
        dispatch(_setMapState(state))
    }, [])
    const activityState: ActivitiyFormType = useSelector((state: RootReducerType) => state.ActivityFormReducer)

    const onSelectTime = (_: any, timeString: any) => {
        dispatch(_setActivityTime(timeString))
    }

    const onChangeText = useCallback(
        _.debounce((text: string) => {
            dispatch(_setActivityName(text));
        }, 1000), []);

    useEffect(() => {
        console.log(activityState)
    })

    return(
        <div>
            <div>
                <Input placeholder="활동 이름을 입력해주세요." onChange={(e) => {
                    onChangeText(e.target.value)
                }} />
            </div>
            <div>
                <TimePicker className="w-full" placeholder="시간을 입력해주세요." onChange={onSelectTime} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
            </div>
            <div>
                <MarkableMap mapState={mapState} setMapState={setMapState}/>
            </div>
        </div>
    )
})

export default ActivityForm;