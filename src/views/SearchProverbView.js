
import { useReducer, useEffect} from 'react';
import { Flex, Text, Box, Divider } from '@chakra-ui/react';
import SearchInputFilters from './components/SearchInputFilters';
import SearchList from './components/SearchList';
import { searchDataReducer, searchDataInitialState } from './state/searchData.Reducer';
import { loadData } from './state/search.Actions';
//import api from './api';

function SearchProverbView() {

  const [searchDataState, searchDataDispatch] = useReducer(searchDataReducer, searchDataInitialState);

  useEffect(() => {

    // api.loadUserData()
    //   .then(({ status, data }) => {

    //     if (!status) {
    //       searchUserDispatch(errorLoadingData("Something wrong with the API"))
    //     }

        
    //     searchUserDispatch(loadUserData(usersWithNormalizedName))
    //   })
    //   .catch(error => searchUserDispatch(errorLoadingData(error)))      

    const data = require('./datas.json')
    searchDataDispatch(loadData(data.proverbs))

  }, [])

  return (
    <Flex direction="column" m={2} align="center"  w="lg" >

      <SearchInputFilters searchDataState={searchDataState} searchDataDispatch={searchDataDispatch} />
      <SearchList searchDataState={searchDataState} searchDataDispatch={searchDataDispatch} />
      <Divider mt={2} />
      <Box mt={10} mb={3}>
        <Text fontSize="xl">What is this?</Text>
        <Text fontSize="sm" mt={2}>
          Project made to demonstrate my skills with React, useReducer, pagination and project organization.
        </Text>
        <Text fontSize="sm" mt={2}>
          Current behavior is to call an external API that returns proverb objects and to paginate, search and display the results in a list manner. My solution include the usage of a debouncer hook to only filter the in-memory content at 250ms intervals.
        </Text>
 
      </Box>

    </Flex>
  );
}

export default SearchProverbView;