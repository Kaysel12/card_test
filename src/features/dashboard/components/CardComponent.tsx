"use client";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { cardInformationDefault, cardInformationInProgress, cardNumberStyleDefault, cardNumberStyleInProgress, titleCardDefault, titleCardInProgress, titleStyleDefault, titleStyleInProgress } from "../styles/styles";

interface CardComponentProps {
    id?: string;
    cardLastNumbers?: string;
    cardNumber?: string;
    cardHolderName?: string;
    expiryDate?: string;
    status?: string;
    isDefault?: boolean;
    cardType?: string;
    cardImage?: string;
    cardColor?: string;
    cardStyle?: React.CSSProperties;
    onCardClick?: () => void;
    onDeleteClick?: () => void;
    isSelected?: boolean;

}

export default function CardComponent({
    cardLastNumbers,
    cardNumber,
    cardHolderName,
    expiryDate,
    status,
    isDefault = false,
    cardType,
    cardImage = cardType === 'mastercard' ? '/assets/masterCard.svg' : '/assets/visaCard.svg',
    cardColor = status === 'accepted'? 'linear-gradient(71.13deg, #006EAE -9.13%, #2BA9EB 103.15%)' : '#FFFFFF',
    onCardClick = () => {},
    onDeleteClick = () => {},
    isSelected = false,

}: Readonly<CardComponentProps>){
    return (
        <Box
            sx={{ position: 'relative', width: '324px', height:'173px', borderRadius: '14px', cursor: 'pointer' }}
            onClick={(e) => {
                e.stopPropagation();
                onCardClick();
            }}
        >
            <Box sx={{
                width: '324px', 
                height:'173px', 
                borderRadius: '14px', 
                cursor: 'pointer'
            }} onClick={onCardClick}>
                <Box sx={{
                    backgroundImage: cardColor, 
                    width: '100%', 
                    height: '100%', 
                    borderRadius: '14px', 
                    border: '1px solid #DCDCDCA1',
                    display: 'flex',
                    boxShadow: '2px 4px 4px #DCDCDCA1',
                }}>
                    <Box width={'100%'} sx={{fontSize: '16px', color: '#00254B', padding: '20px 20px', display: 'flex', flexDirection: 'column'}}>
                        <Box display={'flex'} justifyContent={'space-between'} width={'100%'}>
                            <Typography sx={status === 'accepted' ? titleCardDefault : titleCardInProgress}>
                                Tarjeta {cardLastNumbers}
                            </Typography>
                            {isDefault ? (
                                <Box sx={{
                                    fontWeight: '600',
                                    fontSize: '10px',
                                    color: '#FFFFFF',
                                    lineHeight: '24px',
                                    fontStyle: 'SemiBold',
                                    borderRadius: '50px',
                                    border: '0.5px solid #FFFFFF',
                                    backgroundColor: '#1DB0A3',
                                    padding: '0px 20px'
                                }}>
                                    Predeterminada
                                </Box>
                            ) : status === 'inProgress' ? (
                                <Box sx={{
                                    fontWeight: '600',
                                    fontSize: '10px',
                                    color: '#229DDE',
                                    lineHeight: '24px',
                                    fontStyle: 'SemiBold',
                                    borderRadius: '50px',
                                    border: '0.5px solid #FFFFFF',
                                    backgroundColor: '#97D9FF4A',
                                    padding: '0px 20px'
                                }}>
                                    Por confirmar
                                </Box>
                            ) : null}
                        </Box>
                        <Box sx={{marginTop: '12%',}}>
                            <Typography sx={status === 'accepted' ? cardNumberStyleDefault : cardNumberStyleInProgress}>
                                {cardNumber}
                            </Typography>
                        </Box>
                        <Box 
                            display={'flex'} 
                            sx={{
                                marginTop: '20px', 
                                justifyContent: 'space-between'
                            }}>
                            <Box>
                                <Typography sx={status === 'accepted' ? titleStyleDefault : titleStyleInProgress}>
                                    A nombre de
                                </Typography>
                                <Typography sx={status === 'accepted' ? cardInformationDefault : cardInformationInProgress}>
                                    {cardHolderName}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography sx={status === 'accepted' ? titleStyleDefault : titleStyleInProgress}>
                                    Válido hasta
                                </Typography>
                                <Typography sx={status === 'accepted' ? cardInformationDefault : cardInformationInProgress}>
                                    {expiryDate}
                                </Typography>
                            </Box>
                            <Box>
                                <Image src={cardImage} alt="Tarjeta Logo" width={82} height={50} />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            {isSelected && (
                <Box sx={{
                    position: 'absolute',
                    top: '-15px',
                    right: '-15px',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                }} onClick={(e) => {
                    e.stopPropagation();
                    console.log("Eliminar tarjeta");
                    onDeleteClick();
                }}>
                    <Image src="/assets/trashIcon.svg" alt="Eliminar tarjeta" width={20} height={20} />
                </Box>
            )}
        </Box>
    );
}