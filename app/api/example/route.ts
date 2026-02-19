import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { withAuth } from "@/lib/auth/auth-check";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { Role } from "@/lib/generated/prisma";

// Validation schema for POST and PUT requests
const ExampleSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
});

export async function GET(request: NextRequest) {
  return withAuth(request, async () => {
    try {
      const { searchParams } = new URL(request.url);
      const email = searchParams.get("email");
      if (!email) return NextResponse.json({ error: "Missing email" }, { status: 400 });

      const user = await prisma.user.findUnique({
        where: { email: email },
      });

      if (!user) return NextResponse.json({ error: "No user found with this email" }, { status: 404 });

      return NextResponse.json(user);
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
  }, [Role.ADMIN, Role.USER]);
}

export async function POST(request: NextRequest) {
  return withAuth(request, async () => {
    try {
      const body = await request.json();
      const validatedData = ExampleSchema.parse(body);

      // Do somethings here..

      return NextResponse.json({}, { status: 201 });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json({ error: "Invalid request data", details: error.errors }, { status: 400 });
      }

      return NextResponse.json({ error: "Failed to create example" }, { status: 500 });
    }
  });
}

export async function PUT(request: NextRequest) {
  return withAuth(request, async () => {
    try {
      const { searchParams } = new URL(request.url);
      const id = searchParams.get("id");

      if (!id) return NextResponse.json({ error: "Missing example ID" }, { status: 400 });

      const body = await request.json();
      const validatedData = ExampleSchema.parse(body);

      // Do somethings here..

      return NextResponse.json({}, { status: 200 });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json({ error: "Invalid request data", details: error.errors }, { status: 400 });
      }

      return NextResponse.json({ error: "Failed to update example" }, { status: 500 });
    }
  });
}

export async function DELETE(request: NextRequest) {
  return withAuth(request, async () => {
    try {
      const { searchParams } = new URL(request.url);
      const id = searchParams.get("id");

      if (!id) return NextResponse.json({ error: "Missing example ID" }, { status: 400 });

      // Do somethings here..

      return NextResponse.json({}, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: "Failed to delete example" }, { status: 500 });
    }
  });
}
