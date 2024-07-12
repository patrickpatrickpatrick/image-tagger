"use client"

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useState } from 'react';

const Filter = ({
  tags,
  setTagFilters,
  tagFilters,
}) => {
  const [value, setValue] = useState<string[] | null>(tagFilters || []);

  return <Stack spacing={3} sx={{ width: 500 }}>
    {
      tags && <Autocomplete
        multiple
        value={value}
        onChange={(event: any, newValue: string | null) => {
          setValue(newValue);
          setTagFilters(newValue.map(tag => tag.title))
        }}        
        id="tags-standard"
        defaultValue={[]}
        options={tags.map(tag => ({ title: tag, tag }))}
        getOptionLabel={(option) => option.title}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Multiple values"
            placeholder="Favorites"
          />
        )}
      />      
    }
    </Stack>
}  

export default Filter;