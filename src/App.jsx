import { h } from 'preact';
import { useState } from 'preact/hooks';
import WinrateSummary from './WinrateSummary';
import './App.css';

const App = () => {
    const testData = [
        { matchup: 'PvP', value: 20 },
        { matchup: 'ZvP', value: 24 },
        { matchup: 'TvP', value: 62 },
    ];
    const [winrateData, setWinrateData] = useState(testData);

    return (
        <div class="App">
            <h1 class="App__title">
                War Chest Team League
            </h1>
            <WinrateSummary data={winrateData} />
        </div>
    );
};

export default App;
