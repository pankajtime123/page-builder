let _instance = null;

export const setCustomModalRef = (instance) => {
  _instance = instance;
};

const CustomModalService = {
  showModal: (...rest) => {
    _instance.showModal(...rest);
  },

  closeModal: (...rest) => {
    _instance.closeModal(...rest);
  },
};

export default CustomModalService;
