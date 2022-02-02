[Home](https://github.com/blocklabnl/ebl/)

# Credential issuer backend

Server component of a verifiable credential issuer

This app is a server implementation of the Decentralized Agent Framework(DAF).
It is used as a controller of the identity of an institution like the Chamber
of Commerce. A user would visit the chamber of commerce website to request a
credential. The backend would then be queried by the user's wallet to initiate
the credential issuing process. 

## Install

```sh
yarn install
```

## Usage

On startup, the server currently creates a random issuer identity. This is not
useful for a pilot system. Then you would like to have the identity persist and
build a reputation.

```sh
# Complile typescript to javascript
yarn build

# Or in a separate terminal window watch for changes and rebuild
yarn watch

# Start the server at port 3000
yarn start
```

## Test

Run integration tests.

```sh
yarn test
```

## Deployment

Build a docker image.

```sh
docker build -t credential-issuer .
```

TBD

## API

### Root route

```
GET /
```

#### Response 

```json
{}
```

### Issue credential

```
POST /issue-credential
```

#### Request

```json
{
    "issuer": "string",
    "vc": {
        "@context": "Array<string>",
        "type": "Array<string>",
        "credentialSubject": {
            "id": "string",
            "...additionalProperties": "..."
        }
    }
}
```

#### Success Response 

**Code**: `200 OK`

```
{
    VerifiableCredential
}
```

