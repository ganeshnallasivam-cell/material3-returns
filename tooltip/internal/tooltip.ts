import {css, html, LitElement, TemplateResult} from 'lit';
import {property, state} from 'lit/decorators.js';

export class Tooltip extends LitElement {
  static override styles = css`
    :host {
      display: inline-block;
      position: absolute;
      box-sizing: border-box;
      z-index: 1000;
    }
    .tooltip {
      background: var(--md-sys-color-inverse-surface, #313033);
      color: var(--md-sys-color-inverse-on-surface, #f4eff4);
      border-radius: var(--md-sys-shape-corner-extra-small, 4px);
      padding: 4px 8px;
      font-size: 0.75rem;
      line-height: 1rem;
      pointer-events: none;
      transition: opacity 150ms cubic-bezier(0.2, 0, 0, 1);
    }
    .tooltip[hidden] {
      display: none;
    }
  `;

  @property({type: String, attribute: 'for'}) for = '';
  @property() content = '';
  @property({type: Boolean}) rich = false;
  @state() private showing = false;

  private targetEl: HTMLElement | null = null;

  override connectedCallback() {
    super.connectedCallback();
    this.attachTarget();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.detachTarget();
  }

  override updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('for')) {
      this.detachTarget();
      this.attachTarget();
    }
  }

  private attachTarget() {
    if (!this.for) return;
    const root = this.getRootNode() as Document | ShadowRoot;
    this.targetEl = root.getElementById ? (root.getElementById(this.for) as HTMLElement) : null;
    if (this.targetEl) {
      this.targetEl.addEventListener('mouseenter', this.show);
      this.targetEl.addEventListener('mouseleave', this.hide);
      this.targetEl.addEventListener('focus', this.show);
      this.targetEl.addEventListener('blur', this.hide);
    }
  }

  private detachTarget() {
    if (this.targetEl) {
      this.targetEl.removeEventListener('mouseenter', this.show);
      this.targetEl.removeEventListener('mouseleave', this.hide);
      this.targetEl.removeEventListener('focus', this.show);
      this.targetEl.removeEventListener('blur', this.hide);
      this.targetEl = null;
    }
  }

  show = () => { this.showing = true; };
  hide = () => { this.showing = false; };

  override render(): TemplateResult {
    return html`
      <div
        part="tooltip"
        class="tooltip"
        role="tooltip"
        ?hidden=${!this.showing}>
        <span part="content"><slot>${this.content}</slot></span>
      </div>
    `;
  }
}
