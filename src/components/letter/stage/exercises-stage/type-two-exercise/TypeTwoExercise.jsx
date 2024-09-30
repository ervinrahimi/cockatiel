'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { saveUserAnswer } from '@/actions/answer/save-answer'
import { checkAndUpdateExerciseCompletion } from '@/actions/progress/update-progress'

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
    <div>
      <h2>تمرین چیستان - سوال {currentQuestion + 1} از {totalQuestions}</h2>
      {/* نمایش چیستان و تصویر */}
      <p>{currentQ.questionText}</p>
      {/* {currentQ.image && <img src={currentQ.image} alt={`سوال ${currentQuestion + 1}`} style={{ width: '300px', height: '200px' }} />} */}

      {/* ورودی برای پاسخ کاربر */}
      <input
        type="text"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        placeholder="جواب چیستان را وارد کنید"
      />
      <button onClick={handleAnswer}> ارسال پاسخ </button>

      {/* نمایش وضعیت پاسخ */}
      {isCorrect === true && <p style={{ color: 'green' }}>پاسخ صحیح است!</p>}
      {isCorrect === false && <p style={{ color: 'red' }}>پاسخ اشتباه است!</p>}

      {/* دکمه رفتن به سوال بعدی در صورت پاسخ صحیح */}
      {isCorrect === true && (
        <button onClick={handleNextQuestion}>
          {currentQuestion < totalQuestions - 1 ? 'سوال بعدی' : 'اتمام تمرین'}
        </button>
      )}
    </div>
  )
}
