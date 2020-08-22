import { h } from 'preact';
// import { useState } from 'preact/hooks';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import './WinrateGrid.css';

const WinrateGrid = () => {
    const races = ['protoss', 'terran', 'zerg'];

    // change to dynamically creating
    // colours based on key * 5
    const colours = {
        '-10': 'hsl(0, 100%, 30%)',
        '-9': 'hsl(0, 100%, 40%)',
        '-8': 'hsl(0, 100%, 45%)',
        '-7': 'hsl(0, 100%, 50%)',
        '-6': 'hsl(0, 100%, 55%)',
        '-5': 'hsl(0, 100%, 60%)',
        '-4': 'hsl(0, 100%, 65%)',
        '-3': 'hsl(0, 100%, 70%)',
        '-2': 'hsl(0, 100%, 75%)',
        '-1': 'hsl(0, 100%, 80%)',
        0: 'hsl(0, 0%, 85%)',
        1: 'hsl(120, 100%, 80%)',
        2: 'hsl(120, 100%, 75%)',
        3: 'hsl(120, 100%, 70%)',
        4: 'hsl(120, 100%, 65%)',
        5: 'hsl(120, 100%, 60%)',
        6: 'hsl(120, 100%, 55%)',
        7: 'hsl(120, 100%, 50%)',
        8: 'hsl(120, 100%, 45%)',
        9: 'hsl(120, 100%, 40%)',
        10: 'hsl(120, 100%, 30%)',
    };

    const getColour = (value) => {
        if (value === 0) {
            return 'black';
        }

        let v = value - 50;

        // clean up logic for readability
        if (v < 0) {
            if (v < -10) {
                v = '-10';
            } else {
                v = Math.floor(v).toString();
            }
        } else if (v > 10) {
            v = 10;
        } else {
            v = Math.ceil(v);
        }

        const colour = colours[v];
        return colour;
    };

    const capitalize = (str) => (
        str.charAt(0).toUpperCase() + str.slice(1)
    );

    return (
        <table class="WinrateGrid">
            <tbody>
                <tr class="WinrateGrid__row">
                    <td class="WinrateGrid__cell WinrateGrid__cell--header" />
                    {races.map(race => (
                        <td key={`${race}-horiz`} class="WinrateGrid__cell WinrateGrid__cell--header">
                            {capitalize(race)}
                        </td>
                    ))}
                </tr>
                {races.map(race => (
                    <tr key={`${race}-row`} class="WinrateGrid__row">
                        <td key={`${race}-vert`} class="WinrateGrid__cell WinrateGrid__cell--header">
                            {capitalize(race)}
                        </td>
                        {races.map(innerRace => (
                            <Tippy
                                content="Hello World"
                                arrow={true}
                            >
                                <td
                                    key={`${race}-value-vert`}
                                    class="WinrateGrid__cell WinrateGrid__cell--value"
                                    style={{
                                        backgroundColor: race === innerRace
                                            ? 'hsl(0, 0%, 47%)'
                                            : getColour(0),
                                    }}
                                />
                            </Tippy>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default WinrateGrid;
