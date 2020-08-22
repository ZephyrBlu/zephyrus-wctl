import { h } from 'preact';
import './WinrateSummary.css';

const WinrateSummary = ({ name, data }) => {
    const valueComparison = (a, b) => (b - a);
    data.sort(valueComparison);

    const raceColours = {
        protoss: 'hsl(50, 80%, 45%)',
        terran: 'hsl(15, 90%, 40%)',
        zerg: 'hsl(270, 80%, 35%)',
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

    return (
        <div class="WinrateSummary">
            <div class="WinrateSummary__header">
                <h1 class="WinrateSummary__title">
                    {name}
                </h1>
                <div class="WinrateSummary__controls">
                    <button class="WinrateSummary__control-option">
                        By Matchup
                    </button>
                    <button class="WinrateSummary__control-option">
                        By Player
                    </button>
                </div>
            </div>
            {data.map((d) => (
                <div class="WinrateSummary__winrate-data">
                    <h2 class="WinrateSummary__matchup">
                        {d.matchup}
                    </h2>
                    <svg
                        class={`WinrateSummary__value-bar WinrateSummary__value-bar--${matchupToRace(d.matchup)}`}
                        viewBox="0 0 101 2"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <line
                            x1="1"
                            y1="1"
                            x2={d.value}
                            y2="1"
                            stroke={raceColours[matchupToRace(d.matchup)]}
                            strokeWidth={0.5}
                            stroke-linecap="round"
                        />
                    </svg>
                    <h2 class="WinrateSummary__value">
                        {d.value}%
                    </h2>
                </div>
            ))}
        </div>
    );
};

export default WinrateSummary;
