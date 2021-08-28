import React from "react";
import Dropzone from "react-dropzone";
import styled from "styled-components";
import { Icon } from "antd";
import axios from "axios";
import { response } from "express";

function FileUpload() {
  const dropHandler = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);
    axios.post("/api/product/image", formData, config).then((response) => {
      if (response.data.success) {
      } else {
        alert("파일을 저장하는데 실패했습니다");
      }
    });
  };
  return (
    <div>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <DropzoneBox {...getRootProps()}>
            <input {...getInputProps()} />
            <Icon type="plus" style={{ fontSize: "3rem" }} />
          </DropzoneBox>
        )}
      </Dropzone>
    </div>
  );
}

export default FileUpload;

const DropzoneBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 240px;
  border: 1px solid lightgray;
`;
