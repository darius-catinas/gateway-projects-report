export const formatFlotingDisplay = (num: number) => {
  return (Math.round(num * 100) / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const formatPrice = (num: number) => {
  return `TOTAL: ${formatFlotingDisplay(num)} USD`;
}

export const colors = [
  '#A259FF',
  '#F24E1E',
  '#FFC107',
  '#6497B1',
];

export default formatFlotingDisplay;
