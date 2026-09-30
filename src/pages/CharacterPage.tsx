import CharacterExplorer from '../components/characterPage/CharacterExplorer'

const CharacterPage = () => {
  return (
    <div
      className="relative w-full overflow-hidden px-4 pt-10 pb-16 sm:px-12
        lg:flex lg:flex-col lg:px-24 lg:pt-6 lg:pb-5 xl:px-40
        [@media(min-height:1200px)]:lg:h-[calc(100svh-6.25rem)]"
    >
      <div className="flex shrink-0 justify-center text-center">
        <div className="border-b-2 border-label px-6 pb-4 sm:border-b-4 sm:px-8 lg:pb-2">
          <h1 className="text-3xl font-bold text-label uppercase sm:text-4xl lg:text-5xl">characters</h1>
        </div>
      </div>

      <div className="mt-12 lg:mt-5 lg:flex lg:min-h-0 lg:flex-1 lg:flex-col">
        <CharacterExplorer />
      </div>
    </div>
  )
}

export default CharacterPage
