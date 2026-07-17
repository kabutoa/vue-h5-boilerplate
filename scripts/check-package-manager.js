const userAgent = process.env.npm_config_user_agent ?? ''

if (!userAgent.startsWith('pnpm/')) {
  console.warn('pnpm is required to install dependencies')
}
