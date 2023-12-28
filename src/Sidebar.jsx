// Sidebar.js
import React, { useState } from "react";
import styled from "styled-components";
import Block from "./Block";
import "./styles.css";

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 400px;
  background-color: #2d2d2d;
  color: #fff;
  padding: 30px;
  cursor: grab;
  cursor: grabbing;
`;

const Sidebar = () => {
  const onDragStart = (e, type) => {
    console.log("pos", e.clientX, e.clientX);
    e.dataTransfer.setData("text", type);
  };

  return (
    <>
      <SidebarContainer>
        <h2 style={{ "text-align": "left" }}>Blocks</h2>
        <Block
          className="block"
          id="dragElement1"
          content="Label"
          type="input"
          draggable={true}
          onDragStart={(e) => onDragStart(e, "text")}
        />
        <Block
          id="dragElement2"
          content="Input"
          type="input"
          draggable={true}
          onDragStart={(e) => onDragStart(e, "input")}
        />
        <Block
          id="dragElement3"
          content="Button"
          type="input"
          draggable={true}
          onDragStart={(e) => onDragStart(e, "button")}
        />
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
