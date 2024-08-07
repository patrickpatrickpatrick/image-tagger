'use client'

import styles from "./ImageTagged.module.css";

import { useState, useEffect } from 'react'

import { TaggedImage } from "../../constants/types";

import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import CircularProgress from '@mui/material/CircularProgress';
import Filter from "./../Filter";

interface Data {
  download_url?: string
}

const ImageTagged = ({
  tags = [],
  name,
  allTags,
  featured,
  editable,
  saveChanges,
  setEdit
}: {
  name: string,
  tags: string[],
  allTags: string[],
  featured: boolean,
  editable: boolean,
  saveChanges: (image: TaggedImage) => void,
  setEdit: () => void
}) => {
  const [data, setData] = useState<Data>({});
  const [isLoading, setLoading] = useState(true);
  const [tempTags, setTempTags] = useState(tags);
 
  useEffect(() => {
    fetch(`/api/images/${name}`)
      .then((res) => res.json())
      .then(({ images }) => {
        console.log('hello')
        setData(images)
        setLoading(false)
      })
  }, [name]);

  return <Grid
    container
    direction="column"
  >
    <Grid
      item
      className={styles.imageTagged}
    >
      {
        isLoading && <CircularProgress />
      }
      {
        !isLoading && data && <img
          alt={name}
          src={data.download_url}
        />
      }
      {
        !editable && <IconButton
          className={styles.editButton}
          color="primary"
          aria-label="edit photo"
          onClick={() => setEdit()}
        >
          <EditIcon />
        </IconButton>
      }
    </Grid>
    <Grid item>
      {
        editable && <Filter
          tags={allTags}
          tagFilters={tempTags}
          setTagFilters={setTempTags}
        />
      }
      {
        !editable && 
          tags.map(tag => <Chip key={tag} label={tag} />)
      }
    </Grid>
  </Grid>
} 

export default ImageTagged;