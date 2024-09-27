import LetterDetailItems from '@/components/letter/letter-detail-items/LetterDetailItems'
import styles from './page.module.css'
import { getSingleLetter } from '@/actions/letter/get-letter'
import { auth } from '@/security/auth'

export default async function LetterDetail({ params }) {
  const { id } = params
  const session = await auth()

  if (!session) return <div>Authentication Required</div>

  const letter = await getSingleLetter(id, session.user.id)

  if (!letter || !letter.progress.length > 0) return <div>Letter Not Found</div>

  return <LetterDetailItems data={letter} progress={letter.progress[0].stage} />
}
