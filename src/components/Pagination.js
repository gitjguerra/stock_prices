import React from 'react';

const Pagination = ({ page, totalPages, onPageChange }) => {
    return (
        <div className="pagination">
            <button onClick={() => onPageChange(page - 1)} disabled={page <= 1}>
                Anterior
            </button>
            <span>Página {page} de {totalPages}</span>
            <button onClick={() => onPageChange(page + 1)} disabled={page >= totalPages}>
                Siguiente
            </button>
        </div>
    );
};

export default Pagination;