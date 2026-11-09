import { DISTRICTS, getDistrictById } from '@/lib/config'
import type { District } from '@/types/cultivo'

/**
 * Approximate geographical coordinates for district capitals / island centers in Portugal.
 */
export const DISTRICT_COORDINATES: Record<string, { lat: number; lon: number }> = {
	'viana-do-castelo': { lat: 41.6932, lon: -8.8329 },
	braga: { lat: 41.5503, lon: -8.4201 },
	porto: { lat: 41.1496, lon: -8.611 },
	aveiro: { lat: 40.6405, lon: -8.6538 },
	coimbra: { lat: 40.2056, lon: -8.4196 },
	leiria: { lat: 39.7436, lon: -8.8071 },
	'vila-real': { lat: 41.3006, lon: -7.7441 },
	braganca: { lat: 41.8058, lon: -6.7572 },
	guarda: { lat: 40.5373, lon: -7.2658 },
	viseu: { lat: 40.6575, lon: -7.9143 },
	lisboa: { lat: 38.7223, lon: -9.1393 },
	setubal: { lat: 38.5244, lon: -8.8882 },
	santarem: { lat: 39.2362, lon: -8.6874 },
	portalegre: { lat: 39.2938, lon: -7.4312 },
	evora: { lat: 38.5714, lon: -7.907 },
	beja: { lat: 38.0151, lon: -7.8631 },
	'castelo-branco': { lat: 39.8222, lon: -7.4909 },
	faro: { lat: 37.0194, lon: -7.9304 },
	madeira: { lat: 32.7607, lon: -16.9595 },
	acores: { lat: 37.7412, lon: -25.6756 }
}

/**
 * Calculates the great-circle distance between two points on the Earth using the Haversine formula.
 */
export function calculateDistanceKm(
	lat1: number,
	lon1: number,
	lat2: number,
	lon2: number
): number {
	const earthRadiusKm = 6371
	const dLat = ((lat2 - lat1) * Math.PI) / 180
	const dLon = ((lon2 - lon1) * Math.PI) / 180
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos((lat1 * Math.PI) / 180) *
			Math.cos((lat2 * Math.PI) / 180) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2)
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
	return earthRadiusKm * c
}

/**
 * Finds the closest Portuguese district based on latitude and longitude coordinates.
 */
export function findNearestDistrict(lat: number, lon: number): District | undefined {
	let nearestDistrictId: string | null = null
	let shortestDistance = Infinity

	for (const district of DISTRICTS) {
		const coords = DISTRICT_COORDINATES[district.id]
		if (!coords) continue

		const distance = calculateDistanceKm(lat, lon, coords.lat, coords.lon)
		if (distance < shortestDistance) {
			shortestDistance = distance
			nearestDistrictId = district.id
		}
	}

	return nearestDistrictId ? getDistrictById(nearestDistrictId) : undefined
}
