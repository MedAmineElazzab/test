import { forwardRef } from 'react'
import { IconChevronRight } from '@tabler/icons-react'
import { Group, Avatar, Text, UnstyledButton } from '@mantine/core'

interface UserButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  image: string
  name: string
  job: string
  icon?: React.ReactNode
}

export const UserMenu = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ image, name, job, icon, ...others }: UserButtonProps, ref) => (
    <UnstyledButton
      ref={ref}
      style={{
        padding: 'var(--mantine-spacing-md)',
        color: 'var(--mantine-color-text)',
        borderRadius: 'var(--mantine-radius-sm)'
      }}
      {...others}
    >
      <Group>
        <Avatar src={image} radius='xl' />

        <div style={{ flex: 1 }}>
          <Text size='sm' fw={500}>
            {name}
          </Text>

          <Text c='dimmed' size='xs'>
            {job}
          </Text>
        </div>

        {icon || <IconChevronRight size='1rem' />}
      </Group>
    </UnstyledButton>
  )
)
UserMenu.displayName ="UserMenu"
