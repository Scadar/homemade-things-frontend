import currency from "currency.js";

export const priceFormat = (value: number): string => {
    return currency(value, { separator: " ", symbol: "₽", pattern: `# !` })
    .format();
};