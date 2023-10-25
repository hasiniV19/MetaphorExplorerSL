import axios from 'axios';
import { useState } from 'react';
// import './App.css';

import Grid from '@mui/material/Grid';
import { Container, CssBaseline, Typography, Paper } from '@mui/material';

import SearchInput from './components/SearchInput';
import PoemDetails from './components/PoemDetails';
import FormComponent from './components/FormComponent';

const noResultStyles = {
  textAlign: 'center', // Center horizontally
  fontSize: '30px',    // Make it large
  fontWeight: 'bold',  // Make it bold
};

const App = () => {
  const [documents, setDocuments] = useState([]);

  const handleSearch = (searchValue) => {
    // Perform the desired action with the searchValue, e.g., send it to an API
    // alert(`Searching for: ${searchValue}`);
    const results = {
      method: 'GET',
      url: 'http://localhost:3001/results',
      params: {
        searchValue: searchValue
      },
    };

    axios
      .request(results)
      .then((response) => {
        console.log(response.data);
        setDocuments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSearchByFields = (source, target, poem) => {
    const results = {
      method: 'GET',
      url: 'http://localhost:3001/resultsByFields',
      params: {
        source: source,
        target: target,
        poem: poem
      },
    };

    axios
      .request(results)
      .then((response) => {
        console.log(response.data);
        setDocuments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  return (
    <div>
      <SearchInput onSearch={handleSearch}/>
      <CssBaseline />
      <Container maxWidth="sm">
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
          <Typography variant="h5" component="div" style={{ marginBottom: '20px' }}>
            Search by fields
          </Typography>
          <FormComponent onSearch={handleSearchByFields}/>
        </Paper>
      </Container>

      {documents.length === 0 ? (
        <div style={noResultStyles}>No results</div>
      ) : (
        <Grid container spacing={2}>

          {documents.map((poemData, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <PoemDetails key={index} data={poemData} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default App;