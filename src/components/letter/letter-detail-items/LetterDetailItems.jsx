import Link from 'next/link'
import React from 'react'

export default async function LetterDetailItems({ data, progress }) {
  // Stages in order
  const stages = [
    { id: 'syllables', title: 'هجا (همخوان)', stageEnum: 'SYLLABLES' },
    { id: 'words', title: 'کلمات', stageEnum: 'WORDS' },
    { id: 'sentences', title: 'جملات', stageEnum: 'SENTENCES' },
    { id: 'bigStory', title: 'داستان بزرگ', stageEnum: 'BIG_STORY' },
    { id: 'shortStories', title: 'داستان‌های کوتاه', stageEnum: 'SHORT_STORIES' },
    { id: 'exercises', title: 'تمرینات', stageEnum: 'EXERCISES' },
  ]

  // Function that determines which stages are unlocked
  const determineUnlockedStages = (currentStage) => {
    const currentIndex = stages.findIndex((stage) => stage.stageEnum === currentStage)

    // If the stage is invalid (not found)
    if (currentIndex === -1) return []

    // All stages before the current stage are unlocked
    return stages.map((stage, index) => ({
      ...stage,
      isUnlocked: index <= currentIndex, // Only stages before and including the current stage are unlocked
    }))
  }

  // Determine unlocked stages
  const unlockedStages = determineUnlockedStages(progress)

  return (
    <div>
      <h1>آموزش و تمرینات حرف {data.name}</h1>
      <ul>
        {unlockedStages.map((stage) => (
          <li key={stage.id}>
            {stage.isUnlocked ? <Link href={`/${stage.id}`}><span>{stage.title}</span></Link> : <span>{stage.title} 🔒</span>}
          </li>
        ))}
      </ul>
    </div>
  )
}
