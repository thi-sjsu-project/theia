import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Widget } from '../../types/modalities';
import type { Message } from 'src/types/schema-types';
import type { LinkedSectionWidget, Section } from 'src/types/support-types';


type InitialState = {
  visualComplexity: number;
  audioComplexity: number;
  widgets: Widget[];
  messages: Message[];
  sections: Section[];
  /* ADD MORE AS NEEDED... */
};

const initialState: InitialState = {
  visualComplexity: 0,
  audioComplexity: 0,
  widgets: [],
  messages: [],
  sections: [],
};

export const minimapSlice = createSlice({
  name: 'minimap',
  initialState,
  // reducers are used to update the state
  reducers: {
    addMapSection: (state, action) => {
      state.sections.push(action.payload); //add it to our sections as well
    },
    addWidget: (state, action: PayloadAction<Widget>) => {
      state.widgets.push(action.payload); //add to the widgets
    },
    removeWidget: (state, action: PayloadAction<string>) => {
      state.widgets = state.widgets.filter(
        (widget) => widget.id !== action.payload,
      );
    },

    addWidgetToSection: (state, action: PayloadAction<LinkedSectionWidget>) => {
      state.sections.forEach(function(section, sectionIndex){
        if(section.id == action.payload.sectionID){
          section.widgetIDs.push(action.payload.widgetID)
        }
      });
    },

    // delete an element from a widget by id
    updateWidgetDelete: (state, action: PayloadAction<string>) => {
      state.widgets = state.widgets.map((widget) => {
        return {
          ...widget,
          elements: widget.elements.filter(
            (element) => element.id !== action.payload,
          ),
        };
      });
    },

    toggleElementInteraction: (state, action: PayloadAction<string>) => {
      state.widgets = state.widgets.map((widget) => {
        if (widget.id === action.payload) {
          return {
            ...widget,
            elements: widget.elements.map((element) => {
              return {
                ...element,
                interacted: !element.interacted,
              };
            }),
          };
        }
        return widget;
      });
    },

    updateVisualComplexity: (state, action: PayloadAction<number>) => {
      state.visualComplexity = action.payload;
    },
    updateAudioComplexity: (state, action: PayloadAction<number>) => {
      state.audioComplexity = action.payload;
    },

    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
  },
  // selectors are used to access parts of the state within components
  selectors: {
    getSections: (state) => state.sections,
    getWidgets: (state) => state.widgets,
    // find a single widget by id
    getWidgetById: (state, id: string) =>
      state.widgets.find((widget) => widget.id === id),
    getVisualComplexity: (state) => state.visualComplexity,
    getAudioComplexity: (state) => state.audioComplexity,
    getMessages: (state) => state.messages,
  },
});

// action creators (automatically generated by createSlice for each reducer)
export const {
  addMapSection,
  addMessage,
  addWidget,
  removeWidget,
  addWidgetToSection,
  updateWidgetDelete,
  updateVisualComplexity,
  updateAudioComplexity,
  toggleElementInteraction,
} = minimapSlice.actions;

export const {
  getSections,
  getWidgets,
  getWidgetById,
  getMessages,
  getVisualComplexity,
  getAudioComplexity,
} = minimapSlice.selectors;
