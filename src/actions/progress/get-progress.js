'use server'

import prisma from '@/db/client'

export const getUserProgress = async (userId) => {
  const progress = await prisma.userLetterProgress.findMany({
    where: {
      userId: userId,
    },
  })

  return progress
}
