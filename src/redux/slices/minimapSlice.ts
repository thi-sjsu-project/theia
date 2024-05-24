import { createSlice, createSelector } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Widget, VehicleWidget, WidgetMap, MapWarningWidget } from 'src/types/widget';
import type { Screen } from 'src/types/support-types';
import type { Message } from 'src/types/schema-types';
import type { Element, ElementMap } from 'src/types/element';
import type { LinkedSectionWidget, Section } from 'src/types/support-types';
import RequestApprovalElement from 'src/components/Element/Complex/RequestApprovalElement';

export type InitialMinimapState = {
  visualComplexity: number;
  audioComplexity: number;

  // read-only
  ownship: VehicleWidget | null;
  drones: VehicleWidget[];

  widgets: WidgetMap;
  messages: Message[];
  sections: Section[];

  stressLevel: number;
};

const initialState: InitialMinimapState = {
  visualComplexity: 0,
  audioComplexity: 0,
  ownship: null,
  drones: [],
  messages: [],
  widgets: {},
  sections: [],
  stressLevel: 0,
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
      // set widgetIds of all elements to the widget id
      action.payload.elements.forEach((element) => {
        element.widgetId = action.payload.id;
      });
      state.widgets[action.payload.id] = action.payload;
    },

    updateWidget: (state, action: PayloadAction<Widget>) => {
      state.widgets[action.payload.id] = action.payload;
    },

    updateElement: {
      prepare(widgetId: string, element: Element) {
        return {
          payload: { widgetId, element },
        };
      },

      reducer: (
        state,
        action: PayloadAction<{ widgetId: string; element: Element }>,
      ) => {
        const { widgetId, element } = action.payload;
        const widget = state.widgets[widgetId];

        if (!widget) {
          console.error(`Widget with id ${widgetId} not found`);
          return;
        }

        state.widgets[widgetId] = {
          ...widget,
          elements: widget.elements.map((el) => {
            if (el.id === element.id) {
              return element;
            }
            return el;
          }),
        };
      },
    },

    updateShipPosition: {
      prepare(shipId: string, x: number, y: number, rotation: number) {
        return {
          payload: { shipId, x, y, rotation },
        };
      },

      reducer: (
        state,
        action: PayloadAction<{
          shipId: string;
          x: number;
          y: number;
          rotation: number;
        }>,
      ) => {
        const { shipId, x, y, rotation } = action.payload;
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
          rotation,
        };
      },
    },

    removeWidget: (state, action: PayloadAction<string>) => {
      delete state.widgets[action.payload];
    },

    addElementsToWidget: {
      prepare(widgetId: string, elements: Element[]) {
        return { payload: { widgetId, elements } };
      },

      reducer(
        state,
        action: PayloadAction<{ widgetId: string; elements: Element[] }>,
      ) {
        // console.log('adding elements to widget', action.payload.elements);
        const { widgetId, elements } = action.payload;
        const widget = state.widgets[widgetId];

        if (!widget) {
          console.error(
            `Widget with id ${widgetId} not found (addElementToWidget)`,
          );
          return;
        }

        state.widgets[widgetId] = {
          ...widget,
          elements: [...widget.elements, ...elements],
        };

        // set widgetId of all elements to the widget id
        state.widgets[widgetId].elements.forEach((element) => {
          element.widgetId = widgetId;
        });
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
          widget.elements.forEach((element) => {
            if (element.id === elementId) {
              // if element does not have an expiration interval, log an error
              if (!element.expirationIntervalMs) {
                // console.error(
                //   `Element with id ${elementId} does not have an expiration interval`,
                // );
                return;
              }

              const expiration = new Date();
              expiration.setMilliseconds(
                expiration.getMilliseconds() + element.expirationIntervalMs,
              );

              element.expiration = expiration.toISOString();
            }
          });

          state.widgets[widgetId] = widget;
        } else {
          console.error(`Widget with id ${widgetId} not found`);
        }
      },
    },

    // add a new message to widget's handledMessages array
    addHandledMessageToWidget: {
      prepare(widgetId: string, messageId: string) {
        return {
          payload: { widgetId, messageId },
        };
      },

      reducer: (
        state,
        action: PayloadAction<{ widgetId: string; messageId: string }>,
      ) => {
        const { widgetId, messageId } = action.payload;
        const widget = state.widgets[widgetId];

        if (!widget) {
          console.error(`Widget with id ${widgetId} not found`);
          return;
        }

        if (!widget.handledMessageIds) {
          widget.handledMessageIds = [];
        }

        widget.handledMessageIds.push(messageId);
        state.widgets[widgetId] = widget;
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
            if (element.id === elementId) {
              //do something
              tempElements[elementIndex].escalate = true;
              tempElements[elementIndex].deescalate = false;
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
            if (element.id === elementId) {
              //do something
              tempElements[elementIndex].escalate = false;
              tempElements[elementIndex].deescalate = true;
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

    setStressLevel: (state, action: PayloadAction<number>) => {
      state.stressLevel = action.payload;
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

    getWidgetsByConversationID: (state, conversationId: string) => {
      const widgets: WidgetMap = {};

      Object.values(state.widgets)
        .filter(
          (widget) =>
            widget.screen === '/minimap' &&
            widget.type === 'map-warning' &&
            widget.elements.some(
              (element) =>
                element.type === 'request-approval' &&
                widget.conversationId === conversationId,
            ),
        )
        .forEach((widget) => {
          widgets[widget.id] = widget;
        });

      return widgets;
    },

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
          Array.from(widget.elements).forEach((element) => {
            elements[element.id] = element;
          });
        }
      });

      return elements;
    },

    getVisualComplexity: (state) => state.visualComplexity,
    getAudioComplexity: (state) => state.audioComplexity,
    getMessages: (state) => state.messages,
    getConversationMessages: (state, conversationId: string) => {
      return state.messages.filter(
        (message) => message.conversationId === conversationId,
      );
    },
    getStressLevel: (state) => state.stressLevel,

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
  addHandledMessageToWidget,
  addElementsToWidget,
  addWidgetToSection,
  updateElementExpiration,
  escalateElement,
  deescalateElement,

  updateWidget,
  updateElement,
  updateShipPosition,
  updateVisualComplexity,
  updateAudioComplexity,

  removeWidget,
  deleteElementFromWidget,

  // toggleElementInteraction,

  setStressLevel,
} = minimapSlice.actions;

export const {
  getSections,

  getWidgets,
  getWidgetsOnScreen,
  getWidgetById,
  getWidgetsByConversationID,

  getAllElements,
  getElementsOnScreen,

  getMessages,
  getConversationMessages,

  getOwnship,
  getDrones,

  getVisualComplexity,
  getAudioComplexity,

  getStressLevel,
} = minimapSlice.selectors;
