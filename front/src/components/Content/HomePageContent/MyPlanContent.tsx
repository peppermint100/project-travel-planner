import React, { useState } from 'react'
import DefaultInput from '../../Input/DefaultInput'
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import sendCreatePlanRequest from '../../../api/PlanApi';
import DefaultButton from '../../Button/DefaultButton';
import { beforeUpload, getBase64 } from '../../../utils/imageProcess';

interface Props {
  userId: number;
}

const MyPlanContent: React.FC<Props> = ({ userId }) => {
    const [imageLoading, setImageLoading] = useState(false);
    const [planImage, setPlanImage] = useState("");
    const [fileList, setFileList] = useState<Array<any>>([]);

    const handleSubmit = () => {
        const title = "제목입니다"
        const formData = new FormData()

        formData.append("placeImage", fileList[0].originFileObj)
        formData.append("planName", title)
        formData.append("userId", userId.toString())

        sendCreatePlanRequest(formData)
    }

    const handleChange = (info: any) => {
        let tempFileList = [...info.fileList];

        tempFileList = tempFileList.slice(-2);

        tempFileList = tempFileList.map((file: any) => {
            if(file.response){ 
                file.url = file.response.url;
            }

            return file;
        })

        setFileList(() => {
            return [...tempFileList]
        })

        if (info.file.status === 'uploading') {
            setImageLoading(true)
            return;
        }

        if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl: any) => {
            setPlanImage(imageUrl)
            setImageLoading(false)
        }
        );
      }
    };

    const uploadButton = (
      <div>
        {imageLoading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="mt-3">대표 사진 선택</div>
      </div>
    );

    return (
        <div className="flex flex-col items-center bg-white w-3/4 mx-auto shadow-lg rounded p-10 mt-8">
          <div>
              <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleChange}
              >
              {planImage ? <img src={planImage} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
          </div>
          <div className="w-56">
            <DefaultInput placeholder="계획이름" name="planName" />
          </div>
          <div className="w-56">
            <DefaultButton text="나만의 계획 추가하기" onClick={handleSubmit} />
          </div>
        </div>
    )
}


export default MyPlanContent
