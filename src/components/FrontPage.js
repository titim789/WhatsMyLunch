import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { Container, Button, Stack } from "@mui/material";
import { Header } from "./header";
import { toast } from "react-toastify";

import wmlIcon from "../assets/images/WhatsMyLunch.png";
import surpriseIcon from "../assets/images/SurpriseMe.png";
import CustomPalette from "./custom/CustomPalette";
import { Context } from "./custom/Context";

const FrontPage = ({ checkAuth, setHasAccess }) => {
  useEffect(checkAuth, []);
  const navigate = useNavigate();
  const [userChoice, setUserChoice] = useContext(Context);

  useEffect(() => {
    checkAuth();
  }, []);

  const handleClick = (choice) => {
    if (choice === "lunch" || choice === "surprise") {
      setUserChoice(choice);
      navigate("/SuggestFood");
    } else {
      toast.error("ERROR IN USER'S CHOICE");
    }
  };

  const theme = CustomPalette();

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Header />
        <Container color="">
          <Button
            variant="contained"
            sx={{
              fontSize: 24,
              width: "250px",
              height: "250px",
              margin: "10vh",
            }}
            color="lunch"
            onClick={() => {
              handleClick("lunch");
            }}
          >
            <Stack
              direction="column"
              alignItems="center"
              justifyContent={"center"}
            >
              <img
                src={wmlIcon}
                style={{ width: "100px", height: "100px" }}
                alt=""
              />
              Whats My Lunch
            </Stack>
          </Button>
          <Button
            variant="contained"
            sx={{
              fontSize: 24,
              width: "250px",
              height: "250px",
              margin: "10vh",
            }}
            color="surprise"
            onClick={() => {
              handleClick("surprise");
            }}
          >
            <Stack
              direction="column"
              alignItems="center"
              justifyContent={"center"}
            >
              <img
                src={surpriseIcon}
                style={{
                  width: "100px",
                  height: "100px",
                  paddingBottom: "10px",
                }}
                alt=""
              />
              Surprise Me
            </Stack>
          </Button>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default FrontPage;
