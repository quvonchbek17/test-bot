import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const setItem = (type: string, value: any) => {
  if (typeof window !== "undefined") {
   return window.localStorage.setItem(type, JSON.stringify(value));
  }
  return null
};

export const getItem = (type: string) => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem(type);
  }
  return null;
};