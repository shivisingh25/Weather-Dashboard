# Weather Dashboard 🌦️

A fully interactive **Next.js + React + Leaflet** dashboard to visualize **weather data within custom‑drawn map regions**.  
Powered by **Open-Meteo** (free, no API key required) for live updates.

---

## 🚀 Features

- **Polygon drawing & editing**: Use Leaflet Draw to add, reshape, or delete regions.
- **Weather insights per polygon**: Displays real-time **temperature (°C)**, **humidity (%)**, and **wind speed (m/s)**.
- **Multiple data sources**: Switch between temperature, humidity, or windspeed per region.
- **Dynamic color theming**: Areas are color-coded (e.g. blue for cold, red for hot) based on current values.
- **Rename & delete regions** via sidebar UI.
- **Time-range slider**: Choose a time window (e.g. hours) to filter data analysis.
- **State persistence**: Polygons and settings persist across reloads via **localStorage**.

---

## 🧩 Tech Stack

| Component             | Tech Used                       |
|-----------------------|----------------------------------|
| UI & Routing          | Next.js + React (App Router)     |
| Mapping               | Leaflet, react-leaflet, react-leaflet-draw |
| State Management      | Zustand                          |
| Weather API           | Open-Meteo — free & no API key   |
| Styling               | Tailwind CSS                     |
| HTTP Client           | Axios                            |

---

## 📦 Setup & Local Development

```bash
git clone https://github.com/shivisingh25/Weather-Dashboard.git
cd Weather-Dashboard
npm install
npm run dev

