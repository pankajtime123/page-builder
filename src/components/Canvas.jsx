// components/Canvas.js
import React, { useState, useEffect } from "react";
import Element from "./Element.jsx";
import "../Canvas.css"; // Import your CSS file
import CustomModalService from "../services/customModalService.js";

const Canvas = () => {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    let jsonString = e.dataTransfer.getData("application/json");
    if (jsonString) {
      const droppedItem = JSON.parse(
        e.dataTransfer.getData("application/json")
      );
      const { clientX, clientY } = e;
      const newElement = { ...droppedItem, x: clientX, y: clientY };
      setElements([...elements, newElement]);
    }
  };

  const handleDrag = (e, index) => {
    e.preventDefault();
    const { clientX, clientY } = e;
    let element = {...elements?.[index]};
    element.x = clientX;
    element.y = clientY;
    elements?.splice(index, 1, element);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const onUpdate = (elementData, index) => {
    let updatedElements = [...elements];
    updatedElements[index] = { ...elements[index], ...elementData };
    setElements(updatedElements);
    CustomModalService.closeModal()
  };

  const handleElementClick = (element, index) => {
    return CustomModalService.showModal({
      title: element?.name,
      onUpdate: onUpdate,
      element: element,
      index: index,
    });
  };

  return (
    <>
      <div
        className="canvas"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => setSelectedElement(null)}
      >
        {elements.map((element, index) => (
          <Element
            key={`${index}a`}
            element={element}
            onClick={() => handleElementClick(element, index)}
            handleDrag={handleDrag}
            index={index}
          />
        ))}
      </div>
    </>
  );
};

export default Canvas;
