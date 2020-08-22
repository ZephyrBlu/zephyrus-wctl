import { h } from 'preact';
import WinrateSummary from './WinrateSummary';
import WinrateGrid from './WinrateGrid';
import './App.css';

const App = () => {
    const testData = [
        { matchup: 'PvP', value: 20 },
        { matchup: 'ZvP', value: 24 },
        { matchup: 'TvP', value: 62 },
    ];

    return (
        <div class="App">
            <h1 class="App__title">
                War Chest Team League
            </h1>
            <WinrateSummary
                name="Winrate Summary"
                data={testData}
            />
            <WinrateGrid />
        </div>
    );
};

export default App;
