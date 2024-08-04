import ProtectedRoute from '@/components/ProtectedRoute';
import type { Metadata } from 'next';
import { Heading } from '@/components/ui/heading';

export const metadata: Metadata = {
  title: 'Next Shadcn Save2',
  description: 'Save2 Integrations'
};

export default function Save2Layout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <>
        <div className="flex h-screen flex-col overflow-hidden">
          <div className="flex items-start justify-between px-6">
            <Heading title={`Save2`} description="Save2 Integration" />
          </div>
          <main className="flex-1 gap-4 overflow-hidden pt-4">{children}</main>
        </div>
      </>
    </ProtectedRoute>
  );
}
