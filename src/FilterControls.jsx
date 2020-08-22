import { h } from 'preact';
import './FilterControls.css';

const FilterControls = ({ winrateData, setWinrateData }) => {
    const matchStages = ['all', 'early', 'mid', 'late'];

    const filterData = (stage) => {
        console.log(stage);
        setWinrateData(winrateData);
    };

    const capitalize = (str) => (
        str.charAt(0).toUpperCase() + str.slice(1)
    );

    return (
        <div class="FilterControls">
            <h1 class="FilterControls__title">
                Match Stage
            </h1>
            <div class="FilterControls__controls">
                {matchStages.map((stage) => (
                    <button
                        class="FilterControls__control-option"
                        onClick={() => filterData(stage)}
                    >
                        {capitalize(stage)}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default FilterControls;
