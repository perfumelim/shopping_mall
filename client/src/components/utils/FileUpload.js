import React, { useState } from "react";
import Dropzone from "react-dropzone";
import styled from "styled-components";
import { Icon } from "antd";
import axios from "axios";

function FileUpload() {
  const [Images, setImages] = useState([]);
  const dropHandler = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);
    axios.post("/api/product/image", formData, config).then((response) => {
      if (response.data.success) {
        setImages([...Images, response.data.filePath]);
      } else {
        alert("파일을 저장하는데 실패했습니다");
      }
    });
  };
  const deleteHandler = (image) => {
    const currentIndex = Images.indexOf(image);
    let newImages = [...Images];
    newImages.splice(currentIndex, 1);

    setImages(newImages);
  };
  return (
    <DropzoneContainer>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <DropzoneBox {...getRootProps()}>
            <input {...getInputProps()} />
            <Icon type="plus" style={{ fontSize: "3rem" }} />
          </DropzoneBox>
        )}
      </Dropzone>
      <ImageBox>
        {Images.map((image, index) => (
          <div onClick={() => deleteHandler(image)} key={index}>
            <img src={`http://localhost:5000/${image}`} />
          </div>
        ))}
      </ImageBox>
    </DropzoneContainer>
  );
}

export default FileUpload;

const DropzoneContainer = styled.div`
  display: flex;
`;

const DropzoneBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 240px;
  border: 1px solid lightgray;
`;

const ImageBox = styled.div`
  display: flex;
  width: 350px;
  height: 240px;
  overflow-x: scroll;

  > div > img {
    width: 300px;
    height: 240px;
  }
`;
