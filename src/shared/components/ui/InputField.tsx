import { IInputField } from "@/shared/interfaces/ITextFields"
import { Box, TextField, Typography } from "@mui/material"

export const InputField = (
    { 
        text,
        error,
        value, 
        placeholder, 
        inputMode, 
        onChange, 
        maxLength,
        type, 
    } : IInputField
)=> {
    return (
            <Box>
                <Typography sx={{mb: 1, fontWeight: "bold"}}>{text}</Typography>
                <TextField
                    value={value || ''}
                    placeholder={placeholder || '0000 0000 0000 0000'}
                    inputMode={inputMode}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
                        onChange?.(e)
                    }}
                    type={type}
                    slotProps={{
                        htmlInput: { 
                            maxLength: maxLength || 16
                        }
                    }}
                    sx={{
                        backgroundColor: "#F9FAFB",
                        "& .MuiOutlinedInput-root": { 
                            borderRadius: "10px",
                            height: '40px',
                            width: '100%', 
                        },
                    }}
                    error={Boolean(error)}
                    helperText={error}
                />
            </Box>
    )
}