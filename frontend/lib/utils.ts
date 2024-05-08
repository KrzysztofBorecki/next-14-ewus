import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timeout(ms: number) {
  return new Promise(res => {
    setTimeout(() => res('ok'), ms);
  });
}
