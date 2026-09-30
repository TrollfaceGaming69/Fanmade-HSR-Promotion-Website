import SystemRequirements from '../components/SystemRequirements'

const FAQ_ITEMS = [
  {
    question: 'Is Honkai: Star Rail free to play?',
    answer:
      'Yes. The game is free to download and play on all supported platforms, with optional in-game purchases.',
  },
  {
    question: 'Which platforms are supported?',
    answer:
      'Windows, macOS, iOS, Android and PlayStation 5. Progress is shared across platforms through your account.',
  },
  {
    question: 'Do I need to play Honkai Impact 3rd first?',
    answer:
      'No. Star Rail tells a self-contained story, though returning players will recognise a few familiar faces.',
  },
  {
    question: 'Can I transfer my progress between devices?',
    answer:
      'Sign in with the same account and your progress follows you. PlayStation accounts can be linked in the settings menu.',
  },
]

const Faq = () => {
  return (
    <div className='flex flex-col items-center gap-6 py-14 sm:py-20 px-4 sm:px-12 lg:px-24 xl:px-40 w-full overflow-hidden'>
      <div className='px-6 sm:px-10 pb-4 sm:pb-5 border-b-2 sm:border-b-4 border-label mb-5'>
        <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-label'>FAQ</h1>
      </div>

      <dl className='mt-5 flex w-full max-w-4xl flex-col gap-4 sm:gap-6'>
        {FAQ_ITEMS.map(({ question, answer }) => (
          <div
            key={question}
            className='rounded-xl border border-label/15 bg-container-fill p-5 sm:rounded-2xl sm:p-6'
          >
            <dt className='text-lg font-semibold text-label sm:text-xl lg:text-2xl'>{question}</dt>
            <dd className='mt-3 text-base leading-relaxed text-text sm:text-lg'>{answer}</dd>
          </div>
        ))}
      </dl>

      <div className='mt-14 flex w-full justify-center sm:mt-20'>
        <SystemRequirements />
      </div>
    </div>
  )
}

export default Faq
