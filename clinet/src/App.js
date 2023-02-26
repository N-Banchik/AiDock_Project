import "./App.css";
import Contact from "./controllers/contact.js";

import { ThemeProvider } from "@mui/system";
import { createTheme } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#f50057",
    },
    secondary: {
      main: "#00bcd4",
    },
  },
});
const contact = {
  firstName: "avi",
  nickName: "",
  lastName: "baba",
  phoneNumber: "05467897987",
  id: 2,
};
const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <Contact {...contact} />
      </div>
    </ThemeProvider>
  );
};

export default App;
