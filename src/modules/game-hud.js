import { GameEngine } from "../libs/game-engine";
import { GameField } from "../components/game-field";
import { Notice } from "../components/notice";
import { TurnInformation } from "../components/turn-information";

export class GameHud {
    constructor() {
        this.turns = null;
        this.gameEngine = null;
        this.gameField = null;
        this.turnInfo = new TurnInformation();

        document.body.appendChild(this.turnInfo.element);
        this.createGameField(false);
    }

    createGameField(lastWinner = "X") {
        this.turns = 0;
        this.gameEngine = new GameEngine(["X", "O"], lastWinner);

        if (localStorage.getItem('oldFields')) {
            document.body.insertAdjacentHTML('beforeEnd', JSON.parse(localStorage.getItem('oldFields')));
        }else {
            this.gameField = new GameField(this.gameEngine.field);

            this.gameField.items.forEach(row => {
                row.items.forEach(slot => {
                    slot.element.addEventListener("click", element =>
                        this.occupyField(element)
                    );
                });
            });

            document.body.appendChild(this.gameField.element);
        }
            new Notice(`Game Start! First to Play: ${this.gameEngine.turnOf}`, 3000);
            this.turnInfo.update(this.turns, this.gameEngine.turnOf);
    }

    get isGameEnd() {
        return this.gameEngine.isWinner || this.gameEngine.isTie;
    }

    processGameEnd() {
        let winner = false;
        if (this.gameEngine.isWinner) {
            new Notice(
                `Game End! Winner is ${this.gameEngine.turnOf}! Game took ${
                    this.turns
                    } turns`,
                4000
            );
            winner = this.gameEngine.turnOf;
        } else if (this.gameEngine.isTie) {
            new Notice(`Game End! It's a Tie! Game took ${this.turns} turns`, 1500);
        }
        localStorage.clear();
        setTimeout(() => {
            this.createGameField(winner);
        }, 1500);
    }

    occupyField(element) {
        let coords = {
            row: parseInt(element.target.getAttribute("slot-row"), 10),
            column: parseInt(element.target.getAttribute("slot-column"), 10)
        };

        let turnAction = this.gameEngine.occupyField(coords);
        if (!turnAction) {
            new Notice("This field is already occupied");
            return;
        }

        this.turns++;

        if (this.isGameEnd) {
            this.processGameEnd();
        } else {
            this.gameEngine.toggleTurn();
            this.turnInfo.update(this.turns, this.gameEngine.turnOf);
        }

        this.gameField
            .getItem(turnAction.row)
            .getItem(turnAction.column).textContent = turnAction;
        let old = document.querySelector("game-field");
        localStorage.setItem('oldFields', JSON.stringify(old.outerHTML));
    }
}