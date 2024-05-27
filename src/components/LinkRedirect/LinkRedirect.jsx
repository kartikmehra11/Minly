import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../Firebase";
import { doc, getDoc, increment, updateDoc } from "firebase/firestore";
import NotFound from "./NotFound";
import { Box, CircularProgress, Typography } from "@mui/material";

const LinkRedirect = () => {
  const { shortLink } = useParams();
  const [Loader, setLoader] = useState(true);
  const [error, seterror] = useState(false);
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
          console.log(linkDoc.data());
          setLoader(false);
          seterror(true);
        }
      } catch (error) {
        console.log(error);
        setLoader(false);
        seterror(true);
      }
    };

    fetchLinksDoc();
  }, []);

  if (Loader)
    return (
      <Box mt={10} textAlign="center">
        <CircularProgress />
        <Typography>Redirecting to the link</Typography>
      </Box>
    );
  else if (error)
    return (
      <>
        <NotFound />
      </>
    );
};
export default LinkRedirect;
