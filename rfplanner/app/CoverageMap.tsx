'use client';
import{useEffect,useRef,useState}from'react';
import type{Map,ImageOverlay}from'leaflet';
import{ArrowLeft,Download,LoaderCircle,MapPin,RotateCcw}from'lucide-react';
import{geographicRow}from'@/lib/map-projection.mjs';
type Preview={layers:{name:string;image:string;bounds:[[number,number],[number,number]]}[];legend:string;site:{latitude:number;longitude:number;name:string};opacity:number;basemap:{url:string;attribution:string}};
async function projectLayer(layer:Preview['layers'][number]){
 const image=new Image();image.src=layer.image;await image.decode();const canvas=document.createElement('canvas');canvas.width=image.naturalWidth;canvas.height=image.naturalHeight;const context=canvas.getContext('2d');if(!context)throw Error('Canvas indisponível.');
 for(let row=0;row<canvas.height;row++)context.drawImage(image,0,geographicRow(row,canvas.height,layer.bounds[0][0],layer.bounds[1][0]),canvas.width,1,0,row,canvas.width,1);
 return canvas.toDataURL('image/png');
}
export default function CoverageMap({study,onBack,onExport}:{study:any;onBack:()=>void;onExport:()=>void}){
 const host=useRef<HTMLDivElement>(null),map=useRef<Map|null>(null),images=useRef<ImageOverlay[]>([]),[data,setData]=useState<Preview|null>(null),[error,setError]=useState(''),[loading,setLoading]=useState(true),[opacity,setOpacity]=useState(45),[visible,setVisible]=useState<boolean[]>([]),[point,setPoint]=useState(''),[retry,setRetry]=useState(0);
 const display=useRef({opacity,visible});display.current={opacity,visible};
 useEffect(()=>{const abort=new AbortController();setLoading(true);setError('');setData(null);fetch(`/rfplanner/api/studies/${study.id}/map`,{cache:'no-store',signal:abort.signal}).then(async r=>{const body=await r.json() as any;if(!r.ok)throw Error(body.error);setOpacity(Math.round(body.opacity*100));setVisible(body.layers.map(()=>true));setData(body);}).catch(e=>{if(e.name!=='AbortError')setError(e.message);}).finally(()=>{if(!abort.signal.aborted)setLoading(false);});return()=>abort.abort();},[study.id,retry]);
 useEffect(()=>{if(!data||!host.current)return;let stopped=false;let resize:ResizeObserver|undefined;
  import('leaflet').then(async L=>{if(stopped||!host.current)return;const m=L.map(host.current,{scrollWheelZoom:true,attributionControl:true});map.current=m;
   L.tileLayer(data.basemap.url,{maxZoom:19,attribution:data.basemap.attribution}).addTo(m);
   const projected=await Promise.all(data.layers.map(projectLayer));if(stopped)return;
   images.current=data.layers.map((layer,i)=>L.imageOverlay(projected[i],layer.bounds,{opacity:display.current.visible[i]?display.current.opacity/100:0,interactive:false}).addTo(m));
   const label=document.createElement('span');label.textContent=data.site.name;L.circleMarker([data.site.latitude,data.site.longitude],{radius:6,color:'#fff',weight:2,fillColor:'#123f36',fillOpacity:1}).bindTooltip(label).addTo(m);
   m.fitBounds(data.layers[0].bounds,{padding:[20,20]});m.on('click',e=>setPoint(`${e.latlng.lat.toFixed(6)}, ${e.latlng.lng.toFixed(6)}`));resize=new ResizeObserver(()=>m.invalidateSize());resize.observe(host.current);
  }).catch(()=>{if(!stopped)setError('Não foi possível iniciar o mapa. Atualize a página.');});
  return()=>{stopped=true;resize?.disconnect();map.current?.remove();map.current=null;images.current=[];};
 },[data]);
 useEffect(()=>{images.current.forEach((image,i)=>image.setOpacity(visible[i]?opacity/100:0));},[opacity,visible]);
 const fit=()=>{if(data)map.current?.fitBounds(data.layers[0].bounds,{padding:[20,20]});};
 return <section className="coverage-view"><div className="map-toolbar"><button className="text-button" onClick={onBack}><ArrowLeft size={16}/>Voltar aos estudos</button><button className="primary" onClick={onExport}><Download size={16}/>Exportar KMZ</button></div><div className="coverage-grid"><div className="card map-frame">{loading&&<div className="map-loading"><LoaderCircle className="spin"/><strong>Carregando a cobertura calculada…</strong><span>O estudo não será recalculado.</span></div>}{error&&<div className="map-loading" role="alert"><strong>{error}</strong><button className="secondary" onClick={()=>setRetry(v=>v+1)}><RotateCcw size={15}/>Tentar novamente</button></div>}<div ref={host} className={'map-canvas '+(!data||error?'hidden':'')} aria-label="Mapa interativo da cobertura calculada"/>{data&&!error&&<div className="map-coordinate"><MapPin size={13}/>{point||'Clique no mapa para consultar as coordenadas'}</div>}</div><aside className="card map-options"><span className="overline">ESTUDO DE COBERTURA</span><h2>{study.name}</h2><dl><div><dt>Tecnologia</dt><dd>{study.study.technology} · {study.study.frequency} MHz</dd></div><div><dt>Raio / grade</dt><dd>{study.study.radius} km / {study.study.resolution} m</dd></div><div><dt>Corte</dt><dd>{study.study.threshold} dBm</dd></div></dl>{data&&<><div className="map-layer-options"><h3>Setores</h3>{data.layers.map((layer,i)=><label className="check" key={i}><input type="checkbox" checked={visible[i]??true} onChange={e=>setVisible(v=>v.map((x,j)=>j===i?e.target.checked:x))}/>{layer.name}</label>)}</div><label className="field"><span>Transparência da cobertura <small>{opacity}% de opacidade</small></span><input type="range" min="0" max="100" value={opacity} onChange={e=>setOpacity(Number(e.target.value))}/></label><button className="secondary full" onClick={fit}><MapPin size={15}/>Enquadrar estudo</button><img className="map-legend" src={data.legend} alt="Legenda dos níveis de RSRP em dBm"/></>}</aside></div></section>;
}
