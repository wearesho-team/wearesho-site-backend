# Wearesho Site Backend

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
