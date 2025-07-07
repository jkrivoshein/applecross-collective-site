import * as React from 'react';
import { cn } from '@/lib/utils';

export function Tabs(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('w-full', props.className)} {...props} />
  );
}

export function TabsList(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-tabs-root
      className={cn(
        'relative flex justify-center gap-4 mb-6 border-b border-gray-800',
        props.className
      )}
      {...props}
    />
  );
}

export function TabsTrigger(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string }
) {
  return (
    <button
      {...props}
      className={cn(
        'relative px-4 py-2 text-sm font-medium text-gray-400',
        'transition-colors duration-300 ease-in-out',
        'data-[state=active]:text-white',
        'rounded-none'
      )}
    >
      <span>{props.children}</span>
      {/* animated underline */}
      <span
        className={cn(
          'absolute -bottom-[2px] left-1/2 w-1/2 h-0.5 bg-white rounded transition-transform duration-300 ease-in-out',
          'transform -translate-x-1/2 scale-x-0 data-[state=active]:scale-x-100'
        )}
      />
    </button>
  );
}

export function TabsContent(
  props: React.HTMLAttributes<HTMLDivElement> & { value: string }
) {
  return (
    <div className={cn('w-full', props.className)} {...props} />
  );
}
