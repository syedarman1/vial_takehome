// page.tsx
'use client';

import {
  AppShell,
  Title,
  useMantineTheme,
  rem,
  useMantineColorScheme,
} from '@mantine/core';
import { useEffect } from 'react';
import TableView from '../components/TableView';

export default function Home() {
  const theme = useMantineTheme();
  const { setColorScheme } = useMantineColorScheme();

  // enforce dark mode whenever this page loads
  useEffect(() => {
    setColorScheme('dark');
  }, [setColorScheme]);

  // define header height in REM
  const headerHeight = rem(60);

  return (
    <AppShell
      padding="md"
      header={{ height: headerHeight }}
      styles={{
        main: { backgroundColor: 'var(--background)' }, // main content bg
      }}
    >
      {/* Top bar with title */}
      <AppShell.Header
        px="md"
        style={{
          backgroundColor: 'var(--card-bg)',              // panel background
          borderBottom: `${rem(1)} solid var(--muted-border)`,
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.6)',
          transition: 'background-color 0.3s, border-color 0.3s',
        }}
        className="hover-lift"                            // subtle lift effect
      >
        <Title order={3} c="var(--primary)">
          Query Management System
        </Title>
      </AppShell.Header>

      {/* Main section: our table of form entries + queries */}
      <AppShell.Main>
        <TableView />
      </AppShell.Main>
    </AppShell>
  );
}
