// Planning estimate, not a statistical mean or a completion deadline.
// Reference: 181 s for 801×801 points, 2 sectors, 30 m terrain sampling;
// 5 m reference: 91 s for 269×269 points and 2 sectors.
// Plus approximately 60 s setup with a cached executable. Queue time excluded.
export function executionTime(study,resolution=study.resolution){
 const radius=Number(study.radius),grid=Number(resolution),sectors=study.sectors?.length;
 if(!Number.isFinite(radius)||radius<=0||!Number.isFinite(grid)||grid<=0||!sectors)return 'tempo a estimar';
 const points=(2*Math.ceil(radius*1000/grid)+1)**2;
 const secondsPerPoint=Number(study.sampling)===5?91/(269*269):181/(801*801);
 const seconds=60+secondsPerPoint*points*Math.ceil(sectors/2);
 const minutes=Math.max(1,Math.round(seconds/60));
 return `cerca de ${minutes} min`;
}
