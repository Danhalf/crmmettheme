/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx';
import { useState, useEffect, useMemo } from 'react';
import { Form } from 'react-bootstrap';
import {
    DefaultRecordsPerPage,
    RecordsPerPage,
    RecordsPerPageSteps,
    VisiblePageCount,
} from 'common/settings/settings';
import { useQueryRequest } from 'common/core/QueryRequestProvider';

interface CustomPaginationProps {
    records: number;
    initialCurrentPage?: number;
    count?: number;
    onPageChange?: (pageNumber: number) => void;
    onCountChange?: (countNumber: RecordsPerPage) => void;
}

const updatePageNumbers = (length: number): number[] => {
    return Array.from({ length }, (_, index) => index);
};

export const CustomPagination = ({
    records,
    initialCurrentPage = 0,
    onPageChange,
    count = DefaultRecordsPerPage,
    onCountChange,
}: CustomPaginationProps) => {
    const { state } = useQueryRequest();
    const [currentPage, setCurrentPage] = useState<number>(initialCurrentPage);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [pageNumbers, setPageNumbers] = useState<number[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [recordsPerPage, setRecordsPerPage] = useState<number>(count);

    useEffect(() => {
        setIsLoading(true);
        const total = Math.ceil(records / recordsPerPage);
        setTotalPages(total);
        setPageNumbers(updatePageNumbers(total));
        if (currentPage > totalPages) {
            setCurrentPage(total - 1);
        }
        setIsLoading(false);
    }, [records, count, recordsPerPage, totalPages, currentPage]);

    useMemo(() => setRecordsPerPage(state.count), [state.count]);

    const handlePageChange = (pageNumber: number) => {
        setIsLoading(true);
        if (onPageChange) {
            onPageChange(pageNumber);
        }
        setCurrentPage(pageNumber);
        setIsLoading(false);
    };

    const handleCountChange = (countNumber: RecordsPerPage) => {
        setIsLoading(true);
        if (onCountChange) {
            onCountChange(countNumber);
        }
        setRecordsPerPage(countNumber);
        setIsLoading(false);
    };

    return (
        <div className='w-100 ps-20 pe-2 py-6 col-sm-12 col-md-7 d-flex align-items-center justify-content-center'>
            <ul className='ms-auto pagination'>
                <li
                    className={clsx('page-item first', {
                        disabled: isLoading || currentPage === 0,
                    })}
                >
                    <a href='#' className='page-link' onClick={() => handlePageChange(0)}>
                        <i className='ki-outline ki-double-left fs-4'></i>
                    </a>
                </li>
                <li
                    className={clsx('page-item previous me-2', {
                        disabled: isLoading || currentPage === 0,
                    })}
                >
                    <a
                        href='#'
                        className='page-link'
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        <i className='ki-outline ki-left fs-4'></i>
                    </a>
                </li>

                {!pageNumbers.length && (
                    <li
                        className={clsx('page-item', {
                            disabled: isLoading,
                            active: true,
                        })}
                    >
                        <a href='#' className='page-link'>
                            {1}
                        </a>
                    </li>
                )}
                {pageNumbers.map((pageNumber) => {
                    if (
                        currentPage + VisiblePageCount > pageNumber &&
                        currentPage - VisiblePageCount < pageNumber
                    ) {
                        return (
                            <li
                                key={pageNumber}
                                className={clsx('page-item', {
                                    disabled: isLoading,
                                    active: pageNumber === currentPage,
                                })}
                            >
                                <a
                                    href='#'
                                    className='page-link'
                                    onClick={() => handlePageChange(pageNumber)}
                                >
                                    {pageNumber + 1}
                                </a>
                            </li>
                        );
                    } else return null;
                })}

                <li
                    className={clsx('page-item next ms-2', {
                        disabled: isLoading || currentPage >= totalPages - 1,
                    })}
                >
                    <a
                        href='#'
                        className='page-link'
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        <i className='ki-outline ki-right fs-4'></i>
                    </a>
                </li>
                <li
                    className={clsx('page-item last', {
                        disabled: isLoading || currentPage >= totalPages - 1,
                    })}
                >
                    <a
                        href='#'
                        className='page-link'
                        onClick={() => handlePageChange(totalPages - 1)}
                    >
                        <i className='ki-outline ki-double-right fs-4'></i>
                    </a>
                </li>
            </ul>
            <Form.Select
                aria-label='records-per-page'
                className='w-auto ms-4'
                value={recordsPerPage}
                onChange={({ target }) => handleCountChange(Number(target.value) as RecordsPerPage)}
            >
                {RecordsPerPageSteps.map((value) => (
                    <option key={value} value={value}>
                        {value}
                    </option>
                ))}
            </Form.Select>
            <div className='ms-auto text-gray-500 fs-5'>Total records: {records}</div>
        </div>
    );
};
