import React, {
  createContext,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";

import Divider from "./Divider";

let CustomModalContext = createContext(null);

const CustomModalProvider = forwardRef(({ children }, ref) => {
  const [show, setShow] = useState({});

  const showModal = useCallback((params) => {
    setShow({ ...params, isOpen: true });
  }, []);

  const closeModal = useCallback(
    (params) => setShow((prev) => ({ ...params, isOpen: false })),
    []
  );

  const contextValue = {
    showModal,
    closeModal,
  };

  useImperativeHandle(ref, () => ({
    showModal,
    closeModal,
  }));

  return (
    <CustomModalContext.Provider value={contextValue}>
      {children}
      {!!show?.isOpen && (
        <div className="modal">
          <div className="container">
            <TitleHeader show={show} closeModal={closeModal} />
            <Divider />
            <LabelModal show={show} />
          </div>
        </div>
      )}
    </CustomModalContext.Provider>
  );
});

export default CustomModalProvider;

const TitleHeader = ({ show, closeModal }) => {
  return (
    <div className="header flex">
      <span> Edit {show?.title} </span>
      <span onClick={closeModal} className="closeBtn">
        X
      </span>
    </div>
  );
};

const LabelModal = ({ show }) => {
  return (
    <div className="container">
      <label>
        X:
        <input
          type="number"
          value={show?.element?.x}
          onChange={
            (e) => {}
            // setElementData({ ...elementData, x: e.target.value })
          }
        />
      </label>
      <label>
        Y:
        <input type="number" value={show?.element?.y} onChange={(e) => {}} />
      </label>
      {/* <button onClick={handleSave}>Save</button>
    <button onClick={onDelete}>Delete</button> */}
    </div>
  );
};

const LabelInput = ({ item }) => {
  return (
    <div>
      <label>{item?.label}</label>
      <input value={item?.value} />
    </div>
  );
};
