import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [userData, setUserData] = useState({ email: '', password: '' });

  useEffect(() => {
    const storedUserData = JSON.parse(sessionStorage.getItem('userData'));
    if (storedUserData) {
      setUserData(storedUserData);
    }
  }, []);

  return (
    <div className='dashboard' style={{ textAlign: 'center',color: 'white'}}>
      <h1>User Email: {userData.email}</h1>
      <h1>Password: {userData.password}</h1>
    </div>
  );
};

export default Dashboard;
