import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useStrings } from '../i18n/strings'
import { NAV_ITEMS, ROUTES } from '../routes'
import LanguageSwitcher from './LanguageSwitcher'
import DownloadOvl from './overlays/DownloadOvl'
import { PLATFORMS } from './overlays/platforms'

const Nav = () => {
  const t = useStrings()
  const sentinelRef = useRef<HTMLDivElement>(null)
  const [isStuck, setIsStuck] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => setIsStuck(!entry.isIntersecting),
      { threshold: 0 },
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `group relative cursor-pointer transition-colors duration-300 ease-out
     hover:text-primary focus-visible:text-primary focus-visible:outline-none motion-reduce:transition-none
     ${isActive ? 'text-primary' : 'text-label'}`

  const underlineClass = (isActive: boolean) =>
    `pointer-events-none absolute -bottom-1 left-0 h-0.5 w-full origin-center rounded-full bg-primary
     transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none
     ${isActive ? 'scale-x-100' : 'scale-x-0'}`

  return (
    <>
        <div ref={sentinelRef} aria-hidden='true' className='h-px w-full' />

        <nav
          className={`sticky top-0 z-50 w-full px-4 sm:px-5 flex justify-between items-center gap-3
            transition-[background-color,padding,box-shadow] duration-300 ease-out motion-reduce:transition-none
            ${isStuck
              ? 'py-1 bg-background/85 shadow-lg shadow-black/40 backdrop-blur-md'
              : 'py-2 sm:py-2.5 bg-background'}`}
        >
            <Link
              to={ROUTES.home}
              aria-label={t.nav.homeAria}
              onClick={() => setMenuOpen(false)}
              className='shrink-0'
            >
              <img
                src={assets.logo}
                alt="logo"
                className={`w-24 sm:w-28 lg:w-36 object-contain transition-[height] duration-300 ease-out motion-reduce:transition-none
                  ${isStuck ? 'h-10 sm:h-12 lg:h-14' : 'h-12 sm:h-14 lg:h-20'}`}
              />
            </Link>

            <ul className='hidden lg:inline-flex justify-center items-center gap-6 xl:gap-10'>
                  {NAV_ITEMS.map(({ key, to }) => (
                    <li key={key}>
                      <NavLink
                        to={to}
                        end={to === ROUTES.home}
                        className={(state) => `${navLinkClass(state)} text-lg xl:text-2xl`}
                      >
                        {({ isActive }) => (
                          <>
                            {t.nav.items[key]}
                            <span aria-hidden='true' className={underlineClass(isActive)} />
                          </>
                        )}
                      </NavLink>
                    </li>
                  ))}
            </ul>

            <div className='hidden lg:inline-flex justify-end items-center gap-5 xl:gap-10'>
                <LanguageSwitcher />

                <div
                  role='button'
                  tabIndex={0}
                  aria-haspopup='true'
                  aria-label={t.common.downloadNow}
                  className='group relative w-44 xl:w-52 h-11 xl:h-12 rounded-[10px] inline-flex justify-start items-center cursor-pointer
                    focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary focus-visible:outline-none'
                >
                    <DownloadOvl placement='bottom' size='sm' />

                    <div className='flex-1 h-full bg-label rounded-tl-[10px] rounded-bl-[10px] overflow-hidden inline-flex justify-center items-center'>
                        <img src={assets.download_icon} className='size-11 xl:size-14' alt="" />
                    </div>

                    <div className='w-32 xl:w-40 h-full bg-button-fill rounded-tr-[10px] rounded-br-[10px] inline-flex justify-center items-center gap-2.5'>
                        <h3 className='text-black uppercase text-xs xl:text-sm font-medium'>{t.common.downloadNow}</h3>
                    </div>
                </div>
            </div>

            <button
              type='button'
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls='mobile-menu'
              aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
              className='lg:hidden inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-md
                border border-label/25 text-label transition-colors duration-300 ease-out
                hover:border-primary hover:text-primary
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary
                motion-reduce:transition-none'
            >
              <svg
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth={2}
                strokeLinecap='round'
                className='size-6'
                aria-hidden='true'
              >
                {menuOpen ? (
                  <>
                    <path d='M18 6 6 18' />
                    <path d='m6 6 12 12' />
                  </>
                ) : (
                  <>
                    <path d='M4 7h16' />
                    <path d='M4 12h16' />
                    <path d='M4 17h16' />
                  </>
                )}
              </svg>
            </button>

            <div
              id='mobile-menu'
              hidden={!menuOpen}
              className='lg:hidden absolute inset-x-0 top-full max-h-[calc(100svh-5rem)] overflow-y-auto no-scrollbar
                border-t border-label/15 bg-background/95 px-4 pt-4 pb-8 shadow-xl shadow-black/50 backdrop-blur-md'
            >
              <ul className='flex flex-col'>
                {NAV_ITEMS.map(({ key, to }) => (
                  <li key={key} className='border-b border-label/10'>
                    <NavLink
                      to={to}
                      end={to === ROUTES.home}
                      onClick={() => setMenuOpen(false)}
                      className={(state) => `${navLinkClass(state)} block py-3.5 text-lg sm:text-xl tracking-wide`}
                    >
                      {t.nav.items[key]}
                    </NavLink>
                  </li>
                ))}
              </ul>

              <p className='mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-label/60'>
                {t.nav.downloadHeading}
              </p>

              <ul className='mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3'>
                {PLATFORMS.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target='_blank'
                      rel='noreferrer noopener'
                      className='flex items-center gap-2 rounded-md bg-button-fill px-3 py-2.5 text-xs font-bold uppercase
                        tracking-wide text-background/80 transition-colors duration-200 ease-out
                        hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary
                        motion-reduce:transition-none'
                    >
                      <Icon className='size-6 shrink-0' />
                      <span className='truncate'>{label}</span>
                    </a>
                  </li>
                ))}
              </ul>

              <LanguageSwitcher placement='top' className='mt-6' />
            </div>
        </nav>
  
    </>
  )
}

export default Nav
