import { useEffect } from "react";
import Map from "./components/Map";
import StationsList from "./components/StationsList";
import { useStationsContext } from "./contexts/ContextProvider";
import { useStations } from "./hooks/useStations";

function App() {

  const { stations, loading, error } = useStations();
  const { setStations } = useStationsContext();

  useEffect(() => {
    setStations(stations)
  }, [stations, setStations])

  if (loading) return <p>Loading...</p>

  if (error) return <p>Error: {error}</p>

  if (stations.length === 0) return <p>No stations available</p>

  return (
    <div className="flex relative">
      <StationsList />
      <div className="flex-3">
        <Map />
      </div>
    </div>
  )
}

export default App
