const returnIfArray = (value) => (Array.isArray(value) && value) || [];

export const detailsSelector = ({
  transactionsContext: { details = null } = {},
}) => details || null;

export const employeesSelector = ({
  transactionsContext: { employees = [] } = {},
}) => returnIfArray(employees);

export const idSelector = ({ transactionsContext: { id = null } = {} }) =>
  id || null;

export const loadingSelector = ({ clientContext: { loading = false } = {} }) =>
  !!loading;

export const locationsSelector = ({
  transactionsContext: { locations = [] } = {},
}) => returnIfArray(locations);

export const notificationsSelector = ({
  clientContext: { notifications = [] } = {},
}) => returnIfArray(notifications);

export const transactionsSelector = ({
  transactionsContext: { transactions = [] } = {},
}) => returnIfArray(transactions);

export const winnerSelector = ({
  transactionsContext: { winner = null } = {},
}) => winner || null;
