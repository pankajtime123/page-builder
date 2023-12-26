// components/Element.js
import React from "react";

const Element = ({ element, onClick, handleDrag, index ,onDragEnd ,onDragStart }) => {
  let {tag , attributes }= element
  return (
    <div
      draggable
      onDrag={(e) => handleDrag(e, index)}
      style={{ left: element?.x, top: element?.y, position: "absolute" ,cursor:'grabbing'  }}
      onDragStart={(e) => onDragStart(e, element)}
      onDragEnd={(e)=> onDragEnd(e,index)}
      onClick={onClick}
    >
      <CreateTag Tag={tag} props={attributes}  />
    </div>
  );
};

export default Element;



function CreateTag({ Tag, props }) {
  return <Tag {...props} />;
}

