import Link from 'next/link'
import React from 'react'

export default function LetterDetailItems({ data, progress }) {
  // Stages in order
  const stages = [
    { id: '0', title: 'هجا (همخوان)', stageEnum: 'SYLLABLES' },
    { id: '1', title: 'کلمات', stageEnum: 'WORDS' },
    { id: '2', title: 'جملات', stageEnum: 'SENTENCES' },
    { id: '3', title: 'داستان بزرگ', stageEnum: 'BIG_STORY' },
    { id: '4', title: 'داستان‌های کوتاه', stageEnum: 'SHORT_STORIES' },
    { id: '5', title: 'تمرینات', stageEnum: 'EXERCISES' },
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
            {stage.isUnlocked ? <Link href={`/letters/${data.id}/${stage.stageEnum}`}><span>{stage.title}</span></Link> : <span>{stage.title} 🔒</span>}
          </li>
        ))}
      </ul>
    </div>
  )
}
