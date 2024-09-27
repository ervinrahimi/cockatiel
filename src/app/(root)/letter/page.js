import { getAllLetter } from "@/actions/letter/getLetter";
import Link from "next/link";

export default async function page() {
  const letters = await getAllLetter();

  if (letters.error) {
    return (
      <>
        <div>{letters.error}</div>
      </>
    );
  }

  console.log(letters.id);

  return (
    <>
      <div>
        {letters.map((letter, key) => {
          if (letter.isUnlocked) {
            return (
              <Link key={key} href={`/letter/${letter.id}`}>
                <h1>{letter.name}</h1>
              </Link>
            );
          } else {
            return (
              <Link key={key} href={`/letter/${letter.id}`}>
                <h2>{letter.name}</h2>
              </Link>
            );
          }
        })}
      </div>
    </>
  );
}
