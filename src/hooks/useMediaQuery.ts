import { useCallback, useSyncExternalStore } from 'react'

const supported = () =>
  typeof window !== 'undefined' && typeof window.matchMedia === 'function'

/**
 * Subscribes to a CSS media query from JS.
 *
 * Only for cases where a component needs the breakpoint as a value rather than
 * a class — sizing props handed to a GSAP-driven component, for instance.
 * Prefer Tailwind's responsive variants everywhere else.
 */
export const useMediaQuery = (query: string): boolean => {
  const subscribe = useCallback(
    (onChange: () => void) => {
      if (!supported()) return () => {}

      const list = window.matchMedia(query)
      list.addEventListener('change', onChange)

      return () => list.removeEventListener('change', onChange)
    },
    [query],
  )

  // Read on every render so the very first paint already matches the viewport.
  const getSnapshot = useCallback(
    () => (supported() ? window.matchMedia(query).matches : false),
    [query],
  )

  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}

export default useMediaQuery
