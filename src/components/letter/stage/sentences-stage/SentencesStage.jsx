'use client'
import { updateUserProgress } from '@/actions/progress/update-progress'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import styles from './SentencesStage.module.css'

export default function SentencesStage({ letter, userId, stageId }) {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const sentences = letter.sentences || []
  const totalQuestions = sentences.length

  const stageOrder = ['SYLLABLES', 'WORDS', 'SENTENCES', 'BIG_STORY', 'SHORT_STORIES', 'EXERCISES']

  const handleNext = async () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      const currentIndex = stageOrder.findIndex((stage) => stage === stageId)
      // آپدیت کردن پروگرس کاربر و بازگشت به صفحه اصلی
      await updateUserProgress(userId, letter.id, stageOrder[currentIndex + 1])
      router.push(`/letters/${letter.id}`)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>جملات با کلمه {letter.name}</h1>
      {sentences.length > 0 ? (
        <div>
          <p className={styles.sentence}>{sentences[currentQuestion].text}</p>
          <div className={styles.buttons}>
            <button className={styles.button} onClick={handlePrevious} disabled={currentQuestion === 0}>
              قبلی
            </button>
            <button className={styles.button} onClick={handleNext}>
              {currentQuestion < totalQuestions - 1 ? 'بعدی' : 'اتمام'}
            </button>
          </div>
        </div>
      ) : (
        <p className={styles.noData}>هیچ داده‌ای برای این مرحله وجود ندارد</p>
      )}
    </div>
  )
}
