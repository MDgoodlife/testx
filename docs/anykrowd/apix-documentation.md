---

# Authentication

Authentication requires an API key (Bearer Token). API keys are provided separately and cannot be auto-generated through the API.

⚠️ Make sure you specify the `Accept: application/json` Header in all the calls.

To authenticate your requests, include the API key in the Authorization header:

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" https://[tenantURL]/apix/v1/ping

```

<aside>
🔑 Contact your Project Manager to obtain an API key for your application.

</aside>

## Response Format

All API responses are returned in JSON format. A typical response structure example:

```json
{
    "status": "success",
    "data": {},
    "message": "Operation completed successfully"
}

```

## Error Handling

When an error occurs, the API will return:

- HTTP status code indicating the type of error
- JSON response body with error details

Example error response:

```json
{
    "status": "error",
    "error": {
        "code": 403,
        "error": "Access Denied"
    }
}
```

## Common HTTP Status Codes

| `200` | Success |
| --- | --- |
| `400` | Bad Request |
| `401` | Unauthorized |
| `403` | Forbidden |
| `404` | Not Found |
| `500` | Internal Server Error |

## Rate Limiting (TBD)

To ensure service stability, API requests are rate limited to:

- 1000 requests per hour per API key
- Rate limit information is included in response headers:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1614556800

```

<aside>
⚠️ Exceeding these limits will result in HTTP 429 (Too Many Requests) responses.

</aside>

# Available Endpoints

## PING

<aside>
**Method:** `GET`

**Endpoint:** `/apix/v1/ping`

**Description:** Simple endpoint to verify your API key and test connectivity.

**Parameters:** none

**Returns:** String `pong`

</aside>

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" https://[tenantURL]/apix/v1/ping
```

Successful Response:

```json
{
    "message": "pong"
}
```

## CURRENCIES

### List Currencies

<aside>
**Method:** `GET`

**Endpoint:** [`/apix/v1/currencies/list`](nightclub.anykrowd.dev/)

**Description:** Retrieve a complete list of supported currencies.

**Parameters:** 

| Parameter | Mandatory | Type | Default Value | Description |
| --- | --- | --- | --- | --- |
| `limit` | No | Integer | 10 | Number of results per page |
| `page` | No | Integer | 1 | Current page number of results |

**Returns:** Paginated collection of currencies resources.

</aside>

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" https://[tenantURL]/apix/v1/currencies/list
```

Using the `limit` and `page` parameters

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" https://[tenantURL]/apix/v1/currencies/list?limit=50&page=2
```

Successful Response:

```json
{
    "data": [
        {
            "id": 1,
            "default": 1,
            "name": "EUR",
            "prefix": "€",
            "suffix": "EUR",
            "exchange_rate": "1.00"
        },
        {
            "id": 2,
            "default": 0,
            "name": "Rudolf",
            "prefix": "RD",
            "suffix": "",
            "exchange_rate": "1.20"
        }
    ],
    "links": {
        "first": "https://[tenantURL]/apix/v1/currencies/list?page=1",
        "last": "https://[tenantURL]/apix/v1/currencies/list?page=1",
        "prev": null,
        "next": null
    },
    "meta": {
        "current_page": 1,
        "from": 1,
        "last_page": 1,
        "links": [
            {
                "url": null,
                "label": "&laquo; Previous",
                "active": false
            },
            {
                "url": "https://[tenantURL]/apix/v1/currencies/list?page=1",
                "label": "1",
                "active": true
            },
            {
                "url": null,
                "label": "Next &raquo;",
                "active": false
            }
        ],
        "path": "https://[tenantURL]/apix/v1/currencies/list",
        "per_page": 10,
        "to": 2,
        "total": 2
    }
}
```

### Get Currency Details

<aside>
**Method:** `GET`

**Endpoint:** `/apix/v1/currencies/show/{id}`

**Description:** Fetch detailed information for a specific currency.

**Parameters:** 

| Parameter | Mandatory | Type | Default Value | Description |
| --- | --- | --- | --- | --- |
| `id` | Yes | Integer | `null` | Currency ID |

**Returns:** Currency resource.

</aside>

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" https://[tenantURL]/apix/v1/currencies/show/1
```

Successful Response:

```json
{
    "id": 1,
    "default": 1,
    "name": "EUR",
    "prefix": "€",
    "suffix": "EUR",
    "exchange_rate": "1.00"
}
```

## EVENTS

### List Events

<aside>
**Method:** `GET`

**Endpoint:** `/apix/v1/events/list`

**Description:** Retrieve all available events.

**Parameters:** 

| Parameter | Mandatory | Type | Default Value | Description |
| --- | --- | --- | --- | --- |
| `active` | No | String | `false`
Other values:
`true` | Return only the active/running events at this moment of time.  |
| `limit` | No | Integer | 10 | Number of results per page |
| `page` | No | Integer | 1 | Current page number of results |

**Returns:** Paginated collection of events resources.

</aside>

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" https://[tenantURL]/apix/v1/events/list
```

Successful Response:

```json
{
    "data": [
        {
            "id": 1,
            "name": "Demo event",
            "summary": null,
            "description": "",
            "main_image": "https://[image_url]",
            "start_sales_timestamp": "2024-10-31 12:00:00",
            "end_sales_timestamp": "2025-11-02 12:00:00",
            "is_running": true,
            "start_datetime": "2024-11-01 12:00:00",
            "end_datetime": "2025-11-01 12:00:00"
        },
        {
            "id": 4,
            "name": "Weekend party",
            "summary": null,
            "description": "",
            "main_image": "https://[tenantURL]/no_pic.jpg",
            "start_sales_timestamp": "2025-04-03 12:00:00",
            "end_sales_timestamp": "2025-04-08 12:00:00",
            "is_running": false,
            "start_datetime": "2025-04-04 12:00:00",
            "end_datetime": "2025-04-07 12:00:00"
        }
    ],
    "links": {
        "first": "https://[tenantURL]/apix/v1/events/list?page=1",
        "last": "https://[tenantURL]/apix/v1/events/list?page=1",
        "prev": null,
        "next": null
    },
    "meta": {
        "current_page": 1,
        "from": 1,
        "last_page": 1,
        "links": [
            {
                "url": null,
                "label": "&laquo; Previous",
                "active": false
            },
            {
                "url": "https://[tenantURL]/apix/v1/events/list?page=1",
                "label": "1",
                "active": true
            },
            {
                "url": null,
                "label": "Next &raquo;",
                "active": false
            }
        ],
        "path": "https://[tenantURL]/apix/v1/events/list",
        "per_page": 10,
        "to": 2,
        "total": 2
    }
}
```

### Get Event Details

<aside>
**Method:** `GET`

**Endpoint:** `/apix/v1/events/show/{id}`

**Description:** Fetch detailed information for a specific event.

**Parameters:** 

| Parameter | Mandatory | Type | Default Value | Description |
| --- | --- | --- | --- | --- |
| `id` | Yes | Integer | `null` | Event ID |

**Returns:** Event resource

</aside>

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" https://[tenantURL]/apix/v1/events/show/123
```

Successful Response:

```json
{
    "id": 1,
    "name": "Demo event",
    "summary": null,
    "description": "",
    "main_image": "https://[image_url]",
    "start_sales_timestamp": "2024-10-31 12:00:00",
    "end_sales_timestamp": "2025-11-02 12:00:00",
    "is_running": true,
    "start_datetime": "2024-11-01 12:00:00",
    "end_datetime": "2025-11-01 12:00:00"
}
```

## ROLES

### List Roles

<aside>
**Method:** `GET`

**Endpoint:** `/apix/v1/roles/list`

**Description:** Retrieve all available user roles.

**Parameters:** 

| Parameter | Mandatory | Type | Default Value | Description |
| --- | --- | --- | --- | --- |
| `limit` | No | Integer | 10 | Number of results per page |
| `page` | No | Integer | 1 | Current page number of results |

**Response:** Paginated collection of roles resources

</aside>

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" https://[tenantURL]/apix/v1/roles/list
```

Successful Response:

```json
{
    "data": [
        {
            "id": 1,
            "name": "Checkin",
            "full_rights": false,
            "rights": {
                "check_in": true,
                "change_location": true
            }
        },
        {
            "id": 2,
            "name": "Full Admin + voucher",
            "full_rights": true,
            "rights": []
        }
    ],
    "links": {
        "first": "https://[tenantURL]/apix/v1/roles/list?page=1",
        "last": "https://[tenantURL]/apix/v1/roles/list?page=1",
        "prev": null,
        "next": null
    },
    "meta": {
        "current_page": 1,
        "from": 1,
        "last_page": 1,
        "links": [
            {
                "url": null,
                "label": "&laquo; Previous",
                "active": false
            },
            {
                "url": "https://[tenantURL]/apix/v1/roles/list?page=1",
                "label": "1",
                "active": true
            },
            {
                "url": null,
                "label": "Next &raquo;",
                "active": false
            }
        ],
        "path": "https://[tenantURL]/apix/v1/roles/list",
        "per_page": 10,
        "to": 2,
        "total": 2
    }
}
```

### Get Role Details

<aside>
**Method:** `GET`

**Endpoint:** `/apix/v1/roles/show/{id}`

**Description:** Fetch detailed information for a specific role.

**Parameters:** 

| Parameter | Mandatory | Type | Default Value | Description |
| --- | --- | --- | --- | --- |
| `id` | Yes | Integer | `null` | Role ID |
</aside>

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" https://[tenantURL]/apix/v1/roles/show/1
```

Successful Response:

```json
{
    "id": 1,
    "name": "Checkin",
    "full_rights": false,
    "rights": {
        "check_in": true,
        "change_location": true
    }
}
```

## USERS

### Get User Wallets

<aside>
**Method:** `GET`

**Endpoint:** `/apix/v1/users/wallets`

**Description:** Get all wallets for a user.

**Parameters:** 

GET

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `external_id` | String | Yes | The identifier of a user from that was used as `external_id` in `sync` |

**Response:** Collection of wallet resources.

</aside>

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" https://[tenantURL]/apix/v1/users/wallets?external_id=1a2b3c4d
```

Successful Response:

```json
[
    {
        "id": 21,
        "currency": {
            "id": 1,
            "default": 1,
            "name": "EUR",
            "prefix": "€",
            "suffix": "EUR",
            "exchange_rate": "1.00"
        },
        "current_balance": "0.00",
        "is_guest_wallet": 0,
        "metadata": null
    },
    {
        "id": 22,
        "currency": {
            "id": 2,
            "default": 0,
            "name": "Rudolf",
            "prefix": "RD",
            "suffix": "",
            "exchange_rate": "1.20"
        },
        "current_balance": "0.00",
        "is_guest_wallet": 0,
        "metadata": null
    }
]
```

### Synchronize Users

<aside>
**Method:** `POST`

**Endpoint:** `/apix/v1/users/sync`

**Description:** Trigger a synchronization of user data across the system.

**Parameters:** 

POST (JSON)

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `staff_members` | Array | Yes | List of staff member objects to sync |
| —`external_id` | Integer | Yes | Unique identifier for the staff member from the partner platform |
| —`external_qr_code` | String | Yes | QR code identifier |
| —`external_qr_codes` | Array | No | List of additional QR codes |
| —`first_name` | String | Yes | Staff member's first name |
| —`last_name` | String | Yes | Staff member's last name |
| —`roles` | Array | No | List of role objects |
| —— `role_id`  | Integer | No | Role ID to be assigned |
| —— `valid_from`  | Date | No | Set the date from when the role is available. (`Y-m-d H:i:s` format) |
| —— `valid_until`  | Date | No | Set the date until when the role is available. (`Y-m-d H:i:s` format) |
| —`create_user_account` | Boolean | No | Whether to create a user (ClientX) account |

```jsx
{
    "staff_members": [
        {
            "external_id": 3,
            "external_qr_code": "3",
            "external_qr_codes": [
                "a1",
                "a2",
                "a3"
            ],
            "first_name": "John",
            "last_name": "Doe",
            "roles": [
                {
                    "role_id": 1,
                    "valid_from": "2025-05-16 12:00:00";
                    "valid_until": "2025-05-18 12:00:00"
                }
            ],
            "create_user_account": true
        },
        {
            "external_id": 2,
            "external_qr_code": "2",
            "first_name": "Peter",
            "last_name": "Parker",
        }
    ]
}
```

**Response:** `"success": true` or error message

</aside>

```bash
curl -X POST -H "Authorization: Bearer YOUR_API_KEY" https://[tenantURL]/apix/v1/users/sync
```

Successful Response:

```json
{
    "success": true
}
```

### TopUp Users

<aside>
**Method:** `POST`

**Endpoint:** `/apix/v1/users/topup`

**Description:** TopUp a user based on the external ID.

**Parameters:** 

POST (JSON)

| Parameter | Required | Type | Default Value | Description |
| --- | --- | --- | --- | --- |
| `external_id` | Yes | String | `null` | Unique identifier for the staff member from the partner platform |
| `currency_id` | Yes | Integer | `null`  | Existing currency ID |
| `amount` | Yes | Decimal | `null` | Funds amount to be added to the user |

```jsx
{
    "external_id": "123abc",
    "currency_id": 3,
    "amount": 10.3
}
```

**Response:** Wallet transaction resource

</aside>

```bash
curl -X POST -H "Authorization: Bearer YOUR_API_KEY" -H "Content-Type: application/json" -d '{"external_id": "123abc", "amount": 10.24, "currency_id": 1}' https://[tenantURL]/apix/v1/users/topup
```

Successful Response:

```json
{
    "id": 80,
    "order_id": 92,
    "user_id": 1,
    "wallet_id": 1,
    "rfid_tag_id": null,
    "event_id": null,
    "device_id": null,
    "scanned_by_id": 1,
    "scanned_by_type": "App\\Models\\Tenant\\User",
    "amount": 10.24,
    "paid": true,
    "direction": "CREDIT",
    "reference": "Partner Top Up",
    "nanoid": "vGA-GognON0g8hU__yz17",
    "type": "top_up",
    "created_at": "2025-04-03T05:08:32.000000Z",
    "price_vat": "0.00",
    "price_excl": "10.24",
    "vat_percentage": null,
    "balance_before": "24.24",
    "balance_after": 34.48,
    "currency": {
        "id": 1,
        "default": 1,
        "name": "EUR",
        "prefix": "€",
        "suffix": "EUR",
        "exchange_rate": "1.00"
    }
}
```

## WALLETS

### Get Wallet Details

<aside>
**Method:** `GET`

**Endpoint:** `/apix/v1/wallets/show/{id}`

**Description:** Fetch detailed information for a specific wallet.

**Parameters:** 

| Parameter | Mandatory | Type | Default Value | Description |
| --- | --- | --- | --- | --- |
| `id` | Yes | Integer | `null` | Wallet ID |

**Response:** Wallet resource with related currency

</aside>

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" https://[tenantURL]/apix/v1/wallets/show/123
```

Successful Response:

```json
{
    "id": 1,
    "currency": {
        "id": 1,
        "default": 1,
        "name": "EUR",
        "prefix": "€",
        "suffix": "EUR",
        "exchange_rate": "1.00"
    },
    "current_balance": "14.00",
    "is_guest_wallet": 0,
    "metadata": null
}
```

### Get Wallet Transactions

<aside>
**Method:** `GET`

**Endpoint:** `/apix/v1/wallets/transactions/{id}`

**Description:** Retrieve the complete transaction history for a specific wallet.

**Parameters:** 

| Parameter | Mandatory | Type | Default Value | Description |
| --- | --- | --- | --- | --- |
| `id`  | Yes | Integer | `null`  | Wallet ID |
| `limit` | No | Integer | 10 | Number of results per page |
| `page` | No | Integer | 1 | Current page number of results |

**Response:** Paginated collection of wallet transactions resources.

</aside>

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" https://[tenantURL]/apix/v1/wallets/transactions/123
```

Successful Response:

```json
{
    "data": [
        {
            "id": 78,
            "order_id": 90,
            "user_id": 1,
            "wallet_id": 1,
            "rfid_tag_id": null,
            "event_id": null,
            "device_id": null,
            "scanned_by_id": 1,
            "scanned_by_type": "App\\Models\\Tenant\\User",
            "amount": "10.00",
            "paid": 1,
            "direction": "CREDIT",
            "reference": "Partner Top Up",
            "nanoid": "X6y4RxJAqwe7xO0-gvFUj",
            "type": "top_up",
            "created_at": "2025-03-31T10:04:09.000000Z",
            "price_vat": "0.00",
            "price_excl": "10.00",
            "vat_percentage": null,
            "balance_before": "4.00",
            "balance_after": "14.00",
            "currency": {
                "id": 1,
                "default": 1,
                "name": "EUR",
                "prefix": "€",
                "suffix": "EUR",
                "exchange_rate": "1.00"
            }
        }
    ],
    "links": {
        "first": "https://[tenantURL]/apix/v1/wallets/transactions/1?page=1",
        "last": "https://[tenantURL]/apix/v1/wallets/transactions/1?page=1",
        "prev": null,
        "next": null
    },
    "meta": {
        "current_page": 1,
        "from": 1,
        "last_page": 1,
        "links": [
            {
                "url": null,
                "label": "&laquo; Previous",
                "active": false
            },
            {
                "url": "https://[tenantURL]/apix/v1/wallets/transactions/1?page=1",
                "label": "1",
                "active": true
            },
            {
                "url": null,
                "label": "Next &raquo;",
                "active": false
            }
        ],
        "path": "https://[tenantURL]/apix/v1/wallets/transactions/1",
        "per_page": 10,
        "to": 1,
        "total": 1
    }
}
```

### Top Up Wallet

<aside>
**Method:** `POST`

**Endpoint:** `/apix/v1/wallets/topup`

**Description:** Add funds to a specific wallet balance.

**Parameters: “wallet_id”:**POST (JSON)

| Parameter | Mandatory | Type | Default Value | Description |
| --- | --- | --- | --- | --- |
| wallet_id | Yes | Integer | `null` | Wallet ID |
| amount | Yes | Decimal | `null` | Funds amount to be added |
| currency_id | Yes | Integer | `null`  | Currency ID of the funds |

**Response:** Wallet transaction resource

</aside>

```bash
curl -X POST -H "Authorization: Bearer YOUR_API_KEY" -H "Content-Type: application/json" -d '{"wallet_id": 123, "amount": 10.24, "currency_id": 1}' https://[tenantURL]/apix/v1/wallets/topup/123
```

Successful Response:

```json
{
    "id": 80,
    "order_id": 92,
    "user_id": 1,
    "wallet_id": 1,
    "rfid_tag_id": null,
    "event_id": null,
    "device_id": null,
    "scanned_by_id": 1,
    "scanned_by_type": "App\\Models\\Tenant\\User",
    "amount": 10.24,
    "paid": true,
    "direction": "CREDIT",
    "reference": "Partner Top Up",
    "nanoid": "vGA-GognON0g8hU__yz17",
    "type": "top_up",
    "created_at": "2025-04-03T05:08:32.000000Z",
    "price_vat": "0.00",
    "price_excl": "10.24",
    "vat_percentage": null,
    "balance_before": "24.24",
    "balance_after": 34.48,
    "currency": {
        "id": 1,
        "default": 1,
        "name": "EUR",
        "prefix": "€",
        "suffix": "EUR",
        "exchange_rate": "1.00"
    }
}
```

### Revoke Top Up Transaction

<aside>
**Method:** `POST`

**Endpoint:** `/apix/v1/wallets/topup-revoke`

**Description:** Revoke a top-up transaction

**Parameters:** 

POST (JSON)

| Parameter | Mandatory | Type | Default Value | Description |
| --- | --- | --- | --- | --- |
| - `nanoids` | Yes | Array | `null` | The `nanoids` of the transactions that needs to be revoked |

```json
{
    "nanoids": [
        "1a2b3c-1",
        "1a2b3c-2",
        "1a2b3c-3"
    ]
}
```

**Response:** `"success": true` or error message

</aside>

```bash
curl -X POST -H "Authorization: Bearer YOUR_API_KEY" -H "Content-Type: application/json" https://[tenantURL]/apix/v1/wallets/topup-revoke
```

Successful Response:

```json
{
    "success": true
}
```