import { ModalOverlay, Button ,Modal,ModalContent,ModalCloseButton,ModalBody,ModalFooter,Text,useDisclosure,Link,Grid,Flex} from '@chakra-ui/react';
import { useState} from 'react';


function BackdropDetail({ object }) {
    const OverlayOne = () => (
      <ModalOverlay
        bg='blackAlpha.300'
        backdropFilter='blur(10px) hue-rotate(90deg)'
      />
    )

  
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = useState(<OverlayOne />)


    return (
      <>
        <Link fontSize="xs" opacity={0.8} color="teal.500" _hover={{ color: "teal.700", textDecoration :'underline' }}  onClick={() => {
            setOverlay(<OverlayOne />)
            onOpen()
          }}>เนื้อหาเพิ่มเติม...
          </Link>

        <Modal scrollBehavior="inside" isCentered isOpen={isOpen} onClose={onClose}  size="lg">
          {overlay}
          <ModalContent>
            
            <Grid  templateColumns='repeat(2, auto)'  ml={6} mt={6} mr={6}>                
                {object.proverb.map( proverb => {                  
                return (<Text color="teal.500"   fontSize='larger' key={proverb}>{proverb}</Text>)
                })
                }
              </Grid>              
            <ModalCloseButton />
            <ModalBody>
              <Text>{object.meaning}</Text>
              <Grid templateColumns="1fr 1fr"  mt={2} gap={1}  >
                  <Flex align='baseline' >
                    <Text  opacity={0.8}>ที่มา: </Text>
                    <Text  opacity={0.8}>{object.reference}</Text>
                  </Flex>
                  <Flex align='baseline'>
                    <Text  opacity={0.8}>วรรค: </Text>
                    <Text  opacity={0.8}>{object.classification}</Text>
                  </Flex>
                </Grid>
              <Text mt={2} >{object.details}</Text>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }
  export default BackdropDetail;