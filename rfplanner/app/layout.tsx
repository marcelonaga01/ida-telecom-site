import type {Metadata}from'next';
import 'leaflet/dist/leaflet.css';
import './globals.css';
export const metadata:Metadata={title:'IDA Telecom · RFPlanner',icons:{icon:'/rfplanner/ida-telecom-logo.svg'},description:'Configure seu estudo de radiofrequência, visualize a cobertura no mapa e exporte em KMZ.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body>{children}</body></html>;}
