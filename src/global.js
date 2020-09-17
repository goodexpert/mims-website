/**
 * Global constants
 */

// Azure account name
const SERVICE_ACCOUNT_NAME = process.env.REACT_APP_SERVICE_ACCOUNT_NAME || "project_mims";

// Azure web service customer header
const SERVICE_X_CUSTOM_HEADER = process.env.REACT_APP_SERVICE_X_CUSTOM_HEADER
  || "mims-azure-service";

// Azure web service secret key
const SERVICE_X_FUNCTION_KEY = process.env.REACT_APP_SERVICE_X_FUNCTION_KEY
  || "eOJVsl4uzMqtSNryzE8l6FU8bANbVpzMCSA0juwCAGVGUant42xYyg==";

// Web service base uri
const SERVICE_BASE_URL = process.env.REACT_APP_SERVICE_BASE_URL
  || "http://localhost:7071/api";

// Service domain name
const SERVICE_DOMAIN_NAME = process.env.REACT_APP_SERVICE_DOMAIN_NAME || "service.mims.com";

const SERVICE_STORE_KEY = `${SERVICE_BASE_URL}/state`;

const MAX_FILE_UPLOAD_SIZE = 1024 * 1024;

const TIME_THRESHOLD_MINUTES = 15.0;

const Constants = {
  SERVICE_ACCOUNT_NAME,

  SERVICE_BASE_URL,

  SERVICE_DOMAIN_NAME,

  SERVICE_X_CUSTOM_HEADER,

  SERVICE_X_FUNCTION_KEY,

  SERVICE_STORE_KEY,

  MAX_FILE_UPLOAD_SIZE,

  TIME_THRESHOLD_MINUTES,
};

export default Constants;
