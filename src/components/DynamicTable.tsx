import React from 'react';
import { Table, TableHead, TableRow, TableCell } from './Table';
import { Loader2 } from 'lucide-react';

interface DynamicTableProps {
  data: any[];
  isLoading: boolean;
  error: string | null;
}

const formatValue = (value: any): string => {
  if (value === null || value === undefined) {
    return '';
  }
  if (typeof value === 'object') {
    // Handle nested objects by taking only primitive values
    const primitiveEntries = Object.entries(value).filter(
      ([_, v]) => typeof v !== 'object'
    );
    return primitiveEntries.map(([k, v]) => `${k}: ${v}`).join(', ');
  }
  return String(value);
};

export function DynamicTable({ data, isLoading, error }: DynamicTableProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="p-8 text-center text-gray-500">
        No data available
      </div>
    );
  }

  // Get top-level columns from the first item's keys
  const columns = Object.keys(data[0]).filter(key => {
    const value = data[0][key];
    // Exclude deeply nested objects (like 'geo' in address)
    return typeof value !== 'object' || value === null || Object.keys(value).every(k => typeof value[k] !== 'object');
  });

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column} header>
                {column.charAt(0).toUpperCase() + column.slice(1)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <tbody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column) => (
                <TableCell key={`${rowIndex}-${column}`}>
                  {formatValue(row[column])}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
}