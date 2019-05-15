const usage_repos = {
	scanpy: ['scanpy_usage', 'scanpy-tutorials'],
	anndata: ['anndata_usage'],
	scvelo: ['scvelo_notebooks'],
	diffxpy: ['diffxpy_tutorials'],
	scGen: ['scGen_reproducibility'],
}
const categories = {
	scanpy: ['scanpy', 'anndata', 'scanpydoc'],
	'Bart-Seq': ['bartSeq', 'bartseq-pipeline'],
	'Deep learning': ['dca', 'deepflow', 'scGen'],
	MetaMap: ['MetaMap', 'MetaMap-web'],
	'Statistical models': ['diffxpy', 'batchglm', 'LineagePulse', 'kBET', 'enrichment_analysis_celltype'],
	'Manifold learning': ['paga', 'destiny', 'kbranches'],
	// uncomment once “graphdynamics” is public
	//'population dyamics': ['pseudodynamics', 'graphdynamics']
	'Analyses': ['2018_Angelidis', 'LungAgingAtlas'],
}

const invert = obj =>
	Object.entries(obj)
	.reduce((o, [k, vs]) => {
		for (const v of vs) o[v] = k
		return o
	}, {})

const repo2cat = invert(categories)

const sorter = (...keys) => (a, b) => {
	for (const key of keys) {
		const keyfn = typeof key === 'string' ? (o => o[key]) : key
		const x_raw = keyfn(a)
		const y_raw = keyfn(b)
		const x = typeof x_raw === 'string' ? x_raw.toLowerCase() : x_raw
		const y = typeof y_raw === 'string' ? y_raw.toLowerCase() : y_raw
		// if (x === y) console.log(`${key} is equal: ${x} === ${y}!`)
		// else console.log(`${key} is not equal: ${x} !== ${y}!`)
		if (x === y) continue
		return x < y ? -1 : 1
	}
}

const urlify = text =>
	text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1">$1</a>')

const maybe_link = (html, url) => url ? `<a href="${url}">${html}</a>` : html
const icon_link = (html, url) => {
	if (!url) return html
	return `<a href="${url}">${html}</a>`
}

const render_repos = all_repos => {
	const cat_names = Object.keys(categories)
	const groups_unsorted = [
		...cat_names.map(cat => ({cat, repos: all_repos.filter(({name}) => repo2cat[name] === cat)})),
		{cat: 'Other', repos: all_repos.filter(({name}) => !cat_names.includes(repo2cat[name]))}
	]
	// Sort by sum(stars) / #repos
	const groups = groups_unsorted
		.sort(sorter(({repos}) => repos.reduce((sum, {stargazers_count: stars}) => sum + stars, 0) / repos.length))
		.reverse()
	return groups.map(({cat, repos}) => `
		<h2>${cat}</h2>
		<ul class=collection>
			${repos.map(render_repo).join('\n')}
		</ul>
	`).join('\n')
}

const render_repo = ({
	name,
	description,
	html_url,
	homepage,
	stargazers_count: stars,
	has_issues, open_issues,
	usage_repos,
}) => {
	// Some repos are just links to others
	if (homepage && homepage.startsWith('https://github.com')) {
		html_url = homepage
		homepage = null
	}
	return `
		<li class="collection-item avatar">
			<a href="${html_url}"><img src=images/github.svg class=circle></a>
			<span class=title>${icon_link(name, homepage)}</span>
			${description ? `<p>${urlify(description)}</p>` : ''}
			<div class=secondary-content>
				${usage_repos.length ? usage_repos.map(r => `<a href="${r.html_url}" class=chip>${r.name}</a>`).join('\n') : ''}
				${stars < 20 ? '' : `<a href="${html_url}/stargazers" class=chip><img src=images/star.svg>${stars}</a>`}
				<!--
				${!has_issues ? '' : `<a href="${html_url}/issues" class=chip><img src=images/issue.svg>${open_issues}</a>`}
				-->
			</div>
		</li>
	`
}

const render_error = e => `
	<div class=error>
		${e}<br>
		${e.stack.replace('\n', '<br>')}
	</div>
`

const parse_link_hdr = hdr => hdr.split(/,\s+/)
	.map(s => /<([^>]+)>; rel="(\w+)"/.exec(s))
	.reduce((o, [, l, r]) => {o[r] = l; return o}, {})


const fetch_all = url => fetch(url).then(r => {
	const links = parse_link_hdr(r.headers.get('Link'))
	if (links.next)
		return Promise.all([r.json(), fetch_all(links.next)])
			.then(([a, b]) => a.concat(b))
	else
		return r.json()
})

const repos_url = 'https://api.github.com/orgs/theislab/repos'
const render_project_list = () =>
	fetch_all(repos_url)
	.then(repos => {
		const sorted = repos
			.filter(({archived}) => !archived)
			.filter(({name}) => !Object.values(usage_repos).flat().includes(name))
			.sort(sorter('stargazers_count', 'name'))
			.reverse()
			.map(repo => ({
				...repo,
				usage_repos: repos.filter(({name}) => (usage_repos[repo.name] || []).includes(name)),
			}))
		return render_repos(sorted)
	})

document.addEventListener('DOMContentLoaded', () => {
	const project_list = document.getElementById('project-list')
	render_project_list()
		.then(html => project_list.innerHTML = html)
		.catch(e => {
			project_list.innerHTML = render_error(e)
			throw e
		})
}, false)
