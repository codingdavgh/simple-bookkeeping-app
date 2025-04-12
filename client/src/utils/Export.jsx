import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const ExportCSV = ({ data, filename = 'transactions.csv' }) => {
  const headers = [
    { label: 'Title', key: 'title' },
    { label: 'Amount', key: 'amount' },
    { label: 'Type', key: 'type' },
    { label: 'Date', key: 'date' },
    { label: 'Category', key: 'category' },
    { label: 'Recurring', key: 'recurring.interval' }
  ];

  return (
    <CSVLink
      data={data}
      headers={headers}
      filename={filename}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Export CSV
    </CSVLink>
  );
};

export const exportToPDF = async (elementId, filename = 'transactions.pdf') => {
  const element = document.getElementById(elementId);
  const canvas = await html2canvas(element);
  const imgData = canvas.toDataURL('image/png');

  const pdf = new jsPDF();
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save(filename);
};
