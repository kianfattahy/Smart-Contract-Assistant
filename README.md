# Smart Contract Analyzer

This project provides an interface for users to input Ethereum smart contract code. It uses OpenAI's GPT-3.5 model to generate:
- A comprehensive summary of the contract.
- A list of key functions within the contract, explaining each one.
- Identified potential pitfalls or issues in the contract.

## How It Works

1. **Contract Code Input**: Through the main page, users can input the smart contract code which they wish to analyze.
   
2. **Comment Removal**: The application first sanitizes the contract by removing any single and multi-line comments to ensure only the actual contract logic is sent for analysis (enables faster response and longer contract length).
   
3. **OpenAI Interaction**: Multiple formatted prompts are then sent to OpenAI's API to obtain:
   - An HTML-formatted paragraph summary.
   - Key function identifications and their importance.
   - Any potential issues or pitfalls.
  
4. **Response Parsing**: Once the data is returned from OpenAI's API, the application processes this information. This step involves:
   - Extracting relevant data from the responses.
   - Applying additional formatting to ensure the information is presented in a user-friendly and comprehensible manner.

4. **Results Presentation**: The parsed and formatted results are then showcased on a new page. Users can scroll through various sections analyzing their contract code.

## Getting Started

### Prerequisites

- Python 3.x
- Flask
- Requests library

### Setting Up

1. **Clone the repository**:

   ```
   git clone [your-repository-link]
   ```

2. **Install the required packages**:

   ```
   pip install Flask requests
   ```

3. **Set up the OpenAI API key**:
   
   Set the environment variable:

   ```
   export OPENAI_API_KEY='your_api_key_here'
   ```

4. **Run the application**:

   ```
   flask run
   ```

### Usage
1. Navigate to the Flask application URL (default: `http://localhost:5000/`).
2. Input your smart contract code in the provided textarea.
3. Click "Submit" to send the contract for analysis.
4. Review the presented results, including the summary, risk rating, key functions, and potential issues.
