import { z } from "zod";
// {
//     "name": "Aachen",
//     "id": "1",
//     "nametype": "Valid",
//     "recclass": "L5",
//     "mass": "21",
//     "fall": "Fell",
//     "year": "1880-01-01T00:00:00.000",
//     "reclat": "50.775000",
//     "reclong": "6.083330",
//     "geolocation": {
//       "type": "Point",
//       "coordinates": [6.08333, 50.775]
//     }
// },

export const Geolocation = z.object({
  type: z.string(),
  coordinates: z.array(z.number()),
});
export type Geolocation = z.infer<typeof Geolocation>;

export const MeteoriteSchema = z.object({
  id: z.string(),
  name: z.string(),
  nametype: z.string(),
  recclass: z.string(),
  mass: z.string().optional(),
  fall: z.string(),
  year: z.string().optional(),
  reclat: z.string().optional(),
  reclong: z.string().optional(),
  geolocation: Geolocation,
});
export const MeteoriteArraySchema = z.array(MeteoriteSchema);
export type Meteorite = z.infer<typeof MeteoriteSchema>;

export type PolygonCorner = { lat: number; lng: number };
