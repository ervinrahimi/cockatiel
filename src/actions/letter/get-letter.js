'use server'

import prisma from '@/db/client'

// Get All Record From Database From Letter Data Collation
export const getAllLetter = async () => {
  const letter = await prisma.letter.findMany()

  if (!letter) return { error: 'هیچ حروفی وجود برای نمایش وجود نداره!' }

  return letter
}

// Get Unique Letter From Database Along with User Progress
export const getSingleLetter = async (id, userId) => {
  const letter = await prisma.letter.findUnique({
    where: {
      id: id,
    },
    include: {
      progress: {
        where: {
          userId: userId,
        },
      },
    },
  })

  if (!letter || !letter.progress.length > 0) return { error: 'هیچ حرفی با این مشخصات وجود ندارد!' }

  return letter
}

export const getSingleLetterForStage = async (id, stage) => {
  let includeFields = {}

  // بررسی stage و اضافه کردن فیلد مناسب به includeFields
  if (stage === 'SYLLABLES') includeFields.syllables = true
  else if (stage === 'WORDS') includeFields.words = true
  else if (stage === 'SENTENCES') includeFields.sentences = true
  else if (stage === 'BIG_STORY') includeFields.bigStory = true
  else if (stage === 'SHORT_STORIES') includeFields.shortStories = true
  else if (stage === 'EXERCISES') includeFields.exercises = true

  const letter = await prisma.letter.findUnique({
    where: {
      id: id,
    },
    include: includeFields, // شامل کردن فیلدهای لازم براساس stage
  })

  if (!letter) return { error: 'هیچ حرفی با این مشخصات وجود ندارد!' }

  return letter
}
