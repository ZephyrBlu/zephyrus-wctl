import { h } from 'preact';
import { useState } from 'preact/hooks';
import useWinrates from './useWinrates';
import WinrateSummary from './WinrateSummary';
import LoadingAnimation from './LoadingAnimation';
import './App.css';

const App = () => {
    const winrateData = useWinrates();
    const [winrateDisplayType, setWinrateDisplayType] = useState('matchup');

    return (
        <div className="App">
            <h1 className="App__title">
                <a
                    href="https://news.blizzard.com/en-us/starcraft2/23460555/introducing-war-chest-team-league"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    War Chest Team League
                </a>
            </h1>
            {winrateData && // eslint-disable-line operator-linebreak
                <WinrateSummary // eslint-disable-line react/jsx-wrap-multilines
                    data={winrateData[winrateDisplayType]}
                    displayType={winrateDisplayType}
                    setDisplayType={setWinrateDisplayType}
                />}
            {!winrateData && <LoadingAnimation />}
        </div>
    );
};

export default App;
