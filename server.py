#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
import os  # Added for environment variable usage
import app
from flask import render_template, request
import requests

# Move API key to environment variable for security
API_KEY = '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' #os.environ.get('OPENAI_API_KEY')

app_instance = app.create_app()

@app_instance.route('/')
def homepage():
    return render_template('index.html')

@app_instance.route('/translate', methods=['GET', 'POST'])
def translate():
    if request.method == 'POST':
        contract_code = request.form['contract_code']

        # Prepare multiple prompts to get various aspects of the contract
        questions = [
            f"Can you give me a brief summary of this Ethereum contract? {contract_code}",
            f"Analyze the security aspects of this Ethereum contract and rate it on a scale of 1 to 10. {contract_code}",
            f"What are the main functions or actions this Ethereum contract performs? {contract_code}",
            f"Are there any potential issues or pitfalls you see in this Ethereum contract? {contract_code}"
        ]

        headers = {
            "Authorization": f"Bearer {API_KEY}",  # Use the environment variable
            "Content-Type": "application/json"
        }

        results = {}
        for index, question in enumerate(questions):
            payload = {
                "model": "gpt-3.5-turbo",
                "messages": [
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": question}
                ]
            }

            try:
                response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)
                response.raise_for_status()
                response_data = response.json()
                results[index] = response_data["choices"][0]["message"]["content"].strip()
            except requests.exceptions.RequestException as e:
                return render_template('translate.html', error=f"API Request failed: {str(e)}")
            except KeyError:
                return render_template('translate.html', error="Unexpected API response format.")

        # Consolidate all the outputs and send to the frontend
        return render_template('translate.html', 
                               summary=results.get(0, ''),
                               security_rating=results.get(1, ''),
                               key_functions=results.get(2, ''),
                               potential_issues=results.get(3, '')
                               )

    return render_template('translate.html')

if __name__ == '__main__':
    app_instance.run(debug=True)
