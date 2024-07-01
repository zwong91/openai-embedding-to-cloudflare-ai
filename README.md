# OpenAI embedding to Cloudflare AI

This is example of using [Workers AI](https://developers.cloudflare.com/workers-ai/). This Cloudflare Worker provides a Base URL which allows you to make AI calls to the @cf/baai/bge-small-en-v1.5 model using an OpenAI client.

## Usage

```txt
npm install 
npm run dev
npm run deploy
```

[Example (Ruby using the ruby-openai gem)](https://github.com/alexrudall/ruby-openai)

```ruby
require 'openai'

client = OpenAI::Client.new(
  api_key: ENV['OPENAI_API_KEY'],
  uri_base: ENV['CLOUDFLARE_WORKER_URL']
)

response = client.chat(
  parameters: {
    model: 'gpt-4-turbo', #This is ignored in this example
    input: [
      {
        'You are a helpful assistant'
      },
      {
        'What is 3 * 10?'
      }
    ]
  }
)

puts response.dig('data', 0, 'embedding')
```


## License

MIT
# openai-embedding-to-cloudflare-ai
