import { gsap } from 'gsap'

const proxies = new WeakMap<HTMLElement, { value: number }>()

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const scrollLeftTo = (scroller: HTMLElement, target: number) => {
  let proxy = proxies.get(scroller)

  if (!proxy) {
    proxy = { value: scroller.scrollLeft }
    proxies.set(scroller, proxy)
  }

  const tweened = proxy
  gsap.killTweensOf(tweened)

  if (prefersReducedMotion()) {
    scroller.scrollLeft = target
    return
  }

  tweened.value = scroller.scrollLeft

  gsap.to(tweened, {
    value: target,
    duration: 0.55,
    ease: 'power3.out',
    onUpdate: () => {
      scroller.scrollLeft = tweened.value
    },
  })
}

export const clampScroll = (scroller: HTMLElement, target: number) =>
  Math.min(Math.max(target, 0), Math.max(scroller.scrollWidth - scroller.clientWidth, 0))

export const centerOffsetFor = (scroller: HTMLElement, child: HTMLElement) =>
  clampScroll(scroller, child.offsetLeft - (scroller.clientWidth - child.clientWidth) / 2)
