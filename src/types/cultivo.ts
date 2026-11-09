export type RegionId = 1 | 2 | 3 | 4 | 5 | 6

export interface Region {
	id: RegionId
	name: string
	description: string
	districts: string[]
}

export interface District {
	id: string
	name: string
	regionId: RegionId
}

export type MonthNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export interface MonthInfo {
	id: MonthNumber
	name: string
	shortName: string
}

export type ActionId = 'sementeira_direta' | 'viveiro' | 'plantar' | 'colher'

export interface CultivationAction {
	id: ActionId
	name: string
	shortName: string
	description: string
	badgeVariant: 'brand' | 'success' | 'warning' | 'neutral' | 'danger'
}

export type CultureType =
	| 'folha'
	| 'fruto'
	| 'raiz'
	| 'leguminosa'
	| 'tuberculo'
	| 'bolbo'
	| 'inflorescencia'
	| 'aromatica'
	| 'outro'

export interface CultureTypeInfo {
	id: CultureType
	name: string
	description?: string
}

export interface CultureRecord {
	id: string
	name: string
	variant?: string
	type: CultureType
	slug: string
	created: string
	updated: string
}

export interface CultureScheduleRecord {
	id: string
	culture: string
	action: ActionId
	regions: string[]
	months: string[]
	created: string
	updated: string
	expand?: {
		culture?: CultureRecord
	}
}
