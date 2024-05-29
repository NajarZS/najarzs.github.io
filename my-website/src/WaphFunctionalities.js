import React, { useRef, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import $ from 'jquery';

function WaphFunctionalities() {
    const canvasRef = useRef(null);
    const intervalRef = useRef(null);
    const digitalClockRef = useRef(null);
    const [showEmail, setShowEmail] = useState(false);
    const [joke, setJoke] = useState('');
    const [ageGuess, setAgeGuess] = useState('');
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: 'Random Data',
            data: [],
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
        }]
    });

    useEffect(() => {
        const loadScript = (src) => {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = src;
                script.async = true;
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });
        };

        const drawClock = () => {
            const canvas = canvasRef.current;
            if (canvas) {
                const ctx = canvas.getContext('2d');
                const radius = canvas.height / 2;
                ctx.setTransform(1, 0, 0, 1, 0, 0); 
                ctx.clearRect(0, 0, canvas.width, canvas.height); 
                ctx.translate(radius, radius);
                const adjustedRadius = radius * 0.9;

                if (window.drawFace && window.drawNumbers && window.drawTime) {
                    window.drawFace(ctx, adjustedRadius);
                    window.drawNumbers(ctx, adjustedRadius);
                    window.drawTime(ctx, adjustedRadius);
                }
            }
        };

        const displayTime = () => {
            if (digitalClockRef.current) {
                digitalClockRef.current.innerHTML = "Current time: " + new Date().toLocaleTimeString();
            }
        };

        loadScript("https://waph-uc.github.io/clock.js").then(() => {
            intervalRef.current = setInterval(() => {
                drawClock();
                displayTime();
            }, 1000);
            drawClock(); // Initial draw
            displayTime(); // Initial time display
        }).catch((err) => {
            console.error("Failed to load the script:", err);
        });

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            document.head.querySelectorAll('script[src="https://waph-uc.github.io/clock.js"]').forEach(script => {
                script.remove();
            });
        };
    }, []);

    useEffect(() => {
        const fetchJoke = () => {
            $.get("https://v2.jokeapi.dev/joke/Any?type=single", (result) => {
                if (result && result.joke) {
                    setJoke(result.joke);
                }
            });
        };

        fetchJoke();
        const jokeInterval = setInterval(fetchJoke, 60000); 

        return () => clearInterval(jokeInterval);
    }, []);

    useEffect(() => {
        const generateRandomData = () => {
            const labels = Array.from({ length: 10 }, (_, i) => i + 1);
            const data = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
            setChartData({
                labels,
                datasets: [{
                    label: 'Random Data',
                    data,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderWidth: 1,
                }]
            });
        };

        generateRandomData();
    }, []);

    const toggleEmail = () => {
        setShowEmail(prevShowEmail => !prevShowEmail);
    };

    const guessAge = () => {
        const name = $('#nameInput').val();
        if (name.length > 0) {
            $.get(`https://api.agify.io/?name=${name}`, (result) => {
                if (result && result.age) {
                    setAgeGuess(`Hi ${name}, your age should be ${result.age}`);
                }
            });
        }
    };

    return (
        <div className="waph-functionalities">
            <h2>WAPH Functionalities</h2>
            <div ref={digitalClockRef} id="digit-clock" style={{ marginBottom: '20px', fontSize: '20px', fontWeight: 'bold' }}></div>
            <canvas ref={canvasRef} id="analog-clock" width="300" height="300" style={{ backgroundColor: '#999' }}></canvas>
            <div id="email" onClick={toggleEmail} style={{ cursor: 'pointer', marginTop: '20px', fontSize: '18px', color: '#007bff' }}>
                {showEmail ? <a href="mailto:najarzs@mail.uc.edu">najarzs@mail.uc.edu</a> : 'Show my email'}
            </div>
            <div className="mt-4 text-center">
                <h3>Random Joke</h3>
                {joke && <div id="joke" style={{ marginTop: '20px', fontSize: '16px', fontWeight: 'bold' }}>{joke}</div>}
            </div>
            <div className="mt-4">
                <input type="text" id="nameInput" placeholder="Enter your name" className="form-control mb-2" />
                <button className="btn btn-primary" onClick={guessAge}>Guess Age</button>
                {ageGuess && <div id="ageGuess" style={{ marginTop: '20px', fontSize: '16px', fontWeight: 'bold' }}>{ageGuess}</div>}
            </div>
            <div className="mt-4 text-center">
                <h3>Random Chart</h3>
                <Line data={chartData} />
            </div>
        </div>
    );
}

export default WaphFunctionalities;
