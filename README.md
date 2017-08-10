# Callback Hunter integration for Moneyboom (back-end)
## Public API
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/wearesho-team/moneyboom-ch-backend/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/wearesho-team/moneyboom-ch-backend/?branch=master)
[![Code Coverage](https://scrutinizer-ci.com/g/wearesho-team/moneyboom-ch-backend/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/wearesho-team/moneyboom-ch-backend/?branch=master)
[![Build Status](https://scrutinizer-ci.com/g/wearesho-team/moneyboom-ch-backend/badges/build.png?b=master)](https://scrutinizer-ci.com/g/wearesho-team/moneyboom-ch-backend/build-status/master)

This API will be used by [frontend](https://github.com/wearesho-team/moneyboom-ch-frontend)
### [POST /callback] Requesting call
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
    default = 'is-default',
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