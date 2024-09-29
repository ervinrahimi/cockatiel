import LetterDetailItems from '@/components/letter/letter-detail-items/LetterDetailItems'
import styles from './page.module.css'
import { getSingleLetter } from '@/actions/letter/get-letter'
import { auth } from '@/security/auth'
import { redirect } from 'next/navigation'
import { ROUTES } from '@/constants/routes'

export default async function LetterDetail({ params }) {
  const { letterId } = params
  const session = await auth()

  if (!session) return redirect(ROUTES.AUTH.LOGIN)

  const letter = await getSingleLetter(letterId, session.user.id)

  if (letter.error) return <div>{letter.error}</div>

  return <LetterDetailItems data={letter} progress={letter.progress[0].stage} />
}
