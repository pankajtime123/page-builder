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

const labelInputs = [
  { label: "Text", key: "text", type: "text" },
  { label: "X", key: "x", type: "number" },
  { label: "Y", key: "y", type: "number" },
  { label: "Font Size", key: "fontSize", type: "number" },
  { label: "Font Weight", key: "fontWeight", type: "number" },
];

const LabelModal = ({ show }) => {
  const [state, setState] = useState({
    text: "This is a label",
    x: show?.element?.x,
    y: show?.element?.y,
    fontSize: "",
    fontWeight: "",
  });

  const handleChange = ({ target: { value } }, key) => {
    setState((prev) => ({ ...prev, [key]: +value }));
  };

  return (
    <div className="container-modal">
      {labelInputs?.map(({ label, key, type }) => {
        return (
          <div key={key}>
            <label>
              {label}
            </label>
            <input
              type={type}
              value={state?.[key] ?? ""}
              onChange={(e) => handleChange(e, key)}
            />
          </div>
        );
      })}
      <button
        onClick={() => show?.onUpdate(state, show?.index)}
      >
        Save Changes
      </button>
    </div>
  );
};
