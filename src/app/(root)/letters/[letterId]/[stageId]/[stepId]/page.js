import TypeOneExercise from '@/components/letter/stage/exercises-stage/type-one-exercise/TypeOneExercise'
import TypeTwoExercise from '@/components/letter/stage/exercises-stage/type-two-exercise/TypeTwoExercise'
import { getSingleExercise } from '@/actions/exercises/get-exercise'
import { ROUTES } from '@/constants/routes'
import { redirect } from 'next/navigation'
import { auth } from '@/security/auth'

export default async function LetterStagePage({ params }) {
  const { letterId, stageId, stepId } = params
  const session = await auth()

  if (!session) return redirect(ROUTES.AUTH.LOGIN)

  // دریافت تمرین
  if (stageId === 'EXERCISES') {
    const exercise = await getSingleExercise(stepId, letterId)

    if (exercise.error) return <div>{exercise.error}</div>

    // نمایش نوع تمرین بر اساس نوع آن
    if (exercise.type === 'TYPE_ONE') {
      return <TypeOneExercise exercise={exercise} userId={session.user.id} letterId={letterId} />
    }

    if (exercise.type === 'TYPE_TWO') {
      return <TypeTwoExercise exercise={exercise} userId={session.user.id} letterId={letterId} />
    }
  }

  return <div>این مرحله هنوز پیاده‌سازی نشده است.</div>
}
