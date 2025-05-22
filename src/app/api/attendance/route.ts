import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const attendance = await prisma.attendance.findMany({
      include: {
        student: {
          select: {
            id: true,
            name: true,
            surname: true,
          },
        },
        lesson: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json(attendance);
  } catch (error) {
    console.error("Error fetching attendance:", error);
    return NextResponse.json(
      { error: "Error fetching attendance" },
      { status: 500 }
    );
  }
} 