'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function ExercisesStage({ letter, userId, stageId }) {
  const router = useRouter()
  const exercises = letter.exercises || []

  // اگر هیچ تمرینی وجود نداشت
  if (exercises.length === 0) {
    return <div>هیچ تمرینی برای این حرف وجود ندارد.</div>
  }

  // عملکرد برای هدایت به صفحه‌ی تمرین خاص
  const handleExerciseClick = (exerciseId) => {
    // اینجا stageId و letterId و exerciseId (stepsId) را برای مسیر استفاده می‌کنیم
    router.push(`/letters/${letter.id}/${stageId}/${exerciseId}`)
  }

  return (
    <div>
      <h2>لیست تمرین‌ها برای حرف {letter.name}</h2>
      <ul>
        {exercises.map((exercise, index) => (
          <li key={exercise.id}>
            <button onClick={() => handleExerciseClick(exercise.id)}>
              تمرین {index + 1} - نوع: {exercise.type}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
