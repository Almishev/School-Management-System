import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const classes = await prisma.class.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });
  return NextResponse.json(classes);
} 