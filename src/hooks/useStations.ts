import { useEffect, useState } from 'react'
import type { Station } from "../types"

const API_URL = "https://classy-germanytrainstations.netlify.app/"

export function useStations() {
	const [stations, setStations] = useState<Station[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		fetch(API_URL)
			.then((res) => {
				if (!res.ok) throw new Error('Failed to fetch stations')
				return res.json()
			})
			.then((data) => {
				setStations(data)
				setLoading(false)
			})
			.catch((err) => {
				setError(err.message)
				setLoading(false)
			})
	}, [])

	return { stations, loading, error }
}
