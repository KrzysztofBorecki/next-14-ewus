import * as React from 'react';
import { cn } from '@/lib/utils';

const SectionsContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('container flex-1 flex flex-col', className)}
    {...props}
  />
));
SectionsContainer.displayName = 'SectionsContainer';

const SectionPrimaryHeading = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h1
    ref={ref}
    className={cn('px-8 py-4 md:py-6 text-2xl md:text-4xl tracking-tighter font-bold', className)}
    {...props}
  />
));
SectionPrimaryHeading.displayName = 'SectionPrimaryHeading';

const SectionSecondaryHeading = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn('px-8 py-4 text-lg md:text-xl font-bold', className)}
    {...props}
  />
));
SectionSecondaryHeading.displayName = 'SectionSecondaryHeading';

const SectionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex flex-col sm:flex-row items-center sm:items-start sm:justify-around gap-8',
      className
    )}
    {...props}
  />
));
SectionContent.displayName = 'SectionContent';

const SectionText = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('px-6 leading-relaxed', className)}
    {...props}
  />
));
SectionText.displayName = 'SectionText';

const SectionInfo = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('px-12 leading-relaxed text-md font-bold', className)}
    {...props}
  />
));
SectionInfo.displayName = 'SectionInfo';

export {
  SectionsContainer,
  SectionPrimaryHeading,
  SectionSecondaryHeading,
  SectionContent,
  SectionText,
  SectionInfo,
};
