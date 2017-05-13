/**
 * Created by sophia on 5/12/17.
 */
document.addEventListener("DOMContentLoaded", function () {

  const countdown = document.querySelector('.timer');
  const returnAt = document.querySelector('.returnTimeMsg');
  const buttons = document.querySelectorAll('button');
  const customTime = document.querySelector('input');

  function timer(seconds) {
    const currentTime = Date.now();
    const returnTime = currentTime + seconds * 1000; //Date.now() returns milliseconds, therefore multiply seconds by 1000

    displayTime(seconds); //initiates timer at specified interval
    displayMessage(returnTime); //does NOT change, therefore only run at beginning

    setTimer = setInterval(() => {
      const secondsRemaining = Math.round((returnTime - Date.now()) / 1000);

      if (secondsRemaining < 0) {
        clearInterval(timer);
        return; //kills timer
      }
      displayTime(secondsRemaining); //displays new time left every second
    }, 1000);
  }

  function displayTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsToDisplay = seconds % 60;
    countdown.textContent = `${minutes}:${secondsToDisplay < 10 ? '0' : ''}${secondsToDisplay}`;
  }

  function displayMessage(time) {
    const returnTime = new Date(time);
    const returnHour = returnTime.getHours(); //returns military style time, therefore modify
    const modifiedHour = returnHour > 12 ? returnHour - 12 : returnHour;
    const returnMinutes = returnTime.getMinutes();
    returnAt.textContent = `Return at ${modifiedHour}:${returnMinutes < 10 ? '0' : ''}${returnMinutes}`;
  }

  //calls timer using predefined time of button
  function runTimer() {
    const preDefinedTime = this.dataset.time; //accesses data-time attribute of 'clicked' element
    const customTime = this.value * 60; //accesses user input
    timer(preDefinedTime ? preDefinedTime : customTime);
  }
  //must clear preexisting timer if click another button when one is already running!!!

  buttons.forEach(button => {
    button.addEventListener('click', runTimer);
  });

  //calls timer using user input
  customTime.addEventListener('keyup', runTimer);

});