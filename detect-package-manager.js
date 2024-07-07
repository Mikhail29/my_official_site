import { execSync } from 'child_process'

function getPackageManager() {
	if (process.env.npm_execpath.includes('yarn')) {
		return 'yarn'
	} else if (process.env.npm_execpath.includes('pnpm')) {
		return 'pnpm'
	} else {
		return 'npm'
	}
}

const packageManager = getPackageManager()
console.log(`Using ${packageManager}`)

const args = process.argv.slice(2).join(' ')
execSync(`${packageManager} ${args}`, { stdio: 'inherit' })
