import { h } from 'preact';
import './WinrateSummary.css';
import { useEffect } from 'preact/hooks';

const WinrateSummary = ({ data, displayType, setDisplayType }) => {
    const raceColours = {
        protoss: 'hsl(50, 80%, 45%)',
        terran: 'hsl(15, 90%, 40%)',
        zerg: 'hsl(270, 80%, 35%)',
    };

    useEffect(() => {
        const bars = [...document.getElementsByClassName('WinrateSummary__value-bar')];
        bars.forEach((bar) => {
            bar.animate([
                { strokeDashoffset: Number(bar.dataset.value) },
                { strokeDashoffset: 0 },
            ], {
                delay: Number(bar.dataset.delay),
                duration: 800,
                easing: 'cubic-bezier(.15, .2, .2, 1)',
                fill: 'forwards',
            });
        });
    }, [displayType]);

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
                    <div key={`${d.name}-${d.race}-${d.values[0]}`} className="WinrateSummary__data-point">
                        <h2 className={`WinrateSummary__value-name WinrateSummary__value-name--${displayType}`}>
                            {d.name}
                        </h2>
                        <svg
                            className={`WinrateSummary__value-bar-wrapper WinrateSummary__value-bar-wrapper--${d.race}`}
                            viewBox="0 0 102 2"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                data-value={d.values[0] + 1}
                                data-delay={100 + (70 * (index))}
                                d={`M1,1 L${d.values[0] + 1},1`}
                                className={`WinrateSummary__value-bar WinrateSummary__value-bar--${d.race}`}
                                stroke={raceColours[d.race]}
                                stroke-width={0.5} // eslint-disable-line react/no-unknown-property
                                stroke-linecap="round" // eslint-disable-line react/no-unknown-property
                                stroke-dasharray={d.values[0] + 1} // eslint-disable-line react/no-unknown-property
                                stroke-dashoffset={d.values[0] + 1} // eslint-disable-line react/no-unknown-property
                            />
                        </svg>
                        <h2 className="WinrateSummary__value">
                            {d.values[0]}%<small>({d.values[1]}/{d.values[2]})</small>
                        </h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WinrateSummary;
