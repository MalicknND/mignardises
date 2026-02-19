import { Role, Gender } from '@/lib/generated/prisma';

export interface IUserProfile {
  id: string;
  birthDate?: Date | null;
  gender: Gender;
  phoneNumber?: string | null;
  address?: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISubscription {
  id: string;
  userId: string;
  stripeId: string;
  status: string;
  priceId: string;
  quantity: number;
  cancelAtPeriodEnd: boolean;
  cancelAt: Date | null;
  canceledAt: Date | null;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  endedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  roles: Role[];
  stripeCustomerId?: string | null;
  createdAt: Date;
  updatedAt: Date;
  profile?: IUserProfile | null;
  subscription?: ISubscription | null;
}
