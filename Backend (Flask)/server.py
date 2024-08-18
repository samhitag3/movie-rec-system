from flask import Flask

app = Flask(__name__)

@app.route("/")
def default():
    return {}

@app.route("/test")
def test():
    return {"sample result fetched": "test"}

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=8080, debug=True)