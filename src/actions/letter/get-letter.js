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

  if (!letter) return { error: 'هیچ حرفی با این مشخصات وجود ندارد!' }

  return letter
}