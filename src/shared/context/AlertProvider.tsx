'use client'
import { createContext, useContext } from 'react';
import ActionAlerts from '@/shared/components/ModalAlertDisplay';
import { useAlertModal } from '@/shared/hook/useAlertModal';

const AlertContext = createContext({
  showAlert: (message: string, severity?: 'success' | 'error' | 'warning' | 'info') => {
    console.warn(severity, message); 
  },
});

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const { open, message, severity, showAlert, handleClose } = useAlertModal();

  return (
    <AlertContext.Provider value={{ showAlert }}>
        <ActionAlerts
          open={open}
          onClose={handleClose}
          message={message}
          severity={severity}
        />
        {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
