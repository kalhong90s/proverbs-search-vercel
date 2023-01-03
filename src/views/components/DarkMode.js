import {Button,useColorMode} from '@chakra-ui/react';
import {SunIcon,MoonIcon} from '@chakra-ui/icons'

const DarkMode = () => {
  
  const { colorMode, toggleColorMode } = useColorMode()

  
  return  (    
  <>
    <Button 
      onClick={() => toggleColorMode()}      
      w='1'
      bg='whiteAlpha' 
      size='lg'
    >
      {colorMode === "dark" ? (
        <SunIcon color="orange.200" />
      ) : (
        <MoonIcon color="blue.700" />
      )}
    </Button>

  
  </>
  )
}

export default DarkMode;