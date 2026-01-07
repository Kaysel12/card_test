'use client';
import { Box } from "@mui/material";
import { useState } from "react";
import CreditCardPreview from "./CreditCardPreview";
import CardForm from "./CardForm";
import { CardMessagesPanel } from "./CardMessagesPanel";

export default function DashboardPage() {
	const [cardData, setCardData] = useState({
		cardNumber: "",
		cardHolder: "",
		expiry: "",
	});

	return (
		<Box sx={{ display: "flex", justifyContent: "space-around", p: 2 }}>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					minHeight: "100vh",
				}}
			>
				<CreditCardPreview
					cardNumber={cardData.cardNumber}
					cardHolder={cardData.cardHolder}
					expiry={cardData.expiry}
				/>

				<CardForm
					onChange={(data) =>
						setCardData((prev) => ({ ...prev, ...data }))
					}
				/>
			</Box>

			<Box 
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<CardMessagesPanel />
			</Box>

		</Box>
	);
}
