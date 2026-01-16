import { useStationsContext } from "../contexts/ContextProvider"

const CityFilter = () => {

	const { cities, selectedCity, setSelectedCity } = useStationsContext();

	return (
		<div>
			<select
				value={selectedCity}
				onChange={e => setSelectedCity(e.target.value)}
				className="bg-zinc-800 py-2 px-3 w-full text-foreground rounded-lg"
			>
				<option value="">Select City</option>
				{cities.map((city) => (
					<option key={city} value={city}>
						{city}
					</option>
				))}
			</select>
		</div>
	)
}

export default CityFilter
