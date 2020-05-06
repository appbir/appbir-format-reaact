function styleHyphenFormat(propertyName) {
    function upperToHyphenLower(match) {
      return '-' + match.toLowerCase();
    }
    return propertyName.replace(/[A-Z]/g, upperToHyphenLower);
  }

export const objToCss = (obj)=>{
    let css = {};
    for(let key in obj){
        let _key = styleHyphenFormat(key);
        css[_key] = obj[key]
    }
    let json = JSON.stringify(css,null,2);
    return json.replace(/"/g , '');
}


export const applyDrag = (arr, dragResult) => {
  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) return arr;

  const result = [...arr];
  let itemToAdd = payload;

  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0];
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd);
  }

  return result;
};

export const generateItems = (count, creator) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(creator(i));
  }
  return result;
};