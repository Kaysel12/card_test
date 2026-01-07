import * as React from 'react';
import Alert from '@mui/material/Alert';
import { Box, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ActionAlertsProps {
    severity?: 'error' | 'warning' | 'info' | 'success';
    message?: string;
    open?: boolean;
    onClose?: () => void;
}

export default function ActionAlerts({
    severity = 'success',
    message,
    open,
    onClose,
}: Readonly<ActionAlertsProps>){
    return (
        <Box sx={{ width: '30%', position: 'fixed', top: 40, right: 50, zIndex: 1000 }}>
            <Collapse in={open}>
                <Alert
                severity={severity}
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={onClose}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                sx={{ mb: 2 }}
                >
                    {message}
                </Alert>
            </Collapse>
        </Box>
    );
}