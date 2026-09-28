import {customElement} from 'lit/decorators.js';
import {Tooltip} from './internal/tooltip.js';

declare global {
  interface HTMLElementTagNameMap {
    'md-tooltip': MdTooltip;
  }
}

@customElement('md-tooltip')
export class MdTooltip extends Tooltip {}
