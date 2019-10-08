# Wearesho Site Backend
![Production Build Status](https://codebuild.eu-central-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoibmZoc2hOZG5wSGlDc2E4NTQwZGt5bittTTNuUG9RbDZtUWl4N3lUTHZZYzljNUxTeWMzU3BNMUpHNGx5SFN5ZHJVMVpVYmdjMDhpaFNLQjdVb3ZrOG1FPSIsIml2UGFyYW1ldGVyU3BlYyI6IlJzSFhtWStJS0FWOVczZFQiLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master)

[Frontend Repository](https://github.com/wearesho-team/wearesho-site)

## Usage
### Docker
#### Build Image
```bash
docker build -f ./docker/Dockerfile -t wearesho-team/wearesho-site-backend --rm .
```
#### Run Container
```bash
docker run -p 3000:3000 -e BOT_API_KEY=... -e CHAT_ID=... -d wearesho-team/wearesho-site-backend
```
See [.env.example](./.env.example) for environment details.

## Contributors
- [Alexander <horat1us> Letnikow](mailto:reclamme@gmail.com)

## License
[MIT](./LICENSE)
