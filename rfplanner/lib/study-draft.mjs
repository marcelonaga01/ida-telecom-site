import {defaultStudy} from './study.mjs';
import {sectorValues} from './sector-settings.mjs';

// Keep the validated legacy reference separate from an incomplete new form.
export function newSectorDraft(study=defaultStudy){
 const previous=sectorValues(study,study.sectors.at(-1)||{});
 return {antenna:previous.antenna,gain:previous.gain,mimoGain:previous.mimoGain,mimoMultiplier:previous.mimoMultiplier,
  name:'',azimuth:'',power:'',height:'',electricalTilt:'',mechanicalTilt:'',insertionLoss:0,cableLoss:0};
}
export function newStudyDraft(){
 return {...structuredClone(defaultStudy),name:'',latitude:'',longitude:'',insertionLoss:0,cableLoss:0,
  landcoverSource:'MAPBIOMAS',landcoverYear:2025,sectors:[newSectorDraft()]};
}
