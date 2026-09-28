import React from 'react';
import {createComponent} from '@lit/react';
import {MdFilledButton} from '../button/filled-button.js';
import {MdOutlinedButton} from '../button/outlined-button.js';
import {MdCheckbox} from '../checkbox/checkbox.js';
import {MdSwitch} from '../switch/switch.js';
import {MdFilledTextField} from '../textfield/filled-text-field.js';
import {MdBadge} from '../labs/badge/badge.js';

export const FilledButton = createComponent({
  tagName: 'md-filled-button',
  elementClass: MdFilledButton,
  react: React,
});

export const OutlinedButton = createComponent({
  tagName: 'md-outlined-button',
  elementClass: MdOutlinedButton,
  react: React,
});

export const Checkbox = createComponent({
  tagName: 'md-checkbox',
  elementClass: MdCheckbox,
  react: React,
  events: {
    onChange: 'change',
    onInput: 'input',
  },
});

export const Switch = createComponent({
  tagName: 'md-switch',
  elementClass: MdSwitch,
  react: React,
  events: {
    onChange: 'change',
    onInput: 'input',
  },
});

export const FilledTextField = createComponent({
  tagName: 'md-filled-text-field',
  elementClass: MdFilledTextField,
  react: React,
  events: {
    onChange: 'change',
    onInput: 'input',
  },
});

export const Badge = createComponent({
  tagName: 'md-badge',
  elementClass: MdBadge,
  react: React,
});
