import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { initialize, mswDecorator } from 'msw-storybook-addon'
import { addDecorator } from '@storybook/react'
import '../packages/components/index.css'

// Initialize MSW
initialize()

// Provide the MSW addon decorator globally
export const decorators = [mswDecorator]

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staletime: Infinity,
      cacheTime: Infinity,
      refetchOnWindowFocus: false
    }
  }
})

addDecorator(story => (
  <QueryClientProvider client={queryClient}>{story()}</QueryClientProvider>
))

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  darkMode: {
    classTarget: 'body',
    stylePreview: true
  }
}
