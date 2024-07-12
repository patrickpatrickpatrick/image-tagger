"use client"

import { useUser } from '@auth0/nextjs-auth0/client';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const UserStatus = () => {
  const { user, error, isLoading } = useUser();

  return <Box>
   <Grid container spacing={2}>
    {
      !isLoading && user &&
        <Grid item spacing={2}>
          <Grid
            container
            spacing={2}
            direction="row"
            alignItems="center"            
          >
            <Grid item>
              <Avatar src={user.picture} />
            </Grid>
            <Grid item>
              {
                user.name
              }
            </Grid>
          </Grid>
        </Grid>
      }
      <Grid item>
        {
          user && <Button
            color="inherit"
            href="/api/auth/login"
          >
            Log In
          </Button>
        }
        {
          (!user) && <Button
            color="inherit"
            href="/api/auth/logout"
          >
            Log Out
          </Button>
        }
      </Grid>   
    </Grid>
  </Box>
} 

export default UserStatus;