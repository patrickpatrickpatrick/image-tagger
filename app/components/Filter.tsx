'use client'

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useState } from 'react';

interface FilterProps {
  tags: string[],
  tagFilters: string[],
  setTagFilters: (tags: string[]) => void
}

const Filter = ({
  tags,
  setTagFilters,
  tagFilters,
  }: FilterProps
) => {
  const tagFiltersOptions = (tagFilters || []).map(tag => ({ title: tag, tag }))
  const [value, setValue] = useState<{ title: string, tag: string }[]>(tagFiltersOptions);

  return <Stack spacing={3} sx={{ width: 500 }}>
    {
      tags && <Autocomplete
        multiple
        value={value}
        onChange={(event: any, newValue) => {
          if (newValue) {
            setValue(newValue);
            setTagFilters(newValue.map(tag => tag.title))
          }
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
