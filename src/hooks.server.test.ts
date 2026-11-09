import { describe, expect, it, vi, beforeEach } from 'vitest'

const mockLoadFromCookie = vi.fn()
const mockExportToCookie = vi.fn(() => 'pb_auth=mock-cookie')
const mockClear = vi.fn()
const mockAuthRefresh = vi.fn()

let mockIsValid = false
let mockRecord: Record<string, unknown> | null = null

vi.mock('pocketbase', () => {
  return {
    default: class MockPocketBase {
      authStore = {
        loadFromCookie: mockLoadFromCookie,
        exportToCookie: mockExportToCookie,
        clear: mockClear,
        get isValid() {
          return mockIsValid
        },
        get record() {
          return mockRecord
        }
      }
      collection = vi.fn(() => ({
        authRefresh: mockAuthRefresh
      }))
    }
  }
})

import { handle } from './hooks.server'

describe('hooks.server handle', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockIsValid = false
    mockRecord = null
  })

  it('loads auth state from cookie and sets response cookie when unauthenticated', async () => {
    const event = {
      locals: {} as App.Locals,
      request: new Request('http://localhost/', {
        headers: { cookie: 'pb_auth=initial' }
      })
    } as Parameters<typeof handle>[0]['event']

    const resolve = vi.fn(async () => new Response('ok'))

    const response = await handle({ event, resolve })

    expect(mockLoadFromCookie).toHaveBeenCalledWith('pb_auth=initial')
    expect(mockAuthRefresh).not.toHaveBeenCalled()
    expect(event.locals.user).toBeNull()
    expect(response.headers.get('set-cookie')).toBe('pb_auth=mock-cookie')
  })

  it('refreshes auth token when authStore is valid', async () => {
    mockIsValid = true
    mockRecord = { id: 'user_123', email: 'test@example.com' }

    const event = {
      locals: {} as App.Locals,
      request: new Request('http://localhost/')
    } as Parameters<typeof handle>[0]['event']

    const resolve = vi.fn(async () => new Response('ok'))

    await handle({ event, resolve })

    expect(mockAuthRefresh).toHaveBeenCalledOnce()
    expect(event.locals.user).toEqual({ id: 'user_123', email: 'test@example.com' })
  })

  it('clears authStore if authRefresh fails', async () => {
    mockIsValid = true
    mockAuthRefresh.mockRejectedValueOnce(new Error('Token expired'))

    const event = {
      locals: {} as App.Locals,
      request: new Request('http://localhost/')
    } as Parameters<typeof handle>[0]['event']

    const resolve = vi.fn(async () => new Response('ok'))

    await handle({ event, resolve })

    expect(mockAuthRefresh).toHaveBeenCalledOnce()
    expect(mockClear).toHaveBeenCalledOnce()
  })
})
