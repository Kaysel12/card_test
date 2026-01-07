"use client"
import { useState } from "react";

export function useAlertModal() {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('info');

    const showAlert = (msg: string, sev: 'success' | 'error' | 'warning' | 'info' = 'info') => {
        setMessage(msg);
        setSeverity(sev);
        setOpen(true);

        setTimeout(() => {
            setOpen(false);
        }, 4000);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return {
        open,
        setOpen,
        message,
        severity,
        showAlert,
        handleClose,
    };
}