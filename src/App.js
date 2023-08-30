import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Lose from './component/Lose';
import Won from './component/Won';


function App() {

    //jet position
    const [elementLeftRightPosition, setElementLeftRightPosition] = useState(45);
    const [elementTopBottomPosition, setElementTopBottomPosition] = useState(75);

    useEffect(() => {
        document.addEventListener("keydown", keyPress, false);
        return () => { document.removeEventListener("keydown", keyPress, false); };
    }, []);

    //move jet 
    const moveJet = 2;
    const keyPress = (e) => {
        switch (e.which) {
            case 37: {// left
                setElementLeftRightPosition((elementLeftRightPosition) => elementLeftRightPosition <= 2 ? elementLeftRightPosition : elementLeftRightPosition - moveJet)
                break
            }
            case 38: {// up
                setElementTopBottomPosition((elementTopBottomPosition) => elementTopBottomPosition <= 2 ? elementTopBottomPosition : elementTopBottomPosition - moveJet)
                break
            }
            case 39: {// right
                setElementLeftRightPosition((elementLeftRightPosition) => elementLeftRightPosition >= 90 ? elementLeftRightPosition : elementLeftRightPosition + moveJet)
                break
            }
            case 40: {// down                
                setElementTopBottomPosition((elementTopBottomPosition) => elementTopBottomPosition >= 75 ? elementTopBottomPosition : elementTopBottomPosition + moveJet)
                break
            }
            default:
        }
    }

    //bind jet elements
    function JetElement(props) {
        return <div
            className='element'
            style={{
                left: props.left + '%',
                position: 'absolute',
                top: props.top + '%'
            }}
            id={props.id}
        />;;

    }

    //bind attack elements
    function AttackElement(props) {
        return <div className='attack-element'
            style={{
                left: props.left + '%',
                position: 'absolute',
                top: props.top + '%'
            }} />;
    }

    //move attackers
    const [attackElementSpeed, setAttackElementSpeed] = useState(1);
    function MoveAttackElement(position) {
        return position == 85 ? 5 : position + attackElementSpeed;
    }

    //attacker 0
    const [attackTopBottomPosition, setAttackTopBottomPosition] = useState(5);
    useEffect(() => {
        const interval = setInterval(() => {
            setAttackTopBottomPosition((attackTopBottomPosition) => MoveAttackElement(attackTopBottomPosition));
        }, 50);
        return () => clearInterval(interval);
    }, []);

    //attacker 1
    const [attack1TopBottomPosition, setAttack1TopBottomPosition] = useState(20)
    useEffect(() => {
        const interval = setInterval(() => {
            setAttack1TopBottomPosition((attack1TopBottomPosition) => MoveAttackElement(attack1TopBottomPosition));
        }, 60);
        return () => clearInterval(interval);
    }, []);

    //attacker 2
    const [attack2TopBottomPosition, setAttack2TopBottomPosition] = useState(30)
    useEffect(() => {
        const interval = setInterval(() => {
            setAttack2TopBottomPosition((attack2TopBottomPosition) => MoveAttackElement(attack2TopBottomPosition));
        }, 70);
        return () => clearInterval(interval);
    }, []);

    //attacker 3
    const [attack3TopBottomPosition, setAttack3TopBottomPosition] = useState(25)
    useEffect(() => {
        const interval = setInterval(() => {
            setAttack3TopBottomPosition((attack3TopBottomPosition) => MoveAttackElement(attack3TopBottomPosition));
        }, 80);
        return () => clearInterval(interval);
    }, []);

    //attacker 4
    const [attack4TopBottomPosition, setAttack4TopBottomPosition] = useState(15)
    useEffect(() => {
        const interval = setInterval(() => {
            setAttack4TopBottomPosition((attack4TopBottomPosition) => MoveAttackElement(attack4TopBottomPosition));
        }, 30);
        return () => clearInterval(interval);
    }, []);

    //attacker 5
    const [attack5TopBottomPosition, setattack5TopBottomPosition] = useState(5)
    useEffect(() => {
        const interval = setInterval(() => {
            setattack5TopBottomPosition((attack5TopBottomPosition) => MoveAttackElement(attack5TopBottomPosition));
        }, 20);
        return () => clearInterval(interval);
    }, []);

    //attacker 6
    const [attack6TopBottomPosition, setattack6TopBottomPosition] = useState(5)
    useEffect(() => {
        const interval = setInterval(() => {
            setattack6TopBottomPosition((attack6TopBottomPosition) => MoveAttackElement(attack6TopBottomPosition));
        }, 25);
        return () => clearInterval(interval);
    }, []);

    //attacker 7
    const [attack7TopBottomPosition, setattack7TopBottomPosition] = useState(5)
    useEffect(() => {
        const interval = setInterval(() => {
            setattack7TopBottomPosition((attack7TopBottomPosition) => MoveAttackElement(attack7TopBottomPosition));
        }, 15);
        return () => clearInterval(interval);
    }, []);


    const attackLeftPosition = 30;
    const attack1LeftPosition = 70;
    const attack2LeftPosition = 48;
    const attack3LeftPosition = 38;
    const attack4LeftPosition = 20;
    const attack5LeftPosition = 10;
    const attack6LeftPosition = 60;
    const attack7LeftPosition = 80;
    const [show, toggleShow] = useState(false);

    //check if jet is attacked
    function IsJetAttacked(attackFireElement, attackLeftFireElement) {
        if ((attackFireElement + 5) >= elementTopBottomPosition
            && (attackFireElement - 5) <= elementTopBottomPosition
            && (elementLeftRightPosition >= (attackLeftFireElement - 4)
                && elementLeftRightPosition <= (attackLeftFireElement + 2))) {
            return true;
        }

        return false;
    }

    function OnClickGameLost() {
        document.getElementById("gameLost").click();
    }

    function OnClickGameWon() {
        document.getElementById("gameWon").click();
    }

    if (!show) {
        if ((IsJetAttacked(attack1TopBottomPosition, attack1LeftPosition))
            || (IsJetAttacked(attack2TopBottomPosition, attack2LeftPosition))
            || (IsJetAttacked(attack3TopBottomPosition, attack3LeftPosition))
            || (IsJetAttacked(attack4TopBottomPosition, attack4LeftPosition))
            || (IsJetAttacked(attack5TopBottomPosition, attack5LeftPosition))
            || (IsJetAttacked(attack6TopBottomPosition, attack6LeftPosition))
            || (IsJetAttacked(attack7TopBottomPosition, attack7LeftPosition))
            || (IsJetAttacked(attackTopBottomPosition, attackLeftPosition))) {
            OnClickGameLost();
        }

        if (elementTopBottomPosition <= 5) {
            OnClickGameWon();
        }

    }

    const StopGame = event => {
        toggleShow(!show);
    };

    return (

        <div>

            <Router>
                <div>
                    <ul style={{ display: "none" }}>
                        <li>
                            <Link to="/lose" style={{ color: "lightblue" }} onClick={StopGame} id="gameLost">Lose</Link>
                            <Link to="/won" style={{ color: "lightblue" }} onClick={StopGame} id="gameWon">Won</Link>
                        </li>
                    </ul>
                    <Routes>
                        <Route exact path='/lose' element={< Lose />}></Route>
                        <Route exact path='/won' element={< Won />}></Route>
                    </Routes>
                </div>
            </Router>

            {!show && <div id="gameDiv">

                <AttackElement left={attack5LeftPosition} top={attack5TopBottomPosition} />

                <AttackElement left={attack4LeftPosition} top={attack4TopBottomPosition} />

                <AttackElement left={attackLeftPosition} top={attackTopBottomPosition} />

                <AttackElement left={attack1LeftPosition} top={attack1TopBottomPosition} />

                <AttackElement left={attack2LeftPosition} top={attack2TopBottomPosition} />

                <AttackElement left={attack6LeftPosition} top={attack6TopBottomPosition} />

                <AttackElement left={attack3LeftPosition} top={attack3TopBottomPosition} />

                <AttackElement left={attack7LeftPosition} top={attack7TopBottomPosition} />


                <JetElement left={elementLeftRightPosition} top={elementTopBottomPosition} id="jet" />


            </div>}
        </div>
    );
}


export default App;