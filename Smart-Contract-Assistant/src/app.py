import csv
import openai
from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
from flask_cors import cross_origin
import sqlite3
from datetime import datetime
import os
import json

with open('../config.json', 'r') as config_file:
    config = json.load(config_file)

openai.api_key = config['openai_api_key']


app = Flask(__name__)
CORS(app)
user_onboarded = False
# Read the CSV file during application startup
csv_file_path = 'sample_contracts.csv'
csv_data = []

try:
    with open(csv_file_path, mode='r', newline='', encoding='utf-8') as file:
        csv_reader = csv.DictReader(file)
        for row in csv_reader:
            csv_data.append(row)
except Exception as e:
    print(f"Error importing CSV: {str(e)}")

if os.path.exists("responses.db"):
    os.remove("responses.db")



@app.route('/api/generate_preview_response', methods=['POST'])
def generate_preview_response():

    # Extract feedback frame messages
    feedback_frames = request.json.get('feedbackFrames', [])

    # Create a prompt including feedback frame messages

    prompt = (f"Begin with a concise 5-sentence summary that captures the contract's purpose, key functionalities, and its relevance to the category (real estate, NFT, crypto, etc.). "
          f"Following the summary, list each function in the contract. For each function, use HTML formatting for clarity. "
          f"Beneath each function, include a brief, one-sentence explanation that describes its role and significance within the contract. "
          f"In the concluding paragraph, assess the contract for any evidence of suspicious activity or potential security risks. "
          f"Highlight specific lines or segments that raise concerns, if any are found, and provide a brief explanation for each identified issue. "
          f"This analysis should offer a comprehensive understanding of the contract's functionality, its alignment with the specified category, and any potential areas of concern regarding security or integrity.")

    # Add feedback frame messages to the prompt
    for frame in feedback_frames:
        prompt += f"Here is an additional detail about the contract: {frame}."

    system_message = f"You are a smart contract analyzing assistant."

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_message},
                {"role": "user", "content": prompt},
            ],
            max_tokens=300,
            temperature=0.7,
            top_p=0.8
        )
    except openai.error.APIError as e:
        return jsonify({"error": f"OpenAI API error: {str(e)}"}), 500

    message = response.choices[0].message["content"].strip()
    return jsonify({"message": message}), 200

# Create a route to notify the backend when a user is onboarded

@app.route('/api/onboard', methods=['POST'])
def onboard_user():
    global user_onboarded  # Declare as global
    user_onboarded = True
    return jsonify(message='User onboarded successfully'), 200


@app.route('/api/check_onboard', methods=['GET'])
def check_onboard():
    return jsonify(user_onboarded), 200


if __name__ == '__main__':
    app.run(debug=True)
