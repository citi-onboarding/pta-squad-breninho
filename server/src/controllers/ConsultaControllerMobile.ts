import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class MobileAppointmentController {
  /**
   * GET /mobile/appointments?period=morning|afternoon|night
   * Retorna as próximas 3 consultas do turno escolhido.
   */
    getNextByPeriod = async (req: Request, res: Response) => {
        try {
        const now = new Date();
        const period = (req.query.period as string) || "";

        // Define intervalo de horas
        let timeFilter: { gte?: string; lt?: string } = {};
        if (period === "morning")      timeFilter = { gte: "06:00:00", lt: "12:00:00" };
        else if (period === "afternoon") timeFilter = { gte: "12:00:00", lt: "18:00:00" };
        else if (period === "night")     timeFilter = { gte: "18:00:00", lt: "24:00:00" };

        const próximas = await prisma.appointment.findMany({
            where: {
            date: { gte: now },
            ...(timeFilter.gte || timeFilter.lt ? { time: timeFilter } : {}),
            },
            include: { patient: true },
            orderBy: [
            { date: "asc" },
            { time: "asc" },
            ],
            take: 3,
        });

        return res.status(200).json(próximas);
        } catch (error) {
        console.error("Erro ao buscar próximas consultas (mobile):", error);
        return res.status(500).send({ message: "Erro ao buscar consultas mobile" });
        }
    };
}

export default new MobileAppointmentController();