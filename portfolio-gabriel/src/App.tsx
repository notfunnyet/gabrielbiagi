import { lazy, Suspense, useEffect, useState } from 'react'
import { GMark } from './components/GMark'
import { profile, projects, stack, links } from './data'
const Hero3D = lazy(() => import('./components/Hero3D'))

function useWebGL() {
  const [on, setOn] = useState(false)
  useEffect(() => {
    const c = document.createElement('canvas')
    const ok = !!(c.getContext('webgl2') || c.getContext('webgl'))
    const calm = matchMedia('(prefers-reduced-motion: reduce)').matches
    const save = (navigator as unknown as { connection?: { saveData?: boolean } }).connection?.saveData
    if (!ok || calm || save) return
    const t = setTimeout(() => setOn(true), 300)
    return () => clearTimeout(t)
  }, [])
  return on
}

function Photo() {
  const [ok, setOk] = useState(true)
  return (
    <figure className="ph">
      {ok ? <img src="/images/gabriel.jpg" alt="Retrato de Gabriel Biagi Souza" width={480} height={600} loading="lazy" onError={() => setOk(false)} /> : <GMark />}
    </figure>
  )
}

function Projects() {
  const [i, setI] = useState(0)
  const p = projects[i]
  return (
    <div className="explorer rv">
      <ul className="tree" aria-label="Lista de projetos">
        {projects.map((x, k) => (
          <li key={x.id}><button aria-pressed={k === i} onClick={() => setI(k)}>{String(k + 1).padStart(2, '0')}_{x.id}.proj</button></li>
        ))}
      </ul>
      <article className="file">
        <div className={'frame ' + p.kind}>
          <div className="dots"><i /><i /><i /></div>
          {p.image ? <img src={p.image} alt={'Prévia do projeto ' + p.name} loading="lazy" /> : <div className="wire"><b /><b /><b /></div>}
          {p.isExample && <em className="tag">EXEMPLO</em>}
        </div>
        <h3>{p.name}</h3>
        <dl className="pf">
          <dt>segmento</dt><dd>{p.segment}</dd>
          <dt>problema</dt><dd>{p.problem}</dd>
          <dt>descrição</dt><dd>{p.desc}</dd>
          <dt>tecnologias</dt><dd className="chips">{p.stack.map((s) => <span key={s}>{s}</span>)}</dd>
          <dt>links</dt>
          <dd>{p.demo || p.repo ? <>{p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer">demonstração ↗</a>} {p.repo && <a href={p.repo} target="_blank" rel="noopener noreferrer">repositório ↗</a>}</> : '—'}</dd>
        </dl>
      </article>
    </div>
  )
}

function CopyDiscord() {
  const [done, setDone] = useState(false)
  const copy = async () => {
    try { await navigator.clipboard.writeText(links.discord); setDone(true); setTimeout(() => setDone(false), 2000) }
    catch { window.prompt('Copie o usuário do Discord:', links.discord) }
  }
  return <button onClick={copy}><span>Discord</span><small aria-live="polite">{done ? 'copiado ✓' : links.discord + ' · copiar'}</small></button>
}

export default function App() {
  const webgl = useWebGL()
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { threshold: 0.12 })
    document.querySelectorAll('.rv').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return (
    <>
      <a className="skip" href="#sobre">Pular para o conteúdo</a>
      <header className="bar"><div className="wrap">
        <a className="logo" href="#topo" aria-label="Início"><GMark /><span className="cur">gbs@portfolio:~$</span></a>
        <nav aria-label="Principal">{[['sobre', 'Sobre'], ['projetos', 'Projetos'], ['stack', 'Stack'], ['contato', 'Contato']].map(([id, l]) => <a key={id} href={'#' + id}>{l}</a>)}</nav>
      </div></header>
      <main>
        <section id="topo" className="hero"><div className="wrap">
          <div>
            <p className="boot" aria-hidden="true"><span>&gt; whoami</span><span>&gt; cat funcao.txt</span><span>&gt; iniciar --portfolio</span></p>
            <h1><span className="nm">{profile.name} · {profile.role}</span><span className="hl">Transformando ideias em experiências digitais.</span></h1>
            <p className="lead">{profile.lead}</p>
            <div className="cta"><a className="btn" href="#projetos">Ver projetos</a><a className="btn alt" href="#contato">Falar comigo</a></div>
          </div>
          <div className="viz" aria-hidden="true">{webgl ? <Suspense fallback={<GMark />}><Hero3D /></Suspense> : <GMark />}</div>
        </div></section>

        <section id="sobre"><div className="wrap about">
          <div className="rv"><Photo /><dl className="meta">{profile.meta.map(([k, v]) => <div key={k} style={{ display: 'contents' }}><dt>{k}</dt><dd>{v}</dd></div>)}</dl></div>
          <div className="rv"><p className="lab"><b>$</b> cat sobre.md</p><h2>Sobre mim</h2>{profile.about.map((t, i) => <p key={i}>{t}</p>)}</div>
        </div></section>

        <section id="projetos"><div className="wrap">
          <div className="rv"><p className="lab"><b>$</b> ls projetos/</p><h2>Projetos</h2></div>
          <Projects />
        </div></section>

        <section id="stack"><div className="wrap">
          <div className="rv"><p className="lab"><b>$</b> stack --list</p><h2>Tecnologias</h2></div>
          <div className="stk rv">{stack.map(([g, items]) => (
            <div className="grp" key={g}><h3>~/{g}</h3><ul>{items.map(([n, d]) => <li key={n}><strong>{n}</strong><span>{d}</span></li>)}</ul></div>
          ))}</div>
        </div></section>

        <section id="contato"><div className="wrap">
          <div className="rv">
            <p className="lab"><b>$</b> contact --open</p>
            <h2 className="big">Vamos conversar sobre o seu projeto?</h2>
            <ul className="ct">
              <li><a href={links.github} target="_blank" rel="noopener noreferrer"><span>GitHub</span><small>github.com/notfunnyet ↗</small></a></li>
              <li><a href={links.whatsapp} target="_blank" rel="noopener noreferrer"><span>WhatsApp</span><small>conversar agora ↗</small></a></li>
              <li><CopyDiscord /></li>
            </ul>
          </div>
        </div></section>
      </main>
      <footer><div className="wrap"><span>© {new Date().getFullYear()} Gabriel Biagi Souza</span><span>feito com React + three.js</span></div></footer>
    </>
  )
}
