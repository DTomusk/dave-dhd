import type { BrainDumpResponse } from "@davedhd/features/brain_dump/types";
import BrainDumpDisplay from "./BrainDumpDisplay";
import { Box, Separator } from "@radix-ui/themes";

type BrainDumpListProps = {
    items: BrainDumpResponse[];
}

export default function BrainDumpList({ items }: BrainDumpListProps) {
    return (
        <>
            {items.map(dump => (
                <Box key={dump.id}>
                    <BrainDumpDisplay {...dump} />
                    <Separator size="4" />
                </Box>
            ))}
        </>
    )
}