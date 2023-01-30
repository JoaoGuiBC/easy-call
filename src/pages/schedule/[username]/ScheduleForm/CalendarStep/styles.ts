import { Box, styled, Text } from '@ignite-ui/react'

export const Container = styled(Box, {
  display: 'grid',
  position: 'relative',

  margin: '$6 auto 0',
  padding: 0,
  maxWidth: '100%',

  variants: {
    isTimePickerOpen: {
      true: {
        gridTemplateColumns: '1fr 280px',

        '@media(max-width: 900px)': {
          gridTemplateColumns: '1fr',
        },
      },
      false: {
        width: 540,
        gridTemplateColumns: '1fr',
      },
    },
  },
})

export const TimePicker = styled('div', {
  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 0,

  width: 280,
  padding: '$6 $6 0',

  overflowY: 'scroll',
  borderLeft: '1px solid $gray600',
})

export const TimePickerHeader = styled(Text, {
  fontWeight: '$medium',

  span: {
    color: '$gray200',
  },
})

export const TimePickerList = styled('div', {
  marginTop: '$3',
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '$2',

  '@media (max-width: 900px)': {
    gridAutoColumns: '2fr',
  },
})

export const TimePickerItem = styled('button', {
  padding: '$2 0',

  border: 0,
  borderRadius: '$sm',
  backgroundColor: '$gray600',
  cursor: 'pointer',

  color: '$gray100',
  fontSize: '$sm',
  lineHeight: '$base',

  transition: 'all 0.25s',

  '&:last-child': {
    marginBottom: '$6',
  },
  '&:disabled': {
    background: 'none',
    cursor: 'default',
    opacity: 0.4,
  },
  '&:not(:disabled):hover': {
    background: '$gray500',
  },
  '&:focus': {
    boxShadow: '0 0 0 2px $colors$gray100',
  },
})
