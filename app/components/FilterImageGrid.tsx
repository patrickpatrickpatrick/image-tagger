'use client'

import Grid from '@mui/material/Grid';
import Filter from './Filter';
import ImageGrid from './ImageGrid';
import { useState, useEffect } from 'react';
import { TaggedImage } from '../constants/types';

const FilterImageGrid = ({
  tags,
  images,
}: {
  tags: string[],
  images?: TaggedImage[]
}) => {
  const [filteredImages, setFilteredImages] = useState([]);
  const [tagFilters, setTagFilters] = useState<string[]>([]);
  const tagQuery = tagFilters.join(",");

  useEffect(() => {
    fetch(`/api/images${tagQuery ? `?tags=${tagQuery}` : ""}`)
    .then((res) => res.json())
    .then(({ images }) => {
      console.log(images)
      setFilteredImages(images);
    })
  }, [tagQuery])

  return (<>
    <Grid>
      <Filter
        setTagFilters={input => setTagFilters(input)}
        tagFilters={tagFilters}
        tags={tags}
      />
    </Grid>
    <Grid container spacing={2}>
      <ImageGrid
        images={filteredImages}
        tags={tags}
      />
    </Grid>
  </>)
}

export default FilterImageGrid;