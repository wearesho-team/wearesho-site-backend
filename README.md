# Back-end for [Wearesho Site](https://github.com/wearesho-team/wearesho-site)

## Docker
### Building docker container
```bash
docker build -f ./docker/Dockerfile -t wearesho-team/wearesho-site-backend . --no-cache --rm --build-arg bot_api_key=BOT_API_KEY --build-arg chat_id=CHAT_ID
```
Replace BOT_API_KEY and CHAT_ID with your own values.  
*Tests will be run after build*
### Running docker image
After build:
```bash
docker run -p 49160:3000 -d wearesho-team/wearesho-site-backend
```
then back-end will be available at *http://localhost:49160*, you can change port (49160) to any value.