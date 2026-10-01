import { Link } from 'react-router-dom'
import { useStrings } from '../i18n/strings'
import { ROUTES } from '../routes'

const NotFound = () => {
  const t = useStrings()

  return (
    <div className='flex min-h-[70vh] flex-col items-center justify-center gap-5 px-4 py-16 text-center sm:gap-6'>
      <p className='text-base font-semibold uppercase tracking-[0.22em] text-primary sm:text-xl'>
        {t.notFound.code}
      </p>

      <h1 className='text-3xl font-bold uppercase text-label sm:text-4xl lg:text-5xl'>
        {t.notFound.heading}
      </h1>

      <p className='max-w-xl text-base text-text sm:text-lg'>{t.notFound.body}</p>

      <Link
        to={ROUTES.home}
        className='rounded-lg bg-button-fill px-8 py-4 text-sm font-semibold uppercase text-black sm:px-10
          transition-opacity duration-200 ease-out hover:opacity-90
          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none'
      >
        {t.common.backToHome}
      </Link>
    </div>
  )
}

export default NotFound
