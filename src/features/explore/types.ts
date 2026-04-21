export type ExploreLocationType = "HOSPITAL" | "PHARMACY";

export type ExploreLocation = {
  id: string;
  name: string;
  type: ExploreLocationType;
  address1: string;
  address2?: string | null;
  province: string;
  latitude?: number | null;
  longitude?: number | null;
};

export type LatLng = {
  latitude: number;
  longitude: number;
};
