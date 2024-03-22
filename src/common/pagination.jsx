import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Pagination = (props) => {
    const { itemsCount, pageSize, onPageChange, currentPage } = props;
    const pagesCount = Math.ceil(itemsCount / pageSize);
    if (pagesCount === 1) return null;

    const pages = _.range(1, pagesCount + 1);

    // Define how many pages to show before and after the ellipsis.
    const numPagesToShow = 3;
    const pageBeforeEllipsis = currentPage - numPagesToShow;
    const pageAfterEllipsis = currentPage + numPagesToShow;

    return (
        <nav>
            <ul className="pagination">
                {pages.map((page) => {
                    if (page === 1 || page === pagesCount || (page >= pageBeforeEllipsis && page <= pageAfterEllipsis)) {
                        return (
                            <li key={page} className={page === currentPage ? 'page-item active' : 'page-item'}>
                                <a className="page-link" onClick={() => onPageChange(page)}>
                                    {page}
                                </a>
                            </li>
                        );
                    } else if (page === pageBeforeEllipsis - 1 || page === pageAfterEllipsis + 1) {
                        // Show ellipsis
                        return (
                            <li key={page} className="page-item disabled">
                                <span className="page-link">...</span>
                            </li>
                        );
                    }
                    return null;
                })}
            </ul>
        </nav>
    );
};

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
};

export default Pagination;