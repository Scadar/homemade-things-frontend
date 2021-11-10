import React, { FC } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Home: FC = () => {
    return (
        <Box sx={ { p: 2 } }>
            <Typography variant={ "h5" }>Projects page</Typography>
            <Link to="/selectedGood/:id">
            <Button
                variant="contained"
                color="primary"
            >
                Посмотреть определенный товар
            </Button>
        </Link>
        </Box>

    );
};

export default Home;