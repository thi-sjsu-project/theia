import type { ModalityMeasure } from "src/prototype/useRestrainer";

const visualMeasure : ModalityMeasure = {
    type: "visual",
    measure: 0,
    boundary: {
        min: 0,
        max: 200
    },
    range: {
        min: 0,
        max: 255
    }
};

const auralMeasure : ModalityMeasure = {
    type: "auditory",
    measure: 0,
    boundary: {
        min: 0,
        max: 150
    },
    range: {
        min: 0,
        max: 255
    }
};

export const modalityMeasures = {
    visual: visualMeasure,
    audio: auralMeasure
};

export function generateModalityMeasure() {
    return ((Math.random() * 25) + 5);
}