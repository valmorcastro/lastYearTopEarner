export const transactionsSelector = ({
  transactionsContext: { transactions = {} } = {},
}) => transactions || {};

export const employeesSelector = ({
  transactionsContext: { employees = {} } = {},
}) => employees || {};

export const locationsSelector = ({
  transactionsContext: { locations = {} } = {},
}) => locations || {};

export const errorSelector = ({ clientContext: { error = null } = {} }) =>
  error || null;

export const loadingSelector = ({ clientContext: { loading = false } = {} }) =>
  !!loading;
