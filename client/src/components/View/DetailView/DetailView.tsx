import { CarOutlined, FireOutlined, HomeOutlined } from "@ant-design/icons"
import { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon"
import { Divider } from "antd"
import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import { Accommodation, Activity, Detail, DetailType, Transportation, TransportationType } from "../../../types/api/DetailType"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBus, faDice, faHotel, faPlane, faSkating, faSubway, faTaxi, faWalking } from "@fortawesome/free-solid-svg-icons"

interface Props {
    detail: Detail;
    // toDetail: () => void;
    // title: string;
    // date: string;
    // dType: DetailType
    // icon: AntdIconProps
}

const DetailView: React.FC<Props> = ({ detail }) => {
    const [icon, setIcon] = useState<any>();
    const [title, setTitle] = useState("");
    const history = useHistory()

    const toDetailPage = () => {
        history.push(`/plan/${detail.planId}/detail/${detail.detailId}/${detail.detailType}`)
    }

    useEffect(() => {
        if(detail.detailType === DetailType.ACTIVITY){
            const typedDetail = detail as Activity;
            console.log(typedDetail)
            setIcon(<FontAwesomeIcon icon={faDice} />)
            setTitle(typedDetail.activityName + "에서 활동")
        }else if(detail.detailType === DetailType.TRANSPORTATION){
            const typedDetail = detail as Transportation;
            console.log(typedDetail)
            switch(typedDetail.transportationType){
                case TransportationType.WALK:
                    setTitle("도보로 이동");
                    setIcon(<FontAwesomeIcon icon={faWalking} />)
                    return;
                case TransportationType.BUS:
                    setTitle("버스로 이동");
                    setIcon(<FontAwesomeIcon icon={faBus} />)
                    return;
                case TransportationType.TAXI:
                    setTitle("택시로 이동");
                    setIcon(<FontAwesomeIcon icon={faTaxi} />)
                    return;
                case TransportationType.AIRPLANE:
                    setTitle("비행기로 이동");
                    setIcon(<FontAwesomeIcon icon={faPlane} />)
                    return;
                case TransportationType.SUBWAY:
                    setTitle("지하철(전철)로 이동");
                    setIcon(<FontAwesomeIcon icon={faSubway} />)
                    return;
                default:
                    return;
            }
        }else if(detail.detailType === DetailType.ACCOMMODATION){
            const typedDetail = detail as Accommodation;
            console.log(typedDetail)
            setIcon(<FontAwesomeIcon icon={faHotel} />)
            setTitle(typedDetail.accommodationName + "에서 숙박")
        }
            console.log('title: ', title)
    }, [])

    return (
        <div onClick={toDetailPage}>
            <div className="flex justify-between p-4">
                <div className="flex h-10">
                    <div className="text-xl font-semibold leading-10 px-2">
                        <span className="mr-3">{ icon }</span>
                    </div>
                    <div className="text-base font-medium leading-10">
                        { title }
                    </div>
                </div>
                <div className="text-gray-400 text-sm leading-10">
                    { detail.date }
                </div>
            </div>
            <div>
                <Divider style={{ margin: 0 }}/>
            </div>
        </div>
    )
}

export default DetailView
