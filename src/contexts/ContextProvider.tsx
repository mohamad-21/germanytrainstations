import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Station } from "../types"

type StationsContextType = {
	stations: Station[]
	filteredStations: Station[]
	selectedCity: string
	selectedStation: Station | null
	cities: string[]
	setStations: (stations: Station[]) => void
	setSelectedCity: (city: string) => void
	setSelectedStation: (station: Station | null) => void
}

const StationsContext = createContext<StationsContextType | null>(null)

export const StationsProvider = ({ children }: { children: ReactNode }) => {
	const [stations, setStations] = useState<Station[]>([]);
	const [selectedCity, setSelectedCity] = useState('');
	const [selectedStation, setSelectedStation] = useState<Station | null>(null);

	const cities = Array.from(new Set(stations.map((s) => s.city))).sort()

	const filteredStations = selectedCity
		? stations.filter((s) => s.city === selectedCity)
		: stations

	return (
		<StationsContext.Provider
			value={{
				stations,
				filteredStations,
				selectedCity,
				selectedStation,
				cities,
				setStations,
				setSelectedCity,
				setSelectedStation,
			}}
		>
			{children}
		</StationsContext.Provider>
	)
}

export const useStationsContext = () => {
	const context = useContext(StationsContext)
	if (!context) {
		throw new Error('useStationsContext must be used within StationsProvider')
	}
	return context
}
