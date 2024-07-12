import { useState, useEffect } from 'react'

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';

const ImageTagged = ({
  src,
  tags = [],
  name,
}: {
  src: string
  tags: string[]
}) => {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)
 
  useEffect(() => {
    fetch(`/api/images?filename=${name}`)
      .then((res) => res.json())
      .then(({ images }) => {
        setData(images)
        setLoading(false)
      })
  }, []);

  return <Grid
    container
    direction="column"
  >
    <Grid item>
      {
        isLoading && <CircularProgress />
      }
      {
        !isLoading && <img src={data.download_url} />
      }
    </Grid>
    <Grid item>
      {
        tags.map(tag => <Chip key={tag} label={tag} />)
      }
    </Grid>
  </Grid>
} 

export default ImageTagged;