import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';

const SearchInputWrapper = styled(TextField)({
  width: '80%', // Make the input full-width
  margin: '30px', // Add margins as desired
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderWidth: '4px', // Set the border width
      borderColor: '#9C89FF', // Set the border color
    },
  },
  '& .MuiInputAdornment-root': {
    cursor: 'pointer',
  },
});

export default function SearchInput({ onSearch }) {
  const [searchValue, setSearchValue] = React.useState('');

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchValue); // Send search data to the parent component
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <SearchInputWrapper
      label="Search"
      variant="outlined"
      fullWidth
      value={searchValue}
      onChange={handleSearchChange}
      onKeyDown={handleKeyDown}
      InputProps={{
        startAdornment: (
          <InputAdornment 
            position="start"
            onClick={handleSearch}
            style={{ cursor: 'pointer' }}
            >
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}
