"use client";

import { Range } from "react-range";
import { useDashboardStore } from "../store/useDashboardStore";

export default function TimelineSlider() {
  const sliderRange = useDashboardStore((s) => s.sliderRange);
  const setSliderRange = useDashboardStore((s) => s.setSliderRange);

  return (
    <div className="p-4 bg-gray-100 rounded shadow">
      <h3 className="mb-2 font-semibold">Timeline (Hours)</h3>
      <Range
        step={1}
        min={0}
        max={24}
        values={sliderRange}
        onChange={(values) => setSliderRange([values[0], values[1]])}
        renderTrack={({ props, children }) => (
          <div
            ref={props.ref}
            className="h-2 bg-blue-300 rounded"
            style={props.style}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => {
          const { key, ...rest } = props; // Remove key explicitly
          return <div {...rest} className="w-4 h-4 bg-blue-600 rounded-full" />;
        }}
      />
      <div className="mt-2">
        Range: {sliderRange[0]}h - {sliderRange[1]}h
      </div>
    </div>
  );
}
