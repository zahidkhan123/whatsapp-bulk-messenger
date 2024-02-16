'use client';
import React, { useState } from 'react';
import parsePhoneNumber from 'libphonenumber-js';
import styles from './PhoneNumberVerifier.module.css';

const PhoneNumberVerifier = () => {
  const [apiUrl, setApiUrl] = useState('');
  const [message, setMessage] = useState('');
  const [numbers, setNumbers] = useState('');
  const [validNumbers, setValidNumbers] = useState([]);
  const [invalidNumbers, setInvalidNumbers] = useState([]);

  const handleVerification = () => {
    const numbersArray = numbers.split(',');
    const valid = [];
    const invalid = [];

    numbersArray.forEach((number) => {
      const phoneNumber = parsePhoneNumber(number);
      if (phoneNumber) {
        valid.push(number.trim());
      } else {
        invalid.push(number.trim());
      }
    });

    setValidNumbers(valid);
    setInvalidNumbers(invalid);
  };

  return (
    <div className={styles.container}>
      <div>
        <label htmlFor='apiUrl'>API URL:</label>
        <input
          type='text'
          id='apiUrl'
          value={apiUrl}
          onChange={(e) => setApiUrl(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='message'>Message:</label>
        <input
          type='text'
          id='message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='numbers'>Numbers (comma separated):</label>
        <textarea
          id='numbers'
          value={numbers}
          onChange={(e) => setNumbers(e.target.value)}
        />
      </div>
      <button onClick={handleVerification}>Verify Numbers</button>

      <div className={styles.results}>
        <div className={styles.valid}>
          <h3>Valid Numbers</h3>
          <ul>
            {validNumbers.map((number, index) => (
              <li key={index}>{number}</li>
            ))}
          </ul>
        </div>
        <div className={styles.invalid}>
          <h3>Invalid Numbers</h3>
          <ul>
            {invalidNumbers.map((number, index) => (
              <li key={index}>{number}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PhoneNumberVerifier;
