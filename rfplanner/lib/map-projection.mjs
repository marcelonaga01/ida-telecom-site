// The engine PNG has equally spaced geographic rows. XYZ basemaps use Web Mercator.
export function geographicRow(mercatorRow,height,south,north){
 const radians=Math.PI/180,mercator=lat=>Math.log(Math.tan(Math.PI/4+lat*radians/2)),top=mercator(north),bottom=mercator(south);
 const projected=top-(mercatorRow+.5)/height*(top-bottom),latitude=(2*Math.atan(Math.exp(projected))-Math.PI/2)/radians;
 return Math.max(0,Math.min(height-1,Math.floor((north-latitude)/(north-south)*height)));
}
