import { Box, TextField } from "@radix-ui/themes";
import FormFieldLabel from "./FormFieldLabel";

interface FormFieldProps {
    label: string;
    placeholder: string;
    id: string;
}

export default function FormField({ label, placeholder, id }: FormFieldProps) {
    return (
        <Box mb="5">
            <FormFieldLabel htmlFor={id} label={label} />
            <TextField.Root
                placeholder={placeholder}
                id={id}
            />
        </Box>
    );
}