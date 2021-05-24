export const getHash = arr => {
  return arr.reduce((obj, cur) => {
    obj[cur.id] = cur;
    return obj;
  }, {});
};
