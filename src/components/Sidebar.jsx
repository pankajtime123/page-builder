// components/Sidebar.js
import React from "react";

const DraggableElements = [
  {
    name: "Label",
    tag: "label",
    attributes: {
      style: {
        color: "#000",
        fontSize: "16px",
        fontWeight: 400,
      },
      children: "This is label",
    },
  },
  {
    name: "Input",
    tag: "input",
    attributes: {
      style: {
        width: "298px",
        height: "49px",
        border:'none', 
        outline:'none', 
        padding: '14px',
        fontSize:'20px'
      },
      placeholder: "Enter your text here",
    },
  },
  {
    name: "Button",
    tag: "button",
    attributes: {
      style: {
        width: "77px",
        height: "49px",
        backgroundColor: "#0044C1",
        border: "none",
        color: "#fff",
      },
      children: "Button",
    },
  },
];

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>BLOCKS</h2>
      {DraggableElements.map((item, index) => {
        return (
          <div draggable onDragStart={(e) => onDragStart(e, item)}>
            <img src={"../icons/grip-vertical.png"} alt="grip-icon" />{" "}
            {item.name}
          </div>
        );
      })}
    </div>
  );
};

const onDragStart = (e, item) => {
  e.dataTransfer.setData("application/json", JSON.stringify(item));
};

export default Sidebar;
