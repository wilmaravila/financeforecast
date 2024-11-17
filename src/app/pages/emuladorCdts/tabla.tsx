import React from 'react';

const DynamicTable = ({ headers, data }) => {
  // Validar si los datos están vacíos
  if (!data || data.length === 0) {
    return <div>No hay datos disponibles</div>;
  }

  // Validar si los encabezados están vacíos
  if (!headers || headers.length === 0) {
    return <div>No hay encabezados disponibles</div>;
  }

  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-slate-50">
          {headers.map((header, index) => (
            <th key={index} className="px-4 py-3 text-left text-[#0e141b] text-sm font-medium leading-normal">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr 
            key={index} 
            className="border-t border-t-[#d0dbe7] hover:bg-gray-100"  // Added hover effect for row
          >
            {headers.map((header, colIndex) => (
              <td 
                key={colIndex} 
                className="h-[72px] px-4 py-2 text-[#4e7397] text-sm font-normal leading-normal"
              >
                {row[header] || 'N/A'}  {/* Access properties directly without converting to lowercase */}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DynamicTable;
