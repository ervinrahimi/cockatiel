'use client'
import { updateUserProgress } from '@/actions/progress/update-progress'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function ShortstoryStage({ letter, userId, stageId }) {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const shortStories = letter.shortStories || []
  const totalQuestions = shortStories.length

  const stageOrder = ['SYLLABLES', 'WORDS', 'SENTENCES', 'BIG_STORY', 'SHORT_STORIES', 'EXERCISES']

  const handleNext = async () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      const currentIndex = stageOrder.findIndex((stage) => stage === stageId)
      console.log(stageOrder[currentIndex + 1])
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
    <div>
      <h1>داستان های کوتاه با کلمه {letter.name}</h1>
      {shortStories.length > 0 ? (
        <div>
          {/* <Image
            src={words[currentQuestion].image}
            alt={`Syllable ${currentQuestion + 1}`}
            width={100}
            height={100}
            quality={100}
          /> */}
          <p>{shortStories[currentQuestion].text}</p>
          <div>
            <button onClick={handlePrevious} disabled={currentQuestion === 0}>
              قبلی
            </button>
            <button onClick={handleNext}>
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
