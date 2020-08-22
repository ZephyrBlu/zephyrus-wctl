import { h } from 'preact';
import './WinrateSummary.css';

const WinrateSummary = ({ data, displayType, setDisplayType }) => {
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
                    Winrate Summary
                </h1>
                <div
                    class={`
                        WinrateSummary__controls
                        ${displayType === 'matchup'
                            ? 'WinrateSummary__controls--matchup'
                            : 'WinrateSummary__controls--player'}
                    `}
                >
                    <button
                        class="WinrateSummary__control-option"
                        onClick={() => setDisplayType('matchup')}
                    >
                        By Matchup
                    </button>
                    <button
                        class="WinrateSummary__control-option"
                        onClick={() => setDisplayType('player')}
                    >
                        By Player
                    </button>
                </div>
            </div>
            <div class="WinrateSummary__winrate-data">
                {data.map((d) => (
                    <div class="WinrateSummary__data-point">
                        <h2 class="WinrateSummary__matchup">
                            {d.name}
                        </h2>
                        <svg
                            class={`WinrateSummary__value-bar WinrateSummary__value-bar--${d.race}`}
                            viewBox="0 0 102 2"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <line
                                x1="1"
                                y1="1"
                                x2="1"
                                y2="1"
                                stroke={raceColours[d.race]}
                                stroke-width={0.5}
                                stroke-linecap="round"
                            >
                                <animate
                                    attributeName="x2"
                                    begin=".1s"
                                    from="1"
                                    to={d.value + 1}
                                    dur=".3s"
                                    fill="freeze"
                                />
                            </line>
                        </svg>
                        <h2 class="WinrateSummary__value">
                            {d.value}%
                        </h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WinrateSummary;
