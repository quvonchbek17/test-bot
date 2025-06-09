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
import io from 'socket.io-client';
import LoadingPage from '@/components/ui/loading';
import { useSocket } from '@/lib/SocketContext';

export type Page = 'home' | 'mine' | 'earn' | 'friends' | 'airdrop' | 'gamedev' | 'settings' | 'profile';

export default function HamsterKombatApp() {

  const { usersSocket } = useSocket()

  const [isSocketConnected, setIsSocketConnected] = useState(false);

  useEffect(() => {
    if (!usersSocket) return;

    // Socket ulanishini tinglash
    usersSocket.on('connect', () => {
      setIsSocketConnected(true);
    });

    usersSocket.on('disconnect', () => {
      setIsSocketConnected(false);
    });


    // Tozalash
    return () => {
      usersSocket.off('connect');
      usersSocket.off('disconnect');
    };
  }, [usersSocket, isSocketConnected]);



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

  return <h1 className='text-red-500'>{JSON.stringify(isSocketConnected)}</h1>

  if (!usersSocket || !isSocketConnected) {
    return <LoadingPage />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black max-w-md mx-auto relative overflow-hidden flex flex-col">
      <Script
        src="https://telegram.org/js/telegram-web-app.js"
        strategy="lazyOnload"
        onLoad={() => {
          const app = (window as any).Telegram?.WebApp;
          // showToast(JSON.stringify(app), "info");
          if (app) {
            app.ready();
            const telegramUser = app.initDataUnsafe?.user;
            if (telegramUser && usersSocket) {
              usersSocket.emit('createOrGetUser', {id: telegramUser.id, first_name: telegramUser.first_name,  last_name: telegramUser.last_name, username: telegramUser.username})
              usersSocket.on('createOrGetUserResponse', (data) => {
                setUser(prev => {
                  if (JSON.stringify(prev) !== JSON.stringify(data)) {
                    return data;
                  }
                  return prev;
                });
              });
            } else {
              // setError('Foydalanuvchi ma\'lumotlari mavjud emas.');
              // showToast('Foydalanuvchi ma\'lumotlari mavjud emas.', 'error');
            }
          } else {
            // setError('Ilova Telegram mijozidan ochilmagan.');
            // showToast('Ilova Telegram mijozidan ochilmagan.', 'error');
          }
        }}
      />
      <div>{isSocketConnected}</div>
      <div>{JSON.stringify(user)}</div>
      <div className="flex-1 pb-20">{user ? renderPage() : <LoadingPage />}</div>
      <BottomNavigation currentPage={currentPage} onPageChange={setCurrentPage} />
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );

  function renderPage() {
    switch (currentPage) {
      case 'home':
        return <MainDashboard showToast={showToast} tgUser={user} setCurrentPage={setCurrentPage} />;
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
      case 'profile':
        return <ProfilePage showToast={showToast} tgUser={user} />;
      default:
        return <MainDashboard showToast={showToast} tgUser={user} setCurrentPage={setCurrentPage} />;
    }
  }
}