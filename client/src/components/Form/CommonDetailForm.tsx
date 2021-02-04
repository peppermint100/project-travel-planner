import React, { useEffect, useRef, useState } from 'react'
import {  useParams } from "react-router-dom"
import { DatePicker, Space } from 'antd';
import { Select } from 'antd';
import { Input, Tag } from 'antd';
import { DetailType } from "../../types/api/DetailType";
import { PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;

interface Props {
    date: string;
    detailType: DetailType;
    needs: Array<string>;
    comment: string;
    onChangeDate: (date: string) => void;
    onChangeDetailType: (dType: DetailType) => void;
    onConfirmNeeds: (needs: Array<string>) => void;
    onChangeComment: (comment: string) => void;
}

const CommonDetailForm: React.FC<Props> = ({
    detailType
    , needs
    , comment
    , onChangeDate
    , onChangeDetailType
    , onConfirmNeeds
    , onChangeComment
}) => {

    type NeedsState = {
        tags: Array<string>,
        inputVisible: boolean,
        inputValue: string,
    }

    const params = useParams<{ planId: string, planName: string }>()
    const [needsState, setNeedsState] = useState<NeedsState>({
        tags: [],
        inputVisible: false,
        inputValue: "",
    });

    const { tags, inputVisible, inputValue } = needsState;
    const inputRef = useRef<Input>(null);

    const onSelectDate = (date: any, dateString: any) => {
        onChangeDate(dateString);
    }

    const onSelectDetailType = (dType: DetailType) => {
        onChangeDetailType(dType);
    }

    const handleClose = (targetedTag: string) => {
        const newTags = tags.filter(tag => tag !== targetedTag) 
        setNeedsState((prevState) => {
            onConfirmNeeds([...newTags])
            return { ...prevState, inputVisible: false, tags: newTags }
        })
    }

    const focusInput = () => {
        const { current } = inputRef 
        if(current !== null){
            current.focus()
        }
    }

    const showInput = () => {
        setNeedsState((prevState) => ({ ...prevState, inputVisible: true}))
        focusInput()
    }
    
    const handleInputConfirm = () => {
        const newNeed = needsState.inputValue
        if(newNeed.length <= 0){
            return
        }
        setNeedsState((prevState) => {
            onConfirmNeeds([newNeed, ...needsState.tags])
            return { ...prevState, tags: [...tags, newNeed] , inputValue: "", inputVisible: false}
        })
    }
    
    const handleInputChange = (e: any) => {
        setNeedsState((prevState) => ({ ...prevState, inputValue: e.target.value}))
    }

    useEffect(() => {
        focusInput()
    }, [inputVisible])

    return (
        <div>
            <div>
                <Space>
                    <DatePicker onChange={onSelectDate} />
                </Space>
            </div>
            <div>
                <Select
                    style={{ width: 200 }}
                    placeholder="계획의 종류를 선택해주세요."
                    onChange={onSelectDetailType}
                    value={detailType}
                >
                    <Option value={DetailType.ACTIVITY}>액티비티, 여행지</Option>
                    <Option value={DetailType.TRANSPORTATION}>교통</Option>
                    <Option value={DetailType.ACCOMODATION}>숙박</Option>
                </Select>
            </div>
            <div>
                {
                    tags.map((tag, index) => (
                        <Tag
                            key={tag}
                            closable={index >= 0}
                            onClose={() => {
                                handleClose(tag)
                            }}
                        >
                            {tag}
                        </Tag>
                    ))
                }
                <div className="w-16 inline-block">
                    {inputVisible && (
                    <Input
                        ref={inputRef}
                        type="text"
                        size="small"
                        className="tag-input"
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={handleInputConfirm}
                        onPressEnter={handleInputConfirm}
                    />
                    )}
                    {!inputVisible && (
                    <Tag className="site-tag-plus" onClick={showInput}>
                        <PlusOutlined /> New Tag
                    </Tag>
                    )}
                </div>
                
            </div>
            <div>
                <TextArea showCount maxLength={100} onChange={(e) => {
                    onChangeComment(e.target.value);
                }} />
            </div>
        </div>
    )
}

export default CommonDetailForm
