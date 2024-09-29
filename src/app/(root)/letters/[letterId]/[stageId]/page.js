import SyllablesStage from '@/components/letter/stage/syllabes-stage/SyllablesStage'
import SentencesStage from '@/components/letter/stage/sentences-stage/SentencesStage'
import WordsStage from '@/components/letter/stage/words-stage/WordsStage'
import { getSingleLetterForStage } from '@/actions/letter/get-letter'
import { ROUTES } from '@/constants/routes'
import { redirect } from 'next/navigation'
import { auth } from '@/security/auth'
import BigstoryStage from '@/components/letter/stage/bigstory-stage/BigstoryStage'
import ShortstoryStage from '@/components/letter/stage/Shortstory-stage/ShortstoryStage'

export default async function LetterStagePage({ params }) {
  const { letterId, stageId } = params
  const session = await auth()

  if (!session) return redirect(ROUTES.AUTH.LOGIN)

  const letter = await getSingleLetterForStage(letterId, stageId)

  if (letter.error) return <div>{letter.error}</div>

  // نمایش کامپوننت مناسب بر اساس stageId
  if (stageId === 'SYLLABLES') {
    return <SyllablesStage letter={letter} userId={session.user.id} stageId={stageId} />
  }

  if (stageId === 'WORDS') {
    return <WordsStage letter={letter} userId={session.user.id} stageId={stageId} />
  }

  if (stageId === 'SENTENCES') {
    return <SentencesStage letter={letter} userId={session.user.id} stageId={stageId} />
  }

  if (stageId === 'BIG_STORY') {
    return <BigstoryStage letter={letter} userId={session.user.id} stageId={stageId} />
  }

  if (stageId === 'SHORT_STORIES') {
    return <ShortstoryStage letter={letter} userId={session.user.id} stageId={stageId} />
  }

  return <div>این مرحله هنوز پیاده‌سازی نشده است.</div>
}
