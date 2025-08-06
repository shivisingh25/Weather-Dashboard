export async function fetchWeatherData(lat: number, lon: number) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,windspeed_10m`;

  const res = await fetch(url);
  const data = await res.json();

  return {
    temperature: data.current?.temperature_2m ?? null,
    humidity: data.current?.relative_humidity_2m ?? null,
    windspeed: data.current?.windspeed_10m ?? null
  };
}
