import { getAllLetter } from "@/actions/letter/getLetter";

export default async function page() {
  const letter = await getAllLetter();

  if (letter.error) {
    return (
      <>
        <div>{letter.error}</div>
      </>
    );
  }

  return (
    <>
      <div>
        {letter.map((letters, key) => (
          <h1 key={key}>{letters.name}</h1>
        ))}
      </div>
    </>
  );
}