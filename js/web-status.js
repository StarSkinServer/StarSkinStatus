const idsToCheck = [1, 16690, 796061, 79601687];
const url = 'api';

async function getStatusAndUpdateHTML() {
  try {
    const response = await fetch(url);
    const data = await response.json();

    const statuses = idsToCheck.map(id => data.monitors.find(monitor => monitor.id === id)?.status);

    updateStatus('Normal', statuses.every(status => status === 'normal'));

    function updateStatus(statusText, isNormal) {
      const statusElements1 = document.querySelectorAll('.status-right');
      statusElements1.forEach(element => {
        const textElement = element.firstChild;
        textElement.textContent = statusText + ' ';

        if (statusText === 'Normal') {
          element.querySelector('.bx-signal-3').classList.remove('bx-flip-horizontal');
        } else {
          element.querySelector('.bx-signal-3').classList.add('bx-flip-horizontal');
        }
      });

      const statusElements2 = document.querySelectorAll('.status-right-2');
      statusElements2.forEach(element => {
        if (isNormal) {
          element.textContent = 'Normal';
        } else {
          element.textContent = 'Abnormal';
        }
      });
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

getStatusAndUpdateHTML();
