import Grid from '@mui/material/Grid';
import ImageTagged from './ImageTagged';

const ImageGrid = ({ images }) => {
  return <> {
      images && images.map(image => {
        return <Grid item>
          <ImageTagged
            name={image.name}
            tags={image.tags}
            homePage={image.homeDisplay}
          />
        </Grid>
      })
    }
  </>
}

 export default ImageGrid;