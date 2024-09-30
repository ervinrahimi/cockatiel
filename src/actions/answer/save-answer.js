'use server'
import prisma from '@/db/client'

export const saveUserAnswer = async ({ userId, questionId, selectedOptionId, isCorrect }) => {
  try {
    // ابتدا بررسی می‌کنیم که آیا کاربر قبلاً به این سوال پاسخ داده است یا خیر
    const existingAnswer = await prisma.userAnswer.findFirst({
      where: {
        userId,
        questionId,
      },
    })

    // اگر پاسخ قبلاً داده شده و صحیح بوده، نیازی به تغییر نیست
    if (existingAnswer && existingAnswer.isCorrect) {
      return { success: true, message: 'کاربر قبلاً پاسخ صحیح داده است، نیازی به تغییر نیست.' }
    }

    // اگر پاسخ داده شده اما اشتباه بوده، پاسخ را آپدیت می‌کنیم
    if (existingAnswer && !existingAnswer.isCorrect) {
      await prisma.userAnswer.update({
        where: {
          id: existingAnswer.id,
        },
        data: {
          selectedOptionId,
          isCorrect,
        },
      })
      return { success: true, message: 'پاسخ کاربر اصلاح و به‌روز‌رسانی شد.' }
    }

    // اگر پاسخ جدید است، آن را ذخیره می‌کنیم
    if (!existingAnswer) {
      await prisma.userAnswer.create({
        data: {
          userId,
          questionId,
          selectedOptionId,
          isCorrect,
        },
      })
      return { success: true, message: 'پاسخ جدید ذخیره شد.' }
    }

  } catch (error) {
    console.error('Error saving answer:', error)
    return { error: 'خطا در ذخیره پاسخ.' }
  }
}
