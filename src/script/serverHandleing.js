async function getData() {
  return await fetch('http://localhost:3001/getData')
    .then((response) => {
      if (!response.ok) {
        console.log(response.json());
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Error during GET request:', error);
    });
}

async function getWorldData() {
  return await fetch('http://localhost:3001/getWorldData')
    .then((response) => {
      if (!response.ok) {
        console.log(response.json());
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Error during GET request:', error);
    });
}

async function saveData(data) {
  return await fetch('http://localhost:3001/saveData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    })
    .catch((error) => {
      console.error('Error during POST request:', error);
    });
}

async function updateData(key, value) {
  console.log({ key, value });
  return await fetch('http://localhost:3001/updateData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ key, value })
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    })
    .catch((error) => {
      console.error('Error during POST request:', error);
    });
}

async function addData(key, value) {
  console.log({ key, value });
  return await fetch('http://localhost:3001/addData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ key, value })
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    })
    .catch((error) => {
      console.error('Error during POST request:', error);
    });
}

export { getData, saveData, updateData, getWorldData, addData };
