import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Meteorite, MeteoriteSchema, PolygonCorner } from "../types";
import { LatLngExpression } from "leaflet";
import BoundsPolygonTracker from "../utils/bound-polygon-tracker";
import { useState } from "react";
import RecenterMap from "../utils/map-recenter";

const MeteoriteMap = ({
  data,
  center = [61.49911, 23.78712],
}: {
  data: Meteorite[];
  center: LatLngExpression;
}) => {
  const [polygonCorners, setPolygonCorners] = useState<PolygonCorner[]>([
    { lat: 90, lng: 0 },
    { lat: 0, lng: 90 },
    { lat: 90, lng: 0 },
    { lat: 90, lng: 90 },
  ]);

  const meteorites = data
    .filter((meteorite) => {
      return MeteoriteSchema.safeParse(meteorite).success;
    })
    .filter(
      (meteorite) =>
        meteorite.geolocation.coordinates[1] >= polygonCorners[3].lat &&
        meteorite.geolocation.coordinates[0] >= polygonCorners[3].lng &&
        meteorite.geolocation.coordinates[1] <= polygonCorners[1].lat &&
        meteorite.geolocation.coordinates[0] <= polygonCorners[1].lng,
    );

  const handleBoundsChange = (polygonCorners: PolygonCorner[]) => {
    setPolygonCorners((prev) => {
      if (
        prev[0].lat === polygonCorners[0].lat &&
        prev[0].lng === polygonCorners[0].lng &&
        prev[1].lat === polygonCorners[1].lat &&
        prev[1].lng === polygonCorners[1].lng &&
        prev[2].lat === polygonCorners[2].lat &&
        prev[2].lng === polygonCorners[2].lng &&
        prev[3].lat === polygonCorners[3].lat &&
        prev[3].lng === polygonCorners[3].lng
      ) {
        return prev;
      } else return polygonCorners;
    });
  };

  return (
    <div className="flex-1 rounded-lg shadow-lg border border-primary/10 overflow-hidden">
      <MapContainer
        className="h-full w-full rounded-lg shadow-md border border-primary/10"
        center={center}
        zoom={5}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {meteorites.map((meteorite) => {
          return (
            <Marker
              key={meteorite.id}
              position={[
                meteorite.geolocation.coordinates[1],
                meteorite.geolocation.coordinates[0],
              ]}
            >
              <Popup>
                <strong>{meteorite.name}</strong>
                <p>Lat: {meteorite.geolocation.coordinates[1]}</p>
                <p>Long: {meteorite.geolocation.coordinates[0]}</p>
              </Popup>
            </Marker>
          );
        })}
        
        {/* Track current bounds of the map container */}
        <BoundsPolygonTracker onBoundsChange={handleBoundsChange} />

        {/* Update the center of the map */}
        <RecenterMap center={center} />
      </MapContainer>
    </div>
  );
};

export default MeteoriteMap;
