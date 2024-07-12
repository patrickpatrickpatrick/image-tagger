import Image from "next/image";
import styles from "./page.module.css";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Grid from '@mui/material/Grid';

import UserStatus from './components/UserStatus';

async function getImages() {
  const res = await fetch(`${process.env.URL}/api/images`);
  return res.json();
}

export default async function Home() {

  const imagesData = getImages();

  const [images] = await Promise.all([imagesData]);

  console.log(images)

  return (
    <main>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Image Tagger
            </Typography>
            <UserStatus />
          </Toolbar>
        </AppBar>
        <Grid container>
          {
            images.images && images.images.map(image => <Grid item>
              <img src={`${image.download_url}`} />
            </Grid>)
          }
        </Grid>
      </Box>
    </main>
  );
}
