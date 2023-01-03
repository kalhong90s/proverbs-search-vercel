import { useState, useEffect } from 'react';
import { Input, Text, Grid ,InputGroup,InputLeftElement,Box} from '@chakra-ui/react';
import { Search2Icon} from '@chakra-ui/icons'
import { beginSearch } from '../state/search.Actions';
import useDebounce from './useDebeounce'
import ClassificationFilters from './ClassificationFilters';
import DarkMode from './DarkMode';

const SearchInputFilters = ({ searchDataDispatch }) => {

  const [word, setWord] = useState("");

  const debouncedSearchTerm = useDebounce(word, 250)

  useEffect(() => {
    searchDataDispatch(beginSearch(debouncedSearchTerm));
  }, [debouncedSearchTerm, searchDataDispatch])



    return  (    
    <Box w='97%'mt={2} mb={2} >
      <Grid  templateColumns='auto 2fr auto' >
          <Text  fontSize='4xl' bgGradient='linear(to-r, teal.500, blue.600)' bgClip='text' as='b'>พุทธสุภาษิต</Text>
          <Box />
          <Box >
          <DarkMode/>
          </Box>
      </Grid>
      <Grid templateColumns='1fr 7fr' gap={2} mt={2} mb={2}>
          <ClassificationFilters searchDataDispatch={searchDataDispatch} />
          <InputGroup >
            <InputLeftElement pointerEvents='none' children={<Search2Icon color='gray.300' />} />
            <Input type='text' placeholder='อตฺตา หิ ...' focusBorderColor='teal.300' value={word} onChange={e => setWord(e.target.value)}/>
          </InputGroup>

      </Grid>
    </Box>
  )
}

export default SearchInputFilters;