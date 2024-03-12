const getSelectData = (select = []) => {
  return Object.fromEntries(select.map(element => [element, 1]));
};

const unselectData = (select = []) => {
  return Object.fromEntries(select.map(element => [element, 0]));
};

module.exports = {
  getSelectData,
  unselectData
};
