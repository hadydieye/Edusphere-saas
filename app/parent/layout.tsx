import { ReactNode } from 'react';

export default function ParentLayout({ children }: { children: ReactNode }) {
  return (
    <div className="font-body selection:bg-primary/30 selection:text-primary-foreground">
      {children}
    </div>
  );
}
