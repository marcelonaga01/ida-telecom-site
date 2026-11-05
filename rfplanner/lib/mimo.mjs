// Simplified upper-bound layer presets: no automatic diversity/coverage gain.
export const mimoModes = [
 {id:'siso',label:'SISO · 1×1',layers:1},
 {id:'2x2',label:'MIMO 2×2',layers:2},
 {id:'4x4',label:'MIMO 4×4',layers:4},
 {id:'8x8',label:'MIMO 8×8',layers:8}
];
export function selectedMimo(study){return study.mimoGain===0?mimoModes.find(m=>m.layers===study.mimoMultiplier):undefined;}
export function applyMimo(study,id){
 const mode=mimoModes.find(m=>m.id===id);if(!mode)throw Error('Modo MIMO inválido.');
 return {...study,mimoGain:0,mimoMultiplier:mode.layers};
}
