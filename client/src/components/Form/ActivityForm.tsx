import { Divider, Input, TimePicker } from "antd";
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
import { _addAccommodationFeature, _removeAccommodationFeature, _setAccommodationCheckInTime, _setAccommodationCheckOutDate, _setAccommodationCheckOutTime, _setAccommodationName } from "../../redux/actions/AccomodationAction";
import { ConsoleSqlOutlined } from "@ant-design/icons";

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
            console.log(text)
            dispatch(_setActivityName(text));
        }, 1000), []);

    useEffect(() => {
        console.log(activityState)
    })

    return(
        <div>
            <div className="mb-2">
                <Input 
                    placeholder="활동 이름을 입력해주세요." 
                    onChange={(e) => {
                        onChangeText(e.target.value)
                    }} 
                    bordered={false}
                />
                <Divider style={{ margin: 0 }} />
            </div>
            <div className="mb-2">
                <TimePicker 
                    className="w-full" 
                    placeholder="시간을 입력해주세요." 
                    onChange={onSelectTime} 
                    defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
                    bordered={false}
                />
                <Divider style={{ margin: 0 }} />
            </div>
            <div>
                <MarkableMap mapState={mapState} setMapState={setMapState}/>
            </div>
        </div>
    )
})

export default ActivityForm;