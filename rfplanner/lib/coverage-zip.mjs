import {inflateRawSync} from 'node:zlib';
const MAX=16*1024*1024;
function crc32(bytes){let crc=0xffffffff;for(const byte of bytes){crc^=byte;for(let i=0;i<8;i++)crc=(crc>>>1)^((crc&1)?0xedb88320:0);}return(crc^0xffffffff)>>>0;}
export function coverageEntries(input){
 const b=Buffer.from(input);if(b.length>MAX)throw Error('KMZ maior que o limite do visualizador.');let end=-1;
 for(let i=b.length-22;i>=Math.max(0,b.length-65557);i--)if(b.readUInt32LE(i)===0x06054b50){end=i;break;}
 if(end<0||end+22+b.readUInt16LE(end+20)!==b.length||b.readUInt16LE(end+4)||b.readUInt16LE(end+6))throw Error('KMZ inválido.');
 const count=b.readUInt16LE(end+10),dirSize=b.readUInt32LE(end+12),dirStart=b.readUInt32LE(end+16);if(count<3||count>12||dirStart+dirSize!==end||b.readUInt16LE(end+8)!==count)throw Error('Índice KMZ inválido.');
 const files=new Map();let p=dirStart,total=0;
 for(let i=0;i<count;i++){
  if(p+46>end||b.readUInt32LE(p)!==0x02014b50)throw Error('Índice KMZ truncado.');
  const flags=b.readUInt16LE(p+8),method=b.readUInt16LE(p+10),crc=b.readUInt32LE(p+16),compressed=b.readUInt32LE(p+20),size=b.readUInt32LE(p+24),n=b.readUInt16LE(p+28),extra=b.readUInt16LE(p+30),comment=b.readUInt16LE(p+32),local=b.readUInt32LE(p+42);
  if(p+46+n+extra+comment>end)throw Error('Nome KMZ inválido.');const name=b.toString('utf8',p+46,p+46+n);
  if(!/^(doc\.kml|legend\.png|branch_\d{3}\.png)$/.test(name)||files.has(name)||flags&1||![0,8].includes(method)||size>MAX||local+30>dirStart||b.readUInt32LE(local)!==0x04034b50)throw Error('Conteúdo KMZ inválido.');
  total+=size;if(total>MAX)throw Error('Conteúdo KMZ muito grande.');const start=local+30+b.readUInt16LE(local+26)+b.readUInt16LE(local+28);if(start+compressed>dirStart)throw Error('Arquivo KMZ truncado.');
  const bytes=b.subarray(start,start+compressed),data=method===0?bytes:inflateRawSync(bytes,{maxOutputLength:MAX});if(data.length!==size||crc32(data)!==crc)throw Error('Integridade KMZ inválida.');files.set(name,data);p+=46+n+extra+comment;
 }
 if(p!==end||!files.has('doc.kml')||!files.has('legend.png'))throw Error('Mapa KMZ incompleto.');return files;
}
const text=s=>s.replace(/&(?:amp|lt|gt|quot|apos);/g,e=>({'&amp;':'&','&lt;':'<','&gt;':'>','&quot;':'"','&apos;':"'"}[e]));
export function coveragePreview(input){
 const files=coverageEntries(input),kml=files.get('doc.kml').toString('utf8');if(kml.length>100000||/<!DOCTYPE|<!ENTITY/i.test(kml))throw Error('Descrição do mapa inválida.');
 const png=name=>{const data=files.get(name);if(!data||data.length<24||!data.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])))throw Error('Imagem de cobertura inválida.');const w=data.readUInt32BE(16),h=data.readUInt32BE(20);if(!w||!h||w>6001||h>6001||w*h>25000000)throw Error('Dimensões da imagem inválidas.');return 'data:image/png;base64,'+data.toString('base64');};
 const layers=[];for(const match of kml.matchAll(/<GroundOverlay>([\s\S]*?)<\/GroundOverlay>/g)){
  const block=match[1],name=block.match(/<name>([\s\S]*?)<\/name>/)?.[1],file=block.match(/<href>([^<]+)<\/href>/)?.[1];if(!file||!/^branch_\d{3}\.png$/.test(file)||!name)throw Error('Setor inválido.');
  const coord=tag=>Number(block.match(new RegExp('<'+tag+'>([^<]+)</'+tag+'>'))?.[1]);const north=coord('north'),south=coord('south'),east=coord('east'),west=coord('west');if(![north,south,east,west].every(Number.isFinite)||north<=south||east<=west||north>90||south< -90||east>180||west< -180)throw Error('Coordenadas do mapa inválidas.');
  layers.push({name:text(name),image:png(file),bounds:[[south,west],[north,east]]});
 }
 if(!layers.length||layers.length>8)throw Error('Nenhum setor disponível.');return{layers,legend:png('legend.png')};
}
