import { h } from 'preact';
import './WinrateSummary.css';

const WinrateSummary = ({ data, displayType, setDisplayType }) => {
    const raceColours = {
        protoss: 'hsl(50, 80%, 45%)',
        terran: 'hsl(15, 90%, 40%)',
        zerg: 'hsl(270, 80%, 35%)',
    };

    return (
        <div className="WinrateSummary">
            <div className="WinrateSummary__header">
                <h1 className="WinrateSummary__title">
                    Winrate Summary
                </h1>
                <div
                    className={`
                        WinrateSummary__controls
                        ${displayType === 'matchup' ? 'WinrateSummary__controls--matchup' : 'WinrateSummary__controls--player'}
                    `}
                >
                    <button
                        className="WinrateSummary__control-option"
                        type="button"
                        onClick={() => setDisplayType('matchup')}
                    >
                        By Matchup
                    </button>
                    <button
                        className="WinrateSummary__control-option"
                        type="button"
                        onClick={() => setDisplayType('player')}
                    >
                        By Player
                    </button>
                </div>
            </div>
            <div className="WinrateSummary__winrate-data">
                {data.map((d, index) => (
                    <div key={`${d.name}-${d.race}-${d.value}`} className="WinrateSummary__data-point">
                        <h2 className="WinrateSummary__matchup">
                            {d.name}
                        </h2>
                        <svg
                            className={`WinrateSummary__value-bar-wrapper WinrateSummary__value-bar-wrapper--${d.race}`}
                            viewBox="0 0 102 2"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <line
                                className={`WinrateSummary__value-bar WinrateSummary__value-bar--${d.race}`}
                                x1="1"
                                y1="1"
                                x2="1"
                                y2="1"
                                stroke={raceColours[d.race]}
                                stroke-width={0.5} // eslint-disable-line react/no-unknown-property
                                stroke-linecap="round" // eslint-disable-line react/no-unknown-property
                            >
                                <animate
                                    attributeName="x2"
                                    begin={`${0.1 + (0.05 * (index + 1))}s`}
                                    from="1"
                                    to={d.value + 1}
                                    dur=".3s"
                                    fill="freeze"
                                />
                            </line>
                        </svg>
                        <h2 className="WinrateSummary__value">
                            {d.value}%
                        </h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WinrateSummary;
