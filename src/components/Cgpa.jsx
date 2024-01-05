import React, { useState } from 'react';
import axios from 'axios';

const CGPA = () => {
  const [file, setFile] = useState(null);
  const [deca, setDeca] = useState('');
  const [cgpa, setCGPA] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  document.title = 'CGPA Calculator';

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    if (e.target.files[0] && !e.target.files[0].name.toLowerCase().includes('ept')) {
      setError('Invalid file. Upload a valid score card(RTU).');
      e.target.value = '';
    } else {
      setError('');
    }
  };

  const handleDecaChange = (e) => {
    const input = e.target.value.toUpperCase(); // Convert to uppercase for consistent comparison
    const regex = /^(A\+\+|A\+|A|B\+\+|B\+|B|C\+|C|D\+|D|E\+|E|F)?$/; // Regex pattern
  
    if (regex.test(input) || input === '') {
      setDeca(input);
      setError('');
    } else {
      setError('Please provide a valid Deca grade (A++, A+, A, B++, B+, B, C+, C, D+, D, E+, E, F)');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError('Please select a file.');
      return;
    }

    if (!deca) {
      setError('Please provide a valid Deca grade.');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('deca', deca);

    try {
      const response = await axios.post(
        'https://ad30.pythonanywhere.com/cgpa',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (response.data && response.data.cgpa) {
        setCGPA(response.data.cgpa);
        setError('');
      } else {
        setError('Error calculating CGPA. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching CGPA:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">Calculate CGPA</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <label htmlFor="fileInput" className="form-label">
            Upload Score Card PDF File
          </label>
          <input
            type="file"
            className="form-control"
            id="fileInput"
            accept=".pdf"
            onChange={handleFileChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="decaInput" className="form-label">
            Deca Grade
          </label>
          <input
            type="text"
            className="form-control"
            id="decaInput"
            value={deca}
            onChange={handleDecaChange}
            placeholder={'A++'}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Calculate CGPA
        </button>
      </form>
      {loading ? (
        <div className="text-center mt-3">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : cgpa !== '' ? (
        <div className="mt-3 bg-light p-3 rounded d-flex justify-content-center align-items-center">
          <h4 className="mb-0 text-center custom-blue">CGPA: {cgpa}</h4>
        </div>
      ) : null}
    </div>
  );
};

export default CGPA;
