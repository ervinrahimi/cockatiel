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

export const checkAndUpdateExerciseCompletion = async ({ userId, letterId }) => {
    // واکشی تمامی تمرین‌ها و سوالات مربوط به این حرف
    const exercises = await prisma.exercise.findMany({
      where: {
        letterId: letterId,
      },
      include: {
        questions: true,
      },
    })

    if (!exercises || exercises.length === 0) return { error: 'تمرینات مربوط به این حرف یافت نشد.' }

    
    // واکشی تمامی پاسخ‌های کاربر برای سوالات مربوط به این حرف
    const userAnswers = await prisma.userAnswer.findMany({
      where: {
        userId,
        questionId: {
          in: exercises.flatMap(exercise => exercise.questions.map(q => q.id)),
        },
      },
    })
    
    // بررسی اینکه آیا کاربر به همه سوالات تمامی تمرین‌ها پاسخ صحیح داده است
    const allCorrect = exercises.every(exercise => 
      exercise.questions.every(question => {
        const answer = userAnswers.find(ans => ans.questionId === question.id)
        return answer && answer.isCorrect
      })
    )

    
    // اگر تمامی پاسخ‌ها صحیح بودند، تکمیل بودن تمامی تمرینات را ثبت می‌کنیم
    if (allCorrect) {
      await prisma.userLetterProgress.updateMany({
        where: {
          userId,
          letterId,
          stage: 'EXERCISES',  // تمرین برای این حرف
        },
        data: {
          isCompleted: true,
          completedAt: new Date(),
        },
      })

      return { success: true, message: 'تمام تمرینات با موفقیت تکمیل شدند.' }
    } else {
      return { success: false, message: 'کاربر به همه سوالات درست پاسخ نداده است.' }
    }
}
