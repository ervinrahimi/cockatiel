import styles from './AllLetters.module.css'
import Link from 'next/link'

export default async function AllLetters({ data, userProgress }) {
  // Sort data by 'order' field
  data.sort((a, b) => a.order - b.order);

  // Map user progress for quick access
  const progressMap = new Map(userProgress.map(p => [p.letterId, p]));

  // Variable to track if the previous letter is completed
  let previousIsCompleted = true;

  return (
    <div className={styles.letterBox}>
      {data.map((letter) => {
        // Determine if the current letter is unlocked
        const isUnlocked = previousIsCompleted;

        // Update 'previousIsCompleted' for the next letter in the loop
        previousIsCompleted = progressMap.get(letter.id)?.isCompleted || false;

        return isUnlocked ? (
          <Link key={letter.id} href={`/letter/${letter.id}`} className={styles.letterLink}>
            <h1 className={styles.unlockedLetter}>{letter.name}</h1>
          </Link>
        ) : (
          <div key={letter.id} className={styles.letterLink}>
            <h2 className={styles.lockedLetter}>{letter.name}</h2>
          </div>
        );
      })}
    </div>
  );
}
