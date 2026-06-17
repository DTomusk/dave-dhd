import { useSearchParams } from "react-router-dom";
import Pagination from "../components/ui/Pagination";
import { Container, Flex, Heading, Spinner } from "@radix-ui/themes";
import BrainDumpList from "../components/brain_dump/BrainDumpList";
import { useBrainDumps } from "@davedhd/features/brain_dump/hooks/useBrainDumps";
import BackLink from "../components/ui/BackLink";

export default function BrainDumpPage() {
    const [searchParams, setSearchParams] = useSearchParams();

    const page = parseInt(searchParams.get("p") ?? "0", 10);
    const perPage = 10;

    const offset = page * perPage;

    const { data, isLoading } = useBrainDumps(offset, perPage);
    const totalPages = data ? Math.ceil(data.total / perPage) : 0;

    // TODO: this page should have the latest brain dumps in it 
    // And a button to view all that takes you to a paginated page 
    // There you will be able to stuff
    return (
        <Container size="2">
            <BackLink to="/" />
            <Flex direction="column" gap="6" mt="6">
                <Heading>
                    Brain dumps
                </Heading>
                {isLoading && <Spinner />}
                {data && <BrainDumpList items={data.items} />}
                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={(newPage) => setSearchParams({ p: newPage.toString() })}
                />
            </Flex>
        </Container>
    )
}