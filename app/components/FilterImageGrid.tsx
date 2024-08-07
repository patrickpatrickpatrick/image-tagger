'use client'

import Grid from '@mui/material/Grid';
import Filter from './Filter';
import ImageGrid from './ImageGrid';
import { useState, useEffect } from 'react';
import { TaggedImage } from '../constants/types';

const FilterImageGrid = ({
  tags,
}: {
  tags: string[],
  images?: TaggedImage[]
}) => {
  const [filteredImages, setFilteredImages] = useState([]);

  useEffect(() => {
    const tagQuery = tags.join(",");

    fetch(`/api/images${tagQuery ? `?tags=${tagQuery}` : ""}`)
    .then((res) => res.json())
    .then(({ images }) => {
      setFilteredImages(images);
    })
  }, [tags])

  return (<>
    <Grid container spacing={2}>
      <ImageGrid
        images={filteredImages}
        tags={tags}
      />
    </Grid>
  </>)
}

export default FilterImageGrid;