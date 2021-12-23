# Node Redis RedisJSON Demo

This is a basic demonstration of how to use the [RedisJSON](https://redisjson.io) commands with [Node Redis 4](https://github.com/redis/node-redis).

## Starting Redis

To start Redis with the required RedisJSON module already installed, use Docker Compose:

```bash
$ docker-compose up -d
```

You should now have a Redis server running at `localhost:6379` with no password.

Try using [RedisInsight](https://redis.com/redis-enterprise/redis-insight/) to connect to this and explore the data once you have run the example code.

## Up and Running with the Code

First, clone the repo:

```bash
$ git clone https://github.com/redis-developer/node-redis-json-demo.git
$ cd node-redis-json-demo
```

Next, install dependencies:

```bash
$ npm install
```

Then, run the code like this:

```bash
$ npm start
```

You can expect to see output that looks like this:

```
Inserted animal JSON data.
Retrieved:
{
  "$": [
    {
      "name": "Alfie",
      "species": "dog",
      "age": 3,
      "weight": 11,
      "sex": "m",
      "fee": 20,
      "observations": {
        "goodWithChildren": true,
        "goodWithOtherAnimals": [
          "dog",
          "cat"
        ]
      }
    }
  ],
  "$.observations.goodWithChildren": [
    true
  ],
  "$.observations.goodWithOtherAnimals[0]": [
    "dog"
  ]
}
Is Alfie good with cats?
Yes!
Adding 1 to Alfie's age...
Alfie is now 4 years old.
Updating Stella - now friendly with dogs!
Stella is friendly with 2 types of animal.
```

## How does it Work?

### insertJSON()

This function inserts two JSON documents into Redis, at keys `animals:1` and `animals:2`.  It uses the `JSON.SET` command to do this.

Note that RedisJSON allows us to store JSON directly in Redis, we don't have to serialize it to a string, or deserialize it when reading it back from Redis.  We can perform atomic, in place updates on data in the JSON document in Redis, and retrieve fragments of the document using the [JSONPath syntax](https://oss.redis.com/redisjson/path/).

### retrieveJSON()

This function retrieves fragments of a JSON document from Redis using the `JSON.GET` command and the JSONPath syntax.

It also demonstrates how to check whether a scalar item is in an array using the `JSON.ARRINDEX` command.

### updateJSON()

This function performs some atomic, in place updates on parts of a JSON document stored in Redis.

Using the `JSON.NUMICRBY` command we'll change the value of an integer.  We also use the `JSON.ARRAPPEND` command to add a new value to an existing array.
