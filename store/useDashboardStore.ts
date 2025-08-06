import { create } from "zustand";

interface Polygon {
  id: string;
  name: string;
  coordinates: [number, number][];
  dataSource: string;
  color: string;
  temperature?: number; 
  humidity?: number;    
  windspeed?: number;   
}

interface DashboardState {
  polygons: Polygon[];
  sliderRange: [number, number];
  addPolygon: (polygon: Polygon) => void;
  updatePolygon: (id: string, updates: Partial<Polygon>) => void;
  removePolygon: (id: string) => void;
  setSliderRange: (range: [number, number]) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  polygons: [],
  sliderRange: [0, 24],

  addPolygon: (polygon) =>
    set((state) => ({ polygons: [...state.polygons, polygon] })),

  updatePolygon: (id, updates) =>
    set((state) => ({
      polygons: state.polygons.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      ),
    })),

  removePolygon: (id) =>
    set((state) => ({
      polygons: state.polygons.filter((p) => p.id !== id),
    })),

  setSliderRange: (range) => set({ sliderRange: range }),
}));
