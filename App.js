import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import './App.css';

function App() {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    fetchTrains();
    registerCompany(); 
  }, []);

  const fetchTrains = async () => {
    try {
      const response = await axios.get('http://20.244.56.144:80/train/trains');
      setTrains(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const registerCompany = async () => {
    try {
      const response = await axios.post('http://20.244.56.144/train/register', {
        companyName: 'Train Central' // Replace with your company name
      });
      console.log('Company registered:', response.data);
    } catch (error) {
      console.error('Error registering company:', error);
    }
  };

  return (
    <div className="App">
      <h1>Train Scheduler</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Destination</th>
            <th>Frequency</th>
            <th>Next Arrival</th>
            <th>Minutes Away</th>
          </tr>
        </thead>
        <tbody>
          {trains.map(train => (
            <tr key={train.id}>
              <td>{train.name}</td>
              <td>{train.destination}</td>
              <td>{train.frequency}</td>
              <td>{moment().add(train.minutesTillTrain, 'minutes').format('hh:mm A')}</td>
              <td>{train.minutesTillTrain}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
