'use server'

import prisma from '@/db/client'

export const updateUserProgress = async (userId, letterId, newStage) => {
  const currentProgress = await prisma.userLetterProgress.findFirst({
    where: {
      userId: userId,
      letterId: letterId,
    },
  })

  const currentStageIndex = getStageIndex(currentProgress.stage)
  const newStageIndex = getStageIndex(newStage)

  if (newStageIndex > currentStageIndex) {
    await prisma.userLetterProgress.update({
      where: { id: currentProgress.id },
      data: { stage: newStage },
    })
  }
}

const getStageIndex = (stageEnum) => {
  const stageOrder = ['SYLLABLES', 'WORDS', 'SENTENCES', 'BIG_STORY', 'SHORT_STORIES', 'EXERCISES']
  return stageOrder.indexOf(stageEnum)
}
