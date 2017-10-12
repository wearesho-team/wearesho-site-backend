# Back-end for [Wearesho Site](https://github.com/wearesho-team/wearesho-site)
## Public API
[![Code Coverage](https://scrutinizer-ci.com/g/wearesho-team/wearesho-site-backend/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/wearesho-team/wearesho-site-backend/?branch=master)
[![Build Status](https://scrutinizer-ci.com/g/wearesho-team/wearesho-site-backend/badges/build.png?b=master)](https://scrutinizer-ci.com/g/wearesho-team/wearesho-site-backend/build-status/master)

### [POST /email] Sending email
Body
```json
{
  "phone": "380502105844",
  "name": "John Smith"
}
```
- Response 400
```text
Invalid phone
```
- Response 400
```text
Invalid name
```
- Response 201
```json
{
  "id": 12
}
```
### [GET /callback/:id] Receiving callback status
1. Response 404
2. Response 200
```json
{
  "status": "is-calling"
}
```
List of statuses:
```typescript
export enum CallbackEnum {
    form = 'is-default',
    calling = 'is-calling',
    finish = 'is-calling-success',
    noLines = 'is-no-lines',
    noConnection = 'is-calling-fail',
    noPossibility = 'is-no-possibility',
    limitExpired = 'is-limit-expired',
}
```

### [PATCH /callback/:id] Updating callback status
Will be used by VoIP back-end
Body:
```json
{
  "status": "is-no-lines"
}
```
- Response 200
- Response 400:
```text
Invalid ID
```
- Response 400:
```text
Invalid status
```
- Response 404
- Response 500
```text
Some server error will be here (or not)
```


## License
[MIT](./LICENSE)