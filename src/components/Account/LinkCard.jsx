import { Typography, Button, Box, Snackbar, Slide } from "@mui/material";
import { BarChart } from "@mui/icons-material";
import { format } from "date-fns";
import { memo } from "react";

const LinkCard = ({
  id,
  createdAt,
  name,
  longURL,
  shortURL,
  totalClicks,
  deleteLink,
  copyLink,
}) => {
  const shortLink = `${window.location.host}/${shortURL}`;

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box my={2}>
          <Typography color="darkgrey" variant="overline">
            Created at {format(createdAt, "do MMM, HH:mm")}
          </Typography>
          <Typography fontSize={25}>{name}</Typography>
          <Typography>{longURL}</Typography>
          <Box display="flex" alignItems="center" marginTop={2}>
            <Box marginRight={2}>
              <Typography color="secondary">{shortLink}</Typography>
            </Box>
            <Box mr={2}>
              <Button
                size="small"
                variant="outlined"
                color="secondary"
                onClick={() => copyLink(shortLink)}
              >
                Copy
              </Button>
            </Box>
            <Button
              size="small"
              variant="contained"
              color="error"
              onClick={() => deleteLink(id)}
            >
              Delete
            </Button>
          </Box>
        </Box>
        {/* Right side */}
        <Box>
          <Box>
            <Box display="flex">
              <Typography>{totalClicks}</Typography>
              <BarChart />
            </Box>
            <Typography>Total Clicks</Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default memo(LinkCard);
