
import SearchProverbView from './views/SearchProverbView';
import { ChakraProvider, Flex } from "@chakra-ui/react"
import { ColorModeScript } from '@chakra-ui/react'
import theme from './theme/theme'
import '@fontsource/sarabun/300.css'



function App() {
  return (
    <>
    
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <Flex justify="center">
        <SearchProverbView />
      </Flex>
    </ChakraProvider>
    </>
  );
}


export default App;
