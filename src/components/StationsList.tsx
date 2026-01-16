import { useState } from "react"
import type { Station } from "../types"
import { useStationsContext } from "../contexts/ContextProvider";
import CityFilter from "./CityFilter";

export default function StationsList() {
	const [toggle, setToggle] = useState(false);
	const { setSelectedStation, filteredStations: stations } = useStationsContext();

	const onSelectStation = (station: Station) => {
		setSelectedStation(station);
		setToggle(false);
	}

	return (
		<>
			<button className="bg-zinc-800 rounded-md lg:hidden block max-h-max fixed top-5 right-5 z-[100000] py-2 px-3 hover:bg-zinc-800/70 duration-200 cursor-pointer" onClick={() => setToggle(!toggle)}>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-menu"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 8l16 0" /><path d="M4 16l16 0" /></svg>
			</button>
			<div className={`bg-background py-6 px-6 space-y-8 flex-1 lg:block hidden ${toggle ? "block! fixed top-0 bottom-0 left-0 w-[300px] z-[100000]" : ""}`}>
				<CityFilter />
				<div className="space-y-6">
					<h2 className="text-2xl font-bold">Stations List</h2>
					<ul className="flex flex-col gap-2 max-h-[70dvh] overflow-y-auto">
						{stations.map((station) => (
							<li key={station.id}>
								<button className="py-2 px-6 w-full block text-left rounded-lg cursor-pointer hover:bg-zinc-900 duration-200 bg-zinc-800" onClick={() => onSelectStation(station)}>
									<p>{station.name}</p>
									<p className="text-sm text-zinc-400">{station.city}</p>
								</button>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	)
}