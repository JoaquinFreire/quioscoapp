import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  
  const admin = await prisma.usuario.findMany({
    where: {
      id: 1,
    }
  });
  res.status(200).json(admin);
}
