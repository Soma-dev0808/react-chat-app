import en from "./constants";
import qs from "qs";

/**
 * Convert Firebase api response
 * @param {boolean} isSuccess
 * @param {any} content
 */
export const convertFBApiResponse = (isSuccess = true, content = null) => {
  return isSuccess
    ? {
        isSuccess,
        value: content,
      }
    : {
        isSuccess,
        errorMessage: content,
      };
};

/**
 * Get message of Firbase api response
 * @param {object} err
 */
export const retrieveFBErrorMessage = (err) => {
  return err?.message ? err.message : en.undefinedErrorMessage;
};

/**
 *  Create className conditionally
 *  Example of arguments ↓
 *  eg 1: "styled-link", "disable-link"
 *  eg 2: "styled-link", { "disable-link": true }
 * @param  {...any} args
 */
export const classNames = (...args) => {
  let className = "";

  if (!Array.isArray(args)) {
    return className;
  }

  args.forEach((value, index) => {
    if (typeof value === "string") {
      index === 0 ? (className = value) : (className += ` ${value}`);
    }

    if (typeof value === "object") {
      const key = Object.keys(value)[0];
      if (key && value[key]) {
        index === 0 ? (className = key) : (className += ` ${key}`);
      }
    }
  });

  return className;
};

/**
 * Create url with query string passed as object
 * @param {string} location
 * @param {object} qsArray
 * @param {boolean} shouldEnCode
 */
export const createUrlWithQueryString = (location, qsObj) => {
  if (typeof location === "string" && typeof qsObj === "object") {
    let isIndexZero = true;
    for (const key in qsObj) {
      let qsValue = qsObj[key];
      if (isIndexZero) {
        location += `?${key}=${qsValue}`;
        isIndexZero = false;
      } else {
        location += `&${key}=${qsValue}`;
      }
    }
  }

  return location;
};

/**
 * retrieve query string from location object
 * @param {object} location
 */
export const retrieveQsObjProp = ({ location }) => {
  if (location?.search) {
    return qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
  }
  return null;
};

/**
 * Validate if there's empty form input.
 * The length of values & errorMessages arrays should be same.
 * @param {Array} values
 * @param {Array} errorMessages
 */
export const validateEmptyString = (values, errorMessages, setAPIError) => {
  if (
    Array.isArray(values) &&
    Array.isArray(errorMessages) &&
    values.length === errorMessages.length
  ) {
    const errArr = [];
    values.forEach((v, i) => {
      if (v.trim() === "") {
        errArr.push(errorMessages[i]);
      }
    });

    setAPIError(errArr);

    return errArr.length === 0;
  }
};
