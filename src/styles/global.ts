import { globalCss } from '@ignite-ui/react'

export const globalStyles = globalCss({
  '*': {
    boxSizing: 'border-box',
    padding: 0,
    margin: 0,
  },

  body: {
    backgroundColor: '$gray900',
    color: '$gray100',
    '-webkit-font-smoothing': 'antialiased',
  },

  'body::-webkit-scrollbar': {
    width: '6px',
  },

  'body::-webkit-scrollbar-track': {
    boxShadow: 'inset 0 0 6px $colors$gray400',
  },

  'body::-webkit-scrollbar-thumb': {
    backgroundColor: '$gray200',
    outline: '1px solid slategrey',
    borderRadius: '6px',
  },

  'div::-webkit-scrollbar': {
    width: '4px',
  },

  'div::-webkit-scrollbar-track': {
    boxShadow: 'inset 0 0 6px $colors$gray400',
  },

  'div::-webkit-scrollbar-thumb': {
    backgroundColor: '$gray200',
    outline: '1px solid slategrey',
    borderRadius: '6px',
  },
})
