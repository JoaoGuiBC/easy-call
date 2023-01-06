import { Box, styled } from '@ignite-ui/react'

export const ConnectBox = styled(Box, {
  display: 'flex',
  flexDirection: 'column',

  marginTop: '$6',
})

export const ConnectItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  padding: '$4 $6',
  margin: '$2',

  border: '1px solid $gray600',
  borderRadius: '$md',
})