import { Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div>
      <Typography variant="h4">404 - Page Not Found</Typography>
      <Button component={Link} to="/" variant="contained" sx={{ mt: 2 }}>
        Go to Home
      </Button>
    </div>
  )
}