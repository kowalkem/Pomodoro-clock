import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      break: 5,
      session: 25,
      timeLeft: 25 * 60,
      type: "session",
      run: false,
      interval: ""
    }
    this.reset = this.reset.bind(this);
    this.incdec = this.incdec.bind(this);
    this.timer = this.timer.bind(this);
    this.showTime = this.showTime.bind(this);
  }
  reset() {
    clearInterval(this.state.interval);
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
    this.setState({
      break: 5,
      session: 25,
      timeLeft: 25 * 60,
      type: "session",
      run: false,
      interval: ""
    })
  }
  incdec(event) {
    let newState = {};
    switch (event.target.id) {
      case "break-decrement":
        newState = this.state.break > 1 ? {break: this.state.break - 1} : {break: this.state.break};
        break;
      case "break-increment":
        newState = this.state.break < 60 ? {break: this.state.break + 1} : {break: this.state.break};
        break;
      case "session-decrement":
        newState = this.state.session > 1 ? {session: this.state.session - 1} : {session: this.state.session};
        break;
      case "session-increment":
        newState = this.state.session < 60 ? {session: this.state.session + 1} : {session: this.state.session};
        break;
    }
    newState.timeLeft = newState.session ? newState.session * 60 : this.state.session * 60;
    this.setState(newState);
  }
  timer() {
    if(this.state.run === true) {
      clearInterval(this.state.interval);
      this.setState({ run: false });
    } else {
      this.state.interval = setInterval(() => {
        if(this.state.timeLeft > 0) {
          this.setState({ timeLeft: this.state.timeLeft - 1 });
        } else {
          document.getElementById("beep").play();
          if(this.state.type === "session") {
            this.setState({ type: "break", timeLeft: this.state.break * 60 });
          } else {
            this.setState({ type: "session", timeLeft: this.state.session * 60 });
          }
        }
        this.setState({ run: true });
      }, 1000);
    }
  }
  showTime(time) {
    if(time % 60 < 10) {
      return String(Math.floor(time / 60)) < 10 ? "0" + String(Math.floor(time / 60)) + ":0" + String(time % 60) : String(Math.floor(time / 60)) + ":0" + String(time % 60);
    } else {
      return String(Math.floor(time / 60)) < 10 ? "0" + String(Math.floor(time / 60)) + ":" + String(time % 60) : String(Math.floor(time / 60)) + ":" + String(time % 60);
    }
  }
  componentDidMount() {
    if(this.state.timeLeft === 0) {
      document.getElementById("beep").play();
    }
  }
  render() {
    return(
      <div>Pomodoro Clock
        <div id="break-label">Break Length</div>
        <button id="break-decrement" onClick={this.incdec}>-</button>
        <div id="break-length">{this.state.break}</div>
        <button id="break-increment" onClick={this.incdec}>+</button>
        <div id="session-label">Session Length</div>
        <button id="session-decrement" onClick={this.incdec}>-</button>
        <div id="session-length">{this.state.session}</div>
        <button id="session-increment" onClick={this.incdec}>+</button>
        <div id="timer-label">{this.state.type}</div>
        <div id="time-left">{this.showTime(this.state.timeLeft)}</div>
        <button id="start_stop" onClick={this.timer}>start/stop</button>
        <button id="reset" onClick={this.reset}>reset</button>
        <audio id="beep" src="https://goo.gl/65cBl1"/>
      </div>
    )
  }
}

export default App;
