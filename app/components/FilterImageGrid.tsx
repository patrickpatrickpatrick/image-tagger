"use client";

import Grid from '@mui/material/Grid';
import Filter from './Filter';
import ImageGrid from './ImageGrid';
import { useState, useEffect } from 'react';

const FilterImageGrid = ({
  tags,
  imageTags,
  images,
}) => {
  const [filteredImages, setFilteredImages] = useState(images);
  const [tagFilters, setTagFilters] = useState([]);
  const tagQuery = tagFilters.join(",");

  useEffect(() => {
    if (tagQuery.length) {
      fetch(`/api/tags?tags=${tagQuery}`)
      .then((res) => res.json())
      .then(({ images }) => {
        setFilteredImages(images);
      })      
    }
  }, [tagFilters])

  return (<>
    <Grid>
      <Filter setTagFilters={setTagFilters} tagFilters={tagFilters} tags={tags} />
    </Grid>
    <Grid container spacing={2}>
      <ImageGrid images={filteredImages} />
    </Grid>
  </>)
} 

export default FilterImageGrid;