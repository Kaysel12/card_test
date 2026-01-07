import { Box, Typography } from "@mui/material";
import Image from "next/image";

interface Props {
	cardNumber?: string;
	cardHolder?: string;
	expiry?: string;
}

export default function CreditCardPreview({
	cardNumber = "5375 4411 4540 0954",
	cardHolder = "DONALD FLINCH CORTEZ",
	expiry = "06/24",
}: Readonly<Props>) {
    
	return (
		<Box
			sx={{
				width: 420,
				height: 240,
				borderRadius: "18px",
				padding: "28px 32px",
				background:
					"radial-gradient(circle at top left, #131A26, #131A26 70%)",
				color: "#cfd6e4",
				boxShadow: "0px 5px 20px rgba(0,0,0,0.6)",
				position: "relative",
			}}
		>
			<Box display="flex" justifyContent="space-between">
				<Box display="flex" alignItems="center" gap={2}>
					<Typography
						fontSize={28}
						fontWeight={600}
						color="#ffffff"
					>
						monobank
					</Typography>
					<Box
						sx={{
							width: "2px",
							height: 28,
							backgroundColor: "#3a4252",
						}}
					/>
					<Typography
						fontSize={20}
						color="#434C59"
					>
						Universal Bank
					</Typography>
				</Box>

				<Image
					src="/assets/frecuency.png"
					alt="contactless"
					width={40}
					height={50}
				/>
			</Box>

			<Box mt={2} ml={-0.6}>
				<Image
					src="/assets/chip.png"
					alt="chip"
					width={65}
					height={55}
				/>
			</Box>

			<Typography
				// className={robotoMono.className}
				sx={{
					mt: 0.3,
                    ml: 2.8,
					fontSize: 26,
					letterSpacing: "4px",
					color: "#536872",
					textShadow: "0px 1px 2px rgba(0,0,0,.8)",
				}}
			>
				{cardNumber}
			</Typography>

			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
			>
				<Box sx={{display: "flex", flexDirection: "column", minWidth: "300px"}}>
                    <Box textAlign="right" sx={{display: 'flex', alignSelf: 'end', mb: 1}}>
                        <Typography 
                            fontSize={8} 
                            color="#434C59"
                            sx={{ whiteSpace: "pre-line" }}
                        >
                            VALID <br/>
                            THRU
                        </Typography>
                        <Typography
                            // className={robotoMono.className}
                            fontSize={16}
                            color="#536872"
                            sx={{ml: '10px'}}
                        >
                            {expiry}
                        </Typography>
                    </Box>
                    
                    {/* Holder */}
					<Typography
						// className={robotoMono.className}
						fontSize={16}
                        color="#536872"
						letterSpacing={2}
					>
						{cardHolder}
					</Typography>
                </Box>

				<Image
					src="/assets/masterCard.svg"
					alt="mastercard"
					width={120}
					height={100}
				/>
			</Box>
		</Box>
	);
}
