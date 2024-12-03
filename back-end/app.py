from flask import Flask, jsonify, request
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, auth
import pandas as pd
import torch
import pickle
import heapq

class Model(torch.nn.Module):
    def __init__(self, n_users, n_items, n_factors=20):
        super().__init__()
        # create user and item embeddings
        self.user_factors = torch.nn.Embedding(n_users, n_factors)
        self.movie_factors = torch.nn.Embedding(n_items, n_factors)
        # fills weights with values from a uniform distribution [0, 0.5]
        self.user_factors.weight.data.uniform_(0, 0.05)
        self.movie_factors.weight.data.uniform_(0, 0.05)
    
    def forward(self, data):
        # matrix multiplication between user and item factors, and then concatenates them to one column
        return (self.user_factors(data[:,0])*self.movie_factors(data[:,1])).sum(1)
    
    def predict(self, user, item):
        return (self.user_factors(user)*self.movie_factors(item)).sum(1)

def get_top_n_recommendations(i, n):
    movies_df = pd.read_csv("./back-end/Data/ml-latest-small/movies.csv")
    with open('./back-end/recSys.pkl', 'rb') as f:
        model = pickle.load(f)
    # Load in data from csv files
    actual_ratings = pd.read_csv("./back-end/Data/ml-latest-small/ratings.csv")
    actual_ratings = actual_ratings.pivot(index='userId', columns='movieId', values='rating').fillna(-1)
    predicted_ratings = torch.matmul(model.user_factors.weight.data, model.movie_factors.weight.data.T)

    # i < actual_ratings.shape[0]

    recommendations = []
    rated = []
    for j in range(actual_ratings.shape[1]):
        if actual_ratings.iloc[i][actual_ratings.columns[j]] > 0:
            rated.append((actual_ratings.columns[j], actual_ratings.iloc[i][actual_ratings.columns[j]], float(predicted_ratings[i][j])))
        else:
            heapq.heappush(recommendations, (-float(predicted_ratings[i][j]), actual_ratings.columns[j]))
    # difference between predicted and rated: sum(list(map(lambda x: (x[1] - x[2])**2, rated)))
    movie_names = movies_df.set_index('movieId')['title'].to_dict()
    for x in range(n):
        print(movie_names[recommendations[x][1]])

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

cred = credentials.Certificate("sigmacado-6e35a-firebase-adminsdk-e5ovg-28011b6696.json")
firebase_admin.initialize_app(cred)

@app.route("/api/verify_token", methods=['POST'])
def verify_token():
    token = request.json['token']
    try:
        decoded_token = auth.verify_id_token(token)
        uid = decoded_token['uid']
        return jsonify({"status": "success", "uid": uid}), 200
    except:
        return jsonify({"status": "error", "message": "Invalid token"}), 401

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

@app.route("/get/<int:i>/<int:n>")
def get_recommendations(i, n):
    get_top_n_recommendations(i, n)
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