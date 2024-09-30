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
  // ابتدا بررسی کنید آیا کاربر برای این حرف progress دارد یا خیر
  let letter = await prisma.letter.findUnique({
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

  // اگر letter وجود نداشت یا پیشرفتی برای کاربر ثبت نشده بود، رکورد پیشرفت جدیدی بسازید
  if (!letter) return { error: 'هیچ حرفی با این مشخصات وجود ندارد!' }

  if (letter.progress.length === 0) {
    // ایجاد یک رکورد جدید در جدول progress برای این کاربر و حرف
    await prisma.userLetterProgress.create({
      data: {
        userId: userId,
        letterId: id,
        stage: 'SYLLABLES', // کاربر از مرحله هجا شروع می‌کند
      },
    })

    // مجدداً درخواست را برای گرفتن پیشرفت به روز شده ارسال کنید
    letter = await prisma.letter.findUnique({
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
  }

  return letter
}

export const getSingleLetterForStage = async (id, stage) => {
  let includeFields = {}

  // بررسی stage و اضافه کردن فیلد مناسب به includeFields
  if (stage === 'SYLLABLES') includeFields.syllables = true
  else if (stage === 'WORDS') includeFields.words = true
  else if (stage === 'SENTENCES') includeFields.sentences = true
  else if (stage === 'BIG_STORY') {
    includeFields.bigStory = {
      include: {
        slides: true, // اضافه کردن ارتباط با slides
      },
    }
  } else if (stage === 'SHORT_STORIES') includeFields.shortStories = true
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
