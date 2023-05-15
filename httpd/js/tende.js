window.addEventListener('DOMContentLoaded', () => {
  const serverIp = window.location.hostname;
  const baseUri = `http://${serverIp}:1880/api/tende`;

  const kitchenDownBtn = document.getElementById('kitchen-down');
  const kitchenStopBtn = document.getElementById('kitchen-stop');
  const kitchenUpBtn = document.getElementById('kitchen-up');
  const livingroomDownBtn = document.getElementById('livingroom-down');
  const livingroomStopBtn = document.getElementById('livingroom-stop');
  const livingroomUpBtn = document.getElementById('livingroom-up');

  kitchenDownBtn.addEventListener('click', () => {
    fetch(`${baseUri}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: 'kitchen', action: 'down' }),
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  });

  kitchenStopBtn.addEventListener('click', () => {
    fetch(`${baseUri}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: 'kitchen', action: 'stop' }),
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  });

  kitchenUpBtn.addEventListener('click', () => {
    fetch(`${baseUri}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: 'kitchen', action: 'up' }),
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  });

  livingroomDownBtn.addEventListener('click', () => {
    fetch(`${baseUri}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: 'livingroom', action: 'down' }),
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  });

  livingroomStopBtn.addEventListener('click', () => {
    fetch(`${baseUri}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: 'livingroom', action: 'stop' }),
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  });

  livingroomUpBtn.addEventListener('click', () => {
    fetch(`${baseUri}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: 'livingroom', action: 'up' }),
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  });
});
