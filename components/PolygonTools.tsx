"use client";

import { useDashboardStore } from "../store/useDashboardStore";

export default function PolygonTools() {
  const polygons = useDashboardStore((s) => s.polygons);
  const updatePolygon = useDashboardStore((s) => s.updatePolygon);
  const removePolygon = useDashboardStore((s) => s.removePolygon);

  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h2 className="text-lg font-semibold mb-2">Polygon Tools</h2>
      {polygons.length === 0 ? (
        <p className="text-gray-500 text-sm">No polygons available.</p>
      ) : (
        polygons.map((poly) => (
          <div key={poly.id} className="mb-3 p-2 border rounded-md">
            <input
              className="w-full border rounded p-1 mb-1"
              value={poly.name}
              onChange={(e) => updatePolygon(poly.id, { name: e.target.value })}
            />
            <button
              onClick={() => removePolygon(poly.id)}
              className="bg-red-500 text-white px-2 py-1 rounded text-sm"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}
