export const parserNextUrl = (url) => {
  if (!url) {
    return null;
  }
  const results = {};
  const [, strParams] = url.split("?");
  const arrParams = strParams.split("&");
  arrParams.forEach((param) => {
    const [key, value] = param.split("=");
    results[key] = +value;
  });
  return results;
};
