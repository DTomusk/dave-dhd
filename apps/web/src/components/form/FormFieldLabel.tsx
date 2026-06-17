import { Flex, Text } from "@radix-ui/themes";

interface FormFieldLabelProps {
    htmlFor: string;
    label: string;
}

export default function FormFieldLabel({ htmlFor, label }: FormFieldLabelProps) {
    return (
        <Flex mb="1">
            <Text
                as="label"
                htmlFor={htmlFor}
                size="2"
                weight="bold"
            >
                {label}
            </Text>
        </Flex>
    )
}