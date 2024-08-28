from flask import Flask, jsonify, request

app = Flask(__name__)

# Sample data to send to the frontend
sample_data = {
    "movies": [
        {"title": "Inception", "cover": "avo.jpg"},
        {"title": "The Matrix", "cover": "avo.jpg"},
        {"title": "Interstellar", "cover": "avo.jpg"}
    ]
}

@app.route("/")
def default():
    return {}

@app.route("/test")
def test():
    return {"sample result fetched": "test"}

@app.route('/api/movies', methods=['GET'])
def get_movies():
    return jsonify(sample_data)

# New POST endpoint to receive movie name and keywords
# @app.route('/api/add_movie', methods=['POST'])
# def add_movie():
#     data = request.get_json()
#     movie_title = data.get('title')
#     movie_keywords = data.get('keywords')

#     # You can add logic here to process or store the received data
#     print(f"Received movie: {movie_title} with keywords: {movie_keywords}")

#     # Send a response back to the frontend
#     return jsonify({"message": "Movie received successfully!"})

if __name__ == '__main__':
    app.run(debug=True)

# if __name__ == "__main__":
#     app.run(host='127.0.0.1', port=8080, debug=True)