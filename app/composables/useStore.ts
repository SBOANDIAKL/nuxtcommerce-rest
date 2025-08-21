import { useCookie } from '#imports'

export default function useStore<T = Record<string, unknown>>(
  name: string,
) {
  return useCookie<T>(name, { maxAge: 365 * 24 * 60 * 60 })
}
