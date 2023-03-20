import React, { useEffect, useRef } from 'react';
import pdfjs from 'pdfjs-dist/build/pdf';

function PdfViewer({ documentUrl })
{
    const canvasRef = useRef(null);

    useEffect(() =>
    {
        const loadPdf = async () =>
        {
            try {
                const pdf = await pdfjs.getDocument(documentUrl).promise;
                const page = await pdf.getPage(1);
                const scale = 1.5;
                const viewport = page.getViewport({ scale });
                const canvas = canvasRef.current;
                const context = canvas.getContext('2d');

                canvas.height = viewport.height;
                canvas.width = viewport.width;

                await page.render({ canvasContext: context, viewport });
            } catch (error) {
                console.error(error);
            }
        };

        loadPdf();
    }, [documentUrl]);

    return <canvas ref={canvasRef} />;
}

export default PdfViewer