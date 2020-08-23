import { useState, useEffect } from 'preact/hooks';

const useWinrates = () => {
    const [winrateData, setWinrateData] = useState(null);

    useEffect(() => {
        const fetchWinrateData = async () => {
            let url;
            if (process.env.NODE_ENV === 'production') {
                url = 'https://wctl.zephyrus.gg/';
            } else {
                url = 'http://localhost:5000/';
            }
            const data = await fetch(`${url}wctl_matches.json`).then((res) => res.json());
            return data.data;
        };

        const matchupToRace = (matchup) => {
            const mainRace = matchup.slice(0)[0];
            switch (mainRace.toLowerCase()) {
                case 'p':
                    return 'protoss';
                case 't':
                    return 'terran';
                case 'z':
                    return 'zerg';
                default:
                    return null;
            }
        };

        const filterData = (data) => {
            const filtered = {
                matchup: {},
                player: {},
            };
            data.forEach((d) => {
                // mirror matchup
                if (!(d.matchup.slice(0)[0] === d.matchup.slice(-1)[0])) {
                    if (!filtered.matchup.hasOwnProperty(d.matchup)) {
                        filtered.matchup[d.matchup] = {
                            race: matchupToRace(d.matchup),
                            wins: 0,
                            losses: 0,
                        };
                    }

                    if (d.winner.race.slice(0)[0] === d.matchup.slice(0)[0]) {
                        filtered.matchup[d.matchup].wins += 1;
                    } else {
                        filtered.matchup[d.matchup].losses += 1;
                    }
                }

                Object.entries(d.players).forEach(([name, race]) => {
                    if (!filtered.player.hasOwnProperty(name)) {
                        filtered.player[name] = {
                            race,
                            wins: 0,
                            losses: 0,
                        };
                    }

                    if (d.winner.name === name) {
                        filtered.player[name].wins += 1;
                    } else {
                        filtered.player[name].losses += 1;
                    }
                });
            });

            Object.entries(filtered.matchup).forEach(([matchup, values]) => {
                filtered.matchup[matchup.split('').reverse().join('')] = {
                    race: matchupToRace(matchup.split('').reverse().join('')),
                    wins: values.losses,
                    losses: values.wins,
                };
            });

            const renderData = {};
            const valueComparison = (a, b) => (b.value - a.value);
            Object.entries(filtered).forEach(([displayType, typeData]) => {
                renderData[displayType] = Object.entries(typeData).map(([name, values]) => ({
                    name,
                    race: values.race.toLowerCase(),
                    value: Number(((values.wins / (values.wins + values.losses)) * 100).toFixed(1)),
                }));
                renderData[displayType].sort(valueComparison);
            });
            return renderData;
        };

        const asyncWrapper = async () => {
            const rawData = await fetchWinrateData();
            const processedData = filterData(rawData);
            setWinrateData(processedData);
        };
        setTimeout(asyncWrapper, 500);
    }, []);

    return winrateData;
};

export default useWinrates;
