const Toast = {
  show: (opts = {}) => {
    const componentCtx = getCtx('#wuss-toast');
    return componentCtx.show(opts);
  },
};


module.exports = {
  Toast
};