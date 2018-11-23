import { SimpleComponent } from "../libs/simple-component";
import { PlaySymbol } from "./play-symbol";
import { CurrentTurn } from "./current-turn";

export class TurnInformation extends SimpleComponent {
    constructor() {
        super("turn-information");
        this.currentTurn = new CurrentTurn();
        this.symbol = new PlaySymbol();
        this.element.setAttribute(
            "style",
            "text-transform: uppercase; font-size: 30px; height: 40px; display: block; font-family: Monospace"
        );

        this.element.appendChild(this.currentTurn.element);
        this.element.appendChild(this.symbol.element);
    }

    update(turn, symbol) {
        this.currentTurn.textContent = turn || 0;
        this.symbol.textContent = symbol || "";
    }
}