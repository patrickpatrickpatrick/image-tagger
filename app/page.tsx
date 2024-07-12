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
import Container from '@mui/material/Container';

import UserStatus from './components/UserStatus';
import Filter from './components/Filter';
import ImageGrid from './components/ImageGrid';
import ImageTagged from './components/ImageTagged';
import FilterImageGrid from './components/FilterImageGrid';

async function getImages() {
  const res = await fetch(`${process.env.URL}/api/images`);
  return res.json();
}

async function getTags() {
  const res = await fetch(`${process.env.URL}/api/tags`);
  return res.json();
}

export default async function Home() {

  const tagsReq = getTags();

  const [tagsData] = await Promise.all([tagsReq]);

  const { tags, images } = tagsData;

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
        <Box>
          <Container>
            <FilterImageGrid
              tags={tags}
              images={images}
            />
          </Container>
        </Box>
      </Box>
    </main>
  );
}
