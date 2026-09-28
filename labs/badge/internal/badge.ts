/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {html, LitElement} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';

/**
 * b/265340196 - add docs
 */
export class Badge extends LitElement {
  @property() value = '';
  @property({type: Number}) max = 999;
  @property({type: Boolean}) dot = false;

  protected override render() {
    const classes = {
      'md3-badge--large': this.value,
      'md3-badge--dot': this.dot,
    };
    const displayValue =
      this.value === '' || Number(this.value) <= this.max ? this.value
      : `${this.max}+`;

    return html`<div part="badge" class="md3-badge ${classMap(classes)}">
      <p part="value" class="md3-badge__value">${displayValue}</p>
    </div>`;
  }
}
