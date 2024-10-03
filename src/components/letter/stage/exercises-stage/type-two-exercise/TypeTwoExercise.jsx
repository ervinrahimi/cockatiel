// src/components/TypeTwoExercise.js
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { saveUserAnswer } from '@/actions/answer/save-answer'
import { checkAndUpdateExerciseCompletion } from '@/actions/progress/update-progress'
import styles from './TypeTwoExercise.module.css'

export default function TypeTwoExercise({ exercise, userId, letterId }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswer, setUserAnswer] = useState('') // برای ذخیره پاسخ کاربر
  const [isCorrect, setIsCorrect] = useState(null) // وضعیت درست یا غلط بودن پاسخ
  const router = useRouter()
  const totalQuestions = exercise.questions.length

  const handleAnswer = async () => {
    const question = exercise.questions[currentQuestion]
    const correct = userAnswer.trim().toLowerCase() === question.correctAnswer.trim().toLowerCase()

    // ذخیره پاسخ کاربر در دیتابیس
    await saveUserAnswer({
      userId,
      questionId: question.id,
      selectedOptionId: null, // چون در اینجا گزینه‌ای نداریم
      isCorrect: correct,
    })

    // بررسی درست بودن پاسخ
    if (correct) {
      setIsCorrect(true)
    } else {
      setIsCorrect(false)
    }
  }

  const handleNextQuestion = async () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setIsCorrect(null) // بازنشانی وضعیت برای سوال بعدی
    } else {
      // تمام سوالات پاسخ داده شده است
      const result = await checkAndUpdateExerciseCompletion({ userId, letterId })

      if (result.success) {
        // تمرین با موفقیت کامل شد
      } else {
        // خطا در بروزرسانی
      }

      router.push(`/letters/${letterId}/EXERCISES`)
    }
  }

  const currentQ = exercise.questions[currentQuestion]

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        تمرین چیستان - سوال {currentQuestion + 1} از {totalQuestions}
      </h2>
      <p className={styles.question}>{currentQ.questionText}</p>

      {/* ورودی برای پاسخ کاربر */}
      <input
        className={styles.input}
        type="text"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        placeholder="جواب چیستان را وارد کنید"
      />
      <button className={styles.button} onClick={handleAnswer}>
        ارسال پاسخ
      </button>

      {/* نمایش وضعیت پاسخ */}
      {isCorrect === true && <p className={styles.correctMessage}>پاسخ صحیح است!</p>}
      {isCorrect === false && <p className={styles.incorrectMessage}>پاسخ اشتباه است!</p>}

      {/* دکمه رفتن به سوال بعدی در صورت پاسخ صحیح */}
      {isCorrect === true && (
        <button className={styles.button} onClick={handleNextQuestion}>
          {currentQuestion < totalQuestions - 1 ? 'سوال بعدی' : 'اتمام تمرین'}
        </button>
      )}
    </div>
  )
}
