"use client"

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import UserStatus from './components/UserStatus';
import FilterImageGrid from './components/FilterImageGrid';
import Filter from './components/Filter';

import { createTheme, ThemeProvider } from '@mui/material';

import { useState, useEffect } from 'react';

export default function Home() {
  const [filter, setFilter] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])

  const theme = createTheme({
    palette: {
      primary: {
        main: '#4f4949',
      },
      text: {
        primary: "#fff",
        secondary: "#fff"
      }
    },   
  });

  useEffect(() => {
    fetch(`/api/tags`)
    .then(res => res.json())
    .then(({ tags }) => setTags(tags))
  }, [])

  return (
    <main>
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Image Tagger
              </Typography>
              <Filter
                userBar={true}
                tags={tags}
                filter={filter}
                setFilter={filter => setFilter(filter)}
              />
              <FormGroup>
                <FormControlLabel control={<Switch defaultChecked />} label="Only homepage" />
              </FormGroup>
              <UserStatus />
            </Toolbar>
          </AppBar>
          <Box
            sx={{
              marginTop: "2rem"
            }}
          >
            <Container>
              <FilterImageGrid
                tags={filter}
              />
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </main>
  );
}
