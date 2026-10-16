import { useMemo, useState } from "react";

type Page = "home" | "catalog" | "diary" | "lists" | "wishlist" | "news" | "profile";
type IconName =
  | "search" | "book" | "bookmark" | "list" | "news" | "user" | "arrow"
  | "plus" | "more" | "lock" | "globe" | "edit" | "check" | "close" | "chevron";

type Book = {
  id: number;
  title: string;
  original?: string;
  author: string;
  genre: string;
  year: number;
  publisher: string;
  pages: number;
  cover: string;
  accent: string;
  score: number;
};

const books: Book[] = [
  { id: 1, title: "Torto Arado", original: "Torto Arado", author: "Itamar Vieira Junior", genre: "Literatura brasileira", year: 2019, publisher: "Todavia", pages: 264, cover: "terra", accent: "O chão guarda histórias", score: 4.7 },
  { id: 2, title: "A Vegetariana", original: "Chaeshikjuuija", author: "Han Kang", genre: "Ficção contemporânea", year: 2018, publisher: "Todavia", pages: 176, cover: "olive", accent: "HAN KANG", score: 4.2 },
  { id: 3, title: "Tudo é Rio", author: "Carla Madeira", genre: "Romance", year: 2021, publisher: "Record", pages: 210, cover: "blue", accent: "Um romance", score: 4.5 },
  { id: 4, title: "Cem Anos de Solidão", author: "Gabriel García Márquez", genre: "Realismo mágico", year: 1967, publisher: "Record", pages: 448, cover: "gold", accent: "GABRIEL GARCÍA MÁRQUEZ", score: 4.8 },
  { id: 5, title: "O Avesso da Pele", author: "Jeferson Tenório", genre: "Literatura brasileira", year: 2020, publisher: "Companhia das Letras", pages: 192, cover: "wine", accent: "JEFFERSON TENÓRIO", score: 4.6 },
  { id: 6, title: "Pachinko", author: "Min Jin Lee", genre: "Ficção histórica", year: 2020, publisher: "Intrínseca", pages: 528, cover: "navy", accent: "Uma saga familiar", score: 4.4 },
  { id: 7, title: "A Ridícula Ideia de Nunca Mais te Ver", author: "Rosa Montero", genre: "Biografia", year: 2019, publisher: "Todavia", pages: 200, cover: "coral", accent: "ROSA MONTERO", score: 4.3 },
  { id: 8, title: "O Peso do Pássaro Morto", author: "Aline Bei", genre: "Poesia", year: 2017, publisher: "Nós", pages: 168, cover: "cream", accent: "ALINE BEI", score: 4.1 },
];

const news = [
  { title: "Os lançamentos literários mais aguardados deste outono", source: "Quatro Cinco Um", tag: "LANÇAMENTOS", image: "https://images.unsplash.com/photo-1697029749544-ffa7f15f9dd0?auto=format&fit=crop&w=900&q=82", summary: "Novas vozes, traduções inéditas e reencontros que já chegaram às livrarias." },
  { title: "Clubes de leitura transformam a experiência de ler em comunidade", source: "Revista Bula", tag: "COMUNIDADE", image: "https://images.unsplash.com/photo-1630343710506-89f8b9f21d31?auto=format&fit=crop&w=900&q=82", summary: "Encontros presenciais voltam a crescer e aproximam leitores de diferentes gerações." },
  { title: "Por que estamos voltando aos grandes clássicos?", source: "Nexo", tag: "ENSAIO", image: "https://images.unsplash.com/photo-1639527924446-3edc522ae4b0?auto=format&fit=crop&w=900&q=82", summary: "Editoras apostam em novas traduções e projetos gráficos para formar leitores." },
];

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/></>,
    bookmark: <path d="M6 3h12v18l-6-4-6 4V3Z"/>,
    list: <><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></>,
    news: <><path d="M4 22h16a2 2 0 0 0 2-2V4H8v16a2 2 0 0 1-4 0V6H2v14a2 2 0 0 0 2 2Z"/><path d="M12 8h6M12 12h6M12 16h6M8 8h.01"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    more: <><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></>,
    lock: <><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></>,
    globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></>,
    edit: <><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    close: <><path d="M18 6 6 18M6 6l12 12"/></>,
    chevron: <path d="m9 18 6-6-6-6"/>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function Button({ children, kind = "primary", onClick, icon }: { children: React.ReactNode; kind?: "primary" | "secondary" | "ghost"; onClick?: () => void; icon?: IconName }) {
  return <button className={`btn btn-${kind}`} onClick={onClick}>{icon && <Icon name={icon} size={16}/>}<span>{children}</span></button>;
}

function Stars({ value = 4.5, interactive = false, onChange }: { value?: number; interactive?: boolean; onChange?: (n: number) => void }) {
  return <div className={`stars ${interactive ? "stars-interactive" : ""}`} aria-label={`${value} de 5 estrelas`}>
    {[1, 2, 3, 4, 5].map((n) => <button key={n} onClick={() => interactive && onChange?.(n)} aria-label={`${n} estrelas`} className={n <= Math.round(value) ? "active" : ""}>★</button>)}
  </div>;
}

function Cover({ book, size = "regular" }: { book: Book; size?: "small" | "regular" | "large" }) {
  return <div className={`cover cover-${size} cover-${book.cover}`} aria-label={`Capa de ${book.title}`}>
    <span className="cover-kicker">{book.accent}</span>
    <strong>{book.title}</strong>
    <small>{book.author}</small>
  </div>;
}

function BookCard({ book, onOpen }: { book: Book; onOpen: (book: Book) => void }) {
  return <article className="book-card" onClick={() => onOpen(book)}>
    <div className="cover-wrap"><Cover book={book}/><span className="score">★ {book.score.toFixed(1)}</span></div>
    <h3>{book.title}</h3>
    <p>{book.author}</p>
  </article>;
}

function Header({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  return <header className="topbar">
    <button className="brand" onClick={() => setPage("home")} aria-label="Ir para o início">
      <span className="brand-mark"><Icon name="book" size={20}/></span>
      <span>Plataforma<br/><em>de Livros</em></span>
    </button>
    <nav className="main-nav">
      <button className={page === "catalog" ? "active" : ""} onClick={() => setPage("catalog")}>Catálogo</button>
      <button className={page === "lists" ? "active" : ""} onClick={() => setPage("lists")}>Listas</button>
      <button className={page === "news" ? "active" : ""} onClick={() => setPage("news")}>Notícias</button>
    </nav>
    <label className="global-search"><Icon name="search" size={17}/><input placeholder="Buscar livros, autores..."/></label>
    <button className="avatar avatar-small" onClick={() => setPage("profile")} aria-label="Abrir perfil">MC</button>
  </header>;
}

function PageShell({ children, page, setPage }: { children: React.ReactNode; page: Page; setPage: (p: Page) => void }) {
  return <><Header page={page} setPage={setPage}/><main>{children}</main><footer><div className="brand footer-brand"><span className="brand-mark"><Icon name="book" size={19}/></span><span>Plataforma de Livros</span></div><p>Um lugar para guardar tudo o que a leitura desperta.</p><span>© 2025 Plataforma de Livros</span></footer></>;
}

function SectionTitle({ eyebrow, title, action, onAction }: { eyebrow?: string; title: string; action?: string; onAction?: () => void }) {
  return <div className="section-title"><div>{eyebrow && <span>{eyebrow}</span>}<h2>{title}</h2></div>{action && <button onClick={onAction}>{action}<Icon name="arrow" size={16}/></button>}</div>;
}

function Home({ setPage, onOpen }: { setPage: (p: Page) => void; onOpen: (b: Book) => void }) {
  return <div>
    <section className="hero">
      <div className="hero-copy">
        <span className="eyebrow">SUA VIDA ENTRE LIVROS</span>
        <h1>Histórias que ficam.<br/><em>Leituras que transformam.</em></h1>
        <p>Descubra novos livros, acompanhe suas leituras e compartilhe o que cada história despertou em você.</p>
        <div className="button-row"><Button onClick={() => setPage("catalog")}>Explorar catálogo</Button><Button kind="secondary" onClick={() => setPage("diary")}>Meu diário de leitura</Button></div>
      </div>
      <div className="hero-art">
        <div className="hero-sun"></div>
        <div className="hero-cover one"><Cover book={books[1]}/></div>
        <div className="hero-cover two"><Cover book={books[0]}/></div>
        <div className="hero-cover three"><Cover book={books[3]}/></div>
        <div className="quote-card"><span>“</span><p>Um leitor vive mil vidas antes de morrer.</p><small>George R. R. Martin</small></div>
      </div>
    </section>

    <section className="content-section">
      <SectionTitle eyebrow="PARA DESCOBRIR" title="Livros em destaque" action="Ver catálogo" onAction={() => setPage("catalog")}/>
      <div className="book-grid">{books.slice(0, 5).map((b) => <BookCard key={b.id} book={b} onOpen={onOpen}/>)}</div>
    </section>

    <section className="reading-section">
      <SectionTitle eyebrow="NA SUA ESTANTE" title="Lendo agora" action="Abrir diário" onAction={() => setPage("diary")}/>
      <div className="reading-card">
        <Cover book={books[5]} size="small"/>
        <div className="reading-info"><span>EM ANDAMENTO</span><h3>Pachinko</h3><p>Min Jin Lee</p><div className="progress-label"><span>Página 316 de 528</span><strong>60%</strong></div><div className="progress"><i style={{ width: "60%" }}/></div><small>Você começou em 12 de março</small></div>
        <Button kind="secondary" onClick={() => setPage("diary")} icon="edit">Atualizar progresso</Button>
      </div>
    </section>

    <section className="content-section news-preview">
      <SectionTitle eyebrow="PARA FICAR POR DENTRO" title="Últimas notícias literárias" action="Ver todas" onAction={() => setPage("news")}/>
      <div className="news-grid">{news.map((n) => <NewsCard key={n.title} item={n}/>)}</div>
    </section>
  </div>;
}

function Catalog({ onOpen }: { onOpen: (b: Book) => void }) {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("Todos os gêneros");
  const filtered = useMemo(() => books.filter((b) => (genre === "Todos os gêneros" || b.genre === genre) && `${b.title} ${b.author}`.toLowerCase().includes(query.toLowerCase())), [query, genre]);
  return <div className="page">
    <div className="page-heading"><span className="eyebrow">NOSSA CURADORIA</span><h1>Explore o catálogo</h1><p>Encontre a sua próxima leitura entre histórias de todos os lugares.</p></div>
    <div className="filter-panel">
      <label className="catalog-search"><Icon name="search"/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Busque por título ou autor"/></label>
      <select value={genre} onChange={(e) => setGenre(e.target.value)}><option>Todos os gêneros</option>{[...new Set(books.map((b) => b.genre))].map((g) => <option key={g}>{g}</option>)}</select>
      <select><option>Todos os autores</option>{books.map((b) => <option key={b.id}>{b.author}</option>)}</select>
      <select><option>Todas as editoras</option><option>Todavia</option><option>Record</option><option>Intrínseca</option></select>
      <select><option>Todos os anos</option><option>2020–2025</option><option>2010–2019</option><option>Antes de 2010</option></select>
    </div>
    <div className="result-line"><strong>{filtered.length} livros encontrados</strong><select><option>Mais populares</option><option>Melhor avaliados</option><option>Mais recentes</option></select></div>
    <div className="book-grid catalog-grid">{filtered.map((b) => <BookCard key={b.id} book={b} onOpen={onOpen}/>)}</div>
  </div>;
}

function Diary({ onRate }: { onRate: (b: Book) => void }) {
  const [progress, setProgress] = useState([60, 34]);
  const diary = [books[5], books[2]];
  return <div className="page">
    <div className="page-heading heading-row"><div><span className="eyebrow">MINHA JORNADA</span><h1>Diário de leitura</h1><p>Acompanhe cada página e guarde as memórias das suas leituras.</p></div><Button icon="plus">Adicionar leitura</Button></div>
    <div className="stat-row"><div><strong>2</strong><span>Lendo agora</span></div><div><strong>14</strong><span>Livros concluídos</span></div><div><strong>4.120</strong><span>Páginas este ano</span></div><div><strong>8</strong><span>Dias em sequência</span></div></div>
    <div className="tabs"><button className="active">Lendo agora <span>2</span></button><button>Concluídos <span>14</span></button><button>Abandonados <span>1</span></button></div>
    <div className="diary-list">{diary.map((book, i) => <article className="diary-card" key={book.id}>
      <Cover book={book} size="small"/>
      <div className="diary-copy"><div className="title-line"><div><span className="status-dot">EM ANDAMENTO</span><h2>{book.title}</h2><p>{book.author}</p></div><button className="icon-btn"><Icon name="more"/></button></div>
        <div className="progress-label"><span>{Math.round(book.pages * progress[i] / 100)} de {book.pages} páginas</span><strong>{progress[i]}%</strong></div>
        <div className="progress"><i style={{ width: `${progress[i]}%` }}/></div>
        <div className="diary-meta"><span>Início: 12 de março de 2025</span><label><input type="checkbox"/> É uma releitura</label></div>
        <div className="button-row"><Button kind="secondary" icon="edit" onClick={() => setProgress((p) => p.map((v, j) => j === i ? Math.min(v + 10, 100) : v))}>Atualizar progresso</Button><Button kind="ghost" icon="check" onClick={() => onRate(book)}>Marcar como concluído</Button></div>
      </div>
    </article>)}</div>
  </div>;
}

function Lists({ onOpen }: { onOpen: (b: Book) => void }) {
  const [selected, setSelected] = useState<number | null>(null);
  if (selected !== null) return <div className="page">
    <button className="back" onClick={() => setSelected(null)}>← Voltar para minhas listas</button>
    <div className="list-detail-head"><div><span className="eyebrow">LISTA PÚBLICA</span><h1>Livros favoritos</h1><p>Histórias que ficaram comigo muito depois da última página.</p><span className="byline"><span className="avatar avatar-tiny">MC</span> por Marina Costa · 8 livros</span></div><div className="button-row"><Button kind="secondary" icon="edit">Editar lista</Button><Button icon="plus">Adicionar livros</Button></div></div>
    <div className="ranked-list">{books.slice(0, 5).map((b, i) => <article key={b.id} onClick={() => onOpen(b)}><strong>{String(i + 1).padStart(2, "0")}</strong><Cover book={b} size="small"/><div><h2>{b.title}</h2><p>{b.author}</p><Stars value={b.score}/></div><span className="drag">···</span></article>)}</div>
  </div>;
  const lists = [
    { title: "Livros favoritos", desc: "Histórias que ficaram comigo muito depois da última página.", count: 8, public: true, ids: [0, 3, 4] },
    { title: "Para ler em dias de chuva", desc: "Livros aconchegantes para desacelerar.", count: 12, public: true, ids: [7, 1, 5] },
    { title: "Presentes para pessoas queridas", desc: "Ideias para não errar na escolha.", count: 6, public: false, ids: [2, 6, 0] },
  ];
  return <div className="page"><div className="page-heading heading-row"><div><span className="eyebrow">MINHAS CURADORIAS</span><h1>Listas personalizadas</h1><p>Organize livros por temas, momentos e tudo o que fizer sentido para você.</p></div><Button icon="plus">Criar nova lista</Button></div>
    <div className="list-grid">{lists.map((list, idx) => <article className="list-card" key={list.title} onClick={() => setSelected(idx)}><div className="cover-stack">{list.ids.map((id, i) => <div key={id} style={{ zIndex: 3 - i, transform: `translateX(${i * 42}px) rotate(${i * 3 - 3}deg)` }}><Cover book={books[id]} size="small"/></div>)}</div><div className="list-copy"><div><span>{list.public ? <><Icon name="globe" size={14}/> PÚBLICA</> : <><Icon name="lock" size={14}/> PRIVADA</>}</span><h2>{list.title}</h2><p>{list.desc}</p></div><strong>{list.count} livros <Icon name="chevron" size={16}/></strong></div></article>)}</div>
  </div>;
}

function Wishlist({ onOpen }: { onOpen: (b: Book) => void }) {
  const [items, setItems] = useState(books.slice(2, 8));
  return <div className="page"><div className="page-heading"><span className="eyebrow">PRÓXIMAS LEITURAS</span><h1>Quero ler</h1><p>Todos os livros que você guardou para o momento certo.</p></div>
    <div className="result-line"><strong>{items.length} livros na sua estante</strong><select><option>Adicionados recentemente</option><option>Por título</option></select></div>
    <div className="book-grid catalog-grid">{items.map((b) => <div className="wishlist-item" key={b.id}><BookCard book={b} onOpen={onOpen}/><span>Adicionado em 18 mar. 2025</span><button onClick={() => setItems(items.filter((x) => x.id !== b.id))}>Remover</button></div>)}</div>
  </div>;
}

function NewsCard({ item, large = false }: { item: typeof news[number]; large?: boolean }) {
  return <article className={`news-card ${large ? "news-large" : ""}`}><img src={item.image} alt="Cena acolhedora de leitura"/><div><span>{item.tag}</span><h3>{item.title}</h3><p>{item.summary}</p><small>{item.source} · 5 min de leitura</small></div></article>;
}

function News() {
  return <div className="page"><div className="page-heading"><span className="eyebrow">PARA FICAR POR DENTRO</span><h1>Notícias literárias</h1><p>Conversas, lançamentos e ideias que movimentam o mundo dos livros.</p></div>
    <div className="featured-news"><NewsCard item={news[0]} large/></div>
    <div className="news-grid news-page-grid">{news.slice(1).concat(news).map((n, i) => <NewsCard key={`${n.title}-${i}`} item={n}/>)}</div>
  </div>;
}

function Profile({ setPage, onOpen }: { setPage: (p: Page) => void; onOpen: (b: Book) => void }) {
  return <div>
    <section className="profile-hero"><div className="profile-inner"><div className="avatar avatar-large">MC</div><div><span className="eyebrow">LEITORA DESDE 2022</span><h1>Marina Costa</h1><strong>@marinacosta</strong><p>Leitora de ficção brasileira, café sem açúcar e finais que deixam um pouco de saudade.</p></div><Button kind="secondary" icon="edit">Editar perfil</Button></div></section>
    <div className="page profile-page"><div className="profile-stats"><div><strong>87</strong><span>Livros lidos</span></div><div><strong>24</strong><span>Avaliações</span></div><div><strong>6</strong><span>Listas</span></div><div><strong>19</strong><span>Quero ler</span></div></div>
      <div className="tabs profile-tabs"><button className="active">Atividade recente</button><button onClick={() => setPage("lists")}>Listas</button><button>Avaliações</button></div>
      <div className="activity-layout"><div><SectionTitle title="Atividade recente"/><div className="activity-card"><span className="avatar avatar-tiny">MC</span><div><p><strong>Marina concluiu uma leitura</strong><small>há 2 dias</small></p><div className="activity-book" onClick={() => onOpen(books[4])}><Cover book={books[4]} size="small"/><div><h3>{books[4].title}</h3><p>{books[4].author}</p><Stars value={5}/><blockquote>“Uma narrativa que atravessa a pele e permanece. Daqueles livros que mudam a forma como olhamos para o outro.”</blockquote></div></div></div></div></div>
      <aside className="profile-aside"><h3>Gêneros mais lidos</h3>{["Literatura brasileira", "Ficção contemporânea", "Romance", "Biografia"].map((g, i) => <div key={g}><span>{g}</span><i><b style={{ width: `${92 - i * 14}%` }}/></i></div>)}</aside></div>
    </div>
  </div>;
}

function BookModal({ book, onClose, onRate }: { book: Book; onClose: () => void; onRate: () => void }) {
  const [saved, setSaved] = useState(false);
  return <div className="overlay" onMouseDown={onClose}><div className="modal book-modal" onMouseDown={(e) => e.stopPropagation()}><button className="modal-close" onClick={onClose}><Icon name="close"/></button>
    <div className="book-detail-top"><Cover book={book} size="large"/><div className="book-detail-copy"><span className="eyebrow">{book.genre}</span><h1>{book.title}</h1>{book.original && <em>{book.original}</em>}<h3>{book.author}</h3><div className="book-facts"><span><b>Editora</b>{book.publisher}</span><span><b>Publicação</b>{book.year}</span><span><b>Páginas</b>{book.pages}</span><span><b>Idioma</b>Português</span></div><div className="chips"><span>{book.genre}</span><span>Ficção</span></div><p className="synopsis">Uma narrativa envolvente sobre memória, pertencimento e os laços invisíveis que conectam pessoas e lugares. Uma história de beleza rara, contada com delicadeza e força.</p><div className="button-row"><Button icon={saved ? "check" : "bookmark"} onClick={() => setSaved(!saved)}>{saved ? "Na lista Quero ler" : "Quero ler"}</Button><Button kind="secondary" icon="book">Começar a ler</Button></div></div></div>
    <div className="rating-summary"><div><strong>{book.score.toFixed(1)}</strong><div><Stars value={book.score}/><span>1.248 avaliações</span></div></div><Button kind="ghost" onClick={onRate}>Escrever uma resenha</Button></div>
    <div className="reviews"><h2>O que outros leitores acharam</h2><article><span className="avatar avatar-tiny">LA</span><div><strong>Lucas Almeida</strong><Stars value={5}/><p>Uma leitura que cresce a cada capítulo e fica com você por muito tempo.</p></div></article><article><span className="avatar avatar-tiny alt">RF</span><div><strong>Renata Freire</strong><Stars value={4}/><p>Prosa delicada, personagens complexos e um ritmo que convida à pausa.</p></div></article></div>
  </div></div>;
}

function RatingModal({ book, onClose }: { book: Book; onClose: () => void }) {
  const [rating, setRating] = useState(0);
  const [sent, setSent] = useState(false);
  return <div className="overlay"><div className="modal rating-modal"><button className="modal-close" onClick={onClose}><Icon name="close"/></button>{sent ? <div className="success-state"><span><Icon name="check" size={30}/></span><h2>Resenha publicada</h2><p>Sua leitura agora faz parte do seu diário.</p><Button onClick={onClose}>Concluir</Button></div> : <><span className="eyebrow">LEITURA CONCLUÍDA</span><h2>O que você achou?</h2><div className="rating-book"><Cover book={book} size="small"/><div><h3>{book.title}</h3><p>{book.author}</p></div></div><label className="rating-label">Sua nota<Stars value={rating} interactive onChange={setRating}/></label><label className="review-field">Escreva uma resenha<textarea placeholder="Conte como foi a sua experiência com este livro..."/></label><label className="check-label"><input type="checkbox"/> Esta resenha pode aparecer no meu perfil</label><Button onClick={() => setSent(true)}>Publicar avaliação</Button></>}</div></div>;
}

function LoginModal({ onClose }: { onClose: () => void }) {
  const [register, setRegister] = useState(false);
  return <div className="overlay"><div className="modal login-modal"><button className="modal-close" onClick={onClose}><Icon name="close"/></button><span className="brand-mark login-mark"><Icon name="book"/></span><span className="eyebrow">BEM-VINDO À PLATAFORMA</span><h2>{register ? "Crie sua conta" : "Entre na sua estante"}</h2><p>{register ? "Comece hoje o seu diário de leituras." : "Suas próximas histórias estão esperando."}</p>{register && <label>Nome de usuário<input placeholder="Como quer ser chamado?"/></label>}<label>E-mail<input type="email" placeholder="voce@email.com"/></label><label>Senha<input type="password" placeholder="Sua senha"/></label><Button onClick={onClose}>{register ? "Criar conta" : "Entrar"}</Button><button className="login-switch" onClick={() => setRegister(!register)}>{register ? "Já tem uma conta? Entrar" : "Ainda não tem uma conta? Cadastre-se"}</button></div></div>;
}

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [ratingBook, setRatingBook] = useState<Book | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const go = (p: Page) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };
  return <PageShell page={page} setPage={go}>
    {page === "home" && <Home setPage={go} onOpen={setSelectedBook}/>}
    {page === "catalog" && <Catalog onOpen={setSelectedBook}/>}
    {page === "diary" && <Diary onRate={setRatingBook}/>}
    {page === "lists" && <Lists onOpen={setSelectedBook}/>}
    {page === "wishlist" && <Wishlist onOpen={setSelectedBook}/>}
    {page === "news" && <News/>}
    {page === "profile" && <Profile setPage={go} onOpen={setSelectedBook}/>}
    <nav className="quick-nav" aria-label="Atalhos">
      <button className={page === "diary" ? "active" : ""} onClick={() => go("diary")}><Icon name="book"/>Diário</button>
      <button className={page === "wishlist" ? "active" : ""} onClick={() => go("wishlist")}><Icon name="bookmark"/>Quero ler</button>
      <button onClick={() => setShowLogin(true)}><Icon name="user"/>Entrar</button>
    </nav>
    {selectedBook && <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} onRate={() => { setRatingBook(selectedBook); setSelectedBook(null); }}/>}
    {ratingBook && <RatingModal book={ratingBook} onClose={() => setRatingBook(null)}/>}
    {showLogin && <LoginModal onClose={() => setShowLogin(false)}/>}
  </PageShell>;
}
