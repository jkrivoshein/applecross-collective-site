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
      className={cn(
        'flex w-full items-center justify-center gap-2',
        className
      )}
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
        'inline-flex items-center justify-center whitespace-nowrap border-b-2 border-transparent px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-white hover:border-white data-[state=active]:border-white data-[state=active]:text-white',
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
