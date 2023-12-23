// components/Element.js
import React from "react";

const Element = ({ element, onClick, handleDrag, index }) => {
  let {tag , attributes }= element
  return (
    <div
      draggable
      onDrag={(e) => handleDrag(e, index)}
      style={{ left: element?.x, top: element?.y, position: "absolute" }}
      onDragStart={(e) => onDragStart(e, element)}
      onClick={onClick}
    >
      <CreateTag Tag={tag} props={attributes}  />
    </div>
  );
};

export default Element;

const onDragStart = (e, item) => {
  e.dataTransfer.setData("application/json", JSON.stringify(item));
};

function CreateTag({ Tag, props }) {
  return <Tag {...props} />;
}

