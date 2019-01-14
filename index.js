const domain2icon = {
	'pypi.python.org': 'images/pypi.svg',
	'helmholtz-muenchen.de': 'images/icb.png',
}

const get_domain = url => url.match(/https?:\/\/(?:www\.)?([^\/]+)/)[1]

const sorter = (...keys) => (a, b) => {
	for (const key of keys) {
		const x = typeof a[key] === 'string' ? a[key].toLowerCase() : a[key]
		const y = typeof b[key] === 'string' ? b[key].toLowerCase() : b[key]
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
	if (!url) return ''
	const domain = get_domain(url)
	const icon = domain2icon[domain]
	if (!icon) {
		console.warn('no icon found for domain %s', domain)
		return ''
	}
	return `
		<a href="${url}">
			<img src=${icon} class=chip>
		</a>
	`
}

const wrap_repos = html => `<ul class=collection>${html}</ul>`
const render_repo = ({
	name,
	description,
	html_url,
	homepage,
	stargazers_count: stars,
	has_issues, open_issues,
}) => `
	<li class=collection-item>
		<h3>
			<a href="${html_url}"><img src=images/github.svg class=chip></a>
			${icon_link(name, homepage)}
			${name}
			${stars < 20 ? '' : `<a href="${html_url}/stargazers" class=chip><img src=images/star.svg>${stars}</a>`}
			${!has_issues ? '' : `<a href="${html_url}/issues" class=chip><img src=images/issue.svg>${open_issues}</a>`}
		</h3>
		${description ? `<p>${urlify(description)}</p>` : ''}
	</li>
`

const render_error = e => `
	<div class=error>
		${e}<br>
		${e.stack.replace('\n', '<br>')}
	</div>
`

const repos_url = 'https://api.github.com/orgs/theislab/repos'
const render_project_list = () => fetch(repos_url)
	.then(r => r.json())
	.then(repos => repos
		.sort(sorter('stargazers_count', 'name'))
		.reverse()
		.map(render_repo)
		.join('\n')
	)
	.then(wrap_repos)

document.addEventListener('DOMContentLoaded', () => {
	const project_list = document.getElementById('project-list')
	render_project_list()
		.then(html => project_list.innerHTML = html)
		.catch(e => {
			project_list.innerHTML = render_error(e)
			throw e
		})
}, false)
