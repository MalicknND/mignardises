import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth"
import { Role } from "@/lib/generated/prisma";
import { IUser } from "@/types/interfaces/user/IUser";

export async function withAuth(
  request: NextRequest,
  handler: (user: IUser) => Promise<NextResponse>,
  requiredRoles?: Role[]
) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    
    if (!session?.session?.id) {
      return NextResponse.json(
        { error: "Unauthorized - Please login" },
        { status: 401 }
      );
    }

    // Check if session is expired
    const now = new Date();
    const expiresAt = new Date(session.session.expiresAt);

    if (now > expiresAt) {
      return NextResponse.json(
        { error: "Session expired - Please login again" },
        { status: 401 }
      );
    }    

    const user = {
      ...session.user,
      roles: session.user.roles as any,
      stripeCustomerId: session.user.stripeCustomerId || null,
      image: session.user.image || null
    }

    // Check if user has required roles
    if (requiredRoles) {
      const userRoles = session.user.roles;

      for (const role of requiredRoles) {
        if (userRoles.includes(role)) {
          return handler(user);
        }
      }
      
      return NextResponse.json(
        { error: "Unauthorized - Insufficient permissions" },
        { status: 403 }
      );
    }

    return handler(user);
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 401 }
    );
  }
} 