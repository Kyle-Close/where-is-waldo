import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import winBackgroundImage from '../img/win-screen-background.jpg'
import { textAlign } from '@mui/system';

const style = {
    backgroundImage: winBackgroundImage,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
      xs: '70%', // On extra small and larger screens, make the modal 90% of the screen width
      sm: '65%', // On small and larger screens, make the modal 75% of the screen width
      md: '60%', // On medium and larger screens, make the modal 60% of the screen width
      lg: '40%', // On large and larger screens, make the modal 50% of the screen width
      xl: '30%', // On extra large and larger screens, make the modal 40% of the screen width
    },
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  

  export default function TransitionsModal({resetGame}) {

    const [open, setOpen] = React.useState(true);
    
    const handleClose = (e, reason) => {
      if (reason && reason === "backdropClick") return;
      setOpen(false);
    }
  
    const handlePlayAgain = () => {
      // put your code to execute when "Play Again" is clicked here
      console.log("Play Again clicked");
      handleClose();
      resetGame();
    }
  
    const handleEnterTime = () => {
      // put your code to execute when "Enter Time" is clicked here
      console.log("Enter Time clicked");
      handleClose();
    }
  
    return (
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography 
                id="transition-modal-title" 
                variant="h6" 
                component="h2"
                sx={{ fontWeight: 'bold', textAlign: 'center'}}
              >
                Congrats! You found all the targets!
              </Typography>
              <Typography 
                id="transition-modal-description1" 
                sx={{ 
                  mt: 2, 
                  fontStyle: 'italic', // Make the first part of the description italic
                  textAlign: 'center' // Center align the text
                }}
              >
                You found all targets in xyz seconds.
              </Typography>
              <Typography 
                id="transition-modal-description2"
                sx={{ textAlign: 'center' }} // Center align the text
              >
                Click play again to return to the main menu or enter your time to be added to the leaderboard.
              </Typography>
              <Grid container justifyContent="space-evenly" sx={{ mt: 3 }}>
                <Grid item>
                  <Button 
                    variant="contained"
                    color="secondary"
                    onClick={handleEnterTime} // Handle "Enter Time" button click
                  >
                    Enter Time
                  </Button>
                </Grid>
                <Grid item>
                  <Button 
                    variant="contained"
                    color="primary"
                    onClick={handlePlayAgain} // Handle "Play Again" button click
                  >
                    Play Again
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        </Modal>
      </div>
    );
  }
  