'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as React from 'react';
import { cn } from '@/lib/utils/cn';

export const Tabs = TabsPrimitive.Root;

export const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'relative flex justify-center gap-4 mb-6 border-b border-gray-800',
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'relative px-4 py-2 text-sm font-medium text-gray-400',
      'transition-colors duration-300 ease-in-out',
      'data-[state=active]:text-white',
      'rounded-none',
      className
    )}
    {...props}
  >
    <span>{children}</span>
    <span
      className={cn(
        'absolute -bottom-[2px] left-1/2 w-1/2 h-0.5 bg-white rounded transition-transform duration-300 ease-in-out',
        'transform -translate-x-1/2 scale-x-0 data-[state=active]:scale-x-100'
      )}
    />
  </TabsPrimitive.Trigger>
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

export const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn('w-full', className)}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
