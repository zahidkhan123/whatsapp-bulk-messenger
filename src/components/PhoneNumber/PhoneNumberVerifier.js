'use client';
import React, {useState} from 'react';
import parsePhoneNumber from 'libphonenumber-js';
import axios from 'axios';
import styles from './PhoneNumberVerifier.module.css';
const sendMessage = async (apiKey, phone, message) => {
  try {
    const params = new URLSearchParams({
      api_key: apiKey,
      mobile: phone,
      message: message,
    });

    const response = await axios.get('https://whatsapp247.com/api/send.php', {
      params: params,
    });

    // Axios automatically parses the JSON response, so you can directly return it
    return response.data;
  } catch (error) {
    console.log('Error sending message:', error);
    return {error: error.message || 'Error sending message'};
  }
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const PhoneNumberVerifier = () => {
  const [apiUrl, setApiUrl] = useState('');
  const [message, setMessage] = useState('');
  const [numbers, setNumbers] = useState('');
  const [validNumbers, setValidNumbers] = useState([]);
  const [invalidNumbers, setInvalidNumbers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleVerification = async () => {
    const numbersArray = numbers.split(',');
    const valid = [];
    const invalid = [];

    for (let i = 0; i < numbersArray.length; i++) {
      const number = numbersArray[i].trim();
      const phoneNumber = parsePhoneNumber(number);
      if (phoneNumber) {
        valid.push(number);
      } else {
        invalid.push(number);
      }
    }

    setValidNumbers(valid);
    setInvalidNumbers(invalid);

    for (let i = 0; i < valid.length; i++) {
      if (i > 0) {
        const delayTime = 6000 + Math.random() * 3000;
        await delay(delayTime);
      } else {
        setLoading(true);
      }
      const response = await sendMessage(apiUrl, valid[i], message);
      console.log(response);
    }

    setLoading(false); // Reset loading state after all messages have been sent
  };

  return (
    <div className={styles.container}>
      <h1>Whatsapp Bulk Messenger</h1>
      <div>
        <label htmlFor='apiUrl'>Whatsapp API Key:</label>
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

      <button disabled={loading} onClick={handleVerification}>
        {loading ? 'Loading...' : 'Send Message'}
      </button>

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
