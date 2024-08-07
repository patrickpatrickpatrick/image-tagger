'use client'

import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import ImageTagged from './ImageTagged/index';
import { TaggedImage } from './../constants/types';

interface ImageGridProps  {
  images: TaggedImage[],
  tags: string[]
}

const ImageGrid = ({ images, tags }: ImageGridProps) => {
  const [edit, setEdit] = useState<number|null>(null);
  const [imageState, setImageState] = useState(images);

  useEffect(() => {
    setImageState(images)
  }, [images])

  return <> {
    imageState && imageState.map((image, index) => {
        return <Grid
          key={image.name}
          item
        >
          <ImageTagged
            editable={index == edit}
            setEdit={() => setEdit(index)}
            saveChanges={image => setImageState([
              ...imageState.slice(0, index),
              image,
              ...imageState.slice(index, imageState.length)
            ])}
            name={image.name}
            tags={image.tags}
            allTags={tags}
            featured={image.featured}
          />
        </Grid>
      })
    }
  </>
}

 export default ImageGrid;