// app/api/contacts/route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "@repo/db/client"; // Ensure this path is correct

export async function GET(request: NextRequest) {
  try {
    const contacts = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        number: true,
      },
    });
    return NextResponse.json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json(
      { error: "Failed to fetch contacts" },
      { status: 500 }
    );
  }
}
