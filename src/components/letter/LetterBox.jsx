import { getAllLetter } from "@/actions/letter/getLetter";
import Link from "next/link";
import style from "./letterBox.module.css";

export default async function page() {
  const letters = await getAllLetter();

  if (letters.error) {
    return <div>{letters.error}</div>;
  }

  return (
    <div className={style.letterBox}>
      {letters.map((letter, key) =>
        letter.isUnlocked ? (
          <Link
            key={key}
            href={`/letter/${letter.id}`}
            className={style.letterLink}
          >
            <h1 className={style.unlockedLetter}>{letter.name}</h1>
          </Link>
        ) : (
          <>
            <div className={style.letterLink}>
              <h2 key={key} className={style.lockedLetter}>
                {letter.name}
              </h2>
            </div>
          </>
        )
      )}
    </div>
  );
}
