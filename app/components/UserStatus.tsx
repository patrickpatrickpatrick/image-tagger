"use client"

import { getSession } from '@auth0/nextjs-auth0';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const UserStatus = async () => {
  const session = await getSession();

  return <Box>
   <Grid container spacing={2}>
    {
      session && session.user &&
        <Grid item spacing={2}>
          <Grid
            container
            spacing={2}
            direction="row"
            alignItems="center"            
          >
            <Grid item>
              <Avatar src={session.user.picture} />
            </Grid>
            <Grid item>
              {
                session.user.name
              }
            </Grid>
          </Grid>
        </Grid>
      }
      <Grid item>
        {
          !session && <Button
            color="inherit"
            href="/api/auth/login"
          >
            Log In
          </Button>
        }
        {
          (session && session.user) && <Button
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