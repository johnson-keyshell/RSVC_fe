const getConfig = () => {
  if (process.env.NODE_ENV === "development") {
    return {
      BASE_URL: process.env.REACT_APP_BASE_URL,
    };
  } else {
    return {
      BASE_URL: process.env.REACT_APP_PRODUCTION_URL,
    };
  }
};

export default getConfig();
