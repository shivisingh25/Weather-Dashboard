"use client";

import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { useDashboardStore } from "../store/useDashboardStore";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import axios from "axios";

// Utility to find center of polygon
const getPolygonCenter = (coords: [number, number][]) => {
  const latSum = coords.reduce((sum, c) => sum + c[0], 0);
  const lngSum = coords.reduce((sum, c) => sum + c[1], 0);
  return [latSum / coords.length, lngSum / coords.length] as [number, number];
};

// Fetch real weather data from Open-Meteo API
const fetchWeatherData = async (lat: number, lon: number) => {
  try {
    const res = await axios.get(
      `https://api.open-meteo.com/v1/forecast`,
      {
        params: {
          latitude: lat,
          longitude: lon,
          current_weather: true,
          hourly: "relative_humidity_2m"
        }
      }
    );

    const weather = (res.data as any).current_weather;
    const hourly = (res.data as any).hourly;

    // Match humidity for current hour
    const humidityArray = hourly?.relative_humidity_2m;
    const currentHourIndex = hourly?.time?.indexOf(weather.time) ?? 0;
    const humidity = humidityArray?.[currentHourIndex] ?? 50;

    return {
      temperature: weather.temperature ?? 0,
      humidity,
      windspeed: weather.windspeed ?? 0,
    };
  } catch (err) {
    console.error("Weather API Error:", err);
    return { temperature: 0, humidity: 0, windspeed: 0 };
  }
};

export default function MapDashboard() {
  const addPolygon = useDashboardStore((s) => s.addPolygon);
  const updatePolygon = useDashboardStore((s) => s.updatePolygon);
  const removePolygon = useDashboardStore((s) => s.removePolygon);
  const polygons = useDashboardStore((s) => s.polygons);

  // On polygon creation
  const onCreated = async (e: any) => {
    const layer = e.layer;
    const coords = layer.getLatLngs()[0].map((c: any) => [c.lat, c.lng]) as [number, number][];
    const [lat, lon] = getPolygonCenter(coords);

    // Fetch real API values
    const { temperature, humidity, windspeed } = await fetchWeatherData(lat, lon);

    // Add polygon to store
    addPolygon({
      id: Date.now().toString(),
      name: `Polygon ${polygons.length + 1}`,
      coordinates: coords,
      dataSource: "temperature_2m",
      color: "gray",
      temperature,
      humidity,
      windspeed,
    });

    // Attach ID to leaflet layer for edit/delete
    layer.options.id = Date.now().toString();
  };

  // On polygon edit
  const onEdited = async (e: any) => {
    e.layers.eachLayer(async (layer: any) => {
      const coords = layer.getLatLngs()[0].map((c: any) => [c.lat, c.lng]) as [number, number][];
      const id = layer.options.id;
      const [lat, lon] = getPolygonCenter(coords);

      // Refetch weather data for updated area
      const { temperature, humidity, windspeed } = await fetchWeatherData(lat, lon);

      updatePolygon(id, {
        coordinates: coords,
        temperature,
        humidity,
        windspeed,
      });
    });
  };

  // On polygon delete
  const onDeleted = (e: any) => {
    e.layers.eachLayer((layer: any) => {
      const id = layer.options.id;
      removePolygon(id);
    });
  };

  return (
    <div className="h-full w-full">
      <MapContainer
        center={[22.57, 88.36]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={onCreated}
            onEdited={onEdited}
            onDeleted={onDeleted}
            draw={{
              rectangle: false,
              circle: false,
              circlemarker: false,
              marker: false,
              polyline: false,
            }}
          />
        </FeatureGroup>
      </MapContainer>
    </div>
  );
}
