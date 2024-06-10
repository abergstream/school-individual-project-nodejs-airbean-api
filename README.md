# Airbean-API - Individual

## Admin

### Login restricted

All admin endpoints is restricted by an admin login.

##### Response if not logged in

```
Not authorized admin
```

### Login

### POST - /admin/login

##### BODY

```
{
  "username": "admin",
  "password": "password"
}
```

##### RESPONSE

```
Logged in as admin
```

##### ERROR

```
Wrong username or password
```

## Product

### POST - /admin/product

##### BODY

```
{
  "title": "Black coffee", // Required
  "desc": "Gives you the boost you need", // Required
  "price": 9 // Required
}
```

##### RESPONSE

```
Product Black coffee added
```

### PUT - /admin/product

##### BODY

```
{
    "productID": "tmzpFat7n8gi8XtJ", // Mandatory
    "title": "New title", // Optional
    "desc": "New description", // Optional
    "price": 99 // Optional
}
```

##### RESPONSE

```
Product tmzpFat7n8gi8XtJ changed
```

### DELETE /admin/product

##### BODY

```
{
  "productID" : "tmzpFat7n8gi8XtJ"
}
```

##### RESPONSE

```
Product tmzpFat7n8gi8XtJ deleted
```

##### ERROR

```
Could not find the product
```

## Promotion

### POST - /admin/promotion

##### BODY

```
{
    "title": "Campaign name", // Mandatory
    "products": // Mandatory, at least 1 item
    [
        {
            "productID":"dy1JqGCeAYWaJqri",
            "quantity": 1
        },
        {
            "productID": "XxxbJYtuWvSY6xPu0",
            "quantity": 1
        }
    ],
    "price": 40 // Mandatory
}
```

##### RESPONSE

```
Promotion Campaign name added
```

### DELETE - /admin/promotion

##### BODY

```
{
  "promotionID": "nXNFwX4J3cqpXMYS"
}
```

##### RESPONSE

```
Promotion nXNFwX4J3cqpXMYS deleted
```

##### ERROR

```
Promotion nXNFwX4J3cqpXMYS could not be found
```

## Customer

### GET - /info

#### Response

```
{
    "info": "AirBean levererar kaffe med hjälp av drönare direkt till din dörr via en smidig app. Vi kombinerar avancerad teknologi med en passion för kaffe för en unik och effektiv upplevelse. Våra eldrivna drönare är energieffektiva och minskar utsläppen jämfört med traditionella leveransfordon. Optimerade leveransrutter minskar dessutom onödiga flygningar. Vi erbjuder högkvalitativt kaffe från certifierade ekologiska och fair trade-odlare. Detta säkerställer en etisk produktion och en överlägsen smak i varje kopp. Välj AirBean för en hållbar och bekväm kaffeupplevelse med gott samvete."
}
```

### GET - /info/menu

##### Response

```
[
    {
        "title": "Cortado",
        "desc": "En cortado med lika delar espresso och varm mjölk.",
        "price": 33,
        "_id": "0Gu3mPAbONk1hy4P"
    },
    {
        "title": "Flat White",
        "desc": "En platt vit med silkeslen mikroskum och stark espresso.",
        "price": 46,
        "_id": "3IBqddqDtbAtIi2E"
    },
    [...]
]
```

### GET - /cart/:cartID

##### Response

```
{
    "customerID": "ehLEGwSC1FzobAHN",
    "product": [
        {
            "title": "Macchiato",
            "desc": "En macchiato med en skvätt mjölk.",
            "price": 30,
            "_id": "dy1JqGCeAYWaJqri",
            "quantity": 10
        },
        {
            "title": "Cappuccino",
            "desc": "En krämig cappuccino med skummad mjölk.",
            "price": 45,
            "_id": "nG7UZ7wTTM0wm64Q",
            "quantity": 4
        }
    ],
    "_id": "Acwd7ENmZXDGozIg",
    "price": 480
}
```

### POST - /cart

##### Request

```
{
  "product": "6ymMjHWMpLGChmJ6", // Mandatory, productID. Checks menu.db if the product exist.
  "cartID": "", // Optional, new cart if empty, existing cart if it exists.
  "customerID": "", // Optional, guest if empty.
  "quantity": 1 // Optional, gets 1 if empty.
}
```

##### Response

```
{
    "customerID": "",
    "product": [
        {
            "title": "Mocha",
            "desc": "En söt mocha med choklad och espresso.",
            "price": 55,
            "_id": "6ymMjHWMpLGChmJ6",
            "quantity": 1
        }
    ],
    "_id": "yHYB6NvAuAXa3CW2",
    "instructions": "cartID would've been saved to session/cookie to be included in the next call"
}
```

#### DELETE - /cart/item

###### Request

```
{
  "cartID": "vVu2PrXxomKcrtQt",
  "productID" : "SjwGh9EVaYWtIzs7"
}
```

##### Response

```
{
    "message": "Item deleted successfully"
}
```

#### POST - /cart/order

##### Request

###### Guest

```
{
  "customerID": null,
  "cartID": "Acwd7ENmZXDGozIg",
  "guestInfo": {
    "email": "guest@example.com",
    "phone": "1234567890"
  }
}
```

###### User

```
{
  "customerID": "DzbWOAIZTDQUyoQB",
  "cartID": "Acwd7ENmZXDGozIg",
  "guestInfo": "null"
}
```

##### Response

```
{
    "message": "Order placed successfully",
    "order": {
        "customerID": "3CFuQELPvlVoLZfz",
        "cartID": "Acwd7ENmZXDGozIg",
        "cartProducts": [
            {
                "title": "Macchiato",
                "desc": "En macchiato med en skvätt mjölk.",
                "price": 30,
                "_id": "dy1JqGCeAYWaJqri",
                "quantity": 10
            },
            {
                "title": "Cappuccino",
                "desc": "En krämig cappuccino med skummad mjölk.",
                "price": 45,
                "_id": "nG7UZ7wTTM0wm64Q",
                "quantity": 4
            }
        ],
        "price": 480,
        "date": "2024-06-03 15:07:17",
        "estimatedDelivery": "2024-06-03 15:27:17",
        "_id": "si1ip4tQsAh8K3OL"
    }
}
```

#### GET - /orders/:customerID

##### Response

```
{
    "order": [
        {
            "customerID": "COwTqeN5KqmJB5wB",
            "date": "2024-05-30 18:50",
            "products": "kaffe",
            "quantity": 4,
            "pricePerUnit": 35,
            "_id": 11
        },
        {
            "customerID": "COwTqeN5KqmJB5wB",
            "date": "2024-05-30 18:50",
            "products": "kaffe",
            "quantity": 4,
            "pricePerUnit": 35,
            "_id": 5555
        },
        {
            "customerID": "COwTqeN5KqmJB5wB",
            "date": "2024-05-30 18:50",
            "products": "kaffe",
            "quantity": 4,
            "pricePerUnit": 35,
            "_id": 11111
        }
    ]
}
```

#### GET - /orders/confirmation/:orderID

##### Response

```
{
    "customerID": "kFgt740aCqbHJLbC",
    "cartID": "x3gCLt7e1PLXBelE",
    "cartProducts": [
        {
            "title": "Americano",
            "desc": "En espresso utspädd med varmt vatten.",
            "price": 35,
            "_id": "SjwGh9EVaYWtIzs7",
            "quantity": 2
        }
    ],
    "date": "2024-06-03 14:28:01",
    "estimatedDelivery": "2024-06-03 14:48:01",
    "_id": "G3sS0UTlMmYN5arH",
    "deliveryTime": "14:48"
}
```

#### POST - /customer/register

##### Request

```
{
    "username": "andreas",
    "password": "password",
    "email": "a@b.se",
    "phone": "0731234567"
}
```

##### Response

```
{
    "message": "User registered successfully",
    "user": {
        "username": "andreas",
        "email": "a@b.se",
        "password": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
        "phone": "0731234567",
        "_id": "COwTqeN5KqmJB5wB"
    }
}
```

#### POST - /customer/login

##### Request

```
{
    "email": "a@b.se",
    "password": "andreas"
}
```

##### Response

```
{
    "message": "User registered successfully",
    "user": {
        "username": "andreas",
        "email": "a@b.se",
        "password": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
        "phone": "0731234567",
        "_id": "COwTqeN5KqmJB5wB"
    }
}
```
