import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    heading: `'Sarabun', Sarabun`,
    body: `'Sarabun', Sarabun`,
  },
  config : {
    initialColorMode: 'light',
    useSystemColorMode: false,
  }
})

export default theme