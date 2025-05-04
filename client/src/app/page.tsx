'use client';

import { AppShell, Title, useMantineTheme, rem, useMantineColorScheme } from '@mantine/core';
import { useEffect } from 'react';
import TableView from '../components/TableView';

export default function Home() {
  const theme = useMantineTheme();
  const { setColorScheme } = useMantineColorScheme();

  useEffect(() => {
    setColorScheme('dark');
  }, [setColorScheme]);

  const headerHeight = rem(60);

  const appShellStyles = {
    main: {
      backgroundColor: 'var(--background)',
    },
  };

  return (
    <AppShell
      header={{ height: headerHeight }}
      padding="md"
      styles={appShellStyles}
    >
      <AppShell.Header
        style={{
          backgroundColor: 'var(--card-bg)',
          borderBottom: `${rem(1)} solid var(--muted-border)`,
          display: 'flex',
          alignItems: 'center',
          transition: 'background-color 0.3s ease, border-color 0.3s ease',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)',
        }}
        px="md"
        className="hover-lift"
      >
        <Title order={3} c="var(--primary)">
          Query Management System
        </Title>
      </AppShell.Header>

      <AppShell.Main>
        <TableView />
      </AppShell.Main>
    </AppShell>
  );
}