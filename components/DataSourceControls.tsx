"use client";

import { useDashboardStore } from "../store/useDashboardStore";
import { getColorByValue } from "../utils/colorRules";

const DATA_SOURCES = [
  { id: "temperature_2m", label: "Temperature (°C)" },
  { id: "humidity", label: "Humidity (%)" },
  { id: "windspeed", label: "Wind Speed (m/s)" },
];

export default function DataSourceControls() {
  const polygons = useDashboardStore((state) => state.polygons);
  const updatePolygon = useDashboardStore((state) => state.updatePolygon);

  const handleSourceChange = (id: string, newSource: string) => {
    const polygon = polygons.find((p) => p.id === id);
    if (!polygon) return;

    
    let newValue = 0;
    if (newSource === "temperature_2m") newValue = polygon.temperature || 0;
    if (newSource === "humidity") newValue = polygon.humidity || 0;
    if (newSource === "windspeed") newValue = polygon.windspeed || 0;

    const newColor = getColorByValue(newSource, newValue);

    updatePolygon(id, { dataSource: newSource, color: newColor });
  };

  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h2 className="text-lg font-semibold mb-2">Data Source Controls</h2>
      {polygons.length === 0 ? (
        <p className="text-gray-500 text-sm">No polygons added yet.</p>
      ) : (
        polygons.map((polygon) => {
          // Show value dynamically based on selected data source
          let valueDisplay = "";
          if (polygon.dataSource === "temperature_2m") {
            valueDisplay = `${polygon.temperature ?? "--"} °C`;
          } else if (polygon.dataSource === "humidity") {
            valueDisplay = `${polygon.humidity ?? "--"} %`;
          } else if (polygon.dataSource === "windspeed") {
            valueDisplay = `${polygon.windspeed ?? "--"} m/s`;
          }

          return (
            <div key={polygon.id} className="mb-3 p-2 border rounded-md">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium text-sm">
                  Polygon {polygon.id}
                </span>
                <div
                  className="w-5 h-5 rounded-full border"
                  style={{ backgroundColor: polygon.color }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mb-2">
                Value: {valueDisplay}
              </div>
              <select
                className="w-full border rounded p-1 text-sm"
                value={polygon.dataSource}
                onChange={(e) => handleSourceChange(polygon.id, e.target.value)}
              >
                {DATA_SOURCES.map((source) => (
                  <option key={source.id} value={source.id}>
                    {source.label}
                  </option>
                ))}
              </select>
            </div>
          );
        })
      )}
    </div>
  );
}
