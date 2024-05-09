'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  MoonIcon,
  SunIcon,
} from '@radix-ui/react-icons';

export default function ThemeToggleBtn() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={cn(
          'text-foreground/60 hover:bg-transparent hover:text-foreground/80',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0'
        )}>
          <SunIcon className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon
            className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Przełącz motyw</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Jasny
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Ciemny
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          Systemowy
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
