'use client'

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useState } from 'react';

import { createTheme, ThemeProvider } from '@mui/material';

interface FilterProps {
  tags: string[],
  filter: string[],
  setFilter: (tags: string[]) => void
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#fff"
    },
    text: {
      primary: "#fff",
      secondary: "#fff"
    }    
  },
  components: {
    // Name of the component
    MuiAutocomplete: {
      styleOverrides: {
        option: {
          color: "#000"
        }
      }
    }
  },
});

const Filter = ({
  tags,
  setFilter,
  filter,
  }: FilterProps
) => {
  const filterOptions = (filter || []).map(tag => ({ title: tag, tag }))
  const [value, setValue] = useState<{ title: string, tag: string }[]>(filterOptions);

  return <ThemeProvider theme={theme}>
      <Stack spacing={3} sx={{ width: 500 }}>
      {
        tags && <Autocomplete
          multiple
          value={value}
          onChange={(event: any, newValue) => {
            if (newValue) {
              setValue(newValue);
              setFilter(newValue.map(tag => tag.title))
            }
          }}
          id="tags-standard"
          defaultValue={[]}
          options={tags.map(tag => ({ title: tag, tag }))}
          getOptionLabel={(option) => option.title}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              label="Filter by tags"
              placeholder="Tags"
            />
          )}
        />
      }
      </Stack>
    </ThemeProvider>
}

export default Filter;
