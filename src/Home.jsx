import { useState } from 'react';
import './App.css'
import githubLogo from './assets/github-mark-white.png'

var [milisegundos, segundos, minutos, horas, dias] = [0, 0, 0, 0, 0]
var [dMilisegundos, dSegundos, dMinutos, dHoras, dDias] = ["", "", "", "", ""]
var interval = null;

function Home() {
    const [timer, setTimer] = useState({ days: "00", hours: "00", minutes: "00", seconds: "00", miliseconds: "000" })
    function AtualizeDisplay() {
        dias < 10 ? dDias = "0" + dias : dDias = dias
        horas < 10 ? dHoras = "0" + horas : dHoras = horas
        minutos < 10 ? dMinutos = "0" + minutos : dMinutos = minutos
        segundos < 10 ? dSegundos = "0" + segundos : dSegundos = segundos
        milisegundos < 100 ?
            milisegundos < 10 ?
                dMilisegundos = "00" + milisegundos
                :
                dMilisegundos = "0" + milisegundos
            :
            dMilisegundos = milisegundos

        setTimer({ days: dDias, hours: dHoras, minutes: dMinutos, seconds: dSegundos, miliseconds: dMilisegundos })
    }

    function Start() {
        if (interval) return

        interval = setInterval(timerFunction, 10);
    }

    function Stop() {
        clearInterval(interval)
        interval = null

    }

    function Reset() {
        Stop();
        setTimer({ days: "00", hours: "00", minutes: "00", seconds: "00", miliseconds: "000" })
    }

    function timerFunction() {
        milisegundos += 10;
        if (milisegundos >= 1000) {
            segundos += 1;
            milisegundos = 0;
        }
        if (segundos >= 60) {
            minutos += 1;
            segundos = 0;
        }
        if (minutos >= 60) {
            horas += 1;
            minutos = 0;
        }
        if (horas >= 24) {
            dias += 1;
            horas = 0;
        }
        AtualizeDisplay()
    }
    return (
        <>
            <div className="title">
                <h1 className='chronometer-title'>Chronometer</h1>
            </div>
            <a className="click-image" href="https://github.com/yRaphaael" target="_blank">
                <img className='github-logo' src={githubLogo}></img>
            </a>
            <div className="chronometer" id="chronometer" >
                <div className='display'>
                    <span className='timerCell'>{timer.days}</span>
                    .<span className='timerCell'>{timer.hours}</span>
                    .<span className='timerCell'>{timer.minutes}</span>
                    .<span className='timerCell'>{timer.seconds}</span>
                    .<span className='timerCellMiliseconds'>{timer.miliseconds}</span>
                </div>
                <div className="button-container">
                    <input className="startBtn" type="button" value="Start" onClick={Start} />
                    <input className="stopBtn" type="button" value="Stop" onClick={Stop} />
                    <input className="resetBtn" type="button" value="Reset" onClick={Reset} />
                </div>
            </div>
        </>
    )
}

export default Home;