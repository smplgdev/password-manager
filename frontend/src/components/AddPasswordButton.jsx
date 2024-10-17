import { Box, Button } from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle';


const AddPasswordButton = ({onClick}) => {
    return (
        <Box
        sx={{
            p: {xs: 1, sm: 2},
            display: 'flex',
            justifyContent: 'center',
        }}>
            <Button
            variant="outlined"
            startIcon={<AddCircleIcon sx={{opacity: 0.7}} />}
            onClick={onClick}
            >
                Add password
            </Button>
        </Box>
    )
}

export default AddPasswordButton
