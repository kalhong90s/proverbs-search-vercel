import { ModalOverlay, Button ,Modal,ModalContent,ModalBody,ModalFooter,Text,useDisclosure,Link,Grid} from '@chakra-ui/react';
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
            <ModalBody>
              <Text>{object.meaning}</Text>
              <Text  opacity={0.8}>ที่มา: {object.reference} </Text>
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