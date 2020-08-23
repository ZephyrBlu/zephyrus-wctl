import { h } from 'preact';
import './FilterControls.css';

const FilterControls = ({ winrateData, setWinrateData }) => {
    const matchStages = ['all', 'early', 'mid', 'late'];

    const filterData = (stage) => {
        setWinrateData(winrateData);
    };

    const capitalize = (str) => (
        str.charAt(0).toUpperCase() + str.slice(1)
    );

    return (
        <div className="FilterControls">
            <h1 className="FilterControls__title">
                Match Stage
            </h1>
            <div className="FilterControls__controls">
                {matchStages.map((stage) => (
                    <button
                        className="FilterControls__control-option"
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
