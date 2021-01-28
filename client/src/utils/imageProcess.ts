import { message } from "antd"

export function getBase64(img: any, callback: any) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

export function beforeUpload(file: File) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('JPG 또는 PNG 사진 파일만 올릴 수 있습니다.');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('사진 파일의 용량이 너무 큽니다.(2MB 이하의 파일만 올릴 수 있습니다.');
  }

  return isJpgOrPng && isLt2M;
}