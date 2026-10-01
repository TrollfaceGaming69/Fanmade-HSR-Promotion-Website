import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export type RevealScope = {
  root: HTMLElement
  scroller: HTMLElement | Window
}

export const findScroller = (node: HTMLElement): HTMLElement | Window => {
  for (let element = node.parentElement; element; element = element.parentElement) {
    if (/(auto|scroll)/.test(getComputedStyle(element).overflowY)) return element
  }

  return window
}

export const createSectionReveal = (
  root: HTMLElement,
  build: (scope: RevealScope) => void,
): (() => void) => {
  const mm = gsap.matchMedia()

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const scroller = findScroller(root)
    const context = gsap.context(() => build({ root, scroller }), root)

    const pending = Array.from(root.querySelectorAll('img')).filter((img) => !img.complete)
    const refresh = () => ScrollTrigger.refresh()

    pending.forEach((img) => {
      img.addEventListener('load', refresh)
      img.addEventListener('error', refresh)
    })

    return () => {
      pending.forEach((img) => {
        img.removeEventListener('load', refresh)
        img.removeEventListener('error', refresh)
      })
      context.revert()
    }
  })

  return () => mm.revert()
}

export const REVEAL_START = 'clamp(top 80%)'

const REVEAL_LINE = 0.8

export const startsInView = (element: Element, scroller: HTMLElement | Window): boolean => {
  const rect = element.getBoundingClientRect()

  if (scroller instanceof HTMLElement) {
    const offsetTop = rect.top - scroller.getBoundingClientRect().top + scroller.scrollTop

    return offsetTop < scroller.clientHeight * REVEAL_LINE
  }

  return rect.top + window.scrollY < window.innerHeight * REVEAL_LINE
}

type RevealOptions = {
  from?: gsap.TweenVars
  to?: gsap.TweenVars
  trigger?: Element
  start?: string
}

export const revealOnScroll = (
  targets: Element | Element[] | null,
  scroller: HTMLElement | Window,
  { from, to, trigger, start = REVEAL_START }: RevealOptions = {},
) => {
  const list = (Array.isArray(targets) ? targets : [targets]).filter(
    (node): node is Element => node !== null,
  )

  if (list.length === 0) return

  const fromVars = { autoAlpha: 0, y: 40, ...from }
  const toVars = { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out', ...to }
  const anchor = trigger ?? list[0]

  if (start === REVEAL_START && startsInView(anchor, scroller)) {
    gsap.fromTo(list, fromVars, toVars)
    return
  }

  gsap.fromTo(list, fromVars, {
    ...toVars,
    scrollTrigger: { trigger: anchor, scroller, start, once: true },
  })
}
