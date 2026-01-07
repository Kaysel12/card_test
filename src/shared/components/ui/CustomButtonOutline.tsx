import { buttonOutline, textButtonOutline } from "@/shared/styles/buttons";
import { Box, Button } from "@mui/material";

interface CustomButtonProps {
  onCancel?: () => void;
  onSave?: () => void;
  saveText?: string;
  variant?: boolean;
}

export default function CustomButtonOutline({
  onSave,
  saveText = "Guardar cambios",
  variant = true,
}: Readonly<CustomButtonProps>) {
  return (
    <Box display="flex" gap={2} justifyContent="flex-end">
      {variant && (
        <Box display="flex" gap={2} justifyContent="flex-end">
            <Button
                onClick={onSave}
                variant="outlined"
                sx={{
                    ...buttonOutline,
                    ...textButtonOutline,
                     border: 'none' ,
                }}
            >
                {saveText}
            </Button>
        </Box>
      )}
    </Box>
  );
}
