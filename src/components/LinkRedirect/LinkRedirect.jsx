import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../Firebase";
import { doc, getDoc, increment, updateDoc } from "firebase/firestore";
import NotFound from "./NotFound";
import { Box, CircularProgress, Typography } from "@mui/material";

const LinkRedirect = () => {
  const { shortLink } = useParams();
  const [error, seterror] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLinksDoc = async () => {
      try {
        console.log("Fetching document with ID:", shortLink);
        const linkRef = doc(db, "links", shortLink);
        const linkDoc = await getDoc(linkRef);
        if (linkDoc.exists()) {
          const { longURL, linkID, userUid } = linkDoc.data();

          // Update the totalClicks field in the user's links subcollection
          const userLinkRef = doc(db, `users/${userUid}/links/${linkID}`);
          updateDoc(userLinkRef, {
            totalClicks: increment(1),
          });

          // Redirect to the longURL
          window.location.href = longURL;
        } else {
          console.log("No such document!");
          setLoading(false);
          seterror(true);
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
        seterror(true);
      }
    };

    fetchLinksDoc();
  }, []);

  if (loading)
    return (
      <Box display="flex" alignItems="center" flexDirection="column" mt={5}>
        <CircularProgress sx={{ my: "15px" }} size={50}></CircularProgress>
        <Typography display="flex" variant="h5">
          Redirecting to link
        </Typography>
      </Box>
    );
  if (error) {
    return (
      <>
        <NotFound />
      </>
    );
  }
};
export default LinkRedirect;
