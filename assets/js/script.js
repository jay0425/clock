// 현재 시간을 표시하는 함수
function updateTime() {
  const now = new Date();
  const years = String(now.getFullYear());
  const months = String(now.getMonth());
  const days = String(now.getDate());
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  document.getElementById(
    'current-time'
  ).textContent = `${years}년 ${months}월 ${days}일 ${hours}:${minutes}:${seconds}`;
}

// 알람을 설정하는 함수
function setAlarm() {
  const alarmTime = document.getElementById('alarm-time').value;
  if (alarmTime) {
    const alarm = new Date();
    const [hours, minutes] = alarmTime.split(':');
    alarm.setHours(hours);
    alarm.setMinutes(minutes);
    alarm.setSeconds(0);

    const now = new Date();
    const timeToAlarm = alarm.getTime() - now.getTime();

    if (timeToAlarm >= 0) {
      setTimeout(() => {
        document.getElementById('alarm-audio').play();
        alert('Alarm is ringing!');
      }, timeToAlarm);
    } else {
      alert('Please set a time in the future.');
    }
  } else {
    alert('Please set a valid time.');
  }
}

// 초기화 및 이벤트 리스너 설정
document.addEventListener('DOMContentLoaded', () => {
  setInterval(updateTime, 1000);
  document.getElementById('set-alarm').addEventListener('click', setAlarm);
});
