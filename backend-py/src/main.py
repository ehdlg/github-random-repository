import os
from json import loads

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from redis import Redis

load_dotenv()

app = Flask(__name__)
r = None
REDIS_HOST = os.getenv("REDIS_HOST", "localhost")
REDIS_PWD = os.getenv("REDIS_PWD", None)
REDIS_PORT = os.getenv("REDIS_PORT", 6379)

try:
    r = Redis(
        host=REDIS_HOST, port=REDIS_PORT, password=REDIS_PWD, decode_responses=True
    )
except ConnectionError:
    print("Error connecting to the Redis database")


@app.get("/")
def welcome():
    return jsonify("Welcome to the redis backend")


@app.get("/<language>")
def get_repo(language: str):
    value = r.get(language)

    if value is None:
        return jsonify(None)
    try:
        json_data = loads(value)

        return json_data
    except Exception:
        return value


@app.post("/")
def set_repo():
    data = request.json
    language = data["language"]
    repositories = data["repositories"]

    if language is None or repositories is None:
        raise Exception

    try:
        loads(repositories)
        r.set(language, repositories)
    except Exception:
        return bad_request()

    return jsonify("OK"), 201


@app.errorhandler(400)
def bad_request():
    response = {"error": "Bad request"}

    return jsonify(response), 400


if __name__ == "main":
    app.run()
