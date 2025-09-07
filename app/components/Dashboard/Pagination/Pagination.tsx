import React from "react";

const Pagination = () => {
  return (
    <div className="pagination">
      <div className="per-page">
        <span>Har sahifada</span>
        <select value={10} onChange={() => {}}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
      <div className="page-controls">
        <span>Sahifa 1 dan 1</span>
        <button>&laquo;</button>
        <button>&lsaquo;</button>
        <button className="active">1</button>
        <button>&rsaquo;</button>
        <button>&raquo;</button>
      </div>
    </div>
  );
};

export default Pagination;
