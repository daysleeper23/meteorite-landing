import { useMap } from "react-leaflet";
import { useEffect } from "react";

const BoundsPolygonTracker = ({ onBoundsChange }: { onBoundsChange: any }) => {
  const map = useMap();
  // const bounds = map.getBounds();
  // console.log('bounds:', bounds);

  useEffect(() => {
    const handleBoundsChange = () => {
      const bounds = map.getBounds();
      const northEast = bounds.getNorthEast();
      const southWest = bounds.getSouthWest();
      // Derive the other two corners:
      const northWest = { lat: northEast.lat, lng: southWest.lng };
      const southEast = { lat: southWest.lat, lng: northEast.lng };

      const polygonCorners = [
        { lat: northWest.lat, lng: northWest.lng }, // Top left
        { lat: northEast.lat, lng: northEast.lng }, // Top right
        { lat: southEast.lat, lng: southEast.lng }, // Bottom right
        { lat: southWest.lat, lng: southWest.lng }, // Bottom left
      ];

      // Callback with the new bounds
      onBoundsChange && onBoundsChange(polygonCorners);
    };

    map.on("moveend", handleBoundsChange);
    // Initial bounds
    handleBoundsChange();

    return () => {
      map.off("moveend", handleBoundsChange);
    };
  }, [map, onBoundsChange]);

  return null;
};

export default BoundsPolygonTracker;
