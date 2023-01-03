import constants from './search.Constants';

const searchDataReducer = (state, action) => {
  let currentPage = state.pagination.currentPage;
  if(action.level==='tree'){ currentPage = state.paginationTree.currentPage }else if(action.level ==='to'){ currentPage = state.paginationTo.currentPage}


  switch (action.type) {
    case constants.BEGIN_SEARCH: 
      return _beginSearch(state, action);

    case constants.LOAD_DATA: 
      return _loadData(state, action);

    case constants.CATEGORY_FILTER: 
      return _categoryFilter(state, action);
  
    case constants.NEXT_PAGE:    
      return _changePage(state, { value: parseInt(currentPage) + 1 ,level:action.level})
    
    case constants.LAST_PAGE:
      return _changePage(state, { value: parseInt(currentPage) - 1,level:action.level })
      
    case constants.ERROR_LOADING_DATA: 
      return _errorLoadingData(state);

    case constants.JUMP_TO_PAGE:

      return _changePage(state, { value: action.value,level:action.level })
    
    default: 
      return { ...state }
  }
}

const _errorLoadingData = (state) => {
  return {
    ...state,
    loading: false,
    errors: true
  }
}

const _beginSearch = (state, action) => {

  
  const datasFiltered = state.datas.filter(d => d.proverb && d.proverb.toString().includes( action.value));
  const treeFiltered = datasFiltered.filter(d => d.level && d.level.includes('ตรี') );
  const toFiltered = datasFiltered.filter(d =>   d.level && (d.level.includes('โท') || d.level.includes('เอก')));


  const currentPage = 1
  const minPage = 1
  const maxPage = Math.ceil(datasFiltered.length / state.pagination.perPage)
  const dataToPageOne = _getDatasFromPage(currentPage, state.pagination.perPage, datasFiltered) 

  const maxPageTree = Math.ceil(treeFiltered.length / state.paginationTree.perPage)
  const dataToPageOneTree = _getDatasFromPage(currentPage, state.pagination.perPage, treeFiltered) 

  const maxPageTo = Math.ceil(toFiltered.length / state.pagination.perPage)
  const dataToPageOneTo = _getDatasFromPage(currentPage, state.paginationTo.perPage, toFiltered) 

  return {
    ...state,
    datasFiltered: datasFiltered,
    treeFiltered:treeFiltered,
    toFiltered:toFiltered,
    searchFields: {
      ...state.searchFields,
      proverb: action.value
    },
    pagination: {
      ...state.pagination,
      data: dataToPageOne,
      minPage,
      maxPage,
      currentPage,
    },    
    paginationTree: {
      ...state.paginationTree,
      data: dataToPageOneTree,
      minPage,
      maxPage:maxPageTree,
      currentPage,
    },
    paginationTo: {
      ...state.paginationTo,
      data: dataToPageOneTo,
      minPage,
      maxPage:maxPageTo,
      currentPage,
    }

  }
}

const _categoryFilter = (state, action) => {

  const categorySearch = action.category;
  let datasFiltered =state.datas.filter(d => d.proverb && d.proverb.toString().includes(state.searchFields.proverb));
  if('all'!== categorySearch){
    datasFiltered = datasFiltered.filter(d => d.classification && d.classification.includes(categorySearch));
  }
  const treeFiltered = datasFiltered.filter(d => d.level && d.level.includes('ตรี') );
  const toFiltered = datasFiltered.filter(d => d.level && (d.level.includes('โท') || d.level.includes('เอก')));


  const currentPage = 1
  const minPage = 1
  const maxPage = Math.ceil(datasFiltered.length / state.pagination.perPage)
  const dataToPageOne = _getDatasFromPage(currentPage, state.pagination.perPage, datasFiltered) 

  const maxPageTree = Math.ceil(treeFiltered.length / state.paginationTree.perPage)
  const dataToPageOneTree = _getDatasFromPage(currentPage, state.pagination.perPage, treeFiltered) 

  const maxPageTo = Math.ceil(toFiltered.length / state.pagination.perPage)
  const dataToPageOneTo = _getDatasFromPage(currentPage, state.paginationTo.perPage, toFiltered) 

  return {
    ...state,
    datasFiltered: datasFiltered,
    treeFiltered:treeFiltered,
    toFiltered:toFiltered,
    searchFields: {
      ...state.searchFields,
      filter: action.value
    },
    pagination: {
      ...state.pagination,
      data: dataToPageOne,
      minPage,
      maxPage,
      currentPage,
    },    
    paginationTree: {
      ...state.paginationTree,
      data: dataToPageOneTree,
      minPage,
      maxPage:maxPageTree,
      currentPage,
    },
    paginationTo: {
      ...state.paginationTo,
      data: dataToPageOneTo,
      minPage,
      maxPage:maxPageTo,
      currentPage,
    }

  }
}

const _loadData = (state, action) => {
  const allData = action.value;
  const currentPage = 1
  const minPage = 1
  const maxPage = Math.ceil(allData.length / state.pagination.perPage)
  const dataToPageOne = _getDatasFromPage(currentPage, state.pagination.perPage, allData) 

  const treeFiltered = allData.filter(d => d.level.includes('ตรี') );
  const toFiltered = allData.filter(d => d.level.includes('โท') || d.level.includes('เอก'));
  
  const maxPageTree = Math.ceil(treeFiltered.length / state.paginationTree.perPage)
  const dataToPageOneTree = _getDatasFromPage(currentPage, state.paginationTree.perPage, treeFiltered) 

  const maxPageTo = Math.ceil(toFiltered.length / state.pagination.perPage)
  const dataToPageOneTo = _getDatasFromPage(currentPage, state.paginationTo.perPage, toFiltered) 
  
  return {
    ...state,
    loading: false,
    datas: allData,
    datasFiltered: allData,
    treeFiltered:treeFiltered,
    toFiltered:toFiltered,
    pagination: {
      ...state.pagination,
      data: dataToPageOne,
      minPage,
      maxPage,
      currentPage
    },   
    paginationTree: {
      ...state.paginationTree,
      data: dataToPageOneTree,
      minPage,
      maxPage:maxPageTree,
      currentPage,
    },
    paginationTo: {
      ...state.paginationTo,
      data: dataToPageOneTo,
      minPage,
      maxPage:maxPageTo,
      currentPage,
    }

  }
}

const _changePage = (state, action) => {

  let maxPage = state.pagination.maxPage;
  let minPage = state.pagination.minPage;
  let perPage = state.pagination.perPage;
  let datasFiltered = state.datasFiltered;
  if(action.level==='tree'){   
    maxPage = state.paginationTree.maxPage;
    minPage = state.paginationTree.minPage;
    perPage = state.paginationTree.perPage;
    datasFiltered = state.treeFiltered;
  }else if(action.level ==='to'){     
    maxPage = state.paginationTo.maxPage;
    minPage = state.paginationTo.minPage;
    perPage = state.paginationTo.perPage;
    datasFiltered = state.toFiltered;
  }


  const _changePageIfPossible = (pageToAdvance, maxPage, minPage) => {
    const pageIsOverMax = pageToAdvance > maxPage
    const pageIsUnderMin = pageToAdvance < minPage    
    if (pageIsOverMax) return maxPage;
    if (pageIsUnderMin) return minPage;
    return pageToAdvance;
  }

  const newPage = _changePageIfPossible(action.value,maxPage,minPage,)

  const data = _getDatasFromPage(newPage, perPage, datasFiltered) 

  let result ={
    ...state,
    pagination: {
      ...state.pagination,
      data,
      currentPage: newPage
    }
  }
  if(action.level==='tree'){ 
    result = {
      ...state,
      paginationTree: {
        ...state.paginationTree,
        data,
        currentPage: newPage
      }
    }
  }else if(action.level ==='to'){ 
    result = {
      ...state,
      paginationTo: {
        ...state.paginationTo,
        data,
        currentPage: newPage
      }
    }
  }

  return result
}


const _getDatasFromPage = (currentPage, pageSize, users) => {
  const resultDatas = []
  for (var i = pageSize * (currentPage -1); i < currentPage * pageSize; i++) {
    if (users[i]) {
      resultDatas.push(users[i])
    }
  }
  return resultDatas;
}

const searchDataInitialState = {
  loading: true,
  searchFields: {
    proverb: ''
  },
  errors: false,
  pagination: {
    data: [],
    currentPage: 1,
    perPage: 5,
    minPage: 1,
    maxPage: 1
  },
  paginationTree: {
    data: [ ],
    currentPage: 1,
    perPage: 5,
    minPage: 1,
    maxPage: 1
  },
  paginationTo: {
    data: [ ],
    currentPage: 1,
    perPage: 5,
    minPage: 1,
    maxPage: 1
  },
  datas: [ ],
  datasFiltered: [ ]
}

export { searchDataReducer, searchDataInitialState };