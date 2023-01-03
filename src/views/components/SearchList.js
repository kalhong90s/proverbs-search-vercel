
import { Text,Flex,List, Grid, Input, Button, Divider, ListItem,Tabs, TabList,Tab,TabPanels,TabPanel,Box} from '@chakra-ui/react';
import { nextPage, lastPage, jumpToPage} from '../state/search.Actions';
import BackdropDetail from './BackdropDetail';

function SearchList({ searchDataState, searchDataDispatch }) {

  const forward = (level) =>{
    searchDataDispatch(nextPage(level))
  }

  const backward = (level) => {
    searchDataDispatch(lastPage(level))
  }

  const handleCurrentPageInput = (e,level) => {
    const pageNumber = e.target.value;
    searchDataDispatch(jumpToPage(pageNumber,level))
  }

  const handleToLastPage = (level) => {
    let LastPage = searchDataState.pagination.maxPage

    if(level==='tree'){
      LastPage = searchDataState.paginationTree.maxPage
    }else if(level ==='to'){
      LastPage = searchDataState.paginationTo.maxPage
    }
    searchDataDispatch(jumpToPage(LastPage,level))
  }


  return (
    <Box w='97%'  >
        <Tabs variant='enclosed'isFitted  >
  <TabList >
    <Tab fontSize="sm">ทั้งหมด</Tab>
    <Tab fontSize="sm">ชั้นตรี</Tab>
    <Tab fontSize="sm">ชั้นโท-เอก</Tab>

  </TabList>

  <TabPanels>
    <TabPanel>
    <Grid templateRows="1fr" mt={2}>
      <List spacing={1}>
        {
          searchDataState.pagination.data.map(data => {
            return (
              <ListItem key={`${data.id}`}>
                <Grid  templateColumns='repeat(2, auto)' >                
                {data.proverb.map( proverb => {                  
                return (<Text fontSize="md" key={proverb}>{proverb}</Text>)
                })
                }
              </Grid>
                <Text fontSize="sm"  opacity={0.9}>
                  {data.meaning}
                </Text>
                <Grid templateColumns="1fr 1fr" gap={1}  >
                  <Flex align='baseline' >
                    <Text fontSize="sm"  opacity={0.6}>ที่มา: </Text>
                    <Text fontSize="sm" opacity={0.6}>{data.reference}</Text>
                  </Flex>
                  <Flex align='baseline'>
                    <Text fontSize="sm" opacity={0.6}>วรรค: </Text>
                    <Text fontSize="sm" opacity={0.6}>{data.classification}</Text>
                  </Flex>
                </Grid>
                <Flex align="center">
                <BackdropDetail  object={data}/>

                </Flex>
                <Divider />
            </ListItem>
            );
          })
        }
      </List>
      <Grid templateColumns="1fr 2fr 2fr 1fr" gap={1} mt={3}>
        <Button size="xs" colorScheme="teal" onClick={() => backward('all')}>ย้อนกลับ</Button>
        <Flex align="center" justify="center">
          <Text fontSize="xs" opacity={0.8} mr={1}>หน้าปัจจุบัน: </Text>
          <Input 
            w='10'
            size="xs"
            type="number"
            minvalue={searchDataState.pagination.minPage}
            maxvalue={searchDataState.pagination.maxPage}
            value={searchDataState.pagination.currentPage}
            onChange={(event) => handleCurrentPageInput( event,'all') }
          />
        </Flex>
        <Flex align="center" justify="end">
          <Text fontSize="xs" opacity={0.8}>หน้าทั้งหมด:</Text>
          <Button 
            onClick={() => handleToLastPage('all')}
            size="xs"
            w='10'
          >{searchDataState.pagination.maxPage}</Button>
        </Flex>
        <Button size="xs" colorScheme="teal" onClick={() => forward('all')}>หน้าถัดไป</Button>
      </Grid>
    </Grid>
    </TabPanel>
    <TabPanel>
    <Grid templateRows="1fr" mt={2}>
      <List spacing={1}>
        {
          searchDataState.paginationTree.data.map(data => {
            return (
              <ListItem key={`${data.id}`}>
                <Grid  templateColumns='repeat(2, auto)' >                
                {data.proverb.map( proverb => {                  
                return (<Text fontSize="md" key={proverb}>{proverb}</Text>)
                })
                }
              </Grid>
                <Text fontSize="sm"  opacity={0.9}>
                  {data.meaning}
                </Text>
                <Grid templateColumns="1fr 1fr" gap={1}  >
                  <Flex align='baseline' >
                    <Text fontSize="sm"  opacity={0.6}>ที่มา: </Text>
                    <Text fontSize="sm" opacity={0.6}>{data.reference}</Text>
                  </Flex>
                  <Flex align='baseline'>
                    <Text fontSize="sm" opacity={0.6}>วรรค: </Text>
                    <Text fontSize="sm" opacity={0.6}>{data.classification}</Text>
                  </Flex>
                </Grid>
                <Flex align="center">
                <BackdropDetail  object={data}/>
                </Flex>
                <Divider />
            </ListItem>
            );
          })
        }
      </List>
      <Grid templateColumns="1fr 2fr 2fr 1fr" gap={1} mt={3}>
        <Button size="xs" colorScheme="teal" onClick={() => backward('tree')}>ย้อนกลับ</Button>
        <Flex align="center" justify="center">
          <Text fontSize="xs" opacity={0.8} mr={1}>หน้าปัจจุบัน: </Text>
          <Input 
            w='10'
            size="xs"
            type="number"
            minvalue={searchDataState.paginationTree.minPage}
            maxvalue={searchDataState.paginationTree.maxPage}
            value={searchDataState.paginationTree.currentPage}
            onChange={(event) => handleCurrentPageInput( event,'tree')}
          />
        </Flex>
        <Flex align="center" justify="end">
          <Text fontSize="xs" opacity={0.8}>หน้าทั้งหมด:</Text>
          <Button 
            onClick={() =>handleToLastPage('tree')}
            size="xs"
            w='10'
          >{searchDataState.paginationTree.maxPage}</Button>
        </Flex>
        <Button size="xs" colorScheme="teal" onClick={() => forward('tree')}>หน้าถัดไป</Button>
      </Grid>
    </Grid>
    </TabPanel>
    <TabPanel>
    <Grid templateRows="1fr" mt={2}>
      <List spacing={1}>
        {
          searchDataState.paginationTo.data.map(data => {
            return (
              <ListItem key={`${data.id}`}>
                <Grid  templateColumns='repeat(2, auto)' >                
                {data.proverb.map( proverb => {                  
                return (<Text fontSize="md" key={proverb}>{proverb}</Text>)
                })
                }
              </Grid>
              <Text fontSize="sm"  opacity={0.9}>
                  {data.meaning}
                </Text>
                <Grid templateColumns="1fr 1fr" gap={1}  >
                  <Flex align='baseline' >
                    <Text fontSize="sm"  opacity={0.6}>ที่มา: </Text>
                    <Text fontSize="sm" opacity={0.6}>{data.reference}</Text>
                  </Flex>
                  <Flex align='baseline'>
                    <Text fontSize="sm" opacity={0.6}>วรรค: </Text>
                    <Text fontSize="sm" opacity={0.6}>{data.classification}</Text>
                  </Flex>
                </Grid>
                <Flex align="center">
                <BackdropDetail  object={data}/>

                </Flex>
                <Divider />
            </ListItem>
            );
          })
        }
      </List>
      <Grid templateColumns="1fr 2fr 2fr 1fr" gap={1} mt={3}>
        <Button size="xs" colorScheme="teal" onClick={() => backward('to')}>ย้อนกลับ</Button>
        <Flex align="center" justify="center">
          <Text fontSize="xs" opacity={0.8} mr={1}>หน้าปัจจุบัน: </Text>
          <Input 
            w='10'
            size="xs"
            type="number"
            minvalue={searchDataState.paginationTo.minPage}
            maxvalue={searchDataState.paginationTo.maxPage}
            value={searchDataState.paginationTo.currentPage}
            onChange={(event) => handleCurrentPageInput( event,'to')}
          />
        </Flex>
        <Flex align="center" justify="end">
          <Text fontSize="xs" opacity={0.8}>หน้าทั้งหมด:</Text>
          <Button 
            onClick={() =>handleToLastPage('to')}
            size="xs"
            w='10'
          >{searchDataState.paginationTo.maxPage}</Button>
        </Flex>
        <Button size="xs" colorScheme="teal" onClick={() => forward('to')}>หน้าถัดไป</Button>
      </Grid>
    </Grid>
    </TabPanel>
  </TabPanels>
</Tabs>
    </Box>


  )
}

export default SearchList;