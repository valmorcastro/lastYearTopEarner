const TRANSACTIONS_VALIDATION = "Transactions Validation";

const currencyFormatter = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const dateFormatter = Intl.DateTimeFormat("en-US", { timeZone: "UTC" });

const DB_COMMUNICATION_ERROR = "Error communicating with the Database Provider";

const INCORRECT_RESULT = /^Incorrect result/;

const NO_TASK_FOUND = /^No task found for that ID/;

const NO_TASK_FOUND_MESSAGE = "No task was found for provided ID.";

const NO_TASK_ID = /^No task ID specified in body/;

const NO_TASK_ID_MESSAGE = "No task ID provided in your request.";

const SUBMITTED_DATA_CORRECT = "Submitted data is correct.";

const SUBMITTED_DATA_INCORRECT = "Submitted data is incorrect.";

export const SYSTEM_NOTIFICATION = "System Notification";

export const ALPHA_TYPE = "alpha";

export const GENERIC_ERROR_MESSAGE =
  "An error has occurred while processing your request.";

export const LAST_YEAR = new Date().getUTCFullYear() - 1;

export const formatCurrency = (num) =>
  currencyFormatter.format((!isNaN(num) && num) || 0);

export const formatDate = (date) =>
  (!isNaN(date) && dateFormatter.format(date)) || null;

export const amountOrZero = (amount) =>
  !isNaN(amount) ? parseFloat(amount) : 0;

export const ERROR_DATA = {
  200: {
    title: TRANSACTIONS_VALIDATION,
    text: SUBMITTED_DATA_CORRECT,
    variant: "success",
  },
  400: {
    title: TRANSACTIONS_VALIDATION,
    text: SUBMITTED_DATA_INCORRECT,
    variant: "danger",
  },
  404: {
    title: TRANSACTIONS_VALIDATION,
    text: NO_TASK_FOUND_MESSAGE,
    variant: "warning",
  },
  500: {
    title: TRANSACTIONS_VALIDATION,
    text: GENERIC_ERROR_MESSAGE,
    variant: "danger",
  },
  503: {
    title: TRANSACTIONS_VALIDATION,
    text: DB_COMMUNICATION_ERROR,
    variant: "danger",
  },
};

export const getTotal = (list) =>
  list.reduce((acc, { amount = 0 }) => (acc += amountOrZero(amount)), 0);

export const isLastYear = (timeStamp) =>
  !!(new Date(timeStamp).getUTCFullYear() === LAST_YEAR);

export const isAlpha = (type) =>
  !!(type.toLowerCase() === ALPHA_TYPE.toLowerCase());

export const getErrorMessage = (status, message) => {
  let {
    title = SYSTEM_NOTIFICATION,
    text = GENERIC_ERROR_MESSAGE,
    variant = "danger",
  } = !isNaN(status) && ERROR_DATA?.[status];

  if (message) {
    if (INCORRECT_RESULT.test(message)) {
      text = SUBMITTED_DATA_INCORRECT;
    }
    if (NO_TASK_FOUND.test(message)) {
      text = NO_TASK_FOUND_MESSAGE;
    }
    if (NO_TASK_ID.test(message)) {
      text = NO_TASK_ID_MESSAGE;
    }
  }

  return { title, text, variant };
};
