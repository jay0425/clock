// 배터리 잔량을 표시하는 함수
let second = 100;
const setBattery = () => {
  if (second >= 0) {
    //0초가 될때까지만 실행된다.
    document.getElementById('battery').textContent = `${second}%`;
    second--;
  }
};

// 현재 시간을 표시하는 함수
const updateTime = () => {
  const now = new Date();
  const years = String(now.getFullYear());
  const months = String(now.getMonth() + 1); // 월은 0부터 시작하므로 1을 더해야 올바른 월이 표시된다.
  const days = String(now.getDate());
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  document.getElementById('current-date').textContent = `${years}년 ${months}월 ${days}일`;
  document.getElementById('current-time').textContent = `${hours}:${minutes}:${seconds}`;
};

// 알람을 저장할 배열
let alarms = [];

// 알람을 설정하는 함수
const setAlarm = () => {
  if (alarms.length >= 3) {
    alert('You can only set up to 3 alarms.');
    return;
  }

  const alarmTime = document.getElementById('alarm-input').value;
  if (alarmTime) {
    const alarm = new Date();
    const [hours, minutes] = alarmTime.split(':');
    alarm.setHours(hours);
    alarm.setMinutes(minutes);
    alarm.setSeconds(0);

    const now = new Date();
    const timeToAlarm = alarm.getTime() - now.getTime();

    if (timeToAlarm >= 0) {
      const alarmId = setTimeout(() => {
        document.getElementById('alarm-audio').play();
        alert('Alarm is ringing!');
        deleteAlarmById(alarmId);
      }, timeToAlarm);
      alarms.push({ time: alarmTime, id: alarmId });
      displayAlarms();
    } else {
      alert('Please set a time in the future.');
    }
  } else {
    alert('Please set a valid time.');
  }
};

// 알람을 ID로 삭제하는 함수
const deleteAlarmById = (alarmId) => {
  alarms = alarms.filter((alarm) => alarm.id !== alarmId);
  displayAlarms();
};

// 알람을 삭제하는 함수
const deleteAlarm = (index) => {
  clearTimeout(alarms[index].id); // 설정된 알람을 취소
  alarms.splice(index, 1); // 알람 배열에서 제거
  displayAlarms(); // 화면 업데이트
};

// 알람을 화면에 표시하는 함수
const displayAlarms = () => {
  const alarmList = document.getElementById('alarms');
  alarmList.innerHTML = '';
  alarms.forEach((alarm, index) => {
    const li = document.createElement('li');
    li.textContent = alarm.time;
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteAlarm(index);
    li.appendChild(deleteButton);
    alarmList.appendChild(li);
  });
};

// 초기화 및 이벤트 리스너 설정
document.addEventListener('DOMContentLoaded', () => {
  setInterval(updateTime, 1000);
  setInterval(setBattery, 1000);
  document.getElementById('set-alarm').addEventListener('click', setAlarm);
});
