import { setRequestLocale } from 'next-intl/server';
import { AdminPanel } from '@/components/admin/AdminPanel';

type Props = {
  params: { locale: string };
};

export default function AdminPage({ params: { locale } }: Props) {
  // Enable static rendering
  setRequestLocale(locale);
  
  return (
    <main className="min-h-screen py-20">
      <AdminPanel />
    </main>
  );
}

