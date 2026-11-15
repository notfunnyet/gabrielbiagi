export type Project = { id: string; name: string; segment: string; kind: 'web' | 'mobile'; problem: string; desc: string; stack: string[]; demo?: string; repo?: string; image?: string; isExample?: boolean }
export const profile = {
  name: 'Gabriel Biagi Souza', role: 'Desenvolvedor Full-Stack',
  lead: 'Sites, interfaces e aplicações web que unem estética, funcionalidade e desempenho, para empresas, clínicas e estabelecimentos.',
  about: [
    'Sou Gabriel Biagi Souza, desenvolvedor Full-Stack interessado em tecnologia, programação e no desenvolvimento de soluções digitais.',
    'Trabalho principalmente com Python e com o ecossistema web, criando sites, interfaces e aplicações que combinam estética, funcionalidade e desempenho.',
    'Desenvolvo para empresas, clínicas e estabelecimentos de diferentes segmentos: entendo as necessidades de cada negócio e as transformo em experiências digitais modernas, intuitivas e eficientes.',
    'Gosto de explorar novas tecnologias e resolver problemas. Valorizo código bem estruturado, interfaces bem planejadas e projetos com identidade própria, e estou sempre aberto a novos desafios.'],
  meta: [['nome', 'Gabriel Biagi Souza'], ['foco', 'Desenvolvimento web'], ['principal', 'Python + ecossistema web'], ['status', 'Aberto a novos desafios']] as [string, string][],
}
// EXEMPLO: substitua pelos seus projetos reais e remova `isExample`.
export const projects: Project[] = [
{ id: 'clinica', name: 'Saara Odontologia', segment: 'Saúde e Odontologia', kind: 'web', isExample: false, problem: 'Pacientes precisam encontrar serviços, equipe e formas de contato rapidamente.', desc: 'Site institucional de odontologia, feito para o portfólio como exemplo.', stack: ['React', 'CSS3'], demo: 'https://saaraodontologia.pages.dev' },
  { id: 'empresa', name: 'Estrata', segment: 'Empresas e negócios', kind: 'web', isExample: false, problem: 'A empresa precisa transmitir credibilidade e apresentar o que oferece.', desc: 'Site apresentação da empresa, serviços e canal de contato.', stack: ['HTML5', 'CSS3', 'JavaScript'], demo: 'https://estrata-six.vercel.app/' },
  { id: 'landing', name: 'Meu portfólio web', segment: 'Meu portfólio', kind: 'web', isExample: false, problem: '.', desc: 'A landing page deste portfólio (gabrielbiagi.vercel.app). ', stack: ['React', 'CSS3'], demo: 'https://gabrielbiagi.vercel.app'},
  { id: 'webapp', name: 'Aplicação web', segment: 'Aplicações web', kind: 'web', isExample: true, problem: 'Uma rotina manual precisa virar um fluxo digital organizado.', desc: 'Exemplo: aplicação com painel, dados persistidos e autenticação.', stack: ['Python', 'Node.js', 'MySQL'] },
]
export const stack = [
  ['linguagens', [['Python', 'Minha linguagem principal.'], ['Java', 'Programação orientada a objetos.'], ['C#', 'Uso para projetos simples do dia a dia.']]],
  ['front-end', [['HTML5', 'Estrutura semântica e acessível.'], ['CSS3', 'Layout, responsividade e animações.'], ['React', 'Interfaces em componentes reutilizáveis.']]],
  ['back-end & dados', [['Node.js', 'JavaScript no servidor e em ferramentas.'], ['MySQL', 'Banco de dados, autenticação e backend como serviço.']]],
] as [string, [string, string][]][]
export const links = { github: 'https://github.com/notfunnyet', whatsapp: 'https://wa.me/553299419224', discord: '@notfunnyet' }
