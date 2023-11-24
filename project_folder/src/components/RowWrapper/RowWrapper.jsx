import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { IconEllipsisV } from '../IconEllipsisV';
import { Row } from '../Row';
import './style.css';

export const RowWrapper = ({
  setNumSelected,

  headerChecked,
  className,
  rowCellRowCellIconEllipsisVIconEllipsisVClassName,
  rowRowClassName,
  rowCellRowCell = <IconEllipsisV className="icon-left-4" />,
  to,
  contract,
  selectedJobIndexes,
  setSelectedJobIndexes,
  contractIndex,
}, ) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Handle automatic checking/unchecking based on headerChecked prop
    if (headerChecked) {
      setChecked(true);

    } else {
      setChecked(false);
    }
  }, [headerChecked]);

  const handleChange = (event) => {
    const newChecked = event.target.checked;
    setChecked(newChecked);

    // Update numSelected based on the checkbox state
    if (newChecked) {
      setNumSelected((prevNumSelected) => prevNumSelected + 1);
      setSelectedJobIndexes([...selectedJobIndexes, contractIndex]);
      console.log(contractIndex);
      console.log(selectedJobIndexes);


    } else {
      setNumSelected((prevNumSelected) => prevNumSelected - 1);
      setSelectedJobIndexes(selectedJobIndexes.filter(index => index !== contractIndex));

    }
  };

  return (
    <div className={`row-wrapper ${className}`}>
      <Checkbox
        checked={checked}
        onChange={handleChange}
      />
      <Row
        cellRowCell={rowCellRowCell}
        cellRowCellIconEllipsisVIconEllipsisVClassName={rowCellRowCellIconEllipsisVIconEllipsisVClassName}
        className={rowRowClassName}
        to={to}
        contract={contract}
      />
    </div>
  );
};

RowWrapper.propTypes = {
  to: PropTypes.string,
  setNumSelected: PropTypes.func.isRequired,
  headerChecked: PropTypes.bool.isRequired,
  className: PropTypes.string,
  rowCellRowCellIconEllipsisVIconEllipsisVClassName: PropTypes.string,
  rowRowClassName: PropTypes.string,
  rowCellRowCell: PropTypes.element,
  contract: PropTypes.object.isRequired,
};
