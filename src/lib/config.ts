import type {
	Region,
	District,
	MonthInfo,
	ActionId,
	CultivationAction,
	CultureTypeInfo,
	ActionCategory
} from '@/types/cultivo'

export const WEBSITE_TITLE = 'O Que Cultivar'
export const UMAMI_URL = 'https://analytics.emanuelsaramago.com'
export const UMAMI_WEBSITE_ID = ''

export const REGIONS: readonly Region[] = [
	{
		id: 1,
		name: 'Litoral norte e centro',
		description: 'Viana do Castelo, Braga, Porto, Aveiro, Coimbra, Leiria',
		districts: ['viana-do-castelo', 'braga', 'porto', 'aveiro', 'coimbra', 'leiria']
	},
	{
		id: 2,
		name: 'Interior norte e serras',
		description: 'Vila Real, Bragança, Guarda, Viseu',
		districts: ['vila-real', 'braganca', 'guarda', 'viseu']
	},
	{
		id: 3,
		name: 'Lisboa, Setúbal e Vale do Tejo',
		description: 'Lisboa, Setúbal, Santarém',
		districts: ['lisboa', 'setubal', 'santarem']
	},
	{
		id: 4,
		name: 'Alentejo e Beira Baixa',
		description: 'Portalegre, Évora, Beja, Castelo Branco',
		districts: ['portalegre', 'evora', 'beja', 'castelo-branco']
	},
	{
		id: 5,
		name: 'Algarve',
		description: 'Faro',
		districts: ['faro']
	},
	{
		id: 6,
		name: 'Madeira e Açores',
		description: 'Regiões autónomas',
		districts: ['madeira', 'acores']
	}
] as const

export const DISTRICTS: readonly District[] = [
	{ id: 'viana-do-castelo', name: 'Viana do Castelo', regionId: 1 },
	{ id: 'braga', name: 'Braga', regionId: 1 },
	{ id: 'porto', name: 'Porto', regionId: 1 },
	{ id: 'aveiro', name: 'Aveiro', regionId: 1 },
	{ id: 'coimbra', name: 'Coimbra', regionId: 1 },
	{ id: 'leiria', name: 'Leiria', regionId: 1 },

	{ id: 'vila-real', name: 'Vila Real', regionId: 2 },
	{ id: 'braganca', name: 'Bragança', regionId: 2 },
	{ id: 'guarda', name: 'Guarda', regionId: 2 },
	{ id: 'viseu', name: 'Viseu', regionId: 2 },

	{ id: 'lisboa', name: 'Lisboa', regionId: 3 },
	{ id: 'setubal', name: 'Setúbal', regionId: 3 },
	{ id: 'santarem', name: 'Santarém', regionId: 3 },

	{ id: 'portalegre', name: 'Portalegre', regionId: 4 },
	{ id: 'evora', name: 'Évora', regionId: 4 },
	{ id: 'beja', name: 'Beja', regionId: 4 },
	{ id: 'castelo-branco', name: 'Castelo Branco', regionId: 4 },

	{ id: 'faro', name: 'Faro', regionId: 5 },

	{ id: 'madeira', name: 'Madeira', regionId: 6 },
	{ id: 'acores', name: 'Açores', regionId: 6 }
] as const

export const SORTED_DISTRICTS: readonly District[] = [...DISTRICTS].sort((a, b) =>
	a.name.localeCompare(b.name, 'pt-PT')
)

export const MONTHS: readonly MonthInfo[] = [
	{ id: 1, name: 'Janeiro', shortName: 'Jan' },
	{ id: 2, name: 'Fevereiro', shortName: 'Fev' },
	{ id: 3, name: 'Março', shortName: 'Mar' },
	{ id: 4, name: 'Abril', shortName: 'Abr' },
	{ id: 5, name: 'Maio', shortName: 'Mai' },
	{ id: 6, name: 'Junho', shortName: 'Jun' },
	{ id: 7, name: 'Julho', shortName: 'Jul' },
	{ id: 8, name: 'Agosto', shortName: 'Ago' },
	{ id: 9, name: 'Setembro', shortName: 'Set' },
	{ id: 10, name: 'Outubro', shortName: 'Out' },
	{ id: 11, name: 'Novembro', shortName: 'Nov' },
	{ id: 12, name: 'Dezembro', shortName: 'Dez' }
] as const

export const ACTIONS: readonly CultivationAction[] = [
	{
		id: 'direct_sowing',
		category: 'semear',
		name: 'Sementeira direta',
		shortName: 'Semear (Direta)',
		description: 'Semear as sementes diretamente no solo definitivo.',
		badgeVariant: 'warning'
	},
	{
		id: 'nursery',
		category: 'semear',
		name: 'Sementeira em viveiro',
		shortName: 'Semear (Viveiro)',
		description: 'Semear em alfobre, tabuleiros ou estufa para posterior transplante.',
		badgeVariant: 'warning'
	},
	{
		id: 'plant',
		category: 'plantar',
		name: 'Plantação / Transplante',
		shortName: 'Plantar',
		description: 'Transplantar as mudas de viveiro ou plantar batatas/bolbos no solo.',
		badgeVariant: 'success'
	},
	{
		id: 'harvest',
		category: 'colher',
		name: 'Colheita',
		shortName: 'Colher',
		description: 'Colher os produtos prontos para consumo.',
		badgeVariant: 'brand'
	}
] as const

export const CULTURE_TYPES: readonly CultureTypeInfo[] = [
	{ id: 'leaf', name: 'Folha', description: 'Alfaces, espinafres, acelgas, rúcula, etc.' },
	{ id: 'fruit', name: 'Fruto', description: 'Tomates, pimentos, curgetes, abóboras, etc.' },
	{ id: 'root', name: 'Raiz', description: 'Cenouras, rabanetes, beterrabas, nabos, etc.' },
	{ id: 'legume', name: 'Leguminosa', description: 'Feijões, ervilhas, favas, etc.' },
	{ id: 'tuber', name: 'Tubérculo', description: 'Batatas, batatas-doces, etc.' },
	{ id: 'bulb', name: 'Bolbo', description: 'Cebolas, alhos, alhos-franceses, etc.' },
	{ id: 'inflorescence', name: 'Inflorescência / Couves', description: 'Couves, brócolos, couve-flor, etc.' },
	{ id: 'herb', name: 'Aromática e Medicinal', description: 'Salsa, coentros, manjericão, etc.' },
	{ id: 'other', name: 'Outro', description: 'Outras variedades de cultivo.' }
] as const

export function getRegionById(id: number): Region | undefined {
	return REGIONS.find((r) => r.id === id)
}

export function getDistrictById(id: string): District | undefined {
	return DISTRICTS.find((d) => d.id === id)
}

export function getDistrictsByRegion(regionId: number): District[] {
	return DISTRICTS.filter((d) => d.regionId === regionId)
}

export function getMonthById(id: number): MonthInfo | undefined {
	return MONTHS.find((m) => m.id === id)
}

export function getActionById(id: string): CultivationAction | undefined {
	return ACTIONS.find((a) => a.id === id)
}

export function getActionsByCategory(category: ActionCategory): CultivationAction[] {
	return ACTIONS.filter((a) => a.category === category)
}

export function isSementeiraAction(actionId: ActionId): boolean {
	return actionId === 'direct_sowing' || actionId === 'nursery'
}

export function getCultureTypeById(id: string): CultureTypeInfo | undefined {
	return CULTURE_TYPES.find((t) => t.id === id)
}
