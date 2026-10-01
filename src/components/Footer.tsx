import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useStrings } from '../i18n/strings'
import { FOOTER_NAV_ITEMS } from '../routes'

const DOWNLOAD_LINKS = ['Windows', 'macOS', 'Linux', 'Steam', 'Epic Games'] as const
const SOCIAL_LINKS = ['Twitter / X', 'Discord', 'YouTube'] as const

const columnLinkClass = `text-base text-primary transition-colors duration-200 ease-out
  hover:text-label focus-visible:text-label focus-visible:outline-none motion-reduce:transition-none`

const columnHeadingClass = 'text-xl font-semibold uppercase tracking-[0.18em] text-label'

const Footer = () => {
  const t = useStrings()
  const legalLinks = [t.footer.legal.privacy, t.footer.legal.terms, t.footer.legal.cookie]

  return (
    <footer className='w-full flex flex-col mt-20'>
        <div className='bg-container-fill px-4 py-6 sm:px-12 sm:py-5 lg:px-24 xl:px-40'>
            <div className='flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6'>
                <h2 className='text-center text-lg font-bold uppercase tracking-wide text-text sm:text-xl md:text-2xl'>
                    <span className='text-primary'>{t.footer.newsletterHighlight}</span>{t.footer.newsletterTail}
                </h2>

                <button
                  type='button'
                  className='group flex w-full shrink-0 items-center justify-center overflow-hidden rounded-md bg-button-fill text-black sm:w-auto
                    transition-opacity duration-200 ease-out hover:opacity-90
                    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none'
                >
                    <span className='flex items-center self-stretch border-r border-black/15 px-3.5'>
                        <svg
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth={2}
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          className='size-5'
                          aria-hidden='true'
                        >
                            <rect x='2.5' y='4.5' width='19' height='15' rx='2' />
                            <path d='m2.5 7.5 9.5 6 9.5-6' />
                        </svg>
                    </span>

                    <span className='px-8 py-4 text-base font-semibold uppercase sm:px-12 sm:py-5 sm:text-xl'>
                        {t.footer.subscribe}
                    </span>
                </button>
            </div>
        </div>

        <div className='relative overflow-hidden bg-[#0a0a0a]'>
            <div aria-hidden='true' className='pointer-events-none absolute inset-y-0 right-0 w-full overflow-hidden sm:w-3/4 lg:w-[55%]'>

                <img
                  src={assets.footerbg}
                  alt=''
                  className='absolute top-0 right-0 h-full w-auto max-w-none'
                />
                <div className='absolute inset-0 bg-linear-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent' />
            </div>

            <div className='relative px-4 pt-14 pb-10 sm:px-12 sm:pt-20 sm:pb-14 lg:px-24 xl:px-40'>
                <div className='flex flex-row justify-between'>
                    <div className='grid w-full gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-[2fr_1fr_1fr] lg:gap-10'>
                        <div className='flex flex-col items-start sm:col-span-2 lg:col-span-1'>
                            <h3 className='text-xl font-bold uppercase tracking-[0.08em] text-label sm:text-2xl'>
                                Honkai: Star Rail
                            </h3>

                            <p className='mt-6 max-w-80 text-base leading-relaxed text-primary'>
                                {t.footer.brandBlurb}
                            </p>

                            <ul className='mt-8 flex flex-wrap items-center gap-3'>
                                {SOCIAL_LINKS.map(social => (
                                  <li key={social}>
                                    <a
                                      href='#'
                                      className='inline-flex rounded border border-primary/60 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-primary
                                        transition-colors duration-200 ease-out hover:border-primary hover:bg-primary/10
                                        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none'
                                    >
                                      {social}
                                    </a>
                                  </li>
                                ))}
                            </ul>
                        </div>

                        <nav aria-labelledby='footer-navigation-heading' className='flex flex-col'>
                            <h3 id='footer-navigation-heading' className={columnHeadingClass}>
                                {t.footer.navigationHeading}
                            </h3>

                            <ul className='mt-6 flex flex-col gap-2'>
                                {FOOTER_NAV_ITEMS.map(({ key, to }) => (
                                  <li key={key}>
                                    <Link to={to} className={columnLinkClass}>{t.footer.nav[key]}</Link>
                                  </li>
                                ))}
                            </ul>
                        </nav>

                        <nav aria-labelledby='footer-download-heading' className='flex flex-col'>
                            <h3 id='footer-download-heading' className={columnHeadingClass}>
                                {t.footer.downloadHeading}
                            </h3>

                            <ul className='mt-6 flex flex-col gap-2'>
                                {DOWNLOAD_LINKS.map(link => (
                                  <li key={link}>
                                    <a href='#' className={columnLinkClass}>{link}</a>
                                  </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className='mt-12 flex flex-col gap-4 border-t border-primary/20 pt-7 sm:mt-16 sm:flex-row sm:items-center sm:justify-between'>
                    <p className='text-sm text-label/45'>
                        {t.footer.copyright}
                    </p>

                    <ul className='flex flex-wrap items-center gap-x-5 gap-y-2 sm:gap-x-8'>
                        {legalLinks.map(link => (
                          <li key={link}>
                            <a
                              href='#'
                              className='text-sm text-label/45 transition-colors duration-200 ease-out
                                hover:text-primary focus-visible:text-primary focus-visible:outline-none motion-reduce:transition-none'
                            >
                              {link}
                            </a>
                          </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer
