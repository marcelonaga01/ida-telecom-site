import{env}from'./server-env';
export function basemap(){
 const vars=env as unknown as Record<string,string>,url=vars.RF_MAP_TILE_URL;
 if(!url)return{url:'https://tile.openstreetmap.org/{z}/{x}/{y}.png',attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors'};
 if(!url.startsWith('https://')||!['{x}','{y}','{z}'].every(token=>url.includes(token)))throw Error('Configure um endereço HTTPS de mapa base com {z}, {x} e {y}.');
 const credit=vars.RF_MAP_TILE_CREDIT;if(!credit)throw Error('Configure a atribuição do provedor de mapa base.');
 return{url,attribution:credit.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;')};
}
