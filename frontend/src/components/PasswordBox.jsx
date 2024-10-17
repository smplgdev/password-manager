import { Box, IconButton, TextField, Typography } from "@mui/material"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LinkIcon from '@mui/icons-material/Link';
import CommentIcon from '@mui/icons-material/Comment';
import { CopyButton } from "./CopyButton";
import { useState } from "react";
import toast from "react-hot-toast";
import { STYLES } from "../services/constants";



const PasswordBox = ({ index, passwordObj }) => {

    const [showPassword, setShowPassword] = useState(false);

    const handleClickTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    const capitalizeFirstLetter = (string) => {
        if (!string) return string; // Check for empty string
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const handleCopy = (type, text) => {
        navigator.clipboard.writeText(text);
        toast.success(`${capitalizeFirstLetter(type)} copied to clipboard!`);
    };

    return (
        <Box
            key={index}
            sx={STYLES.centeredBox}
        >

            {/* Website name section */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2,
                }}
            >
                <LinkIcon sx={{ mr: 1 }}></LinkIcon>
                <Typography variant="h6">{passwordObj.website_name}</Typography>
            </Box>

            {/* Username Section */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                }}
            >
                <Box>
                    <Typography variant="subtitle2">Username</Typography>
                    <Typography variant="body1">{passwordObj.username}</Typography>
                </Box>
                <CopyButton onClick={() => handleCopy('username', passwordObj.username)} />
            </Box>

            {/* Password Section */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Box>
                    <Typography variant="subtitle2">Password</Typography>
                    <TextField 
                        type={showPassword ? "text" : "password" } 
                        sx={{
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                border: 'none', // Remove the border
                              },
                              '& input': {
                                padding: 0,
                              }
                            },
                        }}
                        value={passwordObj.password}
                    />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton onClick={handleClickTogglePassword} sx={{ mr: 1 }}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                    <CopyButton onClick={() => handleCopy('password', passwordObj.password)} />
                </Box>
            </Box>

            {/* Comment Section */}
            {passwordObj.comment && (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mt: 2,
                    }}
                >
                    <CommentIcon sx={{ mr: 1, opacity: 0.5 }}></CommentIcon>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        {passwordObj.comment}
                    </Typography>
                </Box>
            )}
        </Box>
    )
}

export default PasswordBox
