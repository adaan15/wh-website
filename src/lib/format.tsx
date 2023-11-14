export function formatPriceBDT(price: number) {
  return price.toLocaleString("bn-BD", {
    style: "currency",
    currency: "BDT",
  });
}
