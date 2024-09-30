'use server'

import prisma from '@/db/client'

export const getSingleExercise = async (id, stepId) => {
  const letter = await prisma.exercise.findUnique({
    where: {
      id: id,
      letterId: stepId
    },
    include: {
      questions: {
        include: {
          options: true,
        }
      }
    }, 
  })

  if (!letter) return { error: 'هیچ تمرینی پیدا نشد!' }

  return letter
}
