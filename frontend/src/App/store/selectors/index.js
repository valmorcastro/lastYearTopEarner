export const transactionsSelector = ({
  transactionsContext: { transactions = {} } = {},
}) => transactions || {};

export const employeesSelector = ({
  transactionsContext: { employees = {} } = {},
}) => employees || {};

export const idSelector = ({ transactionsContext: { id = null } = {} }) =>
  id || null;

export const locationsSelector = ({
  transactionsContext: { locations = {} } = {},
}) => locations || {};

export const notificationsSelector = ({
  clientContext: { notifications = [] } = {},
}) => (Array.isArray(notifications) && notifications) || [];

export const loadingSelector = ({ clientContext: { loading = false } = {} }) =>
  !!loading;
