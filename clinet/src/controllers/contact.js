import { React, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Details from "./DetailPage";

function Contact(props) {
  const [isOpen, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(!isOpen);
  };

  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea onClick={handleClickOpen}>
          <CardMedia
            component="img"
            height="100"
            image="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.nickName
                ? props.nickName
                : `${props.firstName} ${props.lastName}`}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      {isOpen ? <Details open={isOpen} id={props.id} /> : ""}
    </div>
  );
}

export default Contact;
