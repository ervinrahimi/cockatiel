'use client'
import { updateUserProgress } from '@/actions/progress/update-progress'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import styles from './BigstoryStage.module.css'

export default function BigstoryStage({ letter, userId, stageId }) {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)

  // بررسی داده‌های letter
  useEffect(() => {
    console.log('Letter Data: ', letter)
  }, [letter])

  const bigStory = letter.bigStory || {}
  const slides = bigStory.slides || [] // استخراج اسلایدها از bigStory
  const totalQuestions = slides.length

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
      <h1 className={styles.title}>داستان های بزرگ کلمه {letter.name}</h1>
      {slides.length > 0 ? (
        <div>
          <p className={styles.slideText}>{slides[currentQuestion].text}</p> {/* نمایش متن هر اسلاید */}
          <div className={styles.buttonContainer}>
            <button className={styles.button} onClick={handlePrevious} disabled={currentQuestion === 0}>
              قبلی
            </button>
            <button className={styles.button} onClick={handleNext}>
              {currentQuestion < totalQuestions - 1 ? 'بعدی' : 'اتمام'}
            </button>
          </div>
        </div>
      ) : (
        <p>هیچ داده‌ای برای این مرحله وجود ندارد</p>
      )}
    </div>
  )
}
