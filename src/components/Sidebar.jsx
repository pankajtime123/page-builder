// components/Sidebar.js
import React from "react";

const DraggableElements = [
  { name: "Label", type: "text", style: { border: "2px red solid" } },
  { name: "Input", type: "input", style: {} },
  { name: "Button", type: "button", style: {} },
];

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>BLOCKS</h2>
      {DraggableElements.map((item, index) => {
        return (
          <div draggable onDragStart={(e) => onDragStart(e, item)}>
            <img src={"./icons/grip-vertical.png"} alt="grip-icon" />{" "}
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
