import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const FormComponent = ({ onSearch }) => {
  const [sourceDomain, setSourceDomain] = useState('');
  const [targetDomain, setTargetDomain] = useState('');
  const [poem, setpoem] = useState('');

  const handleSearch = () => {
    onSearch(sourceDomain, targetDomain, poem);
  };

  return (
    <Grid container spacing={2} >
      <Grid item xs={6}>
        <TextField
          label="Source Domain"
          variant="outlined"
          fullWidth
          style={{ borderColor: '#9C89FF', borderWidth: '4px' }}
          value={sourceDomain}
          onChange={(e) => setSourceDomain(e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Target Domain"
          variant="outlined"
          fullWidth
          style={{ borderColor: '#9C89FF', borderWidth: '4px' }}
          value={targetDomain}
          onChange={(e) => setTargetDomain(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Poem"
          variant="outlined"
          fullWidth
          style={{ borderColor: '#9C89FF', borderWidth: '4px' }}
          value={poem}
          onChange={(e) => setpoem(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
        >
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default FormComponent;
