'use client';

// Importing dependencies for our modal component
import { useState, useEffect } from 'react'; // React hooks for state and lifecycle management
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
} from '@mantine/core'; // Mantine UI components for modal and form elements
import { notifications } from '@mantine/notifications'; // Notification system for user feedback
import { IconCheck, IconAlertTriangle, IconPlus, IconX, IconTrash } from '@tabler/icons-react'; // Icons for buttons and status
import { FormData, Query } from '../types'; // Type definitions for our data structures

// Defining props for the modal component
interface Props {
  opened: boolean;               // Controls whether modal is visible
  formData: FormData | null;     // Passed when creating a new query
  query: Query | null;           // Passed when editing/viewing an existing query
  onClose: () => void;           // Callback to close the modal
  onSubmit: () => Promise<void>; // Callback to refresh parent data after changes
}

// Main modal component for creating/editing queries
export default function CreateQueryModal({ opened, formData, query, onClose, onSubmit }: Props) {
  // Accessing Mantine theme and color scheme for styling
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  // State management for form and loading states
  const [description, setDescription] = useState('');       // Holds textarea content
  const [isResolving, setIsResolving] = useState(false);    // Loading flag for resolving queries
  const [isSaving, setIsSaving] = useState(false);          // Loading flag for saving/creating
  const [isDeleting, setIsDeleting] = useState(false);      // Loading flag for deleting

  // Flags to determine modal mode
  const isEdit = Boolean(query);                  // True when editing an existing query
  const isResolved = query?.status === 'RESOLVED';// True if query is already resolved

  // Preload description when editing a query
  useEffect(() => {
    if (query) setDescription(query.description || '');
    else setDescription('');
  }, [query]);

  // Guard against invalid state
  if (!formData && !query) return null;

  // Handle saving (create or update) queries
  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (isEdit) {
        // Update existing query description
        const url = `http://127.0.0.1:8080/queries/${query!.id}`;
        const payload = { description };
        console.log('PATCH request URL:', url, 'Payload:', payload);
        const response = await fetch(url, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await response.json();
        console.log('PATCH response:', response.status, data);
        if (!response.ok) throw new Error(`Failed to update query: ${response.statusText}`);
      } else {
        // Create new query linked to formData
        const url = `http://127.0.0.1:8080/queries`;
        const payload = {
          title: formData!.question,
          description,
          formDataId: formData!.id,
        };
        console.log('POST request URL:', url, 'Payload:', payload);
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await response.json();
        console.log('POST response:', response.status, data);
        if (!response.ok) throw new Error(`Failed to create query: ${response.statusText}`);
      }

      // Refresh parent table and show success notification
      await onSubmit();
      notifications.show({
        title: isEdit ? 'Query Updated' : 'Query Created',
        message: isEdit
          ? 'The query has been updated successfully.'
          : 'Your query has been created successfully.',
        color: 'teal',
        icon: <IconCheck size={16} />,
        autoClose: 3000,
      });

      // Close modal only when creating, keep open for editing
      if (!isEdit) {
        onClose();
      }
    } catch (err) {
      console.error(err);
      // Show error notification if save fails
      notifications.show({
        title: 'Error',
        message: err instanceof Error ? err.message : 'An error occurred while saving.',
        color: 'red',
        icon: <IconX size={16} />,
        autoClose: 5000,
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Handle marking a query as resolved
  const handleResolve = async () => {
    setIsResolving(true);
    try {
      const url = `http://127.0.0.1:8080/queries/${query!.id}`;
      console.log('PATCH resolve URL:', url);
      const response = await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'RESOLVED' }),
      });
      const data = await response.json();
      console.log('Resolve response:', response.status, data);
      if (!response.ok) throw new Error(`Failed to resolve query: ${response.statusText}`);

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
      console.error(err);
      notifications.show({
        title: 'Error',
        message: err instanceof Error ? err.message : 'An error occurred while resolving.',
        color: 'red',
        icon: <IconX size={16} />,
        autoClose: 5000,
      });
    } finally {
      setIsResolving(false);
    }
  };

  // Handle deleting a query
  const handleDelete = async () => {
    if (!query?.id) {
      notifications.show({
        title: 'Error',
        message: 'Query ID is missing.',
        color: 'red',
        icon: <IconX size={16} />,
        autoClose: 5000,
      });
      return;
    }

    setIsDeleting(true);
    try {
      const url = `http://127.0.0.1:8080/queries/${query.id}`;
      console.log('DELETE URL:', url);
      const response = await fetch(url, { method: 'DELETE' });
      const text = await response.text();
      console.log('DELETE response:', response.status, text);
      if (!response.ok) throw new Error(`Failed to delete: ${text}`);

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
      console.error(err);
      notifications.show({
        title: 'Error',
        message: err instanceof Error ? err.message : 'An error occurred while deleting.',
        color: 'red',
        icon: <IconX size={16} />,
        autoClose: 5000,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // Render the modal with form and action buttons
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={isEdit ? 'Query Details' : 'Create New Query'}
      centered
      size="xl"
      radius="md"
      transitionProps={{ transition: 'slide-up', duration: 300, timingFunction: 'ease-out' }}
      overlayProps={{ backgroundOpacity: 0.7, blur: 5, color: 'var(--background)' }}
      styles={{
        title: { color: 'var(--foreground)', fontSize: rem(20), fontWeight: 600 },
        body: { backgroundColor: 'var(--card-bg)', padding: theme.spacing.lg },
        header: { backgroundColor: 'var(--background)', borderBottom: `${rem(1)} solid var(--muted-border)` },
        close: { color: 'var(--foreground)', '&:hover': { color: 'var(--primary)' } },
      }}
    >
      <Stack gap="lg">
        {isEdit && (
          // Display query details when editing
          <Flex direction="column" gap="sm" p="md" style={{
            backgroundColor: 'var(--card-bg)',
            borderRadius: theme.radius.md,
            border: `${rem(1)} solid var(--muted-border)`,
            boxShadow: '0 4px 12px rgba(0,0,0,0.6)',
          }}>
            <Flex justify="center" mb="sm">
              {!isResolved ? (
                <Button
                  color="red"
                  variant="outline"
                  leftSection={<IconAlertTriangle size={16} />}
                  size="md"
                  radius="md"
                  style={{ minWidth: rem(300), padding: `${rem(8)} ${rem(16)}`, fontSize: theme.fontSizes.md, boxShadow: '0 2px 6px rgba(0,0,0,0.4)' }}
                >
                  OPEN
                </Button>
              ) : (
                <Button
                  color="teal"
                  variant="filled"
                  leftSection={<IconCheck size={16} />}
                  size="md"
                  radius="md"
                  style={{ minWidth: rem(300), padding: `${rem(8)} ${rem(16)}`, fontSize: theme.fontSizes.md, boxShadow: '0 2px 6px rgba(0,0,0,0.4)' }}
                >
                  RESOLVED
                </Button>
              )}
            </Flex>
            <Text c="var(--muted)" fz="sm" style={{ lineHeight: 1.6 }}>
              Relates to: "{query!.title}"<br />
              Created by {query!.createdBy || 'User'} on {new Date(query!.createdAt!).toLocaleDateString()}<br />
              Updated on {new Date(query!.updatedAt!).toLocaleDateString()}
            </Text>
          </Flex>
        )}

        {!isEdit && formData?.question && (
          // Show related question when creating a new query
          <Text c="var(--foreground)" fz="lg" fw={500} mb="sm">
            Related Question: "{formData.question}"
          </Text>
        )}

        <Textarea
          label={isEdit ? 'Query Description' : 'Description / Question for Team'}
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
          placeholder="Enter your query description here..."
          disabled={isResolved || isSaving || isResolving || isDeleting}
          minRows={isEdit ? 4 : 6}
          autosize
          styles={{
            label: { color: 'var(--foreground)', fontSize: theme.fontSizes.sm, fontWeight: 500, marginBottom: rem(4) },
            input: {
              backgroundColor: 'var(--background)',
              color: 'var(--foreground)',
              borderColor: 'var(--muted-border)',
              borderRadius: theme.radius.sm,
              padding: theme.spacing.sm,
              fontSize: theme.fontSizes.sm,
              '&:focus': { borderColor: 'var(--primary)', boxShadow: `0 0 0 ${rem(1)} var(--primary)` },
              '&:disabled': { backgroundColor: 'var(--muted)', opacity: 0.7, cursor: 'not-allowed' },
            },
          }}
        />

        <Group justify="flex-end" gap={rem(12)} mt="sm" wrap="nowrap" style={{ width: '100%' }}>
          {isEdit && (
            // Delete button for existing queries
            <Button
              onClick={handleDelete}
              color="red"
              loading={isDeleting}
              disabled={isSaving || isResolving}
              leftSection={<IconTrash size={16} />}
              variant="outline"
              radius="md"
              style={{ padding: `${rem(8)} ${rem(38)}`, fontSize: theme.fontSizes.md, minWidth: rem(100) }}
            >
              Delete Query
            </Button>
          )}

          <Button
            onClick={onClose}
            variant="default"
            radius="md"
            disabled={isSaving || isResolving || isDeleting}
            style={{ padding: `${rem(8)} ${rem(16)}`, fontSize: theme.fontSizes.md, minWidth: rem(150) }}
          >
            Cancel
          </Button>

          {isEdit && !isResolved && (
            // Resolve button for open queries
            <Button
              onClick={handleResolve}
              color="teal"
              loading={isResolving}
              disabled={isSaving || isDeleting}
              leftSection={<IconCheck size={16} />}
              variant="light"
              radius="md"
              style={{ padding: `${rem(8)} ${rem(16)}`, fontSize: theme.fontSizes.md, minWidth: rem(150) }}
            >
              Mark as Resolved
            </Button>
          )}

          {!isResolved && (
            // Save button for creating/updating queries
            <Button
              onClick={handleSave}
              loading={isSaving}
              disabled={!description.trim() || isResolving || isDeleting}
              color="blue"
              leftSection={<IconPlus size={16} />}
              variant="filled"
              radius="md"
              style={{ padding: `${rem(8)} ${rem(16)}`, fontSize: theme.fontSizes.md, minWidth: rem(150) }}
            >
              Save Changes
            </Button>
          )}
        </Group>
      </Stack>
    </Modal>
  );
}