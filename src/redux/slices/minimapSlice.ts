import { createSlice, createSelector } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type {
  Widget,
  VehicleWidget,
  WidgetMap,
  Screen,
} from 'src/types/widget';
import type { Message } from 'src/types/schema-types';
import type { Element, ElementMap } from 'src/types/element';
import type { LinkedSectionWidget, Section } from 'src/types/support-types';
import selector from 'src/prototype/selector';
import { ownship, drones } from 'src/prototype/lpd/initialLPD';

export type InitialMinimapState = {
  visualComplexity: number;
  audioComplexity: number;

  // read-only
  ownship: VehicleWidget | null;
  drones: VehicleWidget[];

  widgets: WidgetMap;
  messages: Message[];
  sections: Section[];
};

const initialState: InitialMinimapState = {
  visualComplexity: 0,
  audioComplexity: 0,
  messages: [],
  // Initial sections, widgets, and elements
  ...selector(),
};

export const minimapSlice = createSlice({
  name: 'minimap',
  initialState,
  reducers: {
    // This is needed for compatibility with redux-state-sync
    initializeState: (state, action: PayloadAction<InitialMinimapState>) => {
      // don't initialize if we already have data (one-time initialization)
      if (Object.keys(state.widgets).length > 0 || state.sections.length > 0) {
        return;
      }

      state.visualComplexity = action.payload.visualComplexity;
      state.audioComplexity = action.payload.audioComplexity;
      state.ownship = action.payload.ownship;
      state.drones = action.payload.drones;
      state.widgets = action.payload.widgets;
      state.messages = action.payload.messages;
      state.sections = action.payload.sections;
    },

    addMapSection: (state, action) => {
      state.sections.push(action.payload); //add it to our sections as well
    },

    addWidget: (state, action: PayloadAction<Widget>) => {
      state.widgets[action.payload.id] = action.payload;
    },

    updateWidget: (state, action: PayloadAction<Widget>) => {
      state.widgets[action.payload.id] = action.payload;
    },

    updateShipPosition: {
      prepare(shipId: string, x: number, y: number) {
        return {
          payload: { shipId, x, y },
        };
      },

      reducer: (
        state,
        action: PayloadAction<{ shipId: string; x: number; y: number }>,
      ) => {
        const { shipId, x, y } = action.payload;
        const ship = state.widgets[shipId];

        // check if ship exists
        if (!ship) {
          console.error(`Ship with id ${shipId} not found`);
          return;
        }

        // check if the ship is a vehicle
        if (ship.type !== 'vehicle') {
          console.error(`Widget with id ${shipId} is not a vehicle`);
          return;
        }

        state.widgets[shipId] = {
          ...ship,
          x,
          y,
        };
      },
    },

    removeWidget: (state, action: PayloadAction<string>) => {
      delete state.widgets[action.payload];
    },

    addElementToWidget: {
      prepare(widgetId: string, elements: Element[]) {
        return { payload: { widgetId, elements } };
      },

      reducer(
        state,
        action: PayloadAction<{ widgetId: string; elements: Element[] }>,
      ) {
        console.log('adding elements to widget', action.payload.elements);
        state.widgets[action.payload.widgetId].elements = action.payload.elements;
        // state.widgets[action.payload.widgetId].elements.push(
        //   ...action.payload.elements,
        // );
      },
    },

    // TODO: add a prepare function to addWidgetToSection to pass in sectionID and widgetID separately
    addWidgetToSection: (state, action: PayloadAction<LinkedSectionWidget>) => {
      state.sections.forEach(function (section, sectionIndex) {
        if (section.id === action.payload.sectionID) {
          section.widgetIDs.push(action.payload.widgetID);
        }
      });
    },

    updateElementExpiration: {
      //update the time until window of interaction expires
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
          const tempElements = state.widgets[widgetId].elements;
          tempElements.forEach(function (element, elementIndex) {
            if (element.id === elementId && element.expirationInterval) {
              const newExpiration = new Date();
              newExpiration.setSeconds(
                newExpiration.getSeconds() + element.expirationInterval,
              );
              tempElements[elementIndex].expiration =
                newExpiration.toISOString();
            }
          });
          state.widgets[widgetId] = {
            ...widget,
            elements: tempElements,
          };
        } else {
          console.error(`Widget with id ${widgetId} not found`);
        }
      },
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

    escalateElement: {
      //update the time until window of interaction expires
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
          const tempElements = state.widgets[widgetId].elements;
          tempElements.forEach(function (element, elementIndex) {
            if (element.id === elementId && element.collapsed) {
              //do something
              tempElements[elementIndex].collapsed = false;
            }
          });
          state.widgets[widgetId] = {
            ...widget,
            elements: tempElements,
          };
        } else {
          console.error(`Widget with id ${widgetId} not found`);
        }
      },
    },

    deescalateElement: {
      //update the time until window of interaction expires
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
          const tempElements = state.widgets[widgetId].elements;
          tempElements.forEach(function (element, elementIndex) {
            if (element.id === elementId && element.collapsed) {
              //do something
              tempElements[elementIndex].collapsed = true;
            }
          });
          state.widgets[widgetId] = {
            ...widget,
            elements: tempElements,
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
    getWidgetsOnScreen: (state, screen: Screen) => {
      const widgets: WidgetMap = {};
      Object.keys(state.widgets).forEach((widgetId) => {
        const widget = state.widgets[widgetId];
        if (widget.screen === screen) {
          widgets[widgetId] = widget;
        }
      });

      return widgets;
    },
    getWidgetById: (state, id: string) =>
      state.widgets[id] ? state.widgets[id] : null,

    // ~~~~~ selectors for elements ~~~~~
    getAllElements: (state) => {
      const allElements: Element[] = [];
      Object.keys(state.widgets).forEach((widgetId) => {
        allElements.push(...state.widgets[widgetId].elements);
      });
      return allElements;
    },
    getElementsOnScreen: (state, screen: Screen) => {
      const elements: ElementMap = {};
      Object.keys(state.widgets).forEach((widgetId) => {
        const widget = state.widgets[widgetId];
        if (widget.screen === screen) {
          widget.elements.forEach((element) => {
            elements[element.id] = element;
          });
        }
      });

      return elements;
    },

    getVisualComplexity: (state) => state.visualComplexity,
    getAudioComplexity: (state) => state.audioComplexity,
    getMessages: (state) => state.messages,

    // ~~~~~ selectors for ships ~~~~~
    getOwnship: (state) => {
      if (state.ownship) {
        return state.widgets[state.ownship.id];
      }
      return null;
    },
    getDrones: (state) => {
      if (state.drones.length > 0) {
        return state.drones.map((drone) => state.widgets[drone.id]);
      }
      return [];
    },
  },
});

// action creators (automatically generated by createSlice for each reducer)
export const {
  initializeState,

  addMapSection,
  addMessage,
  addWidget,
  addElementToWidget,
  addWidgetToSection,
  updateElementExpiration,
  escalateElement,
  deescalateElement,

  updateWidget,
  updateShipPosition,
  updateVisualComplexity,
  updateAudioComplexity,

  removeWidget,
  deleteElementFromWidget,

  toggleElementInteraction,
} = minimapSlice.actions;

export const {
  getSections,

  getWidgets,
  getWidgetsOnScreen,
  getWidgetById,

  getAllElements,
  getElementsOnScreen,

  getMessages,

  getOwnship,
  getDrones,

  getVisualComplexity,
  getAudioComplexity,
} = minimapSlice.selectors;
