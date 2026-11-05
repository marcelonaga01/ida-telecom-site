import{inflateRawSync}from'node:zlib';
export function extractKmz(input){
 const b=Buffer.from(input);let end=-1;
 for(let p=b.length-22;p>=Math.max(0,b.length-65557);p--)if(b.readUInt32LE(p)===0x06054b50){end=p;break;}
 if(end<0||b.readUInt16LE(end+10)!==1)throw Error('Artefato KMZ inválido.');
 const p=b.readUInt32LE(end+16);if(p+46>b.length||b.readUInt32LE(p)!==0x02014b50)throw Error('Índice ZIP inválido.');
 const compressed=b.readUInt32LE(p+20),size=b.readUInt32LE(p+24),n=b.readUInt16LE(p+28),local=b.readUInt32LE(p+42),method=b.readUInt16LE(p+10);
 if(size>16*1024*1024||b.readUInt16LE(p+8)&1||b.toString('utf8',p+46,p+46+n)!=='coverage.kmz'||local+30>b.length||b.readUInt32LE(local)!==0x04034b50)throw Error('Conteúdo KMZ inválido.');
 const start=local+30+b.readUInt16LE(local+26)+b.readUInt16LE(local+28);if(start+compressed>b.length)throw Error('ZIP truncado.');
 const data=b.subarray(start,start+compressed),result=method===0?data:method===8?inflateRawSync(data,{maxOutputLength:16*1024*1024}):null;
 if(!result||result.length!==size)throw Error('Tamanho de KMZ inválido.');
 let crc=0xffffffff;for(const byte of result){crc^=byte;for(let i=0;i<8;i++)crc=(crc>>>1)^((crc&1)?0xedb88320:0);}if(((crc^0xffffffff)>>>0)!==b.readUInt32LE(p+16))throw Error('Integridade de KMZ inválida.');return result;
}
