'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { MainDashboard } from '@/components/main-dashboard';
import { MinePage } from '@/components/mine-page';
import { EarnPage } from '@/components/earn-page';
import { FriendsPage } from '@/components/friends-page';
import { AirdropPage } from '@/components/airdrop-page';
import { GameDevPage } from '@/components/gamedev-page';
import { SettingsPage } from '@/components/settings-page';
import { BottomNavigation } from '@/components/bottom-navigation';
import { Toast } from '@/components/toast';
import { ProfilePage } from '@/components/profile-page';

export type Page = 'home' | 'mine' | 'earn' | 'friends' | 'airdrop' | 'gamedev' | 'settings' | 'profile';

export default function HamsterKombatApp() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [user, setUser] = useState<{
    id: number;
    first_name?: string;
    last_name?: string;
    username?: string;
    language_code?: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <MainDashboard showToast={showToast} tgUser={user} />;
      case 'mine':
        return <MinePage showToast={showToast} tgUser={user} />;
      case 'earn':
        return <EarnPage showToast={showToast} tgUser={user} />;
      case 'friends':
        return <FriendsPage showToast={showToast} tgUser={user} />;
      case 'airdrop':
        return <AirdropPage showToast={showToast} tgUser={user} />;
      case 'gamedev':
        return <GameDevPage showToast={showToast} tgUser={user} />;
      case 'settings':
        return <SettingsPage showToast={showToast} tgUser={user} />;
      case "profile":
        return <ProfilePage showToast={showToast} tgUser={user} />
      default:
        return <MainDashboard showToast={showToast} tgUser={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black max-w-md mx-auto relative overflow-hidden flex flex-col">
      <Script
        src="https://telegram.org/js/telegram-web-app.js"
        strategy="lazyOnload"
        onLoad={() => {
          const app = (window as any).Telegram?.WebApp;
          showToast(JSON.stringify(app), "info");
          if (app) {
            app.ready();
            const telegramUser = app.initDataUnsafe?.user;
            if (telegramUser) {
              showToast(`Xush kelibsiz, ${telegramUser.username || telegramUser.first_name}!`, 'success');
            } else {
              setError('Foydalanuvchi ma\'lumotlari mavjud emas.');
              showToast('Foydalanuvchi ma\'lumotlari mavjud emas.', 'error');
            }
          } else {
            setError('Ilova Telegram mijozidan ochilmagan.');
            showToast('Ilova Telegram mijozidan ochilmagan.', 'error');
          }
        }}
      />

      <div className="flex-1 pb-20">{renderPage()}</div>
      <BottomNavigation currentPage={currentPage} onPageChange={setCurrentPage} />
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}