// .env constants
export const API_URL = process.env.REACT_APP_API_BASE_URL

// other constants
export const STYLES = {
    centeredBox: {
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid lightgray',
        borderRadius: 2,
        p: { xs: 1, sm: 2 }, // Padding adjusts to smaller values on extra-small screens
        mb: 2,
        width: { xs: '95%', sm: '35rem' }, // Full width on small screens, fixed width on larger
        margin: '20px auto',
    }
}