'use client';
import React, { useState } from 'react';
import parsePhoneNumber from 'libphonenumber-js';
import styles from './PhoneNumberVerifier.module.css';
const sendMessage = async (apiKey, phone, message) => {
  const body = {
    api_key: apiKey,
    mobile: phone,
    message: message,
    priority: 0,
    type: 0,
  };

  try {
    // Use fetch to send the message
    const response = await fetch('https://whatsapp247.com/api/send.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    return response.json(); // Assuming the API returns JSON
  } catch (error) {
    console.error('Error sending message:', error);
    return { error: 'Error sending message' };
  }
};

const PhoneNumberVerifier = () => {
  const [apiUrl, setApiUrl] = useState('');
  const [message, setMessage] = useState('');
  const [numbers, setNumbers] = useState('');
  const [validNumbers, setValidNumbers] = useState([]);
  const [invalidNumbers, setInvalidNumbers] = useState([]);

  const handleVerification = async () => {
    const numbersArray = numbers.split(',');
    const valid = [];
    const invalid = [];

    for (let i = 0; i < numbersArray.length; i++) {
      const number = numbersArray[i].trim();
      const phoneNumber = parsePhoneNumber(number);

      if (phoneNumber) {
        valid.push(number);

        // Send message after verification (adjust API key as needed)
        const response = await sendMessage(apiUrl, number, message);
        console.log(response); // Log or handle the response
      } else {
        invalid.push(number);
      }
    }

    setValidNumbers(valid);
    setInvalidNumbers(invalid);
  };

  return (
    <div className={styles.container}>
      <h1>Whatsapp Bulk Messenger</h1>
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
        <textarea
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
