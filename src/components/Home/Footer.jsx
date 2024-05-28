// Footer.jsx
import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
} from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        color: "white",
        mt: 2,
        minHeight: "100%",
        width: "100%",
      }}
    >
      <Container maxWidth="lg" sx={{}}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Minly
            </Typography>
            <Typography variant="body2">
              Minly is your go-to solution for shortening and managing your
              links. Simplify your links, track their performance, and share
              them easily.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom>
              Resources
            </Typography>
            <Link href="#" color="inherit" underline="none">
              <Typography variant="body2">Blog</Typography>
            </Link>
            <Link href="#" color="inherit" underline="none">
              <Typography variant="body2">Help Center</Typography>
            </Link>
            <Link href="#" color="inherit" underline="none">
              <Typography variant="body2">Privacy Policy</Typography>
            </Link>
            <Link href="#" color="inherit" underline="none">
              <Typography variant="body2">Terms of Service</Typography>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box>
              <IconButton href="#" color="inherit">
                <Facebook />
              </IconButton>
              <IconButton href="#" color="inherit">
                <Twitter />
              </IconButton>
              <IconButton href="#" color="inherit">
                <Instagram />
              </IconButton>
              <IconButton
                href="https://www.linkedin.com/in/kartikmehra11/"
                target="_blank"
                color="inherit"
              >
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Box textAlign="center" pt={3}>
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} Minly. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
