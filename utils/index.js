const getSelectData = (select = []) => {
  return Object.fromEntries(select.map(element => [element, 1]));
};

const unselectData = (select = []) => {
  return Object.fromEntries(select.map(element => [element, 0]));
};

const getDate = req => {
  let { date } = req.body;

  if (!date) {
    date = new Date();
  } else {
    date = new Date(date);
  }

  return date;
};

module.exports = {
  getSelectData,
  unselectData,
  getDate
};
