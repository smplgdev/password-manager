import { Box, Typography } from "@mui/material";

import PasswordBox from "./PasswordBox";


const PasswordList = ({ passwords, setReload }) => {

    return (
        <Box>
            {passwords.length > 0 ? (
                passwords.map((passwordObj, index) => (
                    <PasswordBox key={index} passwordObj={passwordObj} setReload={setReload} />
                ))
            ) :
                (
                    <Typography variant="body1">No passwords yet</Typography>
                )}
        </Box>
    )
}

export default PasswordList;
