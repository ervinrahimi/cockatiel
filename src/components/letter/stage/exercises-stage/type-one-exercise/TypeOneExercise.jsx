// src/components/TypeOneExercise.js
'use client'

import { checkAndUpdateExerciseCompletion } from '@/actions/progress/update-progress'
import { saveUserAnswer } from '@/actions/answer/save-answer'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import styles from './TypeOneExercise.module.css'

export default function TypeOneExercise({ exercise, userId, letterId }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [isCorrect, setIsCorrect] = useState(null) // حالت برای ذخیره درست یا غلط بودن جواب
  const router = useRouter()
  const totalQuestions = exercise.questions.length

  const handleAnswer = async (optionId, optionText) => {
    const question = exercise.questions[currentQuestion]
    const correct = optionText === question.correctAnswer

    // ذخیره پاسخ کاربر در دیتابیس
    await saveUserAnswer({
      userId,
      questionId: question.id,
      selectedOptionId: optionId,
      isCorrect: correct,
    })

    // اگر درست بود
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
      // فراخوانی تابع برای چک کردن کامل شدن تمرین
      const result = await checkAndUpdateExerciseCompletion({ userId, letterId })

      if (result.success) {
        
      } else {
        
      }

      router.push(`/letters/${letterId}/EXERCISES`)
    }
  }

  const currentQ = exercise.questions[currentQuestion]

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        تمرین {exercise.type} - سوال {currentQuestion + 1} از {totalQuestions}
      </h2>
      {/* نمایش سوال و عکس */}
      <p className={styles.questionText}>{currentQ.questionText}</p>

      {/* نمایش گزینه‌ها */}
      <ul className={styles.optionList}>
        {currentQ.options.map(option => (
          <li key={option.id} className={styles.optionItem}>
            <button 
              className={styles.optionButton}
              onClick={() => handleAnswer(option.id, option.text)}
            >
              {option.text}
            </button>
          </li>
        ))}
      </ul>

      {/* نمایش وضعیت درست یا غلط بودن */}
      {isCorrect === true && (
        <p className={`${styles.statusMessage} ${styles.successMessage}`}>
          پاسخ صحیح است!
        </p>
      )}
      {isCorrect === false && (
        <p className={`${styles.statusMessage} ${styles.errorMessage}`}>
          پاسخ اشتباه است!
        </p>
      )}

      {/* دکمه برای رفتن به سوال بعدی یا اتمام تمرین */}
      {isCorrect === true && (
        <button className={styles.nextButton} onClick={handleNextQuestion}>
          {currentQuestion < totalQuestions - 1 ? 'سوال بعدی' : 'اتمام تمرین'}
        </button>
      )}
    </div>
  )
}
