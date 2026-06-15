import { Box, Flex, Text } from "@radix-ui/themes";
import type { BrainDumpResponse } from "../types";
import FormatDateTime from "../../../lib/date_time";

export default function BrainDumpDisplay(item: BrainDumpResponse) {
    return (
        <Box>
            <Flex direction="row" justify="between" align="center">
                <Text>
                    {item.content}
                </Text>
                <Text>
                    {FormatDateTime(item.created_at)}
                </Text>
            </Flex>
        </Box>
    )
}