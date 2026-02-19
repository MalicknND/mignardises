import { create } from 'zustand'
import { ISubscription } from '@/types/interfaces/user/IUser'

type SubscriptionStore = {
  subscription: ISubscription | null
  setSubscription: (subscription: ISubscription | null) => void
}

export const useSubscription = create<SubscriptionStore>((set) => ({
  subscription: null,
  setSubscription: (subscription) => set({ subscription })
})) 