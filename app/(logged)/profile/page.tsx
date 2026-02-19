import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ProfileForm } from "./_components/profile-form";
import { DeleteAccountCard } from "./_components/delete-account-card";
import { PaymentCard } from "./_components/payment-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { IUser } from "@/types/interfaces/user/IUser";

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() })  
  const user = session?.user;

  if (!user) {
    return null;
  }

  const userData = await prisma.user.findUnique({
    where: { id: user.id },
    include: { profile: true }
  });  

  if (!userData) {
    redirect('/auth/login');
  }
  
  return (
    <div className="container py-10 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        
        <CardContent>
          <ProfileForm user={userData as IUser} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PaymentCard />
        <DeleteAccountCard />
      </div>
    </div>
  );
} 