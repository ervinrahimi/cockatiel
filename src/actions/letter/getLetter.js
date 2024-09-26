"use server";
// Import prisma Schema
import prisma from "@/db/client";
// Get All Record From Database From Letter Data Collation
export const getAllLetter = async () => {
  const letter = await prisma.letter.findMany();

  if (!letter) return { error: "Hich Horofi Vojod Nadare !" };

  return letter;
};
// Get Unqiue Letter From Database From Letter Data Collation
export const getUnqiueLetter = async ({ params }) => {
  const letter = await prisma.letter.findUnique({
    where: {
      id: name(params.id),
    },
  });

  if (!letter) return { error: "Hich Horofi Unique Vojod Nadare !" };

  return letter;
};
// Get First Record From Database From Letter Data Collation
export const getFirstLetter = async ({ params }) => {
  const letter = await prisma.letter.findFirst({
    where: {
      letter: {
        name: name(params.id),
      },
    },
  });

  if (!letter) return { error: "Hich Horofi Avali Vojod Nadare !" };

  return letter;
};
