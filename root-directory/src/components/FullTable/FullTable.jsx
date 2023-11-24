import React, { useState, useEffect, forwardRef, useRef } from "react";
import { Button } from "../Button";
import { Cell } from "../Cell";
import { IconEllipsisV } from "../IconEllipsisV";
import { RowWrapper } from "../RowWrapper";
import "./style.css";
import Checkbox from '@mui/material/Checkbox';
import { Link, useHistory } from 'react-router-dom';

export const FullTable = ({ setNumSelected, className, 
  rowWrapperRowCellRowCellIconEllipsisVIconEllipsisVClassName, contracts, selectedJobIndexes
  ,setSelectedJobIndexes }) => {
  const [headerChecked, setHeaderChecked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Set items per page as you like
  
  const rowRef = useRef(null); // Ref for a single row
  const headerRef = useRef(null); // Ref for the header

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (rowRef.current && headerRef.current) {
        const rowHeight = rowRef.current.offsetHeight;
        const headerHeight = headerRef.current.offsetHeight;
  
        const availableHeight = window.innerHeight - headerHeight;
        const rowsThatFit = Math.floor(availableHeight / rowHeight);
        
        setItemsPerPage(rowsThatFit);
      }
    };
  
    // Initially set items per page
    updateItemsPerPage();
  
    // Update items per page whenever the window is resized
    window.addEventListener('resize', updateItemsPerPage);
  
    // Clean up event listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', updateItemsPerPage);
    };
  }, [rowRef, headerRef]);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = contracts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(contracts.length / itemsPerPage);

  const handleCheckboxClick = () => {
    setHeaderChecked(!headerChecked);
    if (headerChecked) {
      setNumSelected(0);
      setSelectedJobIndexes([]);
    } else {
      setNumSelected(contracts.length);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


  return (

    <div className={`full-table ${className}`}>
      <div className="table">
        <div className="header" ref={headerRef}>
          <div className="frame-4">
          <Checkbox checked={headerChecked} onChange={handleCheckboxClick}/>            
            <div className="frame-4">

            <Cell
              className="cell-8"
              content="text"
              iconLeft={false}
              iconRight={false}
              rowCellDivClassName="cell-9"
              rowCellText="Contract Name"
              twoNdText={false}
              type="header"
            />
            <Cell
              className="cell-12"
              content="text"
              iconLeft={false}
              iconRight={false}
              rowCellDivClassName="cell-13"
              rowCellText="Safety"
              twoNdText={false}
              type="header"
            />
            <Cell
              className="cell-16"
              content="text"
              iconLeft={false}
              iconRight={false}
              rowCellDivClassName="cell-13"
              rowCellText="Date Created"
              twoNdText={false}
              type="header"
            />
            
          </div>
          </div>
        </div>
        {/* Map through the 'contracts' array and render a RowWrapper for each contract */}
        {contracts.slice(indexOfFirstItem, indexOfLastItem).map((contract, index) => (
          <RowWrapper 
            key={index}
            ref={index === 0 ? rowRef : null} 
            headerChecked={headerChecked}
            setNumSelected={setNumSelected}
            className="row-instance"
            rowCellRowCell={<IconEllipsisV className="icon-left-5" />}
            rowCellRowCellIconEllipsisVIconEllipsisVClassName={rowWrapperRowCellRowCellIconEllipsisVIconEllipsisVClassName}
            rowRowClassName="row-2"
            to={`/response/${index}`}
            contract={contract}
            selectedJobIndexes={selectedJobIndexes}
            setSelectedJobIndexes={setSelectedJobIndexes}
            contractIndex={indexOfFirstItem + index}
          />
        ))}
      </div>
      <div className="pagination">
        <div className="pagination-2">
          <Button
            color="gray"
            colorPrimaryClassName="button-instance"
            divClassName="button-2"
            showIconLeft={false}
            showIconRight={false}
            text="Previous"
            onClick={goToPreviousPage}
          />
          <div className="text-wrapper-9">Page {currentPage} of {totalPages}</div>
          <Button
            color="gray"
            colorPrimaryClassName="button-instance"
            divClassName="button-2"
            showIconLeft={false}
            showIconRight={false}
            text="Next"
            onClick={goToNextPage}
          />
        </div>
      </div>
    </div>

  );
};