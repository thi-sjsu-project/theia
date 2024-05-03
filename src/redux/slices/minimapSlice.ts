import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Widget, WidgetMap } from 'src/types/widget';
import type { Message } from 'src/types/schema-types';
import type { Element } from 'src/types/element';
import type { LinkedSectionWidget, Section } from 'src/types/support-types';
import { initialSections } from 'src/redux/utils/initialSections';
import { ownship, drones, initialShips } from 'src/utils/initialShips';

type InitialState = {
  visualComplexity: number;
  audioComplexity: number;
  widgets: WidgetMap;
  messages: Message[];
  sections: Section[];
};

const initialState: InitialState = {
  visualComplexity: 0,
  audioComplexity: 0,
  widgets: initialShips,
  messages: [],
  sections: initialSections,
};

export const minimapSlice = createSlice({
  name: 'minimap',
  initialState,
  reducers: {
    addMapSection: (state, action) => {
      state.sections.push(action.payload); //add it to our sections as well
    },

    addWidget: (state, action: PayloadAction<Widget>) => {
      state.widgets[action.payload.id] = action.payload;
    },

    updateWidget: (state, action: PayloadAction<Widget>) => {
      state.widgets[action.payload.id] = action.payload;
    },

    removeWidget: (state, action: PayloadAction<string>) => {
      delete state.widgets[action.payload];
    },

    addElementToWidget: {
      prepare(widgetId: string, element: Element) {
        return { payload: { widgetId, element } };
      },

      reducer(
        state,
        action: PayloadAction<{ widgetId: string; element: Element }>,
      ) {
        state.widgets[action.payload.widgetId].elements.push(
          action.payload.element,
        );
      },
    },

    addWidgetToSection: (state, action: PayloadAction<LinkedSectionWidget>) => {
      state.sections.forEach(function (section, sectionIndex) {
        if (section.id === action.payload.sectionID) {
          section.widgetIDs.push(action.payload.widgetID);
        }
      });
    },

    deleteElementFromWidget: {
      prepare(widgetId: string, elementId: string) {
        return {
          payload: { widgetId, elementId },
        };
      },

      reducer: (
        state,
        action: PayloadAction<{ widgetId: string; elementId: string }>,
      ) => {
        const { widgetId, elementId } = action.payload;

        const widget = state.widgets[widgetId];

        // if widget exists
        if (widget) {
          state.widgets[widgetId] = {
            ...widget,
            elements: widget.elements.filter(
              (element) => element.id !== elementId,
            ),
          };
        } else {
          console.error(`Widget with id ${widgetId} not found`);
        }
      },
    },

    toggleElementInteraction: {
      // prepare is called before the reducer (allows us to pass in multiple arguments to reducer)
      prepare(widgetId: string, elementId: string) {
        return {
          payload: { widgetId, elementId },
        };
      },

      reducer: (
        state,
        action: PayloadAction<{ widgetId: string; elementId: string }>,
      ) => {
        const { widgetId, elementId } = action.payload;

        // get the widget by id
        const widget = state.widgets[widgetId];

        if (widget) {
          // if widget exists, map over elements and toggle interacted by id
          state.widgets[widgetId] = {
            ...widget,
            elements: widget.elements.map((element) => {
              if (element.id === elementId) {
                return {
                  ...element,
                  interacted: !element.interacted,
                };
              }
              return element;
            }),
          };
        } else {
          console.error(`Widget with id ${widgetId} not found`);
        }
      },
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

    // ~~~~~ selectors for widgets ~~~~~
    getWidgets: (state) => state.widgets,
    getLeftScreenWidgets: (state) => {
      const minimapWidgets = Object.keys(state.widgets).filter(
        (id) => state.widgets[id].screen === 'left',
      );

      return minimapWidgets.map((id) => state.widgets[id]);
    },
    getMinimapWidgets: (state) => {
      const minimapWidgets = Object.keys(state.widgets).filter(
        (id) => state.widgets[id].screen === 'minimap',
      );

      return minimapWidgets.map((id) => state.widgets[id]);
    },
    getRightScreenWidgets: (state) => {
      const minimapWidgets = Object.keys(state.widgets).filter(
        (id) => state.widgets[id].screen === 'right',
      );

      return minimapWidgets.map((id) => state.widgets[id]);
    },
    getWidgetById: (state, id: string) =>
      state.widgets[id] ? state.widgets[id] : null,

    getVisualComplexity: (state) => state.visualComplexity,
    getAudioComplexity: (state) => state.audioComplexity,
    getMessages: (state) => state.messages,

    // ~~~~~ selectors for ships ~~~~~
    getOwnship: (state) =>
      state.widgets[ownship.id] ? state.widgets[ownship.id] : null,
    getDrones: (state) =>
      drones.map((drone) =>
        state.widgets[drone.id] ? state.widgets[drone.id] : null,
      ),
  },
});

// action creators (automatically generated by createSlice for each reducer)
export const {
  addMapSection,
  addMessage,
  addWidget,
  updateWidget,
  removeWidget,
  addElementToWidget,
  addWidgetToSection,
  deleteElementFromWidget,
  updateVisualComplexity,
  updateAudioComplexity,
  toggleElementInteraction,
} = minimapSlice.actions;

export const {
  getSections,

  getWidgets,
  getLeftScreenWidgets,
  getMinimapWidgets,
  getRightScreenWidgets,
  getWidgetById,

  getMessages,

  getOwnship,
  getDrones,

  getVisualComplexity,
  getAudioComplexity,
} = minimapSlice.selectors;
