export function getColorByValue(source: string, value: number): string {
  if (source === "temperature_2m") {
    return value > 30 ? "red" : value > 15 ? "orange" : "blue";
  }
  if (source === "humidity") {
    return value > 70 ? "blue" : value > 40 ? "lightblue" : "gray";
  }
  if (source === "windspeed") {
    return value > 15 ? "purple" : value > 5 ? "green" : "lightgreen";
  }
  return "gray";
}
