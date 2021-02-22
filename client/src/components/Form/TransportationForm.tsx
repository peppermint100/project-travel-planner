import React, { useCallback } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { _setEndMapState, _setMapState } from "../../redux/actions/MapAction"
import { RootReducerType } from "../../redux/reducers/rootReducer"
import { MapStateType } from "../../types/map/MapType"
import MarkableTransportationMap from "../Map/MarkableTransportationMap"
import { Divider, Radio, TimePicker } from 'antd';
import { TransportationType } from "../../types/api/DetailType"
import { RadioChangeEvent } from "antd/lib/radio"
import { _setTransportationTimeArrive, _setTransportationTimeStart, _setTransportationType } from "../../redux/actions/TransportationAction"
import moment from "moment"

const TransportationForm = () => {
    const { WALK, AIRPLANE, BUS, TAXI, SUBWAY } = TransportationType
    const dispatch = useDispatch()
    const mapState = useSelector((state: RootReducerType) => state.MapReducer)
    const endMapState = useSelector((state: RootReducerType) => state.EndMapReducer)

    const setMapState = useCallback((state: MapStateType) => {
        dispatch(_setMapState(state))
    }, [dispatch])

    const setEndMapState = useCallback((state: MapStateType) => {
        dispatch(_setEndMapState(state))
    }, [])

    const onSelectTransportationType = (e: RadioChangeEvent) => {
        dispatch(_setTransportationType(e.target.value))
    }
    
    const onChangeTimeStart = (_: any, timeString: string) => {
        dispatch(_setTransportationTimeStart(timeString))
    }

    const onChangeTimeArrive = (_: any, timeString: string) => {
        dispatch(_setTransportationTimeArrive(timeString))
    }

    return(
        <div>
            <div className="my-2">
                {/* transportation type */}
                <Radio.Group onChange={onSelectTransportationType} defaultValue={WALK} buttonStyle="solid">
                    <Radio.Button value={WALK}>도보</Radio.Button>
                    <Radio.Button value={BUS}>버스</Radio.Button>
                    <Radio.Button value={SUBWAY}>지하철</Radio.Button>
                    <Radio.Button value={AIRPLANE}>비행기</Radio.Button>
                    <Radio.Button value={TAXI}>택시</Radio.Button>
                </Radio.Group>
            </div>
            <Divider style={{ margin: 0}} />
            <div className="w-full">
                {/* time start time arrive */}
                <TimePicker 
                    className="w-1/2"
                    bordered={false}
                    placeholder="출발 시간 선택"
                    onChange={onChangeTimeStart} 
                    defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
                <TimePicker 
                    className="w-1/2"
                    bordered={false}
                    placeholder="도착 시간 선택"
                    onChange={onChangeTimeArrive} 
                    defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
            </div>
            <Divider style={{ margin: 0 }} />
            <div>
                <MarkableTransportationMap 
                    startMapState={mapState} 
                    setStartMapState={setMapState}
                    endMapState={endMapState}
                    setEndMapState={setEndMapState}
                    />
            </div>
        </div>
    )
}

export default TransportationForm
