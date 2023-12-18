// components/Element.js
import React from "react";

const Element = ({ element, onClick, handleDrag, index }) => {
  return (
    <div
      draggable
      onDrag={(e) => handleDrag(e, index)}
      style={{ left: element?.x, top: element?.y, position: "absolute" }}
      onDragStart={(e) => onDragStart(e, element)}
      onClick={onClick}
    >
      {renderDroppedElement(element)}
    </div>
  );
};

export default Element;

const onDragStart = (e, item) => {
  e.dataTransfer.setData("application/json", JSON.stringify(item));
};
const renderDroppedElement = (droppedElement) => {
  switch (droppedElement.type) {
    case "text":
      return <label style={droppedElement?.style}>{droppedElement.name}</label>;
    case "input":
      return (
        <input
          style={droppedElement?.style}
          type="text"
          placeholder={droppedElement.name}
        />
      );
    case "button":
      return (
        <button style={droppedElement?.style}>{droppedElement.name}</button>
      );
    default:
      return null;
  }
};
