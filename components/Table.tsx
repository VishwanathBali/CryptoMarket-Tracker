"use client"

import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface TableProps {
  cryptoName: string;
}

const Table: React.FC<TableProps> = ({ cryptoName }) => {
  const stockData = useSelector((state: RootState) =>
    state.stock.find(stock => stock.name === cryptoName)?.prices || []
  );

  return (
    <div className="w-full flex justify-center my-5">
      <table className="w-4/5 border-collapse shadow-md">
        <thead>
          <tr className="bg-gray-300">
            <th className="p-3 text-left border-b">#</th>
            <th className="p-3 text-left border-b">Price</th>
            <th className="p-3 text-left border-b">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {stockData.slice().reverse().map((entry, index) => (
            <tr key={index} className={`hover:bg-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
              <td className="p-3 border-b">{index + 1}</td>
              <td className="p-3 border-b">${entry.price.toFixed(2)}</td>
              <td className="p-3 border-b">{new Date(entry.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
