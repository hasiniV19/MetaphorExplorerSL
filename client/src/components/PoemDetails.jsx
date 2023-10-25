import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function PoemDetails({ data }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      p={2}
      boxShadow={1}
      borderRadius={8}
      marginBottom={2} // Add some margin between the components
    >
      {Object.entries(data._source).map(([key, value]) => {
        if (key === "ID" || value === "") {
          // Skip rendering if key is "ID" and value is empty
          return null;
        }
        if (key === "Metaphor present") {
          // Transform "Metaphor present" value to "yes" or "no"
          value = value === "true" ? "yes" : "no";
        }
        return (
          <Box
            key={key}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">{key}:</Typography>
            <Typography variant="body1">{value}</Typography>
          </Box>
        );
      })}
    </Box>
  );
}
