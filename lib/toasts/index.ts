import { toast, type ToastT } from "sonner";
import type { MouseEvent } from "react";

export type NotificationPosition = "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";

type Action = {
  label: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

export interface NotificationOptions extends Partial<ToastT> {
  id?: string;
  duration?: number;
  description?: string | React.ReactNode;
  action?: Action;
  cancel?: Action;
  onDismiss?: () => void;
  onAutoClose?: () => void;
}

export const toastSystem = {
  success: (message: string, options?: NotificationOptions) => {
    return toast.success(message, {
      duration: 4000,
      className: "bg-green-50",
      ...options,
    });
  },

  error: (message: string, options?: NotificationOptions) => {
    return toast.error(message, {
      duration: 5000,
      className: "bg-red-50",
      ...options,
    });
  },

  warning: (message: string, options?: NotificationOptions) => {
    return toast.warning(message, {
      duration: 4000,
      className: "bg-yellow-50",
      ...options,
    });
  },

  info: (message: string, options?: NotificationOptions) => {
    return toast.info(message, {
      duration: 3000,
      className: "bg-blue-50",
      ...options,
    });
  },

  loading: (message: string, options?: NotificationOptions) => {
    return toast.loading(message, {
      duration: Infinity,
      ...options,
    });
  },

  promise: async <T>(
    promise: Promise<T>,
    {
      loading = "Loading...",
      success = "Success!",
      error = "Error!",
      ...options
    }: NotificationOptions & {
      loading?: string;
      success?: string | ((data: T) => string);
      error?: string | ((error: Error) => string);
    } = {}
  ) => {
    return toast.promise(promise, {
      loading,
      success: (data) => (typeof success === "function" ? success(data) : success),
      error: (err) => (typeof error === "function" ? error(err) : error),
      ...options,
    });
  },

  dismiss: (toastId: string) => {
    toast.dismiss(toastId);
  },

  custom: (message: string | React.ReactNode, options?: NotificationOptions) => {
    return toast(message, options);
  },
}; 