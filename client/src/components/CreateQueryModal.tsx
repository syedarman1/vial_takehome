'use client';

import { useState, useEffect } from 'react';
import {
  Modal,
  Textarea,
  Button,
  Group,
  Flex,
  Text,
  Stack,
  rem,
  useMantineTheme,
  useMantineColorScheme,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconAlertTriangle, IconPlus, IconX, IconTrash } from '@tabler/icons-react';
import { FormData, Query } from '../types';

interface Props {
  opened: boolean;
  formData: FormData | null;
  query: Query | null;
  onClose: () => void;
  onSubmit: () => Promise<void>;
}

export default function CreateQueryModal({ opened, formData, query, onClose, onSubmit }: Props) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const [description, setDescription] = useState('');
  const [isResolving, setIsResolving] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (query) setDescription(query.description || '');
    else setDescription('');
  }, [query]);

  if (!formData && !query) return null;

  const isEdit = Boolean(query);
  const isResolved = query?.status === 'RESOLVED';

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (isEdit) {
        const url = `http://127.0.0.1:8080/queries/${query?.id}`;
        const payload = { description, status: query?.status || 'OPEN' };
        console.log('PATCH request URL:', url, 'Payload:', payload);
        const response = await fetch(url, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const responseData = await response.json();
        console.log('PATCH response status:', response.status, response.statusText, 'Response Data:', responseData);
        if (!response.ok) throw new Error(`Failed to update query. Status: ${response.status}`);
      } else {
        const url = `http://127.0.0.1:8080/queries`;
        const payload = {
          title: formData?.question || '',
          description,
          formDataId: formData?.id,
        };
        console.log('POST request URL:', url, 'Payload:', payload);
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const responseData = await response.json();
        console.log('POST response status:', response.status, response.statusText, 'Response Data:', responseData);
        if (!response.ok) throw new Error(`Failed to create query. Status: ${response.status}`);
      }
      await onSubmit();
      notifications.show({
        title: isEdit ? 'Query Updated' : 'Query Created',
        message: isEdit ? 'The query has been updated successfully.' : 'Your query has been created successfully.',
        color: 'teal',
        icon: <IconCheck size={16} />,
        autoClose: 3000,
      });
      onClose();
    } catch (err) {
      console.error('Error saving query:', err);
      notifications.show({
        title: 'Error',
        message: err instanceof Error ? err.message : 'An error occurred while saving the query.',
        color: 'red',
        icon: <IconX size={16} />,
        autoClose: 5000,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleResolve = async () => {
    setIsResolving(true);
    try {
      const url = `http://127.0.0.1:8080/queries/${query?.id}`;
      console.log('PATCH request URL:', url);
      const response = await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'RESOLVED' }),
      });
      const responseData = await response.json();
      console.log('PATCH response status:', response.status, response.statusText, 'Response Data:', responseData);
      if (!response.ok) throw new Error(`Failed to resolve query. Status: ${response.status}`);
      await onSubmit();
      notifications.show({
        title: 'Query Resolved',
        message: 'The query has been marked as resolved.',
        color: 'teal',
        icon: <IconCheck size={16} />,
        autoClose: 3000,
      });
      onClose();
    } catch (err) {
      console.error('Error resolving query:', err);
      notifications.show({
        title: 'Error',
        message: err instanceof Error ? err.message : 'An error occurred while resolving the query.',
        color: 'red',
        icon: <IconX size={16} />,
        autoClose: 5000,
      });
    } finally {
      setIsResolving(false);
    }
  };

  const handleDelete = async () => {
    if (!query?.id) {
      notifications.show({
        title: 'Error',
        message: 'Query ID is missing. Cannot delete the query.',
        color: 'red',
        icon: <IconX size={16} />,
        autoClose: 5000,
      });
      return;
    }

    setIsDeleting(true);
    try {
      const url = `http://127.0.0.1:8080/queries/${query.id}`;
      console.log('DELETE request URL:', url);
      const response = await fetch(url, {
        method: 'DELETE',
      });
      const responseData = await response.text();
      console.log('DELETE response status:', response.status, response.statusText, 'Response Data:', responseData);
      if (!response.ok) {
        throw new Error(`Failed to delete query. Status: ${response.status}. Details: ${responseData}`);
      }
      await onSubmit();
      notifications.show({
        title: 'Query Deleted',
        message: 'The query has been deleted successfully.',
        color: 'teal',
        icon: <IconCheck size={16} />,
        autoClose: 3000,
      });
      onClose();
    } catch (err) {
      console.error('Error deleting query:', err);
      notifications.show({
        title: 'Error',
        message: err instanceof Error ? err.message : 'An error occurred while deleting the query.',
        color: 'red',
        icon: <IconX size={16} />,
        autoClose: 5000,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={isEdit ? `Query Details` : `Create New Query`}
      centered
      size="xl" // Increased from "lg" to "xl" to provide more space
      radius="md"
      transitionProps={{ transition: 'slide-up', duration: 300, timingFunction: 'ease-out' }}
      overlayProps={{ backgroundOpacity: 0.7, blur: 5, color: 'var(--background)' }}
      styles={{
        title: {
          color: 'var(--foreground)',
          fontSize: rem(20),
          fontWeight: 600,
          transition: 'color 0.3s ease',
        },
        body: {
          backgroundColor: 'var(--card-bg)',
          padding: theme.spacing.lg,
          transition: 'background-color 0.3s ease',
        },
        header: {
          backgroundColor: 'var(--background)',
          borderBottom: `${rem(1)} solid var(--muted-border)`,
          paddingTop: theme.spacing.sm,
          paddingBottom: theme.spacing.sm,
          transition: 'background-color 0.3s ease, border-color 0.3s ease',
        },
        close: {
          color: 'var(--foreground)',
          '&:hover': { color: 'var(--primary)' },
          transition: 'color 0.2s ease',
        },
      }}
    >
      <Stack gap="lg">
        {isEdit && (
          <Flex
            direction="column"
            gap="sm"
            p="md"
            style={{
              backgroundColor: 'var(--card-bg)',
              borderRadius: theme.radius.md,
              border: `${rem(1)} solid var(--muted-border)`,
              transition: 'background-color 0.3s ease, border-color 0.3s ease',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)',
            }}
          >
            <Flex justify="center" mb="sm">
              {!isResolved && (
                <Button
                  color="red"
                  variant="outline"
                  leftSection={<IconAlertTriangle size={16} />}
                  size="md"
                  radius="md"
                  style={{
                    minWidth: rem(300),
                    padding: `${rem(8)} ${rem(16)}`,
                    fontSize: theme.fontSizes.md,
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.4)',
                  }}
                  aria-label="Query is open"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.4)';
                  }}
                >
                  OPEN
                </Button>
              )}
              {isResolved && (
                <Button
                  color="teal"
                  variant="filled"
                  leftSection={<IconCheck size={16} />}
                  size="md"
                  radius="md"
                  style={{
                    minWidth: rem(300),
                    padding: `${rem(8)} ${rem(16)}`,
                    fontSize: theme.fontSizes.md,
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.4)',
                  }}
                  aria-label="Query is resolved"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.4)';
                  }}
                >
                  RESOLVED
                </Button>
              )}
            </Flex>
            <Text c="var(--muted)" fz="sm" style={{ lineHeight: 1.6 }}>
              Relates to: "{query?.title}" <br />
              Created by {query?.createdBy || 'Unknown'} on{' '}
              {new Date(query?.createdAt || '').toLocaleDateString()} <br />
              Updated on {new Date(query?.updatedAt || '').toLocaleDateString()}
            </Text>
          </Flex>
        )}
        {!isEdit && formData?.question && (
          <Text c="var(--foreground)" fz="lg" fw={500} mb="sm">
            Related Question: "{formData.question}"
          </Text>
        )}
        <Textarea
          label={isEdit ? "Query Description" : "Description / Question for Team"}
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
          placeholder="Enter your query description here..."
          disabled={isResolved || isSaving || isResolving || isDeleting}
          minRows={isEdit ? 4 : 6}
          autosize
          styles={{
            label: {
              color: 'var(--foreground)',
              fontSize: theme.fontSizes.sm,
              fontWeight: 500,
              marginBottom: rem(4),
              transition: 'color 0.3s ease',
            },
            input: {
              backgroundColor: 'var(--background)',
              color: 'var(--foreground)',
              borderColor: `var(--muted-border)`,
              borderRadius: theme.radius.sm,
              padding: theme.spacing.sm,
              fontSize: theme.fontSizes.sm,
              transition: 'background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease',
              '&:focus': {
                borderColor: 'var(--primary)',
                boxShadow: `0 0 0 ${rem(1)} var(--primary)`,
              },
              '&:disabled': {
                backgroundColor: `var(--muted)`,
                opacity: 0.7,
                cursor: 'not-allowed',
              },
            },
          }}
        />

        <Group justify="flex-end" gap={rem(12)} mt="sm" wrap="nowrap" style={{ width: '100%' }}>
          {isEdit && (
            <Button
              onClick={handleDelete}
              color="red"
              loading={isDeleting}
              disabled={isSaving || isResolving}
              leftSection={<IconTrash size={16} />}
              variant="outline"
              radius="md"
              style={{
                padding: `${rem(8)} ${rem(38)}`,
                fontSize: theme.fontSizes.md,
                transition: 'all 0.2s ease',
                minWidth: rem(100), 
              }}
              aria-label="Delete query"
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = `rgba(248, 113, 113, 0.2)`)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              Delete Query
            </Button>
          )}
          <Button
            onClick={onClose}
            variant="default"
            radius="md"
            disabled={isSaving || isResolving || isDeleting}
            style={{
              padding: `${rem(8)} ${rem(16)}`,
              fontSize: theme.fontSizes.md,
              transition: 'all 0.2s ease',
              minWidth: rem(150), // Increased to accommodate full text
            }}
            aria-label="Cancel"
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = `rgba(203, 213, 224, 0.2)`)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            Cancel
          </Button>
          {isEdit && !isResolved && (
            <Button
              onClick={handleResolve}
              color="teal"
              loading={isResolving}
              disabled={isSaving || isDeleting}
              leftSection={<IconCheck size={16} />}
              variant="light"
              radius="md"
              style={{
                padding: `${rem(8)} ${rem(16)}`,
                fontSize: theme.fontSizes.md,
                transition: 'all 0.2s ease',
                minWidth: rem(150), // Increased to accommodate full text
              }}
              aria-label="Mark query as resolved"
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = `rgba(74, 222, 128, 0.2)`)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              Mark as Resolved
            </Button>
          )}
          {!isResolved && (
            <Button
              onClick={handleSave}
              loading={isSaving}
              disabled={!description.trim() || isResolving || isDeleting}
              color="blue"
              leftSection={<IconPlus size={16} />}
              variant="filled"
              radius="md"
              style={{
                padding: `${rem(8)} ${rem(16)}`,
                fontSize: theme.fontSizes.md,
                transition: 'all 0.2s ease',
                minWidth: rem(150), // Increased to accommodate full text
              }}
              aria-label="Save changes"
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              Save Changes
            </Button>
          )}
        </Group>
      </Stack>
    </Modal>
  );
}