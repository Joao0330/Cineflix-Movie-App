import type { Dispatch, SetStateAction } from 'react';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination';

interface SearchBrowsePaginationProps {
	page: number;
	setPage: Dispatch<SetStateAction<number>>;
	movies: MovieResponse | undefined;
}

export const SearchBrowsePagination = ({ page, setPage, movies }: SearchBrowsePaginationProps) => {
	const getPageNumbers = () => {
		const totalPages = movies?.total_pages || 1;
		const pages: (number | 'ellipsis')[] = [];
		const startPage = Math.max(1, page - 2);
		const endPage = Math.min(totalPages, page + 2);

		if (startPage > 1) {
			pages.push(1);
			if (startPage > 2) pages.push('ellipsis');
		}

		for (let i = startPage; i <= endPage; i++) {
			pages.push(i);
		}

		if (endPage < totalPages) {
			if (endPage < totalPages - 1) pages.push('ellipsis');
			pages.push(totalPages);
		}

		return pages;
	};

	return (
		<Pagination className='mt-8'>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious onClick={() => setPage(prev => prev - 1)} className={page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'} />
				</PaginationItem>
				{getPageNumbers().map((pageNumber, index) =>
					pageNumber === 'ellipsis' ? (
						<PaginationItem key={`ellipsis-${index}`}>
							<PaginationEllipsis />
						</PaginationItem>
					) : (
						<PaginationItem key={pageNumber}>
							<PaginationLink onClick={() => setPage(pageNumber)} isActive={page === pageNumber} className={page === pageNumber ? 'bg-blue-500 text-white' : 'cursor-pointer'}>
								{pageNumber}
							</PaginationLink>
						</PaginationItem>
					),
				)}
				<PaginationItem>
					<PaginationNext onClick={() => setPage(prev => prev + 1)} className={page === movies?.total_pages ? 'pointer-events-none opacity-50' : 'cursor-pointer'} />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};
