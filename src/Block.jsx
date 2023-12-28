// Block.js
import React from "react";
import styled from "styled-components";
import "./styles.css";

const BlockContainer = styled.div`
  width: 20%;
  height: 40px;
  background-color: #fff;
  margin-bottom: 10px;
  padding: 8px;
  color: #989898;
  text-align: left;
`;

const Block = ({ id, content, type, draggable, onDragStart, imageSrc }) => {
  return (
    <BlockContainer
      id={id}
      draggable={draggable}
      type={type}
      onDragStart={onDragStart}
    >
      {content}
    </BlockContainer>
  );
};

export default Block;
