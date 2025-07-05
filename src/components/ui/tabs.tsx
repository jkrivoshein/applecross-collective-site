import * as React from 'react';
import { cn } from '@/lib/utils';

type TabsProps = {
  children: React.ReactNode;
};

export function Tabs({ children }: TabsProps) {
  return <div className="w-full">{children}</div>;
}

type TabsListProps = React.HTMLAttributes<HTMLDivElement>;

export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('inline-flex items-center justify-start gap-2 rounded-md bg-muted p-1', className)}
      {...props}
    />
  )
);
TabsList.displayName = 'TabsList';

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, ...props }, ref) => (
    <button
      ref={ref}
      data-value={value}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground ring-offset-background transition-all hover:text-primary hover:bg-accent data-[state=active]:bg-background data-[state=active]:text-foreground',
        className
      )}
      {...props}
    />
  )
);
TabsTrigger.displayName = 'TabsTrigger';

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, ...props }, ref) => (
    <div ref={ref} data-value={value} className={cn('mt-2', className)} {...props} />
  )
);
TabsContent.displayName = 'TabsContent';
