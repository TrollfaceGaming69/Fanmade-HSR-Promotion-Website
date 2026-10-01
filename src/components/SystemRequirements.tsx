import { useStrings } from '../i18n/strings'

type SpecRow = {
  label: string
  minimum: string[]
  recommended: string[]
}

const CellLines = ({
  lines,
  highlighted,
}: {
  lines: string[]
  highlighted?: boolean
}) => (
  <div
    className={`flex flex-col gap-1 text-center text-sm sm:text-base ${
      highlighted ? 'text-primary' : 'text-text'
    }`}
  >
    {lines.map((line) => (
      <span key={line}>{line}</span>
    ))}
  </div>
)

const SpecTable = ({
  title,
  caption,
  rows,
}: {
  title: string
  caption: string
  rows: SpecRow[]
}) => {
  const t = useStrings()

  return (
    <div className='w-full'>
      <h2 className='mb-6 text-center text-xl font-semibold uppercase tracking-[0.15em] text-label sm:mb-8 sm:text-3xl sm:tracking-[0.25em] lg:text-4xl'>
        {title}
      </h2>

      <div className='overflow-x-auto no-scrollbar'>
        <table className='w-full min-w-180 table-fixed border-collapse border border-label/20 bg-container-fill'>
          <caption className='sr-only'>{caption}</caption>

          <colgroup>
            <col className='w-[18%]' />
            <col className='w-[41%]' />
            <col className='w-[41%]' />
          </colgroup>

          <thead>
            <tr>
              <th
                scope='col'
                className='border border-label/20 bg-background px-3 py-3 text-sm font-bold uppercase tracking-[0.2em] text-label'
              >
                {t.systemRequirements.spec}
              </th>
              <th
                scope='col'
                className='border border-label/20 bg-label/10 px-3 py-3 text-sm font-bold uppercase tracking-[0.3em] text-text'
              >
                {t.systemRequirements.minimum}
              </th>
              <th
                scope='col'
                className='border border-primary/60 bg-primary/70 px-3 py-3 text-sm font-bold uppercase tracking-[0.3em] text-background'
              >
                {t.systemRequirements.recommended}
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map(({ label, minimum, recommended }) => (
              <tr key={label}>
                <th
                  scope='row'
                  className='border border-label/20 bg-background px-3 py-5 text-sm font-bold uppercase tracking-[0.2em] text-label'
                >
                  {label}
                </th>
                <td className='border border-label/20 px-4 py-5 align-middle'>
                  <CellLines lines={minimum} />
                </td>
                <td className='border border-primary/50 bg-primary/5 px-4 py-5 align-middle'>
                  <CellLines lines={recommended} highlighted />
                </td>
              </tr>
            ))}

            <tr>
              <td className='border-none' />
              <td className='border-none' />
              <td className='bg-primary px-4 py-2 text-center text-xs font-semibold uppercase tracking-[0.25em] text-background'>
                {t.systemRequirements.bestExperience}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className='mt-4 text-center text-sm text-text/60 md:hidden'>
        {t.systemRequirements.swipeHint}
      </p>
    </div>
  )
}

const SystemRequirements = () => {
  const t = useStrings()

  return (
    <section className='flex w-full max-w-5xl flex-col gap-14 sm:gap-20'>
      <SpecTable
        title={t.systemRequirements.pcTitle}
        caption={t.systemRequirements.pcCaption}
        rows={t.systemRequirements.pcRows}
      />

      <SpecTable
        title={t.systemRequirements.mobileTitle}
        caption={t.systemRequirements.mobileCaption}
        rows={t.systemRequirements.mobileRows}
      />
    </section>
  )
}

export default SystemRequirements
