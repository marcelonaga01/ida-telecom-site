import {deflateSync,deflateRawSync} from 'node:zlib';
import {coverageEntries,coveragePreview} from './coverage-zip.mjs';
import {glyphs} from './legend-font.mjs';
const stops=[-109,-105,-100,-95,-90,-85,-80];
const colors=[[0,0,255],[0,128,255],[0,255,128],[0,255,0],[128,255,0],[255,128,0],[255,0,0]];
function color(value){let i=0;while(i<5&&value>stops[i+1])i++;const t=Math.min(1,Math.max(0,(value-stops[i])/(stops[i+1]-stops[i])));return colors[i].map((v,k)=>Math.trunc(v+t*(colors[i+1][k]-v)));}
export function legendLevels(threshold){
 if(!Number.isFinite(threshold)||threshold< -200||threshold>0)throw Error('Corte de legenda inválido.');
 return [...stops].reverse().filter(v=>v>threshold).concat(threshold);
}
function crc32(bytes){let crc=0xffffffff;for(const b of bytes){crc^=b;for(let i=0;i<8;i++)crc=(crc>>>1)^((crc&1)?0xedb88320:0);}return(crc^0xffffffff)>>>0;}
function chunk(name,data){const type=Buffer.from(name),size=Buffer.alloc(4),crc=Buffer.alloc(4);size.writeUInt32BE(data.length);crc.writeUInt32BE(crc32(Buffer.concat([type,data])));return Buffer.concat([size,type,data,crc]);}
export function renderLegend(threshold,radius){
 if(!Number.isFinite(radius)||radius<=0||radius>30)throw Error('Raio de legenda inválido.');
 const levels=legendLevels(threshold),width=240,height=28+levels.length*18+28,pixels=Buffer.alloc(width*height*4,255);
 for(let i=3;i<pixels.length;i+=4)pixels[i]=240;
 const paint=(x,y,rgb,alpha=255)=>{if(x<0||y<0||x>=width||y>=height)return;const i=(y*width+x)*4;for(let k=0;k<3;k++)pixels[i+k]=Math.round(pixels[i+k]*(1-alpha/255)+rgb[k]*alpha/255);};
 const text=(value,x,y)=>{for(const c of value){const [w,encoded]=glyphs[c]||glyphs['?'],mask=Buffer.from(encoded,'base64');for(let py=0;py<18;py++)for(let px=0;px<w;px++)if(mask[py*w+px])paint(x+px,y+py,[15,30,45],mask[py*w+px]);x+=w;}};
 text('RSRP estimado (dBm)',8,4);
 levels.forEach((value,i)=>{const y=28+i*18,rgb=color(value);for(let dy=0;dy<12;dy++)for(let dx=0;dx<32;dx++)paint(8+dx,y+dy,rgb);text(`${value} dBm`,50,y-3);});
 text(`Corte: ${threshold} dBm | raio: ${radius} km`,8,height-22);
 const header=Buffer.alloc(13);header.writeUInt32BE(width);header.writeUInt32BE(height,4);header[8]=8;header[9]=6;
 const scan=Buffer.alloc((width*4+1)*height);for(let y=0;y<height;y++)pixels.copy(scan,y*(width*4+1)+1,y*width*4,(y+1)*width*4);
 return {width,height,png:Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',header),chunk('IDAT',deflateSync(scan)),chunk('IEND',Buffer.alloc(0))])};
}
function pack(files){
 const local=[],directory=[];let offset=0;
 for(const [name,data] of files){const n=Buffer.from(name),raw=deflateRawSync(data);
  const l=Buffer.alloc(30),c=Buffer.alloc(46),crc=crc32(data);l.writeUInt32LE(0x04034b50);l.writeUInt16LE(20,4);l.writeUInt16LE(8,8);l.writeUInt32LE(crc,14);l.writeUInt32LE(raw.length,18);l.writeUInt32LE(data.length,22);l.writeUInt16LE(n.length,26);
  c.writeUInt32LE(0x02014b50);c.writeUInt16LE(20,4);c.writeUInt16LE(20,6);c.writeUInt16LE(8,10);c.writeUInt32LE(crc,16);c.writeUInt32LE(raw.length,20);c.writeUInt32LE(data.length,24);c.writeUInt16LE(n.length,28);c.writeUInt32LE(offset,42);local.push(l,n,raw);directory.push(c,n);offset+=30+n.length+raw.length;
 }
 const central=Buffer.concat(directory),end=Buffer.alloc(22);end.writeUInt32LE(0x06054b50);end.writeUInt16LE(files.size,8);end.writeUInt16LE(files.size,10);end.writeUInt32LE(central.length,12);end.writeUInt32LE(offset,16);return Buffer.concat([...local,central,end]);
}
// Adapt the delivered result, including historical studies, without recalculating propagation.
export function withStudyLegend(kmz,study){
 coveragePreview(kmz);const files=coverageEntries(kmz),legend=renderLegend(study.threshold,study.radius);
 const kml=files.get('doc.kml').toString('utf8').replace(/<ScreenOverlay>[\s\S]*?<\/ScreenOverlay>/g,block=>block.includes('<href>legend.png</href>')?block.replace(/<size\b[^>]*\/>|<size\b[^>]*>[\s\S]*?<\/size>/,`<size x="${legend.width}" y="${legend.height}" xunits="pixels" yunits="pixels"/>`):block);
 files.set('doc.kml',Buffer.from(kml));files.set('legend.png',legend.png);return pack(files);
}
