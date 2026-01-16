import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { useStationsContext } from "../contexts/ContextProvider";
import { useEffect, useRef } from "react";
import type { MapRef } from "react-leaflet/MapContainer";

export default function Map() {
	const mapRef = useRef<MapRef | null>(null);
	const { selectedStation, selectedCity, filteredStations: stations } = useStationsContext();

	useEffect(() => {
		if (selectedStation && mapRef.current) {
			mapRef.current.setView(
				[selectedStation.lat, selectedStation.lng],
				12,
				{ animate: true }
			)
		}
	}, [selectedStation]);

	useEffect(() => {
		if (selectedCity && mapRef.current) {
			const station = stations.find(station => station.city === selectedCity);
			if (station) {
				mapRef.current.setView(
					[station.lat, station.lng],
					6.5,
					{ animate: true }
				)
			}
		} else {
			if (mapRef.current) {
				mapRef.current.setView(
					[51.1657, 10.4515],
					6,
					{ animate: true }
				)
			}
		}
	}, [selectedCity]);

	return (
		<MapContainer
			center={[51.1657, 10.4515]}
			zoom={6}
			className="h-dvh w-full"
			ref={mapRef}
		>
			<TileLayer
				attribution='&copy; OpenStreetMap contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>

			{stations.map(station => (
				<Marker key={station.id} position={[station.lat, station.lng]}>
					<Popup>
						<div className="flex flex-col gap-1 py-2">
							<span className="text-xl font-bold">{station.name}</span>
							<span className="text-base">{station.city}</span>
						</div>
					</Popup>
				</Marker>
			))}
		</MapContainer>
	)

}
