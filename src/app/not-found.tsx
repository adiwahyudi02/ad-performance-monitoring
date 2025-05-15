import { Typography, Button, Container } from "@mui/material";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="h1" component="h1" fontWeight="bold" color="primary">
        404
      </Typography>
      <Typography variant="body1" component="p">
        Oops! The page you are looking for does not exist.
      </Typography>
      <Button
        variant="outlined"
        color="primary"
        component={Link}
        href="/"
        sx={{ mt: 4 }}
      >
        Go Back to the main page
      </Button>
    </Container>
  );
}
