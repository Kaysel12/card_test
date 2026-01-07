"use client";
import { InputField } from "@/shared/components/ui/InputField";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import { maskCardNumber, maskName } from "@/shared/utils/mask";
import { isValidExpiry } from "@/shared/utils/validation";
import { useCardServices } from "../hooks/useCardService";
import { useAlert } from "@/shared/context/AlertProvider";

interface Props {
	onChange: (data: {
		cardNumber: string;
		cardHolder: string;
		expiry: string;
	}) => void;
}

export default function CardForm({ onChange }: Readonly<Props>) {
	const [formData, setFormData] = useState({
		cardNumber: "",
		cardHolder: "",
		expiry: "",
	});
    const [cvv, setCvv] = useState("");
    const [errors, setErrors] = useState({
        cardNumber: "",
        expiry: "",
        cardHolder: "",
        cvv: "",
    });
    const { createCard } = useCardServices();
    const { showAlert } = useAlert();

    const limpiarDatos = () => {
        setFormData({
            cardNumber: "",
            cardHolder: "",
            expiry: "",
        });
        setCvv("");
        setErrors({
            cardNumber: "",
            expiry: "",
            cardHolder: "",
            cvv: "",
        });
    }
    
    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const masked = maskCardNumber(e.target.value);

        setFormData(prev => ({ ...prev, cardNumber: masked }));
        onChange({ ...formData, cardNumber: masked });

        const digits = masked.replaceAll(/\s/g, "");

        if (digits.length === 16) {
            setErrors(prev => ({ ...prev, cardNumber: "" }));
        } else {
            setErrors(prev => ({ ...prev, cardNumber: "Debe contener 16 dígitos" }));
        }
    };

    const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replaceAll(/\D/g, "").slice(0, 4);

        if (value.length >= 3) {
            value = value.replace(/(\d{2})(\d{1,2})/, "$1/$2");
        }

        setFormData(prev => ({ ...prev, expiry: value }));

        if (isValidExpiry(value)) {
            setErrors(prev => ({ ...prev, expiry: "" }));
        } else {
            setErrors(prev => ({ ...prev, expiry: "Fecha inválida" }));
        }
    };

    const handleCardHolderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const masked = maskName(e.target.value);

        setFormData(prev => ({ ...prev, cardHolder: masked }));
        onChange({ ...formData, cardHolder: masked });

        if (masked) {
            setErrors(prev => ({ ...prev, cardHolder: "" }));
        } else {
            setErrors(prev => ({ ...prev, cardHolder: "Campo requerido" }));
        }
    };

    const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replaceAll(/\D/g, "").slice(0, 3);
        setCvv(value);

        if (value.length === 3) {
            setErrors(prev => ({ ...prev, cvv: "" }));
        } else {
            setErrors(prev => ({ ...prev, cvv: "CVV inválido" }));
        }
    };

    const handleSubmit = async () => {

        const newErrors = {
            cardNumber: "",
            expiry: "",
            cardHolder: "",
            cvv: ""
        };

        if (formData.cardNumber.replaceAll(/\s/g, "").length !== 16)
            newErrors.cardNumber = "Debe contener 16 dígitos";

        if (!isValidExpiry(formData.expiry))
            newErrors.expiry = "Fecha inválida";

        if (!formData.cardHolder)
            newErrors.cardHolder = "Campo requerido";

        if (cvv.length !== 3)
            newErrors.cvv = "CVV inválido";

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some(e => e !== "");
        if (hasErrors) return;

        try {
            await createCard({
                cardNumber: formData.cardNumber,
                cardHolderName: formData.cardHolder,
                expiryDate: formData.expiry,
                cvv
            });
            limpiarDatos();
            showAlert("Tarjeta agregada correctamente", "success");
        } catch {
            console.log("Error al crear la tarjeta");
        }

    };


	return (
		<Box 
            sx={{ 
                display: "grid", 
                gridTemplateColumns: "1fr 1fr", 
                gap: 6,
                border: "1px solid #06122c40",
                paddingTop: 12,
                paddingBottom: 8,
                paddingX: 10,
                borderRadius: "12px", 
                width: 460,
                mt: -6
            }}>
            <InputField
                text="Número de Tarjeta"
                value={formData.cardNumber}
                placeholder="0000 0000 0000 0000"
                inputMode="numeric"
                onChange={handleCardNumberChange}
                maxLength={19}
                error={errors.cardNumber}
            />

			<InputField 
                text="Fecha de Expiración"
                value={formData.expiry}
                placeholder="MM/AA"
                onChange={handleExpiryChange}
                maxLength={5}
                error={errors.expiry}
            />

			<InputField 
                text="Nombre Titular"
                value={formData.cardHolder}
                placeholder="Nombre del titular"
                inputMode="text"
                onChange={handleCardHolderChange}
                maxLength={20}
                error={errors.cardHolder}
            />

            <InputField
                text="CVV"
                placeholder="123"
                inputMode="numeric"
                value={cvv}
                maxLength={3}
                type="password"
                onChange={handleCvvChange}
                error={errors.cvv}
            />

			<Box sx={{ gridColumn: "1 / -1", display: "flex", gap: 2 }}>
				<Button variant="contained" onClick={handleSubmit}>
                    Agregar Tarjeta
                </Button>
				<Button variant="outlined" onClick={limpiarDatos}>Cancelar</Button>
			</Box>
		</Box>
	);
}
