import OpenAI from 'openai'

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY environment variable')
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generateCodeFromImage(
  imageBase64: string,
  framework: 'react' | 'html' | 'vue'
): Promise<string> {
  const prompts = {
    react: `You are an expert frontend developer. Convert this screenshot into clean, production-ready React component code using TypeScript and Tailwind CSS.

Requirements:
- Use modern React best practices (functional components, hooks)
- Include TypeScript types
- Use Tailwind CSS for styling
- Make it responsive
- Include proper accessibility attributes
- Add comments for complex logic
- Export the component as default

Return ONLY the code, no explanations.`,
    html: `You are an expert frontend developer. Convert this screenshot into clean, production-ready HTML/CSS code.

Requirements:
- Use semantic HTML5
- Include modern CSS (or Tailwind CSS)
- Make it responsive
- Include proper accessibility attributes
- Add comments for structure
- Include inline styles or a style tag

Return ONLY the code, no explanations.`,
    vue: `You are an expert frontend developer. Convert this screenshot into clean, production-ready Vue 3 component code using TypeScript and Tailwind CSS.

Requirements:
- Use Vue 3 Composition API with script setup
- Include TypeScript types
- Use Tailwind CSS for styling
- Make it responsive
- Include proper accessibility attributes
- Add comments for complex logic

Return ONLY the code, no explanations.`,
  }

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: prompts[framework] },
          {
            type: 'image_url',
            image_url: {
              url: imageBase64,
            },
          },
        ],
      },
    ],
    max_tokens: 4096,
    temperature: 0.2,
  })

  return response.choices[0]?.message?.content || ''
}
