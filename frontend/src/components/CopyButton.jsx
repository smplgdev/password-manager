import { Button } from "@mui/material"
import ContentCopyIcon from '@mui/icons-material/ContentCopy';


export const CopyButton = ({onClick}) => {
    return (
        <Button
        variant="outlined"
        startIcon={<ContentCopyIcon />}
        onClick={onClick}
        >
            Copy
        </Button>
    )
}
