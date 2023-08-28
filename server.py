import app
from flask import render_template, request
import requests
#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

app_instance = app.create_app()

@app_instance.route('/')
def homepage():
    return render_template('index.html')

@app_instance.route('/translate', methods=['GET', 'POST'])
def translate():
    if request.method == 'POST':
        contract_code = request.form['contract_code']

        # Constructing the payload for the GPT-3.5-turbo API
        payload = {
            "model": "gpt-3.5-turbo",
            "messages": [
                {
                    "role": "system",
                    "content": "You are a helpful assistant."
                },
                {
                    "role": "user",
                    "content": f"Translate the following Ethereum contract into plain English: {contract_code}"
                }
            ]
        }

        headers = {
            "Authorization": f"Bearer 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",  # Replace with your actual OpenAI API Key
            "Content-Type": "application/json"
        }

        try:
            response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)
            
            # Check if the API response indicates a successful request
            response.raise_for_status()

            response_data = response.json()
            translated_output = response_data["choices"][0]["message"]["content"].strip()

        except requests.exceptions.RequestException as e:
            # This will catch any type of request exception, including timeouts, connection errors, etc.
            return render_template('translate.html', error=f"API Request failed: {str(e)}")
        
        except KeyError:
            # This will catch potential errors in parsing the JSON response from OpenAI
            return render_template('translate.html', error="Unexpected API response format.")
        
        return render_template('translate.html', output=translated_output)

    return render_template('translate.html')

if __name__ == '__main__':
    app_instance.run(debug=True)




