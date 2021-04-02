# MiddlewareFormatResponse
This is a Express Middleware to format the server response accordingly to desired media type.

## Acceptable Media Formats

- json
- csv

## Response: 

### Sucess
``` response.statusCode = > 299 ```

```json
{
    "meta": {
        "apiVersion": "2.60.0"
    },
    "payload": {
        "id": 99,
        "foo": "test-value"
    }
}
```

### Error format
``` response.statusCode = > 299 ```

```json
{
    "meta": {
        "apiVersion": "2.60.0"
    },
    "error": {
        "code": "TESAPP0002",
        "message": "Custom Error message"
    }
}
```

