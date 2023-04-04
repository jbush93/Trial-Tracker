import React, { useState } from 'react';

function FileUploadForm({ patientId, setPdfUrl, setAddDocument })
{
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');

  const handleFileInputChange = (event) =>
  {
    setFile(event.target.files[0]);
  };

  const handleTitleInputChange = (event) =>
  {
    setTitle(event.target.value);
  };

  const handleFormSubmit = (event) =>
  {
    event.preventDefault();

    const formData = new FormData();
    formData.append('patient_id', patientId); // Add patientId to the form data
    formData.append('pdf', file); // Add the file to the form data
    formData.append('title', title); // Add the title to the form data

    fetch(`/documents`, {
      method: 'POST',
      body: formData,
    })
      .then((response) =>
      {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) =>
      {
        console.log(data);
        setPdfUrl(data.pfp_url)
      })
      .then(data => setAddDocument(false))
      .catch((error) =>
      {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="title-input">Title:</label>
        <input id="title-input" type="text" value={title} onChange={handleTitleInputChange} />
      </div>
      <div>
        <label htmlFor="file-input">Choose a file:</label>
        <input id="file-input" type="file" onChange={handleFileInputChange} />
      </div>
      <button type="submit">Upload</button>
    </form>
  );
}

export default FileUploadForm;