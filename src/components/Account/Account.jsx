import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Grid,
  Divider,
  colors,
  Snackbar,
  Slide,
  CircularProgress,
} from "@mui/material";
import copy from "copy-to-clipboard";
import Navbar from "./Navbar";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useCallback, useEffect, useMemo, useState } from "react";
import LinkCard from "./LinkCard";
import { Fragment } from "react";
import SmolModal from "../Home/SmolModal";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  doc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { nanoid } from "nanoid";
import { auth, db } from "../../Firebase";

const Account = () => {
  const [links, setLinks] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [Loading, setLoading] = useState(true);
  const userUid = auth.currentUser.uid;
  const linksPathRef = useMemo(() => `users/${userUid}/links`, [userUid]);

  //to generate links doc
  async function linkCreated(userUid, linkID, longURL, shortURL) {
    try {
      await setDoc(doc(db, `links/${shortURL}`), {
        userUid,
        linkID,
        longURL,
      });
    } catch (error) {
      console.error("Error writing document: ", error);
      throw new Error("Error writing document");
    }
  }

  //TO generate new user doc
  const handleShortURL = async (name, longURL) => {
    const link = {
      name,
      longURL:
        longURL.includes("http://") || longURL.includes("https://")
          ? longURL
          : `http://${longURL}`,
      createdAt: serverTimestamp(),
      shortURL: nanoid(6),
      totalClicks: 0,
    };
    try {
      const resp = await addDoc(collection(db, linksPathRef), link);
      linkCreated(userUid, resp.id, link.longURL, link.shortURL);
      setLinks((links) => [
        ...links,
        { ...link, createdAt: new Date(), id: resp.id },
      ]);
      setOpen(false);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  //To delete links
  const handleDelete = useCallback(async (linkDocID, shortURL) => {
    if (window.confirm("Do you really want to delete the link ??")) {
      try {
        await deleteDoc(doc(db, linksPathRef, linkDocID)); //to delete user link data
        await deleteDoc(doc(db, `links/${shortURL}`)); //to delete links
        setLinks((oldlinks) =>
          oldlinks.filter((link) => link.id !== linkDocID)
        );
      } catch (e) {
        console.error("Error deleting document: ", e);
      }
    }
  }, []);

  //To fetch previous links
  useEffect(() => {
    const fetchLinks = async () => {
      const q = query(collection(db, linksPathRef));

      try {
        const querySnapshot = await getDocs(q);

        const tempLinks = [];
        querySnapshot.forEach((doc) => {
          tempLinks.push({
            ...doc.data(),
            id: doc.id,
            createdAt: doc.data().createdAt.toDate(),
          });
        });
        setLinks(tempLinks);
        setLoading(false);
      } catch (e) {
        console.error("Error fetching document: ", e);
      }
    };
    fetchLinks();
  }, []);

  const [Toaster, setToaster] = useState(false);

  const copyToClipBoard = (shortLink) => {
    copy(shortLink);
    setToaster(true);
  };

  const SlideDirection = (props) => {
    return <Slide {...props} direction="left" />;
  };

  const closeToaster = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setToaster(false);
  };
  return (
    <>
      <Snackbar
        open={Toaster}
        message="link copied to clipboard"
        onClose={closeToaster}
        autoHideDuration={3000}
        TransitionComponent={SlideDirection}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />
      {isOpen && (
        <SmolModal
          handleShortURL={handleShortURL}
          handleclose={() => setOpen(false)}
        />
      )}
      <Navbar />
      <Box mt={5} mx={2}>
        <Grid container justifyContent={"center"}>
          <Grid item xs={12} sm={8}>
            <Box display="flex" mb={5}>
              <Typography mr={3} variant="h4">
                Links
              </Typography>

              <Button
                disableElevation
                variant="contained"
                color="secondary"
                onClick={() => {
                  setOpen(true);
                }}
              >
                <Typography
                  color="white"
                  display="flex"
                  justifyContent="center"
                  fontWeight={600}
                  alignContent="space-around"
                  mr={1}
                >
                  Create New
                </Typography>
                <AddCircleIcon sx={{ color: "#fff" }} />
              </Button>
            </Box>
            <Box>
              {Loading ? (
                <Box display="flex" justifyContent="center" mt={5}>
                  <CircularProgress color="primary" />
                </Box>
              ) : links.length == 0 ? (
                <Box display="flex" alignItems="center" flexDirection="column">
                  <img
                    src="/assets/no links.svg"
                    alt="no links"
                    style={{ width: "250px", height: "auto" }}
                  ></img>
                  <Typography>No Links</Typography>
                  <Typography variant="body2">
                    Start Creating New Links by clicking Create New button
                  </Typography>
                </Box>
              ) : (
                links
                  .sort(
                    (prevLink, nextLink) =>
                      nextLink.createdAt - prevLink.createdAt
                  )
                  .map((link, idx) => (
                    <Fragment key={link.id}>
                      <LinkCard
                        {...link}
                        deleteLink={handleDelete}
                        copyLink={copyToClipBoard}
                      />
                      {idx !== links.length - 1 && <Divider />}
                    </Fragment>
                  ))
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default Account;
