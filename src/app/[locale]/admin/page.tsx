import { AdminPanel } from '@/components/admin/AdminPanel';

export const dynamic = 'force-dynamic';

export default function AdminPage() {
  return (
    <main className="min-h-screen py-20">
      <AdminPanel />
    </main>
  );
}

