import React from 'react';

interface TableProps {
  children: React.ReactNode;
}

export function Table({ children }: TableProps) {
  return (
    <table className="w-full border-collapse text-left">
      {children}
    </table>
  );
}

export function TableHead({ children }: TableProps) {
  return (
    <thead className="bg-gray-50">
      {children}
    </thead>
  );
}

export function TableRow({ children }: TableProps) {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      {children}
    </tr>
  );
}

interface TableCellProps {
  children: React.ReactNode;
  header?: boolean;
}

export function TableCell({ children, header = false }: TableCellProps) {
  const Component = header ? 'th' : 'td';
  const baseClasses = "px-6 py-4 text-sm";
  const headerClasses = header ? "font-semibold text-gray-900" : "text-gray-700";
  
  return (
    <Component className={`${baseClasses} ${headerClasses}`}>
      {children}
    </Component>
  );
}