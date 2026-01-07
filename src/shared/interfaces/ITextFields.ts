export interface IInputField {
    text: string;
    value?: string;
    placeholder: string;
    inputMode?: "numeric" | "decimal" | "text" | "tel";
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    maxLength?: number;
    type?: string;
    error?: string;
}