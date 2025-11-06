import React, { useState, useEffect, useMemo } from 'react';
import DataTable from 'react-data-table-component';
import $ from 'jquery';

function SearchBox() {
    const [filterText, setFilterText] = useState('');

    const handleFilterChange = (e) => {
        setFilterText(e.target.value);
        // Optionally, reset pagination here if needed
    };

    const filteredItems = useMemo(() => {
        return originalData.filter(item => {
        // Customize this logic based on your data structure and searchable fields
        return Object.values(item).some(value =>
            String(value).toLowerCase().includes(filterText.toLowerCase())
        );
        });
    }, [originalData, filterText]);

    return (
        <input type="text" placeholder="Search..." value={filterText} onChange={handleFilterChange}/>
    );
}

function MyDataTable({ col_field, data_src, modal }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const columns = col_field;

    const [filterText, setFilterText] = useState('');

    const handleFilterChange = (e) => {
        setFilterText(e.target.value);
        // Optionally, reset pagination here if needed
    };

    const filteredItems = useMemo(() => {
        return data.filter(item => {
        // Customize this logic based on your data structure and searchable fields
        return Object.values(item).some(value =>
            String(value).toLowerCase().includes(filterText.toLowerCase())
        );
        });
    }, [data, filterText]);

  const handleRowClicked = (row) => {
    //console.log('Row clicked:', row);
    modal(row['id']);
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await fetch(data_src);
      const json = await response.json();
      setData(json);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <>
    <input type="text" placeholder="Search..." value={filterText} onChange={handleFilterChange}/>
    <DataTable
      title=""
      columns={columns}
      data={filteredItems}
      progressPending={loading}
      pagination
      highlightOnHover
      responsive
      onRowClicked={handleRowClicked}
    />
    </>
  );
}

export default MyDataTable;