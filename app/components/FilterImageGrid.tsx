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
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const tagQuery = tags.join(",");
    setLoading(true);

    fetch(`/api/images${tagQuery ? `?tags=${tagQuery}` : ""}`)
    .then((res) => res.json())
    .then(({ images }) => {
      setFilteredImages(images);
      setLoading(false);
    })
  }, [tags])

  return (<>
    <Grid container spacing={2}>
      {
        loading && <p>
          Loading images...
        </p>
      }
      {
        !loading && <ImageGrid
          images={filteredImages}
          tags={tags}
        />
      }
      {
        !loading && !filteredImages.length && <p>
          No images found!
        </p>
      }
    </Grid>
  </>)
}

export default FilterImageGrid;