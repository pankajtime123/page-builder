// components/Canvas.js
import React, { useState, useEffect, useRef } from "react";
import Element from "./Element.jsx";
import "../Canvas.css"; // Import your CSS file
import CustomModalService from "../services/customModalService.js";
import { TAGS } from "../constant.js";

const Canvas = () => {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  let coords = useRef({ startX: 0, startY: 0 });
  let isDragged = false;

  const handleDrop = (e) => {
    e.preventDefault();
    let jsonString = e.dataTransfer.getData("application/json");
    if (jsonString && !isDragged) {
      const droppedItem = JSON.parse(
        e.dataTransfer.getData("application/json")
      );
      const { clientX, clientY } = e;
      const newElement = { ...droppedItem, x: clientX, y: clientY };
      // handleElementClick(newElement, elements?.length)
      setElements([...elements, newElement]);
    } else {
      setElements([...elements]);
      isDragged = false;
    }
  };

  const handleDrag = (e, index) => {
    e.preventDefault();
    const { clientX, clientY } = e;
    let element = { ...elements?.[index] };
    const draggableElement = e.target;

    element.x = clientX - coords.current.startX + draggableElement.offsetLeft;
    element.y = clientY - coords.current.startY + draggableElement.offsetTop;

    elements[index] = element;
    isDragged = true;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const updateElement = (elementData, index, tag) => {
    let updatedElements = [...elements];
    updatedElements[index] = { ...updatedElements[index], x: elementData.x, y: elementData.y };
    let updatedAttributes = updatedElements[index].attributes;
     console.log(elementData.fontSize)

    //  return
    switch (tag) {
      case TAGS.label:
        updatedAttributes.children = elementData.children;
        let updatedStyle = updatedAttributes.style;
        updatedStyle.fontSize = `${elementData.fontSize}px`;
        updatedStyle.fontWeight = `${elementData.fontWeight}px`;
        return updatedElements;

      case TAGS.input:
        return updatedElements
      
      case TAGS.button:
        return updatedElements;

      default:
        return updatedElements;
    }
  };

  const onUpdate = (elementData, index, tag) => {
    setElements(updateElement(elementData, index, tag));
    CustomModalService.closeModal();
  };

  const handleElementClick = (element, index) => {
    if (element?.tag === "label")
      return CustomModalService.showModal({
        title: element?.name,
        onUpdate: onUpdate,
        element: element,
        index: index,
      });
  };

  const onDragStart = (e, item) => {
    coords.current.startX = e.clientX;
    coords.current.startY = e.clientY;
    e.dataTransfer.setData("application/json", JSON.stringify(item));
  };
  const onDragEnd = (e, item) => {};

  return (
    <>
      <div
        className="canvas"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => setSelectedElement(null)}
      >
        {elements.map((element, index) => {
          return (
            <Element
              key={`${index}a`}
              element={element}
              onClick={() => handleElementClick(element, index)}
              handleDrag={handleDrag}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              index={index}
            />
          );
        })}
      </div>
    </>
  );
};

export default Canvas;
