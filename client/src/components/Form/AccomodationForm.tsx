import {  DatePicker, Input, Space, TimePicker } from "antd";
import moment from "moment";
import React, { useCallback, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash"
import Checkbox, { CheckboxChangeEvent } from "antd/lib/checkbox/Checkbox";
import { RootReducerType } from "../../redux/reducers/rootReducer";
import { MapStateType } from "../../types/map/MapType";
import { _setMapState } from "../../redux/actions/MapAction";
import { AccomodationFormType } from "../../types/detail/FormType";
import { _setActivityName, _setActivityTime } from "../../redux/actions/ActivityFormAction";
import MarkableMap from "../Map/MarkableMap";
import { Feature } from "../../types/api/DetailType";
import { _addAccomodationFeature, _removeAccomodationFeature, _setAccomodationCheckInTime, _setAccomodationCheckOutDate, _setAccomodationCheckOutTime, _setAccomodationName } from "../../redux/actions/AccomodationAction";

const AccomodationForm = () => {
    const dispatch = useDispatch()
    const mapState = useSelector((state: RootReducerType) => state.MapReducer)

    const setMapState = useCallback((state: MapStateType) => {
        dispatch(_setMapState(state))
    }, [])

    const accomodationState: AccomodationFormType = useSelector((state: RootReducerType) => state.AccomodationReducer)

    const onSelectCheckInTime = (_: any, timeString: any) => {
        dispatch(_setAccomodationCheckInTime(timeString))
    }
    const onSelectCheckOutTime = (_: any, timeString: any) => {
        dispatch(_setAccomodationCheckOutTime(timeString))
    }
    const onChangeText = useCallback(
        _.debounce((text: string) => {
            dispatch(_setAccomodationName(text));
        }, 1000), []);

    const onSelectCheckOutDate = (_: any, dateString: any) => {
        console.log('in react: ', dateString)
        dispatch(_setAccomodationCheckOutDate(dateString))
    }

    useEffect(() => {
        console.log(accomodationState)
    })

    const onChangeCheckbox = (e: CheckboxChangeEvent) => {
        if(e.target.checked){
            console.log('checked')
            dispatch(_addAccomodationFeature(e.target.value))
        }else{
            console.log('unchecked')
            dispatch(_removeAccomodationFeature(e.target.value))
        }
        console.log(e.target.checked)
        console.log(e.target.value)
    }

    return(
        <div>
            <div>
                <Input placeholder="호텔 이름을 입력해주세요." onChange={(e) => {
                    onChangeText(e.target.value)
                }} />
            </div>
            <div>
                <label>호텔 체크 아웃 날짜</label>
                <Space>
                    <DatePicker onChange={onSelectCheckOutDate} />
                </Space>
            </div>
            <div>
                <TimePicker className="w-full" placeholder="호텔 체크 인 시간" onChange={onSelectCheckInTime} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
            </div>
           <div>
                <TimePicker className="w-full" placeholder="호텔 체크 아웃 시간" onChange={onSelectCheckOutTime} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
            </div>
            <div>
                <Checkbox onChange={onChangeCheckbox} value={Feature.AIR_CONDITIONING}>에어컨</Checkbox>
                <Checkbox onChange={onChangeCheckbox} value={Feature.WIFI}>무선 인터넷</Checkbox>
                <Checkbox onChange={onChangeCheckbox} value={Feature.HAIR_DRYER}>헤어 드라이기</Checkbox>
            </div>
            <div>
                <MarkableMap mapState={mapState} setMapState={setMapState}/>
            </div>
        </div>
    )
}
    export default AccomodationForm