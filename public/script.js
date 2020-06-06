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
  var sendData = {'text': null};

  var name = document.getElementById('name').value;
  var reps = document.getElementById('reps').value;
  var weight = document.getElementById('weight').value;
  var date = document.getElementById('date').value;
  var lbs = document.getElementById('lbs').value;
  sendData.text = name + ',' + reps + ',' + weight + ','
    + date + ',' + lbs;

  console.log(JSON.stringify(sendData));
  sendData.text = name;
  req.open('POST', '/');
  req.setRequestHeader('Content-type', 'application/json');
  req.send(JSON.stringify(sendData));

  req.addEventListener('load', updatePage);
};

function handleData() {
  console.log('handleData');
  if (this.status >= 200 && this.status < 400) {
    // var res = JSON.parse(this.responseText);
    console.log(this);

  }
}

function updatePage() {
  console.log('updatePage');
  event.preventDefault();
  var req = new XMLHttpRequest();
  req.open('GET', '/');
  req.send();
  req.addEventListener('load', handleData);
}