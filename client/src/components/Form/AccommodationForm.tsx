import {  DatePicker, Divider, Input, Space, TimePicker } from "antd";
import moment from "moment";
import React, { useCallback, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash"
import Checkbox, { CheckboxChangeEvent } from "antd/lib/checkbox/Checkbox";
import { RootReducerType } from "../../redux/reducers/rootReducer";
import { MapStateType } from "../../types/map/MapType";
import { _setMapState } from "../../redux/actions/MapAction";
import { AccommodationFormType } from "../../types/detail/FormType";
import { _setActivityName, _setActivityTime } from "../../redux/actions/ActivityFormAction";
import MarkableMap from "../Map/MarkableMap";
import { Feature } from "../../types/api/DetailType";
import { _addAccommodationFeature, _removeAccommodationFeature, _setAccommodationCheckInTime, _setAccommodationCheckOutDate, _setAccommodationCheckOutTime, _setAccommodationName } from "../../redux/actions/AccomodationAction";

const AccommodationForm = () => {
    const dispatch = useDispatch()
    const mapState = useSelector((state: RootReducerType) => state.MapReducer)

    const setMapState = useCallback((state: MapStateType) => {
        dispatch(_setMapState(state))
    }, [])

    const accommodationState: AccommodationFormType = useSelector((state: RootReducerType) => state.AccommodationReducer)

    const onSelectCheckInTime = (_: any, timeString: any) => {
        dispatch(_setAccommodationCheckInTime(timeString))
    }
    const onSelectCheckOutTime = (_: any, timeString: any) => {
        dispatch(_setAccommodationCheckOutTime(timeString))
    }
    const onChangeText = (text: string) => {
        dispatch(_setAccommodationName(text));
    } 

    const onSelectCheckOutDate = (_: any, dateString: any) => {
        console.log('in react: ', dateString)
        dispatch(_setAccommodationCheckOutDate(dateString))
    }

    useEffect(() => {
        console.log(accommodationState)
    })

    const onChangeCheckbox = (e: CheckboxChangeEvent) => {
        if(e.target.checked){
            console.log('checked')
            dispatch(_addAccommodationFeature(e.target.value))
        }else{
            console.log('unchecked')
            dispatch(_removeAccommodationFeature(e.target.value))
        }
        console.log(e.target.checked)
        console.log(e.target.value)
    }

    return(
        <div>
            <div>
                <Input 
                    className="p-2"
                    bordered={false}
                    placeholder=" 호텔 이름을 입력해주세요."
                    onChange={(e) => {
                        onChangeText(e.target.value)
                        console.log(e.target.value)
                }} />
            </div>
            <Divider style={{ margin: 0}} />
            <div>
                    <DatePicker 
                        className="w-full p-2"
                        onChange={onSelectCheckOutDate}
                        bordered={false}
                        placeholder=" 호텔 체크아웃 날짜"
                    />
            </div>

            <Divider style={{ margin: 0}} />
            <span>
                <TimePicker bordered={false} className="w-1/2" placeholder="호텔 체크 인 시간" onChange={onSelectCheckInTime} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
            </span>
           <span>
                <TimePicker bordered={false} className="w-1/2" placeholder="호텔 체크 아웃 시간" onChange={onSelectCheckOutTime} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
            </span>

            <Divider style={{ margin: 0}} />
            <div className="p-2">
                <Checkbox onChange={onChangeCheckbox} value={Feature.AIR_CONDITIONING}>에어컨</Checkbox>
                <Checkbox onChange={onChangeCheckbox} value={Feature.WIFI}>무선 인터넷</Checkbox>
                <Checkbox onChange={onChangeCheckbox} value={Feature.HAIR_DRYER}>헤어 드라이기</Checkbox>
                <Checkbox onChange={onChangeCheckbox} value={Feature.AIR_CONDITIONING}>냉방시설</Checkbox>
                <Checkbox onChange={onChangeCheckbox} value={Feature.PARKING}>주차</Checkbox>
                <Checkbox onChange={onChangeCheckbox} value={Feature.BED}>침대</Checkbox>
                <Checkbox onChange={onChangeCheckbox} value={Feature.KITCHEN}>조리 가능</Checkbox>
                <Checkbox onChange={onChangeCheckbox} value={Feature.TV}>난방 시설</Checkbox>
            </div>
            <div>
                <MarkableMap mapState={mapState} setMapState={setMapState}/>
            </div>
        </div>
    )
}
    export default AccommodationForm