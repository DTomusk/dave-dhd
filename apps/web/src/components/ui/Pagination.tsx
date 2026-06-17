import { Button, Flex } from "@radix-ui/themes";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    return (
        <Flex direction="row" gap="1" justify="center">
            {/* Very naive implementation, add ellipses and arrows later */}
            {Array.from({ length: totalPages }, (_, i) => i).map(page => (
                <Button
                    radius="none"
                    key={page}
                    onClick={() => onPageChange(page)}
                    disabled={page === currentPage}
                >
                    {page + 1}
                </Button>
            ))}
        </Flex>
    )
}