"use client;"

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import UserStatus from './components/UserStatus';
import FilterImageGrid from './components/FilterImageGrid';

async function getTags() {
  const res = await fetch(`${process.env.URL}/api/tags`);
  return res.json();
}

export default async function Home() {

  const tagsReq = getTags();

  const [tagsData] = await Promise.all([tagsReq]);

  const { tags } = tagsData;

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
              />
            </Container>
          </Box>
        </Box>
    </main>
  );
}
