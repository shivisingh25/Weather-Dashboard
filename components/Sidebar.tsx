"use client";

import PolygonTools from "./PolygonTools";
import DataSourceControls from "./DataSourceControls";
import TimelineSlider from "./TimelineSlider";

export default function Sidebar() {
  return (
    <div className="w-full p-4 bg-gray-50 border-r h-screen overflow-hidden">
      <PolygonTools />
      <div className="my-4" />
      <DataSourceControls />
      <div className="my-4" />
      <TimelineSlider />
    </div>
  );
}
