

import React, { useEffect } from 'react'
import { useHistory, useParams } from "react-router-dom"
import { sendDeleteDetailRequest, sendGetDetailByDetailIdReqeust } from "../api/DetailApi"
import { DetailType } from "../types/api/DetailType"

const DetailPage = () => {

    const { planId, detailId, detailType } = useParams<{ planId: string, detailId: string, detailType: DetailType }>()
    const history = useHistory()

    const toUpdateDetailPage = () => {
        history.push(`/plan/${planId}/update-detail/${detailId}/${detailType}`)
    }

    const deleteDetail = async () => {
        if(window.confirm('정말 삭제하시겠습니까?')){
            const response = await sendDeleteDetailRequest(detailId)
            history.push(`/plan/${planId}`, { message: response.msg })
        }
    }

    useEffect(() => {
        sendGetDetailByDetailIdReqeust(detailId)
        .then(( response ) => {
            console.log(response)
        })
    }, [])

    return (
        <div>
            detail page
            <div>
                <button onClick={() => {
                    history.push(`/plan/${planId}`)
                }}>뒤로</button>
            </div>
            <div>
                <button onClick={toUpdateDetailPage}>수정</button>
                <button onClick={deleteDetail}>삭제</button>
            </div>
        </div>
    )
}

export default DetailPage
