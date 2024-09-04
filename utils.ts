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
