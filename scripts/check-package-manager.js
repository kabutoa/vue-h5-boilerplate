const userAgent = process.env.npm_config_user_agent ?? ''

if (!userAgent.startsWith('pnpm/')) {
  console.error('pnpm is required to install dependencies')
  process.exit(1)
}
