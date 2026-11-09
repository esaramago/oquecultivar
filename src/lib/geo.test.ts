import { describe, expect, it } from 'vitest'
import { calculateDistanceKm, findNearestDistrict } from './geo'

describe('geo.ts', () => {
	it('calculates distance correctly between known points', () => {
		// Distance between Lisbon (38.7223, -9.1393) and Porto (41.1496, -8.6110) is roughly 275-280 km
		const distance = calculateDistanceKm(38.7223, -9.1393, 41.1496, -8.611)
		expect(distance).toBeGreaterThan(260)
		expect(distance).toBeLessThan(290)
	})

	it('identifies Lisbon from nearby coordinates', () => {
		// Sintra / Cascais coordinates should resolve to Lisbon
		const district = findNearestDistrict(38.7992, -9.3908)
		expect(district?.id).toBe('lisboa')
		expect(district?.regionId).toBe(3)
	})

	it('identifies Faro from Algarve coordinates', () => {
		// Portimão coordinates
		const district = findNearestDistrict(37.1363, -8.5376)
		expect(district?.id).toBe('faro')
		expect(district?.regionId).toBe(5)
	})

	it('identifies Porto from Vila Nova de Gaia coordinates', () => {
		const district = findNearestDistrict(41.1239, -8.6118)
		expect(district?.id).toBe('porto')
		expect(district?.regionId).toBe(1)
	})

	it('identifies Madeira from Funchal coordinates', () => {
		const district = findNearestDistrict(32.65, -16.9086)
		expect(district?.id).toBe('madeira')
		expect(district?.regionId).toBe(6)
	})
})
