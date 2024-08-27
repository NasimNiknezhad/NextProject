export type LatLng = {
  lat: number;
  lng: number;
};

export type CimdataLocation = {
  title: string;
  latLng: LatLng;
  distance?: number;
};

export type Suggestion = {
  country_code: string;
  zipcode: string;
  place: string;
  state: string;
  state_code: string;
  province: string;
  province_code: string;
  community: string;
  community_code: string;
  latitude: string;
  longitude: string;
};
