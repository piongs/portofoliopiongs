import { useState, useEffect, useRef } from 'react'

function useInView(threshold=0.1){
  const ref=useRef(null),[v,setV]=useState(false)
  useEffect(()=>{
    const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)setV(true)},{threshold})
    if(ref.current)o.observe(ref.current)
    return()=>o.disconnect()
  },[])
  return[ref,v]
}

function Anim({children,delay=0,dir='up',style={}}){
  const[ref,v]=useInView()
  const t=dir==='up'?'translateY(40px)':dir==='left'?'translateX(-40px)':'translateX(40px)'
  return(
    <div ref={ref} style={{opacity:v?1:0,transform:v?'none':t,
      transition:`opacity .7s ease ${delay}s, transform .7s ease ${delay}s`,...style}}>
      {children}
    </div>
  )
}

// Real SVG tech icons
const ICONS={
  'HTML & CSS':<svg viewBox="0 0 48 48" width="22" height="22"><path fill="#E44D26" d="M6 42L2 4h44l-4 38-18 5z"/><path fill="#F16529" d="M24 8.5v31l14.6-4.1 3.4-32H24z"/><path fill="#EBEBEB" d="M24 17h-6.4l-.4-5H24v-5H12.6l1.2 14H24zm0 11.5l-.1.1-5.2-1.4-.3-4H13l.7 7.7 10.2 2.8.1-.1z"/><path fill="#fff" d="M24 17v5h5.9l-.6 6.5-5.3 1.4v5.2l10.2-2.8.1-.8 1.2-13.5H24z"/></svg>,
  'JavaScript':<svg viewBox="0 0 48 48" width="22" height="22"><path fill="#FFD600" d="M6 42V6h36v36z"/><path fill="#000" d="M29.5 32c.3 1.5 1.4 2.2 3 2.2 1.5 0 2.4-.7 2.4-1.7 0-1.2-.9-1.6-2.5-2.3l-.8-.4c-2.5-1.1-4.1-2.4-4.1-5.2 0-2.6 2-4.6 5.1-4.6 2.2 0 3.8.8 4.9 2.8l-2.7 1.7c-.6-1-1.2-1.4-2.2-1.4-1 0-1.6.6-1.6 1.4 0 1 .6 1.4 2.1 2l.8.4c3 1.3 4.6 2.5 4.6 5.4 0 3.1-2.4 4.9-5.7 4.9-3.2 0-5.2-1.5-6.2-3.5zm-10.3.4c.2 1.2.9 1.7 1.9 1.7 1 0 1.6-.5 1.6-2.5V20.6h3.4v11c0 4.1-2.4 6-5.9 6-3.2 0-5-1.7-5.9-3.7z"/></svg>,
  'PHP':<svg viewBox="0 0 48 48" width="22" height="22"><ellipse cx="24" cy="24" rx="22" ry="12" fill="#7377AD"/><path fill="#fff" d="M14 19h3l-1 6h2l1-6h3l-1 5c-.3 1.7-1.7 3-3.4 3H15zm13 0h5c2 0 3 1 2.5 3-.5 2-2 3-4 3h-2l-.5 3h-3zm3 1.5l-.8 3h1.5c.8 0 1.5-.5 1.7-1.3.2-.8-.3-1.7-1.2-1.7z"/></svg>,
  'Python':<svg viewBox="0 0 48 48" width="22" height="22"><path fill="#3776AB" d="M24 4c-5 0-8 2-8 5v3h8v2H12c-3 0-6 2-6 8s3 8 6 8h2v-4c0-3 3-5 8-5h8c3 0 6-2 6-5V9c0-3-3-5-6-5h-6zm-2 3c1 0 2 1 2 2s-1 2-2 2-2-1-2-2 1-2 2-2z"/><path fill="#FFD43B" d="M24 44c5 0 8-2 8-5v-3h-8v-2h12c3 0 6-2 6-8s-3-8-6-8h-2v4c0 3-3 5-8 5h-8c-3 0-6 2-6 5v9c0 3 3 5 6 5h6zm2-3c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2z"/></svg>,
  'Flask':<svg viewBox="0 0 48 48" width="22" height="22"><path fill="#000" d="M18 4l-2 10c-4 6-8 10-8 16 0 8 7 14 16 14s16-6 16-14c0-6-4-10-8-16L30 4h-4l1 8c-1 0-2-1-3-1s-2 1-3 1l1-8zm6 20c4 0 8 3 8 8s-4 8-8 8-8-3-8-8 4-8 8-8z"/></svg>,
  'CodeIgniter 3':<svg viewBox="0 0 48 48" width="22" height="22"><path fill="#DD4814" d="M24 4C12 4 4 12 4 24s8 20 20 20 20-8 20-20S36 4 24 4zm0 6c2 0 4 2 4 4s-2 4-4 4-4-2-4-4 2-4 4-4zm8 24H16c-1 0-2-1-1.5-2L18 22h2l-2 8h12l-2-8h2l3.5 10c.5 1-.5 2-1.5 2z"/></svg>,
  'Laravel 12':<svg viewBox="0 0 48 48" width="22" height="22"><path fill="#FF2D20" d="M44 12l-8 22-6-4-4 6-12-8 2-6-8-4L14 6l8 4 4-6 8 4-2 6zm-16 4l-6 16 6 4 6-16z"/></svg>,
  'Vue.js':<svg viewBox="0 0 48 48" width="22" height="22"><path fill="#41B883" d="M24 4L4 40h8l12-22 12 22h8z"/><path fill="#35495E" d="M24 4l-8 14h4l4-8 4 8h4z"/></svg>,
  'React.js':<svg viewBox="0 0 48 48" width="22" height="22"><circle cx="24" cy="24" r="4" fill="#61DAFB"/><ellipse cx="24" cy="24" rx="20" ry="7" fill="none" stroke="#61DAFB" strokeWidth="2"/><ellipse cx="24" cy="24" rx="20" ry="7" fill="none" stroke="#61DAFB" strokeWidth="2" transform="rotate(60 24 24)"/><ellipse cx="24" cy="24" rx="20" ry="7" fill="none" stroke="#61DAFB" strokeWidth="2" transform="rotate(120 24 24)"/></svg>,
  'Next.js':<svg viewBox="0 0 48 48" width="22" height="22"><circle cx="24" cy="24" r="20" fill="#000"/><path fill="#fff" d="M18 16h4v12l10-12h4L24 32l-6-7v7h-4z"/></svg>,
  'Bootstrap':<svg viewBox="0 0 48 48" width="22" height="22"><rect width="36" height="36" x="6" y="6" rx="6" fill="#7952B3"/><path fill="#fff" d="M16 12h10c4 0 6 2 6 5 0 2-1 3.5-3 4 2.5.5 4 2 4 4.5 0 3.5-2.5 6-7 6H16zm4 8h5c1.5 0 2.5-.8 2.5-2s-1-2-2.5-2h-5zm0 8h5.5c2 0 3-1 3-2.5s-1-2.5-3-2.5H20z"/></svg>,
  'MySQL':<svg viewBox="0 0 48 48" width="22" height="22"><path fill="#00758F" d="M24 4C13 4 4 10 4 20v8c0 10 9 16 20 16s20-6 20-16v-8C44 10 35 4 24 4z"/><ellipse cx="24" cy="20" rx="18" ry="8" fill="#F29111"/><path fill="#00758F" d="M6 20v4c0 4 8 8 18 8s18-4 18-8v-4c0 4-8 8-18 8S6 24 6 20z"/></svg>,
  'GitHub':<svg viewBox="0 0 48 48" width="22" height="22"><path fill="currentColor" d="M24 4C12.95 4 4 12.95 4 24c0 8.84 5.73 16.34 13.68 18.98 1 .18 1.37-.43 1.37-.96 0-.48-.02-1.75-.03-3.43-5.57 1.21-6.75-2.69-6.75-2.69-.91-2.31-2.22-2.92-2.22-2.92-1.82-1.24.14-1.22.14-1.22 2.01.14 3.07 2.07 3.07 2.07 1.79 3.07 4.7 2.18 5.85 1.67.18-1.3.7-2.18 1.27-2.68-4.45-.51-9.13-2.22-9.13-9.89 0-2.18.78-3.96 2.06-5.36-.21-.51-.89-2.54.2-5.29 0 0 1.68-.54 5.5 2.05A19.1 19.1 0 0 1 24 11.6c1.7.01 3.4.23 5 .68 3.81-2.59 5.49-2.05 5.49-2.05 1.09 2.75.41 4.78.2 5.29 1.28 1.4 2.06 3.18 2.06 5.36 0 7.69-4.69 9.37-9.15 9.87.72.62 1.36 1.84 1.36 3.71 0 2.68-.02 4.84-.02 5.5 0 .53.36 1.15 1.38.96A20.01 20.01 0 0 0 44 24C44 12.95 35.05 4 24 4z"/></svg>,
  'MS Office':<svg viewBox="0 0 48 48" width="22" height="22"><path fill="#D83B01" d="M28 8H44v32H28z"/><path fill="#ED6C47" d="M4 12l22-4v32L4 36z"/><path fill="#fff" d="M13 20l3 8 3-8h3l-4.5 10L13 20zm-1 0h3v10H12z"/></svg>,
  'SQLite':<svg viewBox="0 0 48 48" width="22" height="22"><path fill="#003B57" d="M36 4c-6 0-10 8-10 18S30 40 36 40s10-8 10-18S42 4 36 4z"/><path fill="#0F80CC" d="M12 8C6 8 4 16 4 24s2 16 8 16c4 0 8-4 8-16V8z"/><path fill="#fff" d="M18 28c-2 4-4 8-6 8-2 0-4-4-4-12s2-12 4-12c2 0 3 2 4 5"/></svg>,
}

const skills=[
  'HTML & CSS','JavaScript','PHP','Python','Flask',
  'CodeIgniter 3','Laravel 12','Vue.js','React.js','Next.js',
  'Bootstrap','MySQL','GitHub','MS Office',
]

const projects=[
  {num:'01',title:'PT CRT Kabelita',full:'Website Company Profile PT CRT Kabelita',type:'Proyek Utama',featured:true,
   desc:'Membuat dan mengembangkan ulang website company profile menggunakan arsitektur MVC dengan CodeIgniter 3. Dilengkapi fitur login, manajemen berita, dan landing page responsive.',
   tags:['PHP','CodeIgniter 3','Bootstrap','MySQL'],year:'2026',demo:null,emoji:'🏢'},
  {num:'02',title:'Enkripsi Excel',full:'Aplikasi Web Enkripsi Dokumen Excel',type:'Tugas Kuliah',
   desc:'Aplikasi web enkripsi & dekripsi file Excel menggunakan algoritma Vigenere Cipher. Upload file dan unduh hasilnya langsung.',
   tags:['Python','Flask','Vigenere Cipher'],year:'2026',demo:null,emoji:'📊'},
  {num:'03',title:'Enkripsi Dokumen',full:'Enkripsi PDF / DOC / Text',type:'Tugas Kuliah',
   desc:'Aplikasi web enkripsi dokumen multi-format (PDF, DOC, teks) menggunakan algoritma DES dan Vigenere Cipher.',
   tags:['Python','Flask','DES','Vigenere'],year:'2026',demo:'https://safedocdesdanvignere.vercel.app/login',demoNote:'Login: admin / admin123',emoji:'🔐'},
  {num:'04',title:'UMKM Helm',full:'Website UMKM Helm — Aero Helmets',type:'Web Project',
   desc:'Membangun ulang website katalog dan pemesanan produk helm untuk UMKM lokal. Lengkap dengan panel admin untuk kelola produk, kategori, dan pesanan.',
   tags:['Next.js','React.js','SQLite'],year:'2026',demo:'https://aero-helmets.vercel.app/',emoji:'⛑️'},
  {num:'05',title:'Website Cafe',full:'Pionk Coffee — Sistem Pemesanan',type:'Web Project',
   desc:'Website pemesanan menu cafe dengan sistem pesan dari meja dan struk digital otomatis. Panel admin untuk kelola menu dan pesanan.',
   tags:['Next.js','React.js','SQLite'],year:'2026',demo:'https://pionk-cofee.vercel.app/',emoji:'☕'},
  {num:'06',title:'Pionk Futsal',full:'Pionk Futsal — Online Field Booking',type:'Web Project',
   desc:'Online futsal field booking platform with schedules, venue selection, and a simple reservation flow.',
   tags:['Laravel 12','PHP','MySQL'],year:'2026',demo:'https://pionkfutsal.freedev.app/',emoji:'⚽'},
]

const scrollWords=['WEB DEV','MAHASISWA','BEKASI','OPEN TO WORK','PHP','PYTHON','NEXT.JS','REACT','LARAVEL','VUE.JS']

const projectEnglish={
  '01':{type:'Main Project',full:'PT CRT Kabelita Company Profile Website',desc:'Rebuilt and developed a company profile website with CodeIgniter 3 MVC architecture, including login, news management, and a responsive landing page.'},
  '02':{type:'Academic Project',full:'Excel Document Encryption Web App',desc:'Web application for encrypting and decrypting Excel files with the Vigenere Cipher. Upload a file and download the result directly.'},
  '03':{type:'Academic Project',full:'PDF / DOC / Text Encryption',desc:'Multi-format document encryption web application for PDF, DOC, and text files using DES and the Vigenere Cipher.'},
  '04':{type:'Web Project',full:'Aero Helmets UMKM Website',desc:'Product catalog and ordering website for a local helmet business, with an admin panel for managing products, categories, and orders.'},
  '05':{type:'Web Project',full:'Pionk Coffee Ordering System',desc:'Cafe ordering website with table ordering and automatic digital receipts, plus an admin panel for managing menus and orders.'},
  '06':{type:'Web Project',full:'Pionk Futsal Online Field Booking',desc:'Online futsal field booking platform with schedules, venue selection, and a simple reservation flow.'},
}

function OceanBackground(){
  return <div className="ocean-bg" aria-hidden="true">
    {[...Array(12)].map((_,i)=><span className={`bubble bubble-${i+1}`} key={i}/>)}
    <span className="seaweed seaweed-one">〰</span><span className="seaweed seaweed-two">〰</span><span className="seaweed seaweed-three">〰</span>
    <span className="fish fish-one">🐟</span><span className="fish fish-two">🐠</span><span className="fish fish-three">🐟</span><span className="fish fish-four">🐡</span>
    <span className="jellyfish jellyfish-one">◒</span><span className="jellyfish jellyfish-two">◒</span>
    <span className="water-light water-light-one"/><span className="water-light water-light-two"/>
  </div>
}

export default function App(){
  const[dark,setDark]=useState(false)
  const[lang,setLang]=useState('en')
  const[scrolled,setScrolled]=useState(false)
  const[active,setActive]=useState('home')
  const[hoverSkill,setHoverSkill]=useState(null)
  const[typed,setTyped]=useState('')
  const[projOpen,setProjOpen]=useState(false)
  const[selProj,setSelProj]=useState(null)
  const[menuOpen,setMenuOpen]=useState(false)
  const words=['Web Developer','Mahasiswa TI','PHP Developer','Next.js Dev','Open to Intern']
  const[wi,setWi]=useState(0),[deleting,setDeleting]=useState(false),[charI,setCharI]=useState(0)

  useEffect(()=>{document.documentElement.setAttribute('data-theme',dark?'dark':'light')},[dark])

  useEffect(()=>{
    const t=setTimeout(()=>{
      const w=words[wi]
      if(!deleting){
        if(charI<w.length){setTyped(w.slice(0,charI+1));setCharI(c=>c+1)}
        else setTimeout(()=>setDeleting(true),1400)
      } else {
        if(charI>0){setTyped(w.slice(0,charI-1));setCharI(c=>c-1)}
        else{setDeleting(false);setWi(i=>(i+1)%words.length)}
      }
    },deleting?55:95)
    return()=>clearTimeout(t)
  },[charI,deleting,wi])

  useEffect(()=>{
    const fn=()=>{
      setScrolled(window.scrollY>40)
      const ids=['home','about','skills','projects','education','contact']
      for(const id of [...ids].reverse()){
        const el=document.getElementById(id)
        if(el&&window.scrollY>=el.offsetTop-120){setActive(id);break}
      }
    }
    window.addEventListener('scroll',fn)
    return()=>window.removeEventListener('scroll',fn)
  },[])

  useEffect(()=>{
    if(projOpen) document.body.style.overflow='hidden'
    else document.body.style.overflow=''
    return()=>{document.body.style.overflow=''}
  },[projOpen])

  const go=(id)=>{document.getElementById(id)?.scrollIntoView({behavior:'smooth'});setMenuOpen(false)}

  const nav=[
    {id:'about',l:lang==='en'?'About':'Tentang'},{id:'skills',l:lang==='en'?'Skills':'Keahlian'},
    {id:'projects',l:lang==='en'?'Projects':'Proyek'},{id:'education',l:lang==='en'?'Education':'Pendidikan'},{id:'contact',l:lang==='en'?'Contact':'Kontak'}
  ]

  const openProj=(p)=>{setSelProj(p);setProjOpen(true)}
  const closeProj=()=>{setProjOpen(false);setTimeout(()=>setSelProj(null),300)}

  return(
    <div style={{minHeight:'100vh',background:'var(--bg)',color:'var(--text)',transition:'all .4s',position:'relative',zIndex:1}}>
      <OceanBackground />

      {/* MODAL */}
      {projOpen&&(
        <div onClick={closeProj} style={{position:'fixed',inset:0,zIndex:2000,
          background:'rgba(0,0,0,0.7)',backdropFilter:'blur(8px)',
          display:'flex',alignItems:'center',justifyContent:'center',padding:'1rem',
          animation:'fadeIn .25s ease'}}>
          <div onClick={e=>e.stopPropagation()} style={{
            background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:'24px',
            padding:'clamp(1.5rem,4vw,2.5rem)',maxWidth:'600px',width:'100%',
            animation:'scaleIn .3s ease',maxHeight:'90vh',overflowY:'auto'}}>
            {selProj&&(<>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'1.5rem',gap:'1rem'}}>
                <div style={{display:'flex',alignItems:'center',gap:'1rem'}}>
                  <div>
                    <div style={{fontSize:'0.68rem',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.1em',color:'var(--accent)',marginBottom:'4px'}}>{lang==='en'?projectEnglish[selProj.num].type:selProj.type}</div>
                    <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'clamp(1rem,3vw,1.3rem)',fontWeight:800,letterSpacing:'-0.5px'}}>{lang==='en'?projectEnglish[selProj.num].full:selProj.full}</div>
                  </div>
                </div>
                <button onClick={closeProj} style={{background:'var(--tag)',border:'none',cursor:'pointer',
                  color:'var(--text)',width:'36px',height:'36px',borderRadius:'50%',fontSize:'1.1rem',
                  flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center'}}>✕</button>
              </div>
              <p style={{color:'var(--text2)',lineHeight:1.8,marginBottom:'1.5rem',fontSize:'0.9rem'}}>{lang==='en'?projectEnglish[selProj.num].desc:selProj.desc}</p>
              <div style={{display:'flex',flexWrap:'wrap',gap:'0.4rem',marginBottom:'1.5rem'}}>
                {selProj.tags.map(t=>(
                  <span key={t} style={{background:'var(--tag)',color:'var(--tagText)',fontSize:'0.72rem',
                    fontWeight:700,padding:'4px 12px',borderRadius:'999px'}}>{t}</span>
                ))}
              </div>
              {selProj.demoNote&&<p style={{fontSize:'0.78rem',color:'var(--text2)',marginBottom:'1rem',
                background:'var(--tag)',padding:'8px 12px',borderRadius:'8px'}}>
                ℹ️ {selProj.demoNote}
              </p>}
              <div style={{display:'flex',gap:'0.75rem',flexWrap:'wrap'}}>
                {selProj.demo&&(
                  <a href={selProj.demo} target="_blank" rel="noreferrer" style={{
                    background:'var(--accent)',color:'#fff',textDecoration:'none',
                    padding:'11px 22px',borderRadius:'999px',fontSize:'0.85rem',fontWeight:700,
                    display:'inline-flex',alignItems:'center',gap:'8px',transition:'all .2s'}}
                    onMouseEnter={e=>e.currentTarget.style.opacity='0.85'}
                    onMouseLeave={e=>e.currentTarget.style.opacity='1'}>
                    🔗 Live Demo
                  </a>
                )}
                {!selProj.demo&&<span style={{color:'var(--text2)',fontSize:'0.82rem',
                  padding:'11px 22px',borderRadius:'999px',border:'1px solid var(--border)'}}>
                  {lang==='en'?'Demo unavailable':'Demo belum tersedia'}
                </span>}
                <button onClick={closeProj} style={{background:'var(--tag)',border:'1px solid var(--border)',
                  cursor:'pointer',color:'var(--text)',padding:'11px 22px',borderRadius:'999px',
                  fontSize:'0.85rem',fontWeight:600,fontFamily:'Inter,sans-serif'}}>
                  {lang==='en'?'Close':'Tutup'}
                </button>
              </div>
            </>)}
          </div>
        </div>
      )}

      {/* NAV */}
      <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:1000,
        background:scrolled?'var(--navBg)':'transparent',
        backdropFilter:scrolled?'blur(20px)':'none',
        borderBottom:scrolled?'1px solid var(--border)':'1px solid transparent',
        transition:'all .4s',padding:'0 5%',height:'64px',
        display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <button onClick={()=>go('home')} style={{fontFamily:"'Plus Jakarta Sans',sans-serif",
          fontWeight:800,fontSize:'1.1rem',letterSpacing:'-0.5px',
          background:'none',border:'none',cursor:'pointer',color:'var(--text)'}}>
          MS.
        </button>
        {/* Desktop nav */}
        <div className={`nav-panel${menuOpen?' is-open':''}`}>
          <div style={{display:'flex',gap:'0.15rem'}}>
            {nav.map(n=>(
              <button key={n.id} onClick={()=>go(n.id)} style={{
                background:active===n.id?'var(--text)':'transparent',
                color:active===n.id?'var(--bg)':'var(--text2)',
                border:'none',cursor:'pointer',padding:'6px 12px',borderRadius:'999px',
                fontSize:'0.8rem',fontWeight:500,transition:'all .25s',fontFamily:'Inter,sans-serif',
                display:'block'}}>
                {n.l}
              </button>
            ))}
          </div>
        </div>
        <div className="nav-actions">
          <button className="theme-toggle" onClick={()=>setDark(d=>!d)} aria-label="Change color theme">
            {dark?'☀️':'🌙'}
          </button>
          <button className="language-toggle" onClick={()=>setLang(l=>l==='en'?'id':'en')} aria-label="Change language">
            {lang==='en'?'ID':'EN'}
          </button>
        </div>
        <button className="menu-toggle" onClick={()=>setMenuOpen(m=>!m)} aria-label={menuOpen?'Close menu':'Open menu'} aria-expanded={menuOpen}>
          {menuOpen?'✕':'☰'}
        </button>
      </nav>

      {/* HERO */}
      <section id="home" style={{minHeight:'100vh',display:'flex',alignItems:'center',
        padding:'100px 5% 60px',maxWidth:'1200px',margin:'0 auto'}}>
        <div style={{width:'100%',display:'grid',gridTemplateColumns:'1fr auto',gap:'3rem',alignItems:'center'}}>
          <div>
            <div style={{animation:'fadeUp .8s ease both'}}>
              <div style={{display:'inline-flex',alignItems:'center',gap:'8px',
                background:'var(--tag)',border:'1px solid var(--border)',
                fontSize:'0.72rem',fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',
                padding:'6px 14px',borderRadius:'999px',marginBottom:'1.5rem',color:'var(--text2)'}}>
                <span style={{width:'7px',height:'7px',borderRadius:'50%',background:'#22C55E',
                  animation:'pulse 2s infinite',display:'inline-block'}}/>
                {lang==='en'?'OPEN TO INTERNSHIP • SEPTEMBER 2026':'MENCARI MAGANG • AGUSTUS 2026'}
              </div>
            </div>
            <div style={{animation:'fadeUp .8s ease .1s both'}}>
              <h1 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",
                fontSize:'clamp(2.8rem,7vw,6rem)',fontWeight:800,lineHeight:1.0,
                letterSpacing:'-3px',marginBottom:'1rem'}}>M. SOPIAN</h1>
            </div>
            <div style={{animation:'fadeUp .8s ease .2s both',marginBottom:'1.5rem'}}>
              <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",
                fontSize:'clamp(1.1rem,2.5vw,1.8rem)',fontWeight:700,color:'var(--text2)',
                display:'flex',alignItems:'center',gap:'10px'}}>
                <span style={{color:'var(--accent)'}}>/</span>
                <span style={{borderRight:'2px solid var(--accent)',paddingRight:'4px',
                  minWidth:'clamp(160px,25vw,260px)',display:'inline-block'}}>{typed}</span>
              </div>
            </div>
            <div style={{animation:'fadeUp .8s ease .3s both',marginBottom:'2rem'}}>
              <p style={{fontSize:'0.95rem',color:'var(--text2)',maxWidth:'440px',lineHeight:1.8}}>
                {lang==='en'?'Seventh-semester Informatics student focused on developing websites and web-based applications. Experienced through personal and academic projects using React.js, Next.js, Laravel, PHP, Node.js, and various databases.':'Mahasiswa Teknik Informatika Semester 7 yang berfokus pada pengembangan website dan aplikasi berbasis web. Memiliki pengalaman melalui proyek pribadi dan akademik menggunakan React.js, Next.js, Laravel, PHP, Node.js, dan berbagai database.'}
              </p>
            </div>
            <div style={{animation:'fadeUp .8s ease .4s both',display:'flex',gap:'0.8rem',flexWrap:'wrap',marginBottom:'3rem'}}>
              <button onClick={()=>go('projects')} style={{
                background:'var(--text)',color:'var(--bg)',border:'none',cursor:'pointer',
                padding:'13px 26px',borderRadius:'999px',fontSize:'0.85rem',fontWeight:700,
                fontFamily:'Inter,sans-serif',transition:'all .25s'}}
                onMouseEnter={e=>e.target.style.transform='translateY(-2px)'}
                onMouseLeave={e=>e.target.style.transform='none'}>
                {lang==='en'?'View Projects →':'Lihat Proyek →'}
              </button>
              <a href="/CV_M_Sopian.pdf" target="_blank" rel="noreferrer" style={{
                background:'transparent',color:'var(--text)',textDecoration:'none',
                border:'1.5px solid var(--border)',
                padding:'13px 26px',borderRadius:'999px',fontSize:'0.85rem',fontWeight:700,
                fontFamily:'Inter,sans-serif',transition:'all .25s',display:'inline-flex',alignItems:'center',gap:'6px'}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--text)';e.currentTarget.style.transform='translateY(-2px)'}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.transform='none'}}>
                📄 {lang==='en'?'View CV':'Lihat CV'}
              </a>
              <button onClick={()=>go('contact')} style={{
                background:'transparent',color:'var(--text2)',border:'1.5px solid var(--border)',cursor:'pointer',
                padding:'13px 26px',borderRadius:'999px',fontSize:'0.85rem',fontWeight:700,
                fontFamily:'Inter,sans-serif',transition:'all .25s'}}
                onMouseEnter={e=>{e.target.style.borderColor='var(--text)';e.target.style.color='var(--text)';e.target.style.transform='translateY(-2px)'}}
                onMouseLeave={e=>{e.target.style.borderColor='var(--border)';e.target.style.color='var(--text2)';e.target.style.transform='none'}}>
                {lang==='en'?'Contact':'Kontak'}
              </button>
            </div>
            <div style={{animation:'fadeUp .8s ease .5s both',display:'flex',gap:'2.5rem',flexWrap:'wrap'}}>
              {[['6',lang==='en'?'Projects':'Proyek'],['7','Semester'],['4',lang==='en'?'Languages':'Bahasa'],['2026',lang==='en'?'Class':'Angkatan']].map(([n,l])=>(
                <div key={l}>
                  <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'clamp(1.5rem,3vw,2.2rem)',fontWeight:800,letterSpacing:'-1px'}}>{n}+</div>
                  <div style={{fontSize:'0.72rem',color:'var(--text2)',marginTop:'2px',textTransform:'uppercase',letterSpacing:'0.06em'}}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Photo */}
          <div style={{animation:'fadeIn 1s ease .3s both',flexShrink:0}}>
            <div style={{width:'clamp(190px,24vw,280px)',height:'clamp(190px,24vw,280px)',borderRadius:'50%',
              border:'3px solid var(--border)',overflow:'hidden',
              background:'linear-gradient(135deg,#EFF6FF,#F0FDF4)',
              display:'flex',alignItems:'center',justifyContent:'center',
              fontSize:'4rem',animation:'float 4s ease-in-out infinite',
              boxShadow:'0 20px 60px rgba(0,0,0,0.1)'}}>
              <img src="/foto.jpg" style={{width:'100%',height:'100%',objectFit:'cover'}} alt="M. Sopian" />
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{borderTop:'1px solid var(--border)',borderBottom:'1px solid var(--border)',
        padding:'13px 0',overflow:'hidden',background:'var(--bg)'}}>
        <div style={{display:'flex',gap:'2rem',animation:'marquee 20s linear infinite',width:'max-content'}}>
          {[...scrollWords,...scrollWords,...scrollWords].map((w,i)=>(
            <span key={i} style={{fontSize:'0.68rem',fontWeight:700,letterSpacing:'0.15em',
              color:'var(--text2)',whiteSpace:'nowrap',display:'flex',alignItems:'center',gap:'2rem'}}>
              {w}<span style={{color:'var(--accent)'}}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" style={{padding:'100px 5%',maxWidth:'1200px',margin:'0 auto'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'5rem',alignItems:'start'}}>
          <Anim dir='left'>
            <div style={{fontSize:'0.68rem',fontWeight:700,letterSpacing:'0.15em',textTransform:'uppercase',color:'var(--text2)',marginBottom:'1.2rem'}}>{lang==='en'?'About Me':'Tentang Saya'}</div>
            <h2 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'clamp(2rem,4vw,3rem)',fontWeight:800,letterSpacing:'-1.5px',lineHeight:1.1,marginBottom:'1.5rem'}}>
              {lang==='en'?<>Who<br/><span style={{color:'var(--accent)'}}>am I?</span></>:<>Siapa<br/><span style={{color:'var(--accent)'}}>saya?</span></>}
            </h2>
            <div style={{display:'flex',flexDirection:'column',gap:'1rem',color:'var(--text2)',fontSize:'0.93rem',lineHeight:1.85}}>
              {lang==='en'?<>
                <p>I am an Informatics student at Bina Insani University, Bekasi, focused on developing websites and web-based applications.</p>
                <p>I have experience building personal and academic projects using React.js, Next.js, Laravel, PHP, Node.js, and various relational databases. I am familiar with authentication, data management, admin dashboards, API integration, and databases.</p>
                <p>Through the projects I have worked on, I continue to grow as a Web Developer and learn new technologies. I am currently looking for an internship to gain professional experience and contribute to product development.</p>
              </>:<>
                <p>Saya adalah mahasiswa Teknik Informatika Universitas Bina Insani, Bekasi, yang memiliki minat dan fokus dalam pengembangan website dan aplikasi berbasis web.</p>
                <p>Saya memiliki pengalaman mengembangkan berbagai proyek pribadi dan akademik menggunakan teknologi seperti React.js, Next.js, Laravel, PHP, Node.js, serta database relasional. Saya terbiasa membangun aplikasi dengan fitur autentikasi, manajemen data, dashboard admin, integrasi API, dan database.</p>
                <p>Melalui berbagai proyek yang telah saya kerjakan, saya terus mengembangkan kemampuan sebagai Web Developer dan berkomitmen untuk mempelajari teknologi baru. Saat ini, saya sedang mencari kesempatan magang untuk mendapatkan pengalaman profesional dan berkontribusi dalam pengembangan produk di dunia kerja.</p>
              </>}
            </div>
            <a href="/CV_M_Sopian.pdf" target="_blank" rel="noreferrer"
              style={{marginTop:'1.5rem',display:'inline-flex',alignItems:'center',gap:'8px',
                background:'var(--text)',color:'var(--bg)',border:'none',cursor:'pointer',
                padding:'11px 22px',borderRadius:'999px',fontSize:'0.82rem',fontWeight:700,
                fontFamily:'Inter,sans-serif',transition:'all .25s',textDecoration:'none'}}
              onMouseEnter={e=>e.target.style.opacity='0.8'}
              onMouseLeave={e=>e.target.style.opacity='1'}>
              📄 {lang==='en'?'View CV':'Lihat CV'}
            </a>
          </Anim>
          <Anim dir='right' delay={0.1} style={{display:'flex',justifyContent:'center',alignItems:'flex-start'}}>
            <div className="about-photo">
              <img src="/foto.jpg" alt="M. Sopian" />
            </div>
          </Anim>
          <Anim dir='right' delay={0.2}>
            <div style={{display:'flex',flexDirection:'column',gap:'1px'}}>
              {[
                [lang==='en'?'Location':'Lokasi',lang==='en'?'Bekasi, West Java':'Bekasi, Jawa Barat'],
                [lang==='en'?'University':'Universitas',lang==='en'?'Bina Insani University':'Universitas Bina Insani'],
                [lang==='en'?'Major':'Jurusan',lang==='en'?'BSc Informatics — Semester 7':'S1 Teknik Informatika — Semester 7'],
                ['Email','sopianibnurifai@gmail.com'],
                [lang==='en'?'Phone':'Telepon','085710446746'],
                ['Status',lang==='en'?'Open to Internship':'Terbuka untuk Magang'],
              ].map(([l,v])=>(
                <div key={l} style={{padding:'1rem 1.2rem',borderBottom:'1px solid var(--border)',
                  display:'flex',alignItems:'center'}}>
                  <div style={{flex:1}}>
                    <div style={{fontSize:'0.65rem',fontWeight:700,textTransform:'uppercase',
                      letterSpacing:'0.08em',color:'var(--text2)',marginBottom:'2px'}}>{l}</div>
                    <div style={{fontSize:'0.83rem',fontWeight:600,
                      color:l==='Status'?'#22C55E':'var(--text)'}}>{v}</div>
                  </div>
                </div>
              ))}
            </div>
          </Anim>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{padding:'80px 5%',background:'var(--bg2)',
        borderTop:'1px solid var(--border)',borderBottom:'1px solid var(--border)'}}>
        <div style={{maxWidth:'1200px',margin:'0 auto'}}>
          <Anim>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',
              marginBottom:'3rem',flexWrap:'wrap',gap:'1rem'}}>
              <div>
                <div style={{fontSize:'0.68rem',fontWeight:700,letterSpacing:'0.15em',
                  textTransform:'uppercase',color:'var(--text2)',marginBottom:'0.8rem'}}>{lang==='en'?'Tech Stack':'Keahlian'}</div>
                <h2 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'clamp(1.8rem,3vw,2.5rem)',
                  fontWeight:800,letterSpacing:'-1px'}}>Skills</h2>
              </div>
              <p style={{color:'var(--text2)',fontSize:'0.85rem',maxWidth:'260px',textAlign:'right'}}>
                Technologies I have used in my projects.
              </p>
            </div>
          </Anim>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(130px,1fr))',gap:'0.6rem'}}>
            {skills.map((s,i)=>(
              <Anim key={s} delay={i*0.04}>
                <div onMouseEnter={()=>setHoverSkill(i)} onMouseLeave={()=>setHoverSkill(null)}
                  style={{background:hoverSkill===i?'var(--skillActive)':'var(--bg)',
                    color:hoverSkill===i?'#fff':'var(--text)',
                    border:'1px solid var(--border)',borderRadius:'10px',
                    padding:'0.85rem 0.6rem',fontSize:'0.78rem',fontWeight:600,textAlign:'center',
                    cursor:'default',transition:'all .25s',
                    transform:hoverSkill===i?'translateY(-4px)':'none',
                    boxShadow:hoverSkill===i?'0 10px 25px rgba(0,0,0,0.12)':'none',
                    display:'flex',flexDirection:'column',alignItems:'center',gap:'7px'}}>
                  <span style={{display:'inline-flex',transition:'transform .25s',transform:hoverSkill===i?'scale(1.08)':'none'}}>
                    {ICONS[s]||<span style={{fontSize:'1.2rem'}}>⚙️</span>}
                  </span>
                  <span>{s}</span>
                </div>
              </Anim>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{padding:'100px 5%',maxWidth:'1200px',margin:'0 auto'}}>
        <Anim>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',
            marginBottom:'1.5rem',flexWrap:'wrap',gap:'1rem'}}>
            <div>
              <div style={{fontSize:'0.68rem',fontWeight:700,letterSpacing:'0.15em',
                textTransform:'uppercase',color:'var(--text2)',marginBottom:'0.8rem'}}>{lang==='en'?'Portfolio':'Portofolio'}</div>
              <h2 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'clamp(1.8rem,3vw,2.5rem)',
                fontWeight:800,letterSpacing:'-1px'}}>{lang==='en'?'My Projects':'Proyek Saya'}</h2>
            </div>
            <span style={{fontSize:'0.82rem',color:'var(--text2)'}}>{lang==='en'?'Select a project for details & demo →':'Pilih proyek untuk melihat detail & demo →'}</span>
          </div>
          <p style={{color:'var(--text2)',fontSize:'0.85rem',marginBottom:'3rem'}}>
            {lang==='en'?'Projects completed in 2026 · Select one to view details and demo link':'Proyek selesai tahun 2026 · Pilih untuk melihat detail dan link demo'}
          </p>
        </Anim>

        {/* Featured */}
        <Anim delay={0.1}>
          <div onClick={()=>openProj(projects[0])}
            style={{border:'1px solid var(--border)',borderRadius:'20px',padding:'clamp(1.5rem,3vw,2.5rem)',
              marginBottom:'1rem',cursor:'pointer',transition:'all .3s',
              display:'grid',gridTemplateColumns:'auto 1fr',gap:'1.5rem',alignItems:'start'}}
            onMouseEnter={e=>{e.currentTarget.style.background='var(--bg2)';e.currentTarget.style.transform='scale(1.005)';e.currentTarget.style.boxShadow='0 20px 60px rgba(0,0,0,0.08)'}}
            onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='none'}}>
            <div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'0.8rem',gap:'1rem',flexWrap:'wrap'}}>
                <div>
                  <div style={{fontSize:'0.65rem',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.1em',color:'var(--accent)',marginBottom:'4px'}}>{lang==='en'?'Main Project':'Proyek Utama'} · {projects[0].year}</div>
                  <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'clamp(1rem,2.5vw,1.25rem)',fontWeight:800,letterSpacing:'-0.5px'}}>{lang==='en'?projectEnglish[projects[0].num].full:projects[0].full}</div>
                </div>
                <span style={{fontSize:'0.75rem',fontWeight:700,color:'var(--text2)',background:'var(--tag)',
                  padding:'4px 12px',borderRadius:'999px',whiteSpace:'nowrap'}}>{lang==='en'?'View details →':'Klik detail →'}</span>
              </div>
              <p style={{color:'var(--text2)',fontSize:'0.85rem',lineHeight:1.75,marginBottom:'1rem'}}>{lang==='en'?projectEnglish[projects[0].num].desc:projects[0].desc}</p>
              <div style={{display:'flex',gap:'0.4rem',flexWrap:'wrap'}}>
                {projects[0].tags.map(t=>(
                  <span key={t} style={{background:'var(--tag)',color:'var(--tagText)',fontSize:'0.68rem',fontWeight:700,padding:'3px 10px',borderRadius:'999px'}}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </Anim>

        {/* Grid */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:'1rem'}}>
          {projects.slice(1).map((p,i)=>(
            <Anim key={p.num} delay={i*0.08}>
              <div onClick={()=>openProj(p)}
                style={{border:'1px solid var(--border)',borderRadius:'16px',padding:'1.8rem',
                  cursor:'pointer',transition:'all .3s',height:'100%'}}
                onMouseEnter={e=>{e.currentTarget.style.background='var(--bg2)';e.currentTarget.style.transform='translateY(-5px)';e.currentTarget.style.boxShadow='0 16px 40px rgba(0,0,0,0.09)';e.currentTarget.style.borderColor='var(--accent)'}}
                onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='none';e.currentTarget.style.borderColor='var(--border)'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'1rem'}}>
                  <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:'4px'}}>
                    <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'1.8rem',fontWeight:800,color:'var(--border)',letterSpacing:'-1px'}}>{p.num}</span>
                    {p.demo&&<span style={{fontSize:'0.6rem',background:'#22C55E22',color:'#22C55E',fontWeight:700,padding:'2px 8px',borderRadius:'999px',letterSpacing:'0.05em'}}>LIVE</span>}
                  </div>
                </div>
                <div style={{fontSize:'0.62rem',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.1em',color:'var(--text2)',marginBottom:'5px'}}>{lang==='en'?projectEnglish[p.num].type:p.type}</div>
                <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'0.95rem',fontWeight:800,marginBottom:'0.6rem',letterSpacing:'-0.3px'}}>{lang==='en'?projectEnglish[p.num].full:p.full}</div>
                <p style={{color:'var(--text2)',fontSize:'0.8rem',lineHeight:1.7,marginBottom:'1rem'}}>{lang==='en'?projectEnglish[p.num].desc:p.desc}</p>
                <div style={{display:'flex',gap:'0.35rem',flexWrap:'wrap'}}>
                  {p.tags.map(t=>(
                    <span key={t} style={{background:'var(--tag)',color:'var(--tagText)',fontSize:'0.65rem',fontWeight:700,padding:'2px 8px',borderRadius:'999px'}}>{t}</span>
                  ))}
                </div>
                <div style={{marginTop:'1rem',fontSize:'0.75rem',color:'var(--accent)',fontWeight:600}}>
                  {p.demo?(lang==='en'?'Live Demo available':'Live Demo tersedia'):(lang==='en'?'Select for details':'Klik untuk detail')} →
                </div>
              </div>
            </Anim>
          ))}
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" style={{padding:'80px 5%',background:'var(--bg2)',
        borderTop:'1px solid var(--border)',borderBottom:'1px solid var(--border)'}}>
        <div style={{maxWidth:'1200px',margin:'0 auto'}}>
          <Anim>
            <h2 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'clamp(1.8rem,3vw,2.5rem)',fontWeight:800,letterSpacing:'-1px',marginBottom:'3rem'}}>{lang==='en'?'Education & Activities':'Pendidikan & Kegiatan'}</h2>
          </Anim>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'4rem'}}>
            <div>
              {[
                {t:lang==='en'?'Bina Insani University':'Universitas Bina Insani',s:lang==='en'?'BSc Informatics — Semester 7 · Bekasi':'S1 Teknik Informatika — Semester 7 · Bekasi',y:lang==='en'?'2023–Present':'2023–Sekarang'},
                {t:lang==='en'?'Mandarin Language Program':'Program Bahasa Mandarin',s:lang==='en'?'Participant · Partnership with a Taiwanese institution':'Peserta · Kerja sama dengan institusi Taiwan',y:'Jan–Jun 2026'},
                {t:lang==='en'?'English Club':'UKM Bahasa Inggris',s:lang==='en'?'Member · Bina Insani University':'Anggota · Universitas Bina Insani',y:'2024'},
              ].map((a,i)=>(
                <Anim key={a.t} delay={i*0.12}>
                  <div style={{padding:'1.4rem 0',borderBottom:'1px solid var(--border)',
                    display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:'1rem'}}>
                    <div>
                      <div style={{fontWeight:700,fontSize:'0.92rem',marginBottom:'3px'}}>{a.t}</div>
                      <div style={{fontSize:'0.78rem',color:'var(--text2)'}}>{a.s}</div>
                    </div>
                    <span style={{fontSize:'0.68rem',fontWeight:700,color:'var(--accent)',
                      whiteSpace:'nowrap',background:'var(--tag)',padding:'3px 10px',borderRadius:'999px'}}>{a.y}</span>
                  </div>
                </Anim>
              ))}
            </div>
            <Anim delay={0.2}>
              <div>
                <div style={{fontSize:'0.68rem',fontWeight:700,textTransform:'uppercase',
                  letterSpacing:'0.1em',color:'var(--text2)',marginBottom:'1.5rem'}}>{lang==='en'?'Language Skills':'Kemampuan Bahasa'}</div>
                {[
                  {f:'🇮🇩',n:lang==='en'?'Indonesian':'Indonesia',l:lang==='en'?'Fluent':'Aktif',p:95},
                  {f:'🇬🇧',n:lang==='en'?'English':'Inggris',l:lang==='en'?'Basic':'Dasar',p:30},
                  {f:'🇨🇳',n:'Mandarin',l:lang==='en'?'Basic':'Dasar',p:25},
                  {f:'🇸🇦',n:lang==='en'?'Arabic':'Arab',l:lang==='en'?'Intermediate':'Menengah',p:55},
                ].map(({f,n,l,p})=>(
                  <div key={n} style={{marginBottom:'1.4rem'}}>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:'6px'}}>
                      <span style={{fontWeight:600,fontSize:'0.85rem'}}>{f} {n}</span>
                      <span style={{fontSize:'0.72rem',color:'var(--text2)'}}>{l}</span>
                    </div>
                    <div style={{background:'var(--border)',borderRadius:'999px',height:'4px',overflow:'hidden'}}>
                      <div style={{background:'var(--accent)',height:'100%',width:`${p}%`,borderRadius:'999px'}}/>
                    </div>
                  </div>
                ))}
              </div>
            </Anim>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{padding:'100px 5% 120px',maxWidth:'1200px',margin:'0 auto'}}>
        <Anim>
          <div style={{fontSize:'0.68rem',fontWeight:700,letterSpacing:'0.15em',textTransform:'uppercase',color:'var(--text2)',marginBottom:'1.5rem'}}>{lang==='en'?'Contact':'Kontak'}</div>
          <h2 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'clamp(2.5rem,7vw,5.5rem)',
            fontWeight:800,lineHeight:1.0,letterSpacing:'-3px',marginBottom:'3rem'}}>
            {lang==='en'?<>LET'S WORK<br/><span style={{color:'var(--accent)'}}>TOGETHER.</span></>:<>MARI BEKERJA<br/><span style={{color:'var(--accent)'}}>BERSAMA.</span></>}
          </h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'1rem',marginBottom:'2rem'}}>
            {[
              {n:'01',l:'EMAIL',v:'sopianibnurifai@gmail.com',href:'mailto:sopianibnurifai@gmail.com',ic:'✉️'},
              {n:'02',l:lang==='en'?'PHONE':'TELEPON',v:'085710446746',href:'tel:085710446746',ic:'📞'},
            ].map(c=>(
              <a key={c.n} href={c.href} style={{
                border:'1px solid var(--border)',borderRadius:'16px',padding:'1.8rem',
                textDecoration:'none',color:'var(--text)',display:'block',
                transition:'all .25s'}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--accent)';e.currentTarget.style.background='var(--bg2)';e.currentTarget.style.transform='translateY(-3px)'}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.background='transparent';e.currentTarget.style.transform='none'}}>
                <div style={{fontSize:'0.62rem',fontWeight:700,color:'var(--text2)',letterSpacing:'0.1em',marginBottom:'0.5rem'}}>{c.n}</div>
                <div style={{fontSize:'0.65rem',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.1em',color:'var(--text2)',marginBottom:'0.4rem'}}>{c.ic} {c.l}</div>
                <div style={{fontWeight:600,fontSize:'0.9rem',wordBreak:'break-all'}}>{c.v}</div>
              </a>
            ))}
          </div>
        </Anim>
      </section>

      <footer style={{textAlign:'center',padding:'2rem',fontSize:'0.72rem',
        color:'var(--text2)',borderTop:'1px solid var(--border)',letterSpacing:'0.06em'}}>
        © 2026 M. SOPIAN · WEB DEVELOPER · BEKASI
      </footer>
    </div>
  )
}
