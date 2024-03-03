
import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PdfPreview = ({ pdfUrl }) => {
  const onContextMenu = (e) => {
    e.preventDefault(); 
  };

  return (
    <div onContextMenu={onContextMenu}>
      <Document file={pdfUrl}>
        <Page
          pageNumber={1}
          renderTextLayer={false} 
        />
      </Document>
    </div>
  );
};

export default PdfPreview;


