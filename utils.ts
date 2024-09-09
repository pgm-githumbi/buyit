export const addValues = (props: { [coin: string]: number }) => {
  let result = 0;
  for (const coin in props) {
    const coin_mrkt_cap = props[coin];
    result += coin_mrkt_cap;
  }
  return result;
};

import numeral from "numeral";

export const numberFormatter = new Intl.NumberFormat("en", {
  notation: "compact",
});

export const currencyFormatter = new Intl.NumberFormat("en", {
  currency: "USD",
  useGrouping: true,
  notation: "standard",
});

export const formatTimeString = (date: Date | undefined) => {
  if (!date) return ``;
  return `${date.toLocaleTimeString().replace(/:\d+\s/, " ")}`;
};
