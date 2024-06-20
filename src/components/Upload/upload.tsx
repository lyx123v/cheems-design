import React, { FC, useRef, ChangeEvent, useState } from "react";
import axios from "axios";
import UploadList from "./uploadList";
import Dragger from "./dragger";
export type UploadFileStatus = "ready" | "uploading" | "success" | "error";
export interface UploadFile {
  uid: string; //唯一标识
  size: number; //文件大小
  name: string; //文件名
  status?: UploadFileStatus; //上传状态
  percent?: number; //上传进度
  raw?: File; //原始文件
  response?: any; //上传成功返回的数据
  error?: any; //上传失败返回的数据
}
export interface UploadProps {
  action: string; //上传地址
  defaultFileList?: UploadFile[]; //默认文件列表
  beforeUpload?: (file: File) => boolean | Promise<File>; //上传前钩子
  onProgress?: (percentage: number, file: File) => void; //上传进度
  onSuccess?: (data: any, file: File) => void; //上传成功
  onError?: (err: any, file: File) => void; //上传失败
  onChange?: (file: File) => void; //文件状态改变
  onRemove?: (file: UploadFile) => void; //删除文件
  headers?: { [key: string]: any }; //上传请求头
  name?: string; //上传文件名
  data?: { [key: string]: any }; //上传参数
  withCredentials?: boolean; //跨域请求
  accept?: string; // 指定文件类型
  multiple?: boolean; // 是否支持多选
  drag?: boolean; //是否支持拖拽
  children?: React.ReactNode; //自定义按钮
}

export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    defaultFileList,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove,
    name = "file",
    headers,
    data,
    withCredentials,
    accept,
    multiple,
    children,
    drag,
  } = props;
  const fileInput = useRef<HTMLInputElement>(null); //ref
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []); // 已上传文件列表
  // 更新文件列表
  const updateFileList = (
    updateFile: UploadFile,
    updateObj: Partial<UploadFile>
  ) => {
    setFileList((prevList) => {
      return prevList.map((file) => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj };
        } else {
          return file;
        }
      });
    });
  };
  // 上传事件
  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };
  // 上传方法
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    // 上传文件
    uploadFiles(files);
    // 清除旧值，方便下次触发change
    if (fileInput.current) {
      fileInput.current.value = "";
    }
  };
  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter((item) => item.uid !== file.uid);
    });
    if (onRemove) {
      onRemove(file);
    }
  };
  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files); // 转数组
    postFiles.forEach((file) => {
      if (!beforeUpload) {
        // 没有 beforeUpload
        post(file);
      } else {
        // 有 beforeUpload
        const result = beforeUpload(file);
        if (result && result instanceof Promise) {
          // 如果是promise，则继续执行then
          result.then((processedFile) => {
            post(processedFile);
          });
        } else if (result !== false) {
          post(file);
        }
      }
    });
  };
  const post = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + "upload-file",
      status: "ready",
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    };
    //setFileList([_file, ...fileList])
    setFileList((prevList) => {
      return [_file, ...prevList];
    });
    const formData = new FormData(); // 使用FormData获取文件数据
    formData.append(name || "file", file);
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    }
    // 使用axios第三方库进行文件上传
    axios
      .post(action, formData, {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
        withCredentials,
        onUploadProgress: (e) => {
          let percentage = Math.round((e.loaded * 100) / e.total!) || 0;
          if (percentage < 100) {
            updateFileList(_file, { percent: percentage, status: "uploading" });
            if (onProgress) {
              // 执行传入的onProgress
              onProgress(percentage, file);
            }
          }
        },
      })
      .then((resp) => {
        updateFileList(_file, { status: "success", response: resp.data });
        if (onSuccess) {
          // 执行上传成功函数：onSuccess
          onSuccess(resp.data, file);
        }
      })
      .catch((err) => {
        updateFileList(_file, { status: "error", error: err });
        if (onError) {
          // 执行上传失败函数;onError
          onError(err, file);
        }
      })
      .finally(() => {
        if (onChange) {
          onChange(file);
        }
      });
  };

  return (
    <div className="viking-upload-component">
      <div
        className="viking-upload-input"
        style={{ display: "inline-block" }}
        onClick={handleClick}
      >
        {drag ? (
          <Dragger
            onFile={(files) => {
              uploadFiles(files);
            }}
          >
            {children}
          </Dragger>
        ) : (
          children
        )}
        <input
          className="viking-file-input"
          style={{ display: "none" }}
          ref={fileInput}
          onChange={handleFileChange}
          type="file"
          accept={accept}
          multiple={multiple}
        />
      </div>

      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  );
};

export default Upload;
