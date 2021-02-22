import React, { useEffect, useRef, useState } from 'react'
import { DatePicker, Divider } from 'antd';
import { Select } from 'antd';
import { Input, Tag } from 'antd';
import { DetailType } from "../../types/api/DetailType";
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';

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
            <div className="w-full">
                    <DatePicker 
                        className="w-full"
                        onChange={onSelectDate} 
                        bordered={false} 
                        placeholder={"날짜를 선택해 주세요."}
                        style={{
                            width: "100%",
                            padding: "15px",
                        }}
                    />
                    <Divider style={{ margin: 0 }}/>
            </div>
            <div className="w-full py-3 px-1">
                <Select
                    className="text-gray-400"
                    style={{ 
                        width: "100%",
                    }}
                    placeholder={"계획의 종류를 선택해주세요."}
                    onChange={onSelectDetailType}
                    value={detailType}
                    bordered={false}
                    dropdownStyle= {{ }}
                >
                    <Option value={DetailType.ACTIVITY}>액티비티, 여행지</Option>
                    <Option value={DetailType.TRANSPORTATION}>교통</Option>
                    <Option value={DetailType.ACCOMMODATION}>숙박</Option>
                </Select>
                <Divider style={{ margin: 0}} />
            </div>
            <div className="ml-2">
                {
                    tags.map((tag, index) => (
                        <Tag
                            className="border-primary border-2 p-1 m-1 text-center align-middle text-md font-semibold rounded-lg"
                            key={tag}
                            closable={index >= 0}
                            closeIcon={<CloseOutlined className="transform -translate-y-1 ml-2 text-md" />}
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
                    <Tag 
                        className="border-primary border-2 p-1 m-1 text-center align-middle text-md font-semibold rounded-lg"
                        onClick={showInput}
                        >
                        <PlusOutlined className="transform -translate-y-1 text-md px-4"/>
                    </Tag>
                    )}
                </div>
                <Divider style={{margin: "12px 0"}} />
            </div>
            <div>
                <label className="text-lg font-semibold p-3 text-primary">메모</label>
                <TextArea 
                    maxLength={100} 
                    bordered={false}
                    placeholder=" 메모할 것이 있다면 메모해주세요."
                    onChange={(e) => {
                        onChangeComment(e.target.value);
                    }} 
                    
                    />
                <Divider style={{margin: "12px 0"}} />
            </div>
        </div>
    )
}

export default CommonDetailForm
