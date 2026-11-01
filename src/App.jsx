import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Camera, ChevronLeft, ChevronRight, Menu, Moon, Search, Sun, X } from 'lucide-react';

const photos = [
  { id: 1, title: 'The Quiet Between', category: 'Nature', place: 'Dolomites, Italy', year: '2024', image: 'photo-1464822759023-fed622ff2c3b', ratio: 'tall' },
  { id: 2, title: 'Soft Light, Still Water', category: 'Nature', place: 'Lake Bled, Slovenia', year: '2023', image: 'photo-1470770841072-f978cf4d019e', ratio: 'wide' },
  { id: 3, title: 'A Study in Solitude', category: 'Portrait', place: 'Joshua Tree, California', year: '2024', image: 'photo-1534528741775-53994a69daeb', ratio: 'square' },
  { id: 4, title: 'Somewhere, Slowly', category: 'Travel', place: 'Marrakech, Morocco', year: '2023', image: 'photo-1539020140153-e479b8c22e70', ratio: 'tall' },
  { id: 5, title: 'Lines of the City', category: 'Architecture', place: 'Copenhagen, Denmark', year: '2024', image: 'photo-1511818966892-d7d671e672a2', ratio: 'wide' },
  { id: 6, title: 'Wild, Open Country', category: 'Nature', place: 'Iceland', year: '2022', image: 'photo-1472396961693-142e6e269027', ratio: 'square' },
  { id: 7, title: 'Golden Hour, No. 02', category: 'Portrait', place: 'Lisbon, Portugal', year: '2024', image: 'photo-1506794778202-cad84cf45f1d', ratio: 'wide' },
  { id: 8, title: 'A Place to Begin', category: 'Architecture', place: 'Kyoto, Japan', year: '2023', image: 'photo-1511818966892-d7d671e672a2', ratio: 'tall', position: 'center 40%' },
  { id: 9, title: 'Blue Hour, Atlantic', category: 'Travel', place: 'Madeira, Portugal', year: '2022', image: 'photo-1500530855697-b586d89ba3ee', ratio: 'square' },
  { id: 10, title: 'Through the Pines', category: 'Nature', place: 'Oregon, USA', year: '2023', image: 'photo-1448375240586-882707db888b', ratio: 'tall' },
  { id: 11, title: 'The Everyday Ritual', category: 'Portrait', place: 'Seoul, South Korea', year: '2023', image: 'photo-1531123897727-8f129e1688ce', ratio: 'wide' },
  { id: 12, title: 'Quiet Geometry', category: 'Architecture', place: 'Oslo, Norway', year: '2022', image: 'photo-1487958449943-2429e8be8625', ratio: 'square' },
];

const imageUrl = (id, width = 1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;
const categories = ['All work', 'Nature', 'Portrait', 'Travel', 'Architecture'];

export default function App() {
  const [category, setCategory] = useState('All work');
  const [search, setSearch] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') || 'dark');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const filtered = useMemo(() => photos.filter((photo) => {
    const matchesCategory = category === 'All work' || photo.category === category;
    const term = search.trim().toLowerCase();
    const matchesSearch = !term || [photo.title, photo.category, photo.place, photo.year].some((value) => value.toLowerCase().includes(term));
    return matchesCategory && matchesSearch;
  }), [category, search]);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const moveLightbox = useCallback((direction) => setLightboxIndex((index) => index === null ? null : (index + direction + filtered.length) % filtered.length), [filtered.length]);

  useEffect(() => {
    if (lightboxIndex === null) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowRight') moveLightbox(1);
      if (event.key === 'ArrowLeft') moveLightbox(-1);
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKeyDown); document.body.style.overflow = ''; };
  }, [lightboxIndex, closeLightbox, moveLightbox]);

  const activePhoto = lightboxIndex === null ? null : filtered[lightboxIndex];

  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Alex Morgan, home"><span className="brand-mark"><Camera size={17} strokeWidth={1.7} /></span><span>AM<span className="brand-period">.</span></span></a>
        <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          <a href="#work" onClick={() => setMenuOpen(false)}>Work</a><a href="#about" onClick={() => setMenuOpen(false)}>About</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <div className="top-actions"><span className="availability"><i /> Available for select projects</span><button className="theme-button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>{theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}</button><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button></div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy"><p className="eyebrow"><span className="eyebrow-line" /> Independent photographer <span className="eyebrow-dot">·</span> Brooklyn, NY</p><h1>Looking closer.<br /><em>Feeling more.</em></h1><p className="hero-description">A collection of places, people, and moments that stayed with me. Made slowly, with intention.</p><a className="scroll-link" href="#work">Explore selected work <span><ArrowDown size={14} /></span></a></div>
        <div className="hero-art"><div className="hero-photo-frame"><img src={imageUrl('photo-1500530855697-b586d89ba3ee', 1400)} alt="Sunlit mountain valley with a winding path" /><div className="photo-index">01 <span>/</span> 04</div></div><div className="hero-caption"><span>Somewhere in the Dolomites</span><span>46° 28' N — 11° 45' E</span></div><div className="hero-stamp">FIELD<br />NOTES<br /><span>№ 004</span></div></div>
        <div className="hero-side-note">ALEX MORGAN <span>—</span> PHOTOGRAPHER</div>
      </section>

      <section className="work-section" id="work">
        <div className="section-heading"><div><p className="eyebrow"><span className="eyebrow-line" /> The archive, 2022—24</p><h2>Selected <em>work</em></h2></div><p className="section-note">A few favorites from the road.<br />More stories, still unfolding.</p></div>
        <div className="gallery-toolbar"><div className="filters" role="tablist" aria-label="Filter photographs">{categories.map((item) => <button key={item} role="tab" aria-selected={category === item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div><label className="search-box"><Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Find a story..." aria-label="Search photographs" />{search && <button onClick={() => setSearch('')} aria-label="Clear search"><X size={14} /></button>}</label></div>
        <div className="results-line"><span>{filtered.length.toString().padStart(2, '0')} photographs</span><span>{category === 'All work' ? 'All collections' : category}</span></div>
        {filtered.length ? <div className="gallery-grid">{filtered.map((photo, index) => <button className={`photo-card ${photo.ratio}`} key={photo.id} onClick={() => setLightboxIndex(index)} aria-label={`Open ${photo.title}`}><span className="card-image"><img src={imageUrl(photo.image, 900)} alt={photo.title} loading="lazy" style={{ objectPosition: photo.position || 'center' }} /><span className="image-open"><ArrowUpRight size={18} /></span></span><span className="card-info"><span><strong>{photo.title}</strong><small>{photo.place}</small></span><span className="card-meta"><span>{photo.category}</span><span>{photo.year}</span></span></span></button>)}</div> : <div className="empty-state"><span className="empty-icon"><Search size={20} /></span><h3>No stories found</h3><p>Try another search or choose a different collection.</p><button onClick={() => { setSearch(''); setCategory('All work'); }}>Clear filters <ArrowRight size={14} /></button></div>}
        <div className="gallery-end"><span /> End of this collection <span /></div>
      </section>

      <section className="about-section" id="about"><div className="about-left"><p className="eyebrow"><span className="eyebrow-line" /> A little about me</p><h2>Finding the<br />extraordinary in<br /><em>the everyday.</em></h2></div><div className="about-right"><p className="about-copy">I’m Alex — a photographer drawn to the in-between. The pause before the sun goes down, the way a room holds someone’s story, the familiar feeling of being somewhere new.</p><p className="about-copy muted">I work with people and places to make images that feel honest, lived-in, and a little bit like a memory. Available worldwide for editorial, portrait, and commissioned work.</p><a className="text-link" href="mailto:hello@alexmorgan.studio">A bit more about me <ArrowUpRight size={16} /></a><div className="signature">Alex Morgan<span>Brooklyn, New York</span></div></div></section>

      <section className="contact-section" id="contact"><div><p className="eyebrow"><span className="eyebrow-line" /> Have a story in mind?</p><h2>Let’s make<br /><em>something lasting.</em></h2></div><a href="mailto:hello@alexmorgan.studio" className="contact-link">Get in touch <ArrowUpRight size={19} /></a><span className="contact-orbit orbit-one" /><span className="contact-orbit orbit-two" /></section>
      <footer className="footer"><a className="brand" href="#top"><span className="brand-mark"><Camera size={16} strokeWidth={1.7} /></span><span>AM<span className="brand-period">.</span></span></a><span>© 2024 Alex Morgan Studio</span><div><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={12} /></a><a href="mailto:hello@alexmorgan.studio">Email <ArrowUpRight size={12} /></a></div><a href="#top" className="back-top">Back to top <ArrowDown size={13} /></a></footer>

      {activePhoto && <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${activePhoto.title} photograph`} onMouseDown={(event) => { if (event.target === event.currentTarget) closeLightbox(); }}><button className="lightbox-close" onClick={closeLightbox} aria-label="Close image"><X size={22} /></button><button className="lightbox-arrow prev" onClick={() => moveLightbox(-1)} aria-label="Previous image"><ChevronLeft size={26} /></button><div className="lightbox-content"><img src={imageUrl(activePhoto.image, 1800)} alt={activePhoto.title} /><div className="lightbox-caption"><div><span>{activePhoto.category} · {activePhoto.place}</span><h3>{activePhoto.title}</h3></div><span>{String(lightboxIndex + 1).padStart(2, '0')} / {String(filtered.length).padStart(2, '0')}</span></div></div><button className="lightbox-arrow next" onClick={() => moveLightbox(1)} aria-label="Next image"><ChevronRight size={26} /></button><span className="keyboard-hint"><ArrowLeft size={12} /> <ArrowRight size={12} /> to navigate <span>·</span> esc to close</span></div>}
    </main>
  );
}
