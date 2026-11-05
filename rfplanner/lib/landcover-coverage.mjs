// Missing regional data is acquired by the worker before propagation.
export class LandcoverCoverageError extends Error {}
export function validateLandcoverCoverage(study){
 if(!study.clutter||study.landcoverSource!=='MAPBIOMAS')return;
 if(!Number.isInteger(study.landcoverYear)||study.landcoverYear<2017||study.landcoverYear>2025)
  throw new LandcoverCoverageError('Ano MapBiomas não suportado.');
}
