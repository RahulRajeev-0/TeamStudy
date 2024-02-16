import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

import './DataTables.scss';

const DataTables = ({ columns, endpoint, additionalColumns }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('access');
      try {
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [endpoint]);

  const allColumns = [...columns, ...additionalColumns];
  return (
    <div className='datatable'>
      <DataGrid
        rows={data}
        columns={allColumns}
        pageSize={5}
        pagination
        checkboxSelection
      />
    </div>
  );
};

export default DataTables;
