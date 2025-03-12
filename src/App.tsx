import "leaflet/dist/leaflet.css";
import MeteoriteMap from "./map/ui/meteorite-map";
import { useQuery } from "@tanstack/react-query";
import { Meteorite, MeteoriteSchema } from "./map/types";
import { useState } from "react";

function App() {
  const query = useQuery({
    queryKey: ["meteorites"],
    queryFn: async () => {
      const response = await fetch(
        "https://data.nasa.gov/resource/y77d-th95.json",
      );
      return response.json();
    },
  });

  const formatDate = (date: string) => {
    return new Date(date);
  };

  const [center, setCenter] = useState<[number, number]>([61.49911, 23.78712]);

  return (
    <div className="h-screen w-screen flex flex-col p-10 gap-8">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        <div className="grid gap-1">
          <h1 className="text-3xl font-bold">Meteorite Landings</h1>
          <p className="md:text-lg font-light text-primary/80">
            {" "}
            Free Data from NASA's Open Data Portal
          </p>
        </div>
      </div>
      <div className="flex flex-1 overflow-hidden gap-2">
        <div className="flex flex-col relative overflow-y-auto h-full w-[256px] rounded-lg shadow-lg border border-primary/10">
          {(query.data || [])
            .filter((meteorite: any) => {
              return MeteoriteSchema.safeParse(meteorite).success;
            })
            .map((meteorite: Meteorite) => (
              <div
                className="p-2 border-b border-primary/10 hover:bg-primary-foreground cursor-pointer"
                key={meteorite.id}
                onClick={() =>
                  setCenter([
                    meteorite.geolocation.coordinates[1],
                    meteorite.geolocation.coordinates[0],
                  ])
                }
              >
                <p className="text-sm font-bold text-primary">
                  {meteorite.name}
                </p>
                <p className="text-xs text-primary/70">
                  Discovered: {formatDate(meteorite.year || "").getFullYear()}
                </p>
              </div>
            ))}
        </div>
        <MeteoriteMap data={query.data || []} center={center} />
      </div>
    </div>
  );
}

export default App;
