import { Container, Button, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { deleteUser } from './../services/index';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'sticky',
    backgroundColor: 'rgb(230,230,230)',
    borderRadius: '8px',
    width: '400px',
    border: '5px solid black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '50px',
  },
}));

export default function DeleteWarning({
  deleteProspect,
  setDeleteProspect,
  setShowDeleteWarning,
  authUser,
  setUsers,
}) {
  const classes = useStyles();

  const handleDelete = async (user) => {
    if (authUser._id === user._id) {
      alert(
        `The Benutzer ${authUser.username} ist aktiv und kann nicht geloescht werden `
      );
    } else {
      const remainingUsers = await deleteUser(user, authUser);
      setUsers(remainingUsers);
      setShowDeleteWarning(false);
    }
  };

  return (
    <>
      <Container className={classes.container}>
        <Box>
          <Typography variant="h5">
            {deleteProspect.username} wirklich lö­schen?
          </Typography>
          <br></br>
          <Button
            onClick={() => handleDelete(deleteProspect)}
            style={{ backgroundColor: 'red' }}
          >
            JA
          </Button>
          <Button
            onClick={() => {
              setShowDeleteWarning(false);
              setDeleteProspect(null);
            }}
          >
            NEIN
          </Button>
        </Box>
      </Container>
    </>
  );
}
