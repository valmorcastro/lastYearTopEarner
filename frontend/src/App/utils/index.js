const currencyFormatter = Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const dateFormatter = Intl.DateTimeFormat("pt-BR");

export const ALPHA_TYPE = "alpha";

export const LAST_YEAR = new Date().getFullYear() - 1;

export const formatCurrency = (num) =>
  currencyFormatter.format((!isNaN(num) && num) || 0);

export const formatDate = (date) =>
  (!isNaN(date) && dateFormatter.format(date)) || null;

export const amountOrZero = (amount) =>
  !isNaN(amount) ? parseFloat(amount) : 0;
