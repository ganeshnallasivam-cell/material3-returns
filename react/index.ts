import React from 'react';
import {createComponent} from '@lit/react';
import {MdFilledButton} from '../button/filled-button.js';
import {MdOutlinedButton} from '../button/outlined-button.js';
import {MdCheckbox} from '../checkbox/checkbox.js';
import {MdSwitch} from '../switch/switch.js';
import {MdFilledTextField} from '../textfield/filled-text-field.js';
import {MdBadge} from '../labs/badge/badge.js';
import {MdOutlinedSegmentedButton} from '../labs/segmentedbutton/outlined-segmented-button.js';
import {MdOutlinedSegmentedButtonSet} from '../labs/segmentedbuttonset/outlined-segmented-button-set.js';
import {MdNavigationBar} from '../labs/navigationbar/navigation-bar.js';
import {MdNavigationTab} from '../labs/navigationtab/navigation-tab.js';
import {MdNavigationDrawer} from '../labs/navigationdrawer/navigation-drawer.js';
import {MdElevatedCard} from '../labs/card/elevated-card.js';
import {MdFilledCard} from '../labs/card/filled-card.js';
import {MdOutlinedCard} from '../labs/card/outlined-card.js';
import {MdItem} from '../labs/item/item.js';

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

export const OutlinedSegmentedButton = createComponent({
  tagName: 'md-outlined-segmented-button',
  elementClass: MdOutlinedSegmentedButton,
  react: React,
});

export const OutlinedSegmentedButtonSet = createComponent({
  tagName: 'md-outlined-segmented-button-set',
  elementClass: MdOutlinedSegmentedButtonSet,
  react: React,
  events: {
    onSegmentedButtonSetSelection: 'segmented-button-set-selection',
  },
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

export const NavigationBar = createComponent({
  tagName: 'md-navigation-bar',
  elementClass: MdNavigationBar,
  react: React,
  events: {
    onNavigationBarActivated: 'navigation-bar-activated',
  },
});

export const NavigationTab = createComponent({
  tagName: 'md-navigation-tab',
  elementClass: MdNavigationTab,
  react: React,
  events: {
    onNavigationTabInteraction: 'navigation-tab-interaction',
  },
});

export const NavigationDrawer = createComponent({
  tagName: 'md-navigation-drawer',
  elementClass: MdNavigationDrawer,
  react: React,
  events: {
    onNavigationDrawerChanged: 'navigation-drawer-changed',
  },
});

export const ElevatedCard = createComponent({
  tagName: 'md-elevated-card',
  elementClass: MdElevatedCard,
  react: React,
});

export const FilledCard = createComponent({
  tagName: 'md-filled-card',
  elementClass: MdFilledCard,
  react: React,
});

export const OutlinedCard = createComponent({
  tagName: 'md-outlined-card',
  elementClass: MdOutlinedCard,
  react: React,
});

export const Item = createComponent({
  tagName: 'md-item',
  elementClass: MdItem,
  react: React,
});
