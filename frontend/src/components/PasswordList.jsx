import { Box, Typography } from "@mui/material";

import PasswordBox from "./PasswordBox";


const PasswordList = ({ passwords }) => {


    return (
        <Box>
            {passwords.length > 0 ? (
                passwords.map((passwordObj, index) => (
                    <PasswordBox key={index} passwordObj={passwordObj} />
                ))
            ) :
                (
                    <Typography variant="body1">No passwords yet</Typography>
                )}
        </Box>
    )
}

export default PasswordList;
