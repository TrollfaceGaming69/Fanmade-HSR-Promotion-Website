import { useCallback, useState } from 'react'
import CharacterRail from './CharacterRail'
import CharacterShowcase from './CharacterShowcase'
import PathSelector from './PathSelector'
import { DEFAULT_PATH_INDEX, pathGroups } from './characterRoster'
import { localizeCharacter } from '../../i18n/characterLore'
import { useLanguage } from '../../i18n/languageContext'
import { useStrings } from '../../i18n/strings'

const PANEL_ID = 'character-showcase'
const TAB_ID_PREFIX = 'character-path-tab'

const CharacterExplorer = () => {
  const t = useStrings()
  const { language } = useLanguage()
  const [pathIndex, setPathIndex] = useState(DEFAULT_PATH_INDEX)
  const [memberIndex, setMemberIndex] = useState(0)

  const group = pathGroups[pathIndex]
  const activeMemberIndex = Math.min(memberIndex, group.members.length - 1)
  // Path and element names stay English; only story and quote are translated.
  const character = localizeCharacter(group.members[activeMemberIndex], language)

  const selectPath = useCallback((index: number) => {
    setPathIndex(index)
    setMemberIndex(0)
  }, [])

  return (
    <section
      aria-label={t.characterPage.rosterLabel}
      className="flex w-full flex-col lg:min-h-0 lg:flex-1"
    >
      <div className="shrink-0">
        <PathSelector
          groups={pathGroups}
          activeIndex={pathIndex}
          onSelect={selectPath}
          panelId={PANEL_ID}
          tabIdPrefix={TAB_ID_PREFIX}
        />
      </div>

      <div className="mt-10 flex lg:mt-4 lg:min-h-0 lg:flex-1">
        <CharacterShowcase
          character={character}
          group={group}
          panelId={PANEL_ID}
          labelledBy={`${TAB_ID_PREFIX}-${group.name.toLowerCase()}`}
        />
      </div>

      <div className="mt-10 shrink-0 lg:mt-3">
        <CharacterRail
          members={group.members}
          activeIndex={activeMemberIndex}
          onSelect={setMemberIndex}
          panelId={PANEL_ID}
          pathName={group.name}
        />
      </div>
    </section>
  )
}

export default CharacterExplorer
