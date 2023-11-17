# Standard library imports
import os
import re
import requests

# Local application imports
from flask import render_template, request

# Third-party imports
import app

# Constants
API_KEY = os.environ.get('OPENAI_API_KEY')
OPENAI_API_URL = "https://api.openai.com/v1/chat/completions"

# Create Flask app instance
app_instance = app.create_app()

@app_instance.route('/')
def homepage():
    """Render the homepage."""
    return render_template('index.html')

@app_instance.route('/translate', methods=['GET', 'POST'])
def translate():
    """Handle translation requests."""
    if request.method == 'POST':
        contract_code = request.form['contract_code']
        contract_code = remove_comments(contract_code)
        print(f'Contract code: {contract_code}')

        questions = generate_prompts(contract_code)
        results = process_questions(questions)

        # Process and format the results
        security_score, security_rating = extract_security_score(results)
        formatted_results = format_results(results)

        return render_template('translate.html', **formatted_results, security_rating=security_rating)

    return render_template('translate.html')

def remove_comments(solidity_code: str) -> str:
    """Remove comments from Solidity code."""
    no_single_line_comments = re.sub(r'//.*', '', solidity_code)
    no_comments = re.sub(r'/\*.*?\*/', '', no_single_line_comments, flags=re.DOTALL)
    return no_comments

def generate_prompts(contract_code: str) -> list:
    """Generate prompts for OpenAI API."""
    # Define the prompts here
    prompt1 = f"Provide a direct, HTML-formatted paragraph summary of the contract. \
                    Insert your summary in the following empty example: <p style='color: white; font-family: Arial, sans-serif;'>[Your HTML-formatted summary of the smart contract goes here.]</p><p style='color: white; font-family: Arial, sans-serif;'>[Your HTML-formatted paragraph 2 of summary of the smart contract goes here.]</p>.\
                    Include HTML/CSS styling suitable for a dark blue webpage background. Make the response 2 paragraphs long. Here is the smart contract Code: {contract_code}."
        
    prompt2 = f"Provide a direct, HTML-formatted response that rates the likelihood of the contract being a fraud/scam. give a rating 1-10, with 1 being 10% risk of scam and 10 being 100% risk of scam. For any rating >= 3, you must have at least 2 reasons in your response outlining issues. Your response should strictly follow this format, and have no other output: \
                    Rating:[insert number 1-10 here] <p style='color: white; font-family: Arial, sans-serif;'>Rating: <span style='font-weight: bold;'>[Your numerical rating goes here]</span></p><p style='color: white; font-family: Arial, sans-serif;'>[Your HTML-formatted paragraph highlighting risky lines or segments \
                    goes here if found.]</p><ul style='color: white; font-family: Arial, sans-serif;'><li>[List item 1 detailing evidence or suspicious activity if found]</li><li>[List item 2 detailing evidence or suspicious activity if found]</li>(more items can be added to the list as\
                    deemed necessary)</ul>. \
                    This is the end of the format. \
                    \
                    Do not rate the contract solely based on best practices, rate it based on how much obvious evidence there is that points to the contract being a fraud or scam or rug pull. Do not worry about small issues, and do not worry about a lack of comments (note that comments have been removed for brevity). A commonly used, popular contract should have a low rating. Include HTML/CSS styling suitable for a dark \
                    blue webpage background. If the contract is safe overall, say that. \
                    Now,  here is the smart contract Code for you to read. : {contract_code}."
            
    prompt3 = f"You are going to be identifying the key functions of the smart contract code below. A key function is a function that executes an important task, and is not a helper function. Follow with a paragraph explaining their importance. Insert your HTML-formatted list and paragraph into the following empty example: <ul style='color: white; font-family: Arial, sans-serif;'><li><code>[Your identification of key function 1]</code></li><li><code>[Your identification of key function 2]</code></li></ul><p style='color: white; font-family: Arial, sans-serif;'>[Your HTML-formatted paragraph explaining the importance of these key functions goes here.]</p>. Include HTML/CSS styling suitable for a dark blue webpage background. Here is the smart contract Code: {contract_code}."
        
    prompt4 = f"Provide a direct, HTML-formatted bullet-point list identifying any potential issues or pitfalls in the smart contract code below. Insert your list into the following empty example: <ul style='color: white; font-family: Arial, sans-serif;'><li><code>[Your identification of potential issue 1]</code></li><li><code>[Your identification of potential issue 2]</code></li></ul>. Include HTML/CSS styling suitable for a dark blue webpage background. Here is the smart contract Code: {contract_code}."
    return [prompt1, prompt2, prompt3, prompt4]

def process_questions(questions: list) -> dict:
    """Send questions to OpenAI API and process the responses."""
    headers = {"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}
    results = {}
    for index, question in enumerate(questions):
        payload = generate_payload(question)
        try:
            response = requests.post(OPENAI_API_URL, headers=headers, json=payload)
            response.raise_for_status()
            response_data = response.json()
            results[index] = response_data["choices"][0]["message"]["content"].strip()
        except requests.exceptions.RequestException as e:
            return render_template('translate.html', error=f"API Request failed: {str(e)}")
        except KeyError:
            return render_template('translate.html', error="Unexpected API response format.")
    return results

def generate_payload(question: str) -> dict:
    """Generate payload for OpenAI API request."""
    return {
        "model": "gpt-3.5-turbo",
        "messages": [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": question}
        ]
    }

def extract_security_score(results: dict) -> tuple:
    """Extract security score from results."""
    data = results.get(1, '').strip()
    match = re.search(r'Rating\s*:\s*(\d+)', data, re.IGNORECASE)
    if match:
        security_score = int(match.group(1))
        print(f"Extracted security score is {security_score}")
    else:
        print("Rating not found.")
        security_score = -1

    security_rating = determine_security_rating(security_score)
    return security_score, security_rating

def determine_security_rating(score: int) -> str:
    """Determine security rating based on score."""
    if score < 0:
        return "N/A"
    if score <= 3:
        return "Low Risk"
    if score <= 6:
        return "Moderate Risk"
    return "High Risk"

def format_results(results: dict) -> dict:
    """Format results for rendering."""
    formatted_results = {}
    for key, value in results.items():
        formatted_results[key] = add_breaks(value)
    return formatted_results

def add_breaks(original_text: str) -> str:
    """Replace newlines with HTML breaks in the given text."""
    processed_text = original_text.replace("\n", "<br>")
    return processed_text

if __name__ == '__main__':
    app_instance.run(debug=True)
