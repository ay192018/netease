export function handleNum(num) {
  if (num > 10000) {
    num = (num / 10000).toFixed(1);
    return num + "万";
  } else {
    return num;
  }
}
