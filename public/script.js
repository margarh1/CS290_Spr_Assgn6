console.log('script.js Hello world');

document.addEventListener('DOMContentLoaded', bindSubmit);

function bindSubmit() {
  console.log('bindSubmit');
  document.getElementById('newWorkout').addEventListener('click', addNewWorkout);
};

function addNewWorkout() {
  console.log('addNewWorkout');
  event.preventDefault();
  var req = new XMLHttpRequest();
  var sendData = {'data': null};

  var name = document.getElementById('name').value;
  var reps = document.getElementById('reps').value;
  var weight = document.getElementById('weight').value;
  var date = document.getElementById('date').value;
  var units = document.getElementById('lbs').value;
  sendData.data = 'name=' + name + '&reps=' + reps + '&weight=' + weight
    + '&date=' + date + '&units=' + units;

  console.log(JSON.stringify(sendData.data));
  req.open('POST', '/');
  req.setRequestHeader('Content-type', 'application/json');
  req.send(JSON.stringify(sendData));
};