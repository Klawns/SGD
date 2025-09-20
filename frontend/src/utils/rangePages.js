import { range } from "./range";
import { constants } from "../constants/constants";

export function rangePages(totalPages, currentPage) {
	if (constants.totalPagesNumbers >= totalPages) {
		return range(1, totalPages);
	}

	const leftSiblingIndex = Math.max(currentPage - constants.siblingCount, 1);
	const rightSiblingIndex = Math.min(
		currentPage + constants.siblingCount,
		totalPages
	);

	const shouldShowLeftDots = leftSiblingIndex >= 2;
	const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

	const firstPageIndex = 1;
	const lastPageIndex = totalPages;

	if (!shouldShowLeftDots && shouldShowRightDots) {
		const leftItemCount = 3 + 2 * constants.siblingCount;
		const leftRange = range(1, leftItemCount);

		return [...leftRange, "...", totalPages];
	}

	if (shouldShowLeftDots && !shouldShowRightDots) {
		const rightItemCount = 3 + 2 * constants.siblingCount;
		const rightRange = range(
			totalPages - rightItemCount + 1,
			totalPages
		);
		return [firstPageIndex, "...", ...rightRange];
	}

	if (shouldShowLeftDots && shouldShowRightDots) {
		const middleRange = range(leftSiblingIndex, rightSiblingIndex);
		return [firstPageIndex, "...", ...middleRange, "...", lastPageIndex];
	}
}