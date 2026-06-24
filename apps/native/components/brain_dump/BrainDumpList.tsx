import { BrainDumpResponse } from "@davedhd/features/brain_dump/types";
import BrainDumpDisplay from "./BrainDumpDisplay";

type BrainDumpListProps = {
    items: BrainDumpResponse[];
}

export default function BrainDumpList({ items }: BrainDumpListProps) {
    return (
        <>
            {items.map(dump => (
                <BrainDumpDisplay key={dump.id} {...dump} />
            ))}
        </>
    )
}