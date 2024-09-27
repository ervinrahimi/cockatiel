import { getUnqiueLetter } from "@/actions/letter/getLetter";

export default async function page({ params }) {
  const { id } = params;
  const letters = await getUnqiueLetter(id);
  if (!letters) {
    return (
      <>
        <div>Letter Not Found</div>
      </>
    );
  }
  return <div>{letters.name}</div>;
}
