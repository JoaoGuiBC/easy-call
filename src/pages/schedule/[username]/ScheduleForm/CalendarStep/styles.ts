import { Box, styled } from '@ignite-ui/react'

export const Container = styled(Box, {
  display: 'grid',
  position: 'relative',

  margin: '$6 auto 0',
  padding: 0,
  maxWidth: '100%',

  width: 540,
  gridTemplateColumns: '1fr',
})
