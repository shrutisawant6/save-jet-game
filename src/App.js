import logo from './logo.svg';
import './App.css';
import React from 'react';

import { useRef } from 'react';


function App() {
    const refText = useRef(null);

    function magnifyWord() {
        var formattedText = "<div>";
        var words = refText.current.textContent.split(" ");

        words.map((word, index) => {
            if (words.length - 1 == index) {
                formattedText = formattedText + "<span>" + word + "</span>";
            }
            else {
                formattedText = formattedText + "<span>" + word + " " + "</span>";
            }
        });
        refText.current.innerHTML = formattedText + "</div>";
    }

    function magnifyAlphabet() {
        var formattedText = "<div>";
        refText.current.textContent.split("").map((alphabet) => {

            formattedText = formattedText + "<span>" + alphabet + "</span>";
        });

        refText.current.innerHTML = formattedText + "</div>";
    }

    return (
        <div className="App">

            <header className="App-header">
                <div className="float-left">
                    <img src={logo} className="App-logo" alt="logo" />
                </div>
                <div>
                    <img src="magnifyIcon.png" onClick={magnifyWord} width="3%" title="Click to magnify words" />
                    <img src="magnifyIcon.png" onClick={magnifyAlphabet} width="3%" title="Click to magnify letters" />
                </div>
            </header>

            <div>
                <div>
                    <div ref={refText}>
                        Click on any of the above maginifier to enlarge the words or letters.
                    </div>
                </div>
            </div>
        </div>
    );
}


export default App;
