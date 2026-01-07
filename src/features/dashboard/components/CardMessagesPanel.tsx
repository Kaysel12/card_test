"use client";
import { Box, Paper, Typography } from "@mui/material";
import { useCardServices } from "../hooks/useCardService";

export const CardMessagesPanel = () => {
    const { data} = useCardServices();

  return (
    <Paper
      elevation={3}
      style={{
        width: 340,
        height: 420,
        padding: 12,
        overflowY: "auto",
        borderRadius: 12,
      }}
    >
      <Typography fontWeight="bold" mb={1}>
        Tarjetas agregadas
      </Typography>

      {!data.length && (
        <Typography variant="body2" color="gray">
          Aún no has agregado tarjetas
        </Typography>
      )}

      {data.map(card => (
        <Box
          key={card.id}
          sx={{
            background: "#F3F4F6",
            padding: 1.2,
            borderRadius: 3,
            marginBottom: 1,
          }}
        >
          <Typography fontSize={14} fontWeight="bold">
            {card.cardNumberMasked}
          </Typography>

          <Typography fontSize={12}>
            👤 {card.cardHolderName}
          </Typography>

          <Typography fontSize={12}>
            ⏳ {card.expiryDate}
          </Typography>
        </Box>
      ))}
    </Paper>
  );
};
