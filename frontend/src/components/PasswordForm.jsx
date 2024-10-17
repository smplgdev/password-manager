import {Box, Button, Grid2, Input, TextareaAutosize} from "@mui/material";
import {useState} from "react";
import {STYLES} from "../services/constants";


const PasswordForm = ({ onSave }) => {
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [websiteName, setwebsiteName] = useState('')
    const [comment, setComment] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(websiteName, username, password, comment); // Pass the new password back to parent component
    };

    const boxStyles = Object.assign(STYLES.centeredBox, {})

    return (
        <Box
            sx={boxStyles}
        >
            <form onSubmit={handleSubmit}>
                <Box>
                    <Grid2 sx={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}>
                        <Grid2 size={5} sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "50%"
                        }}>
                            <Input
                                type="text"
                                placeholder="Website name"
                                value={websiteName}
                                sx={{ mb: 2 }}
                                onChange={(e) => setwebsiteName(e.target.value)}
                            />
                            <Input
                                type="text"
                                placeholder="Username"
                                value={username}
                                sx={{ mb: 2 }}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <Input
                                type="text"
                                placeholder="Enter new password"
                                value={password}
                                sx={{ mb: 2 }}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid2>
                        <Grid2 size={6} sx={{height: "100%"}}>
                            <TextareaAutosize
                                sx={{height: "100%", width: "100%"}}
                                minRows={8}
                                maxRows={8}
                                placeholder="Comment (optionally)"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </Grid2>
                    </Grid2>
                    <Button type="submit" variant="outlined" onClick={handleSubmit}>Save password</Button>
                </Box>
            </form>
        </Box>
    )
}

export default PasswordForm
