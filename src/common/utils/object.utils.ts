const removeUndefinedAttributes = (obj: any) => {
  if (typeof obj === 'object') {
    for (const attr in obj) {
      if (obj[attr] === undefined) delete obj[attr];
      else if (typeof obj[attr] === 'object') {
        obj[attr] = removeUndefinedAttributes(obj[attr]);
      }
    }
  }
  return obj;
};

export default {
  removeUndefinedAttributes
};
