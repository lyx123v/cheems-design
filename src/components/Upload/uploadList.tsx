import React, { FC } from "react";
import { UploadFile } from "./upload";
import Icon, { ThemeProps } from "../Icon/icon";
import Progress from "../Progress/progress";
interface UploadListProps {
  fileList: UploadFile[]; // 文件列表
  onRemove: (_file: UploadFile) => void; // 删除文件
}

export const UploadList: FC<UploadListProps> = props => {
  const { fileList, onRemove } = props;

  return (
    <ul className="cheems-upload-list">
      {fileList.map(item => {
        return (
          <li className="cheems-upload-list-item" key={item.uid}>
            <span className={`file-name file-name-${item.status}`}>
              <Icon icon="file-alt" theme={ThemeProps.secondary} />
              {item.name}
            </span>
            <span className="file-status">
              {(item.status === "uploading" || item.status === "ready") && (
                <Icon icon="spinner" spin theme={ThemeProps.primary} />
              )}
              {item.status === "success" && <Icon icon="check-circle" theme={ThemeProps.success} />}
              {item.status === "error" && <Icon icon="times-circle" theme={ThemeProps.danger} />}
            </span>
            <span className="file-actions">
              <Icon
                icon="times"
                onClick={() => {
                  onRemove(item);
                }}
              />
            </span>
            {item.status === "uploading" && <Progress percent={item.percent || 0} />}
          </li>
        );
      })}
    </ul>
  );
};

export default UploadList;
