import React, { Component } from "react";
import "./Home.css";

export class Home extends Component {
  static displayName = Home.name;

  constructor() {
    super();

    this.endTime = new Date(2021, 1, 19, 9, 0, 0, 0); // дата окончания (год, месяц (0-11), день, час, минута, секунда, ..)

    this.state = {
      time: {},
      seconds: Math.floor(this.endTime - new Date()) / 1000, // расчет кол-во секунд для обратного отсчета
    };

    this.days = [
      "в понедельник",
      "во вторник",
      "в среду",
      "в четверг",
      "в пятницу",
      "в субботу",
      "в воскресенье",
    ];
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  // Конвертация даты
  secondsToTime(secs) {
    let day = Math.floor(secs / (60 * 60) / 24);

    let divisor_for_hours = secs % (60 * 60 * 24);
    let hours = Math.floor(divisor_for_hours / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      d: day,
      h: hours,
      m: minutes,
      s: seconds,
    };
    return obj;
  }

  // Окончания слов в таймере
  decOfNum(number, titles) {
    let decCases = [2, 0, 1, 1, 1, 2];
    let choice =
      number % 100 > 4 && number % 100 < 20
        ? 2
        : decCases[Math.min(number % 10, 5)];
    return titles[choice];
  }

  // Добавление нуля
  addZero(number) {
    return number < 10 ? `0${number}` : number;
  }

  // Запуск таймера
  startTimer() {
    if (this.timer === 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  // Обратный счет
  countDown() {
    let seconds = Math.floor(this.state.seconds - 1);
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    if (seconds === 0) {
      clearInterval(this.timer);
    }
  }

  // Монтирование компонента
  componentDidMount() {
    let timeLeftVar = this.secondsToTime(
      this.state.seconds > 0 ? this.state.seconds : 0
    );
    this.setState({ time: timeLeftVar });
    this.startTimer();
  }

  // Рендер компонента
  render() {
    return (
      <div className="warning">
        <p style={{ fontSize: "35px" }}>
          Уважаемые коллеги, у нас ведутся технические работы!
        </p>
        <p>
          Портал возобновит свою работу{" "}
          <span className="date">
            {this.days[this.endTime.getDay() - 1]}{" "}
            {this.addZero(this.endTime.getDate()) +
              "." +
              this.addZero(this.endTime.getMonth() + 1)}{" "}
            в{" "}
            {this.addZero(this.endTime.getHours()) +
              ":" +
              this.addZero(this.endTime.getMinutes())}{" "}
            MCK.
          </span>
        </p>
        <p>Приносим извинения за неудобства.</p>
        <p style={{ marginTop: "40px" }}>До завершения работ: </p>
        <div className="timer">
          <div className="timer-item">
            <div className="timer-number">
              {this.addZero(this.state.time.d)}
            </div>
            <span className="timer-text">
              {this.decOfNum(this.state.time.d, ["день", "дня", "дней"])}
            </span>
          </div>
          <span className="separator">:</span>
          <div className="timer-item">
            <div className="timer-number">
              {this.addZero(this.state.time.h)}
            </div>
            <span className="timer-text">
              {this.decOfNum(this.state.time.h, ["час", "часа", "часов"])}
            </span>
          </div>
          <span className="separator">:</span>
          <div className="timer-item">
            <div className="timer-number">
              {this.addZero(this.state.time.m)}
            </div>
            <span className="timer-text">
              {this.decOfNum(this.state.time.m, ["минута", "минуты", "минут"])}
            </span>
          </div>
          <span className="separator">:</span>
          <div className="timer-item">
            <div className="timer-number">
              {this.addZero(this.state.time.s)}
            </div>
            <span className="timer-text">
              {this.decOfNum(this.state.time.s, [
                "секунда",
                "секунды",
                "секунд",
              ])}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
