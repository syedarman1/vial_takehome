'use client';

// Importing necessary dependencies
import { useState } from 'react'; // React hooks for state management
import useSWR from 'swr'; // SWR for data fetching with caching and revalidation
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
} from '@mantine/core'; // Mantine UI components for styling and layout
import { notifications } from '@mantine/notifications'; // Notification system for user feedback
import { IconPlus, IconQuestionMark, IconCheck, IconAlertTriangle } from '@tabler/icons-react'; // Icons for buttons and badges
import CreateQueryModal from './CreateQueryModal'; // Modal component for creating/editing queries
import { FormData, Query } from '../types'; // Type definitions for our data structures

// Defining the shape of our API response
interface FormDataResponse {
  data: {
    formData: FormData[];
  };
}

// Utility function to fetch data from our API
const fetcher = (url: string) => fetch(url).then(r => r.json());

// Our main TableView component
export default function TableView() {
  // Accessing Mantine theme and color scheme for consistent styling
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  // State management for modal interactions
  const [selectedFormData, setSelectedFormData] = useState<FormData | null>(null); // Tracks selected form data for creating queries
  const [selectedQuery, setSelectedQuery] = useState<Query | null>(null); // Tracks selected query for editing/viewing
  const [isModalOpen, setIsModalOpen] = useState(false); // Controls modal visibility

  // Using SWR to fetch form data from our API
  const { data, error, mutate } = useSWR<FormDataResponse>(
    'http://127.0.0.1:8080/form-data',
    fetcher,
    { revalidateOnFocus: false } // Prevents revalidation on window focus
  );

  // Opens modal for creating a new query
  const openCreateModal = (item: FormData) => {
    setSelectedFormData(item);
    setSelectedQuery(null);
    setIsModalOpen(true);
  };

  // Opens modal for viewing/editing an existing query
  const openQueryModal = (query: Query) => {
    setSelectedFormData(null);
    setSelectedQuery(query);
    setIsModalOpen(true);
  };

  // Closes the modal and resets state
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFormData(null);
    setSelectedQuery(null);
  };

  // Handles form submission, refreshing table data
  const handleSubmit = async () => {
    try {
      // Trigger data refresh using SWR's mutate
      await mutate(fetcher('http://127.0.0.1:8080/form-data'), { revalidate: true });
    } catch (err) {
      console.error('Error refreshing table:', err);
      // Show error notification if refresh fails
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

  // Handle error state from data fetching
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

  // Show loading spinner while data is being fetched
  if (!data) {
    return (
      <Group justify="center" mt="xl">
        <Loader color="var(--primary)" />
      </Group>
    );
  }

  // Handle case where no data is available
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

  // Normalize data to ensure queries is always an array
  const normalizedData = data.data.formData.map((item: FormData) => ({
    ...item,
    queries: Array.isArray(item.queries) ? item.queries : [],
  }));

  // Generate table rows from normalized data
  const rows = normalizedData.map(item => (
    <Table.Tr key={item.id}>
      <Table.Td>{item.question}</Table.Td>
      <Table.Td>{item.answer || '-'}</Table.Td>
      <Table.Td>
        {item.queries.length ? (
          // Display existing queries as badges
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
          // Show button to create a new query
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

  // Render the main table and modal
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