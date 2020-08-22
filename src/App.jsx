import { h, render } from 'preact';
import { useState } from 'preact/hooks';
import WinrateSummary from './WinrateSummary';
import LoadingAnimation from './LoadingAnimation';
import './App.css';
import { useEffect } from 'react';

const App = () => {
    const testData = [
        { matchup: 'PvP', value: 20 },
        { matchup: 'ZvP', value: 24 },
        { matchup: 'TvP', value: 62 },
    ];
    const [rawWinrateData, setRawWinrateData] = useState(null);
    const [winrateData, setWinrateData] = useState(null);
    const [winrateDisplayType, setWinrateDisplayType] = useState('matchup');

    useEffect(async () => {
        const fetchWinrateData = () => {
            let url;
            if (process.env.NODE_ENV === 'production') {
                url = 'https://wctl.zephyrus.gg/';
            } else {
                url = 'http://localhost:5000/';
            }
            return fetch(`${url}wctl_matches.json`).then(res => res.json());
        };

        const rawData = await fetchWinrateData();
        console.log(rawData);
        setRawWinrateData(rawData.data);
    }, []);

    useEffect(() => {
        const filterData = (data) => {
            const filtered = {};
            data.forEach((d) => {
                if (winrateDisplayType === 'matchup') {
                    console.log(d.matchup.slice(0)[0], d.matchup.slice(-1)[0]);
                    // mirror matchup
                    if (d.matchup.slice(0)[0] === d.matchup.slice(-1)[0]){
                        return;
                    }

                    if (!filtered.hasOwnProperty(d.matchup)) {
                        filtered[d.matchup] = {
                            wins: 0,
                            losses: 0,
                        };
                    }

                    if (d.winner.race.slice(0)[0] === d.matchup.slice(0)[0]) {
                        filtered[d.matchup].wins += 1
                    } else {
                        filtered[d.matchup].losses += 1
                    }
                } else {
                    Object.entries(d.players).forEach(([name, race]) => {
                        if (!filtered.hasOwnProperty(name)) {
                            filtered[name] = {
                                race,
                                wins: 0,
                                losses: 0,
                            };
                        }

                        if (d.winner.name === name) {
                            filtered[name].wins += 1
                        } else {
                            filtered[name].losses += 1
                        }
                    });
                }
            });

            if (winrateDisplayType === 'matchup') {
                Object.entries(filtered).forEach(([matchup, values]) => {
                    filtered[matchup.split('').reverse().join('')] = {
                        wins: values.losses,
                        losses: values.wins,
                    }
                });
            }

            console.log(filtered);
            const renderData = Object.entries(filtered).map(([name, values]) => ({
                name,
                race: winrateDisplayType === 'matchup' ? name.toLowerCase() : values.race.toLowerCase(),
                value: Number(((values.wins / (values.wins + values.losses)) * 100).toFixed(1)),
            }));
            console.log(renderData);
            const valueComparison = (a, b) => (b.value - a.value);
            renderData.sort(valueComparison);
            return renderData;
        };

        console.log('HELLO', rawWinrateData);
        if (rawWinrateData) {
            setWinrateData(filterData(rawWinrateData));
        }
    }, [rawWinrateData, winrateDisplayType]);

    return (
        <div class="App">
            <h1 class="App__title">
                War Chest Team League
            </h1>
            {winrateData &&
                <WinrateSummary
                    data={winrateData}
                    displayType={winrateDisplayType}
                    setDisplayType={setWinrateDisplayType}
                />}
            {!winrateData && <LoadingAnimation />}
        </div>
    );
};

export default App;
