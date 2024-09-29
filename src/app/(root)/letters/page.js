import AllLetters from '@/components/letter/all-letters/allLetters'
import styles from './page.module.css'
import { getUserProgress } from '@/actions/progress/get-progress'
import { getAllLetter } from '@/actions/letter/get-letter'
import { auth } from '@/security/auth'

export default async function Letter() {
  const letters = await getAllLetter()

  if (letters.error) return <div>{letters.error}</div>

  const session = await auth()
  
  const userProgress = await getUserProgress(session.user.id)

  return (
    <div className={styles.page}>
      <AllLetters data={letters} userProgress={userProgress}/>
    </div>
  )
}