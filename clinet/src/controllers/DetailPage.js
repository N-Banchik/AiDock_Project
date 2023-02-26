import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  GetContactById,
  DeletePhoneNumber,
  AddNewPhoneNumber,
} from "../services/contactService";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import PhoneIcon from "@mui/icons-material/Phone";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

export default function Details(props) {
  const [isOpen, setOpen] = React.useState(props.open);
  const [contact, setContact] = React.useState();
  const [phoneAdd, setPhoneAdd] = React.useState(false);
  const [phoneNumberToAdd, setPhoneNumberToAdd] = React.useState();
  const handleClose = () => {
    setOpen(false);
  };

  const addNumber = async () => {
    const params = { contactId: contact.id, number: phoneNumberToAdd };
    await AddNewPhoneNumber(params);
    setPhoneNumberToAdd("");
    setPhoneAdd(false);
    getContact();
  };
  const generatePhoneNumbers = () => {
    return contact?.phoneNumbers.map((value) => {
      return (
        <ListItem
          key={value.id}
          secondaryAction={
            <>
              <IconButton>
                <EditIcon />
              </IconButton>

              {contact?.phoneNumbers.length < 2 ? (
                ""
              ) : (
                <IconButton
                  onClick={() => {
                    deleteNumber({ contactId: contact.id, PhoneId: value.id });
                  }}
                  edge="end">
                  <DeleteIcon />
                </IconButton>
              )}
            </>
          }>
          <ListItemAvatar>
            <Avatar>
              <PhoneIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={value.PhoneNumber} />
        </ListItem>
      );
    });
  };

  const getContact = async () => {
    const toReturn = await GetContactById(props.id);
    console.log(toReturn);
    setContact(toReturn);
  };

  const deleteNumber = async (deleteParams) => {
    const deleted = await DeletePhoneNumber(deleteParams);
    if (deleted > 0) {
      getContact();
    }
  };

  React.useEffect(() => {
    getContact();
  }, []);

  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>{`${contact?.firstName} ${contact?.lastName}`}</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText>
            <List>
              {generatePhoneNumbers()}
              <ListItem>
                {phoneAdd ? (
                  <>
                    <PhoneInput
                      placeholder="Enter phone number"
                      defaultCountry="IL"
                      value={phoneNumberToAdd}
                      onChange={setPhoneNumberToAdd}
                    />

                    <Button variant="contained" onClick={addNumber}>
                      Add
                    </Button>
                  </>
                ) : (
                  ""
                )}
              </ListItem>
            </List>
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center">
              <Grid item={true} xs>
                <IconButton color="primary">
                  <AddCircleOutlinedIcon
                    onClick={() => {
                      setPhoneAdd(!phoneAdd);
                    }}
                  />
                </IconButton>
              </Grid>
            </Grid>
            <Divider />
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={3}
              wrap="wrap">
              <Grid item={true} xs>
                {`Address: ${contact?.address.streetNumber}`}
              </Grid>
              <Grid item={true} xs>
                {`City: ${contact?.address.city}`}
              </Grid>
              <Grid item={true} xs>
                {`Country: ${contact?.address.country}`}
              </Grid>
              <Grid item={true} xs>
                {`Zipcode: ${contact?.address.zip}`}
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
