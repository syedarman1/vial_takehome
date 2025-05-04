'use client';

import { useState } from 'react';
import useSWR from 'swr';
import {
  Table,
  ActionIcon,
  Tooltip,
  Loader,
  Text,
  Group,
  Badge,
  Box,
  Paper,
  Stack,
  rem,
  useMantineTheme,
  useMantineColorScheme,
  Alert,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconPlus, IconQuestionMark, IconCheck, IconAlertTriangle, IconRefresh } from '@tabler/icons-react';
import CreateQueryModal from './CreateQueryModal';
import { FormData, Query, FormDataResponse } from '../types';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function TableView() {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  const [selectedFormData, setSelectedFormData] = useState<FormData | null>(null);
  const [selectedQuery, setSelectedQuery] = useState<Query | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, error, mutate } = useSWR<FormDataResponse>(
    'http://127.0.0.1:8080/form-data',
    fetcher,
    { revalidateOnFocus: false }
  );

  const openCreateModal = (item: FormData) => {
    setSelectedFormData(item);
    setSelectedQuery(null);
    setIsModalOpen(true);
  };

  const openQueryModal = (query: Query) => {
    setSelectedFormData(null);
    setSelectedQuery(query);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFormData(null);
    setSelectedQuery(null);
  };

  const handleSubmit = async () => {
    try {
      await mutate(fetcher('http://127.0.0.1:8080/form-data'), { revalidate: true });
      notifications.show({
        title: 'Table Updated',
        message: 'The table has been refreshed with the latest data.',
        color: 'blue',
        icon: <IconRefresh size={16} />,
        autoClose: 3000,
      });
    } catch (err) {
      console.error('Error refreshing table:', err);
      notifications.show({
        title: 'Error',
        message: 'Failed to refresh the table. Please try again.',
        color: 'red',
        icon: <IconAlertTriangle size={16} />,
        autoClose: 5000,
      });
    }
    closeModal();
  };

  if (error) {
    return (
      <Alert
        icon={<IconAlertTriangle size={18} />}
        title="Error Loading Data"
        color="red"
        variant="light"
        m="md"
        style={{ backgroundColor: 'var(--card-bg)', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)' }}
        className="hover-lift"
      >
        Failed to load data: {error.message}
      </Alert>
    );
  }

  if (!data) {
    return (
      <Group justify="center" mt="xl">
        <Loader color="var(--primary)" />
      </Group>
    );
  }

  if (!data.data || !Array.isArray(data.data.formData) || data.data.formData.length === 0) {
    return (
      <Paper
        p="lg"
        m="md"
        withBorder
        style={{ backgroundColor: 'var(--card-bg)', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)' }}
        className="hover-lift"
      >
        <Text c="var(--muted)" ta="center" fz="sm">
          No form data available to display.
        </Text>
      </Paper>
    );
  }

  const normalizedData = data.data.formData.map((item: FormData) => ({
    ...item,
    queries: Array.isArray(item.queries) ? item.queries : [],
  }));

  const rows = normalizedData.map(item => (
    <Table.Tr key={item.id}>
      <Table.Td>{item.question}</Table.Td>
      <Table.Td>{item.answer || '-'}</Table.Td>
      <Table.Td>
        {item.queries.length ? (
          <Stack gap={rem(6)}>
            {item.queries.map(q => (
              <Tooltip
                key={q.id}
                label={q.description || 'View Query Details'}
                withArrow
                multiline
                w={220}
              >
                <Badge
                  color={q.status === 'OPEN' ? 'red' : 'teal'}
                  leftSection={
                    q.status === 'OPEN' ? <IconQuestionMark size={14} /> : <IconCheck size={14} />
                  }
                  variant="light"
                  size="sm"
                  styles={{
                    root: { cursor: 'pointer', textTransform: 'capitalize', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)' },
                  }}
                  onClick={() => openQueryModal(q)}
                  className="hover-lift"
                >
                  {q.status.toLowerCase()}
                </Badge>
              </Tooltip>
            ))}
          </Stack>
        ) : (
          <Tooltip label="Create Query" withArrow position="left">
            <ActionIcon
              onClick={() => openCreateModal(item)}
              variant="subtle"
              color="var(--primary)"
              style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)' }}
              className="hover-lift"
            >
              <IconPlus size={16} />
            </ActionIcon>
          </Tooltip>
        )}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Box p="md">
      <Paper
        withBorder
        shadow="sm"
        radius="md"
        style={{ overflow: 'hidden', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)' }}
        className="hover-lift"
      >
        <Table
          highlightOnHover
          verticalSpacing="sm"
          styles={{
            table: { backgroundColor: 'var(--card-bg)' },
            thead: {
              backgroundColor: 'var(--card-bg)',
              position: 'sticky',
              top: 0,
              zIndex: 1,
            },
            th: {
              color: 'var(--secondary)',
              textTransform: 'uppercase',
              fontSize: theme.fontSizes.xs,
              fontWeight: 600,
              borderBottom: `${rem(1)} solid var(--muted-border)`,
            },
            td: {
              color: 'var(--foreground)',
              fontSize: theme.fontSizes.sm,
              borderTop: `${rem(1)} solid var(--muted-border)`,
            },
            tr: {
              '&:hover': {
                backgroundColor: 'var(--hover-bg)',
              },
            },
          }}
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Question</Table.Th>
              <Table.Th>Answer</Table.Th>
              <Table.Th style={{ width: rem(150) }}>Queries</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Paper>

      <CreateQueryModal
        opened={isModalOpen}
        formData={selectedFormData}
        query={selectedQuery}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />
    </Box>
  );
}