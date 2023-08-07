import { PrismaClient } from "@prisma/client";


export default async function handler(req, res) {
    const prisma = new PrismaClient();

    // Obtener Ordenes 
    const ordenes = await prisma.Orden.findMany({
        where: {
            estado: false,
        }
    });
    res.status(200).json(ordenes);
    if (req.method === 'POST') {
        // Crear Ordenes
        const orden = await prisma.Orden.create({
            data: {
                nombre: req.body.nombre,
                total: req.body.total,
                pedido: req.body.pedido,
                fecha: req.body.fecha,
            },
        });

        res.status(200).json(orden);
    }

}