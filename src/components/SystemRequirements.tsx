type SpecRow = {
  label: string
  minimum: string[]
  recommended: string[]
}

const PC_SPEC_ROWS: SpecRow[] = [
  {
    label: 'OS',
    minimum: ['Windows 10 64-bit'],
    recommended: ['Windows 10 64-bit', 'Windows 11 64-bit'],
  },
  {
    label: 'CPU',
    minimum: ['Intel Core i5'],
    recommended: ['Intel Core i7', 'or equivalent AMD Ryzen'],
  },
  {
    label: 'GPU',
    minimum: ['Nvidia GeForce GTX 1050', 'or better'],
    recommended: ['Nvidia GeForce GTX 1060', 'or higher'],
  },
  {
    label: 'RAM',
    minimum: ['8 GB RAM'],
    recommended: ['16 GB RAM'],
  },
  {
    label: 'Storage',
    minimum: [
      'Around 100 GB to 110 GB of free space',
      '(newer major updates may require more storage)',
    ],
    recommended: [
      'SSD with sufficient free space',
      'for optimal loading speeds',
    ],
  },
]

const MOBILE_SPEC_ROWS: SpecRow[] = [
  {
    label: 'OS',
    minimum: ['Android 9.0 or higher'],
    recommended: ['Android 9.0 or higher'],
  },
  {
    label: 'SoC',
    minimum: ['Snapdragon 835, Dimensity 720,', 'Kirin 810, or better'],
    recommended: ['Snapdragon 870, Dimensity 1300,', 'Kirin 9000, or better'],
  },
  {
    label: 'RAM',
    minimum: ['4 GB or more'],
    recommended: ['6 GB or more'],
  },
  {
    label: 'Storage',
    minimum: [
      '8 GB to 10 GB initial space',
      '(up to 27 GB with all language packs and updates)',
    ],
    recommended: [
      '8 GB to 10 GB initial space',
      '(up to 27 GB with all language packs and updates)',
    ],
  },
]

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
}) => (
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
              Spec
            </th>
            <th
              scope='col'
              className='border border-label/20 bg-label/10 px-3 py-3 text-sm font-bold uppercase tracking-[0.3em] text-text'
            >
              Minimum
            </th>
            <th
              scope='col'
              className='border border-primary/60 bg-primary/70 px-3 py-3 text-sm font-bold uppercase tracking-[0.3em] text-background'
            >
              Recommended
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
              Best Experience
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p className='mt-4 text-center text-sm text-text/60 md:hidden'>
      Swipe the table sideways to see every column.
    </p>
  </div>
)

const SystemRequirements = () => {
  return (
    <section className='flex w-full max-w-5xl flex-col gap-14 sm:gap-20'>
      <SpecTable
        title='PC System Requirements'
        caption='Minimum and recommended PC requirements for Honkai: Star Rail'
        rows={PC_SPEC_ROWS}
      />

      <SpecTable
        title='Mobile System Requirements'
        caption='Minimum and recommended mobile requirements for Honkai: Star Rail'
        rows={MOBILE_SPEC_ROWS}
      />
    </section>
  )
}

export default SystemRequirements
