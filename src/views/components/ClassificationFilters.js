import { Menu ,MenuButton,IconButton,MenuList,MenuItem,MenuDivider,Grid} from '@chakra-ui/react';
import { HamburgerIcon} from '@chakra-ui/icons'
import { categoryFilter } from '../state/search.Actions';


const ClassificationFilters = ({ searchDataDispatch }) => {


  const classifications = ["อัตตวรรค","ทุกขวรรค","วาจาวรรค","อัปปมาทวรรค","ธัมมวรรค","วิริยวรรค","กัมมวรรค","ปกิณกวรรค","เวรวรรค","กิเลสวรรค","ปัญญาวรรค","สัจจวรรค","โกธวรรค","ปมาทวรรค","สติวรรค","ขันติวรรค","ปาปวรรค","สัทธาวรรค","จิตตวรรค","ปุคคลวรรค","สันตุฏฐิวรรค","ชยวรรค","ปุญญวรรค","สมณวรรค","ทานวรรค","มัจจุวรรค","สามัคคีวรรค","มิตตวรรค","สีลวรรค","ยาจนาวรรค","สุขวรรค","ราชวรรค","เสวนาวรรค"]


  const handleCategoryFilter = (category) => {
    searchDataDispatch(categoryFilter(category))
  }

  return  (    
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label='Options'
        icon={<HamburgerIcon />}
        variant='outline'
      />
      <MenuList >
      <MenuItem onClick={() => handleCategoryFilter('all')}>ทั้งหมด</MenuItem>
      <MenuDivider />
        <Grid templateColumns='repeat(3, 1fr)'>
          {classifications.map(classification=>{
            return(
              <MenuItem key={classification} fontSize="sm"  onClick={() => handleCategoryFilter(classification)}>{classification}
              </MenuItem>                  
            )                  

          })}
        </Grid>
      </MenuList>
    </Menu>
  )
}

export default ClassificationFilters;