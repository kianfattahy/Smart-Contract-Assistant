#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
import os  # Added for environment variable usage
import app
from flask import render_template, request
import requests
import re

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
        def remove_comments(solidity_code: str) -> str:
            # Remove single line comments
            no_single_line_comments = re.sub(r'//.*', '', solidity_code)

            # Remove multi-line comments
            no_comments = re.sub(r'/\*.*?\*/', '', no_single_line_comments, flags=re.DOTALL)

            return no_comments
        contract_code = remove_comments(contract_code)
        print(f'Contract code: {contract_code}')

        
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
        
        questions = [
            prompt1,
            prompt2,
            prompt3,
            prompt4
        ]

        headers = {
            "Authorization": f"Bearer {API_KEY}",  # Use the environment variable
            "Content-Type": "application/json"
        }

        results = {}
        for index, question in enumerate(questions):
            if index != 1:
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
        # print(results, type(results))
        '''
        results = {0: '<style>\np {\n  text-align: left;\n}\n</style>\n<p>The smart contract provided is called HypebeastToken. It is a standard ERC20 token that inherits from several other contracts: ERC20, ERC20Burnable, Ownable, Pausable, and ReentrancyGuard. The contract is licensed under the MIT License.</p>\n\n<p>The constructor of the contract takes an initial supply parameter, which is used to initialize the token with a name of "Hypebeast Token" and a symbol of "HYPE". The initial supply is minted to the address of the contract deployer.</p>\n\n<p>The contract includes various functions, including:</p>\n<ul>\n  <li><code>pause()</code>: This function can be called by the contract owner to pause token transfers. When the contract is paused, token transfers are not allowed.</li>\n  <li><code>unpause()</code>: This function can be called by the contract owner to unpause token transfers.</li>\n  <li><code>mint(address to, uint256 amount)</code>: This function can be called by the contract owner to mint more tokens and assign them to a specified address.</li>\n</ul>\n\n<p>The contract also overrides the <code>_beforeTokenTransfer()</code> function from the ERC20 and Pausable contracts. In the overridden function, it checks if the token transfers are not paused before allowing the transfer to occur.</p>', 1: 'Rating: 8\n\nSpecific lines or segments in the contract that pose the most risk:\n\n1. Line 13: Importing external contracts such as "@openzeppelin/contracts/token/ERC20/ERC20.sol", "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol", "@openzeppelin/contracts/access/Ownable.sol", "@openzeppelin/contracts/security/Pausable.sol", and "@openzeppelin/contracts/security/ReentrancyGuard.sol". While these contracts are widely used and generally considered secure, relying on external dependencies introduces potential risks, such as vulnerabilities in those contracts or future incompatible updates.\n\n2. Line 21: The constructor function initializes the token with a given initial supply. It is essential to ensure that the initial supply is properly vetted and securely handled. Any mistake or unforeseen consequence in setting the initial supply could result in a significant security risk, such as unintended inflation or unauthorized token creation.\n\n3. Lines 24-30: The pause and unpause functions allow the contract\'s owner to pause and unpause token transfers. While this feature can be useful for emergency situations, it introduces the risk of potential abuse if not carefully managed. Unauthorized or unnecessary pausing of token transfers could disrupt the contract\'s functionality and impact users.\n\n4. Line 33: The mint function allows the contract\'s owner to mint additional tokens and assign them to a specified address. The ability to mint tokens after the initial supply raises the risk of potential abuse. If not properly controlled and monitored, unauthorized minting could lead to inflation or unethical token distribution practices.\n\n5. Lines 37-39: The _beforeTokenTransfer function overrides a similar function in the base ERC20 contract, implementing additional checks. While this may enhance security, it is crucial to review and ensure that the added logic does not introduce any vulnerabilities or unintended consequences. Any mistakes in implementing these checks could compromise the contract\'s security and lead to potential exploits.', 2: '- The contract is named "HypebeastToken" and has the symbol "HYPE" for the token.\n- The contract inherits from ERC20, ERC20Burnable, Ownable, Pausable, and ReentrancyGuard contracts.\n- The constructor function initializes the contract with an initial supply of tokens and mints them to the contract creator.\n- The "pause" function allows the owner of the contract to pause token transfers.\n- The "unpause" function allows the owner of the contract to unpause token transfers.\n- The "mint" function allows the owner of the contract to mint additional tokens and assign them to a specific address.\n- The "_beforeTokenTransfer" internal function is overridden to ensure that token transfers are not allowed when the contract is paused.\n\nThese key functions are important for the HypebeastToken contract as they provide essential features and functionality. The contract allows the owner to control the token\'s supply through the ability to mint new tokens. Additionally, the contract has built-in pausing functionality, which can be useful in case of emergency situations or when certain token transfers need to be temporarily halted. The inherited contracts, such as Ownable and ERC20Burnable, provide additional security and control over the token\'s ownership and burning capabilities. Overall, these functions contribute to the overall functionality, security, and control of the HypebeastToken contract.', 3: "Here are potential issues or pitfalls in the provided smart contract:\n\n1. The contract uses several external libraries, such as OpenZeppelin, without specifying exact versions. It is essential to specify the precise versions to avoid using outdated or potentially insecure code.\n\n2. The contract inherits from the Ownable, Pausable, and ReentrancyGuard contracts. It is crucial to review and understand the implementation of these contracts to ensure they function as expected and do not introduce any vulnerabilities or conflicts.\n\n3. The contract is marked with the MIT license, but it is important to verify that all imported libraries and code comply with the same license. Incompatibility issues between licenses could cause legal problems.\n\n4. The constructor accepts an `initialSupply` parameter but does not enforce any restrictions or checks on this value. It is essential to validate and sanitize input values to prevent potential issues, such as integer overflow.\n\n5. The `mint` function allows the owner to mint additional tokens. It is important to ensure that this function is used responsibly and that the owner's privileges are not abused.\n\n6. The contract does not implement any access control mechanisms for functions like `pause`, `unpause`, and `mint`. Without proper access control, anyone with knowledge of the contract's address can call these functions, potentially causing disruptions or unauthorized minting.\n\n7. The `burn` function from the inherited ERC20Burnable contract is not exposed in this contract. While this may be an intentional decision, it is worth double-checking if exposing a burn functionality is necessary for the project's requirements.\n\n8. The `_beforeTokenTransfer` function is overridden to check if the contract is paused before allowing transfers. However, it is crucial to assess if this is the appropriate behavior for the project. Pausing token transfers may have unintended consequences and may not align with the project's goals or requirements.\n\nIt is always recommended to thoroughly test the contract, conduct formal code reviews, and possibly seek third-party audits to detect any potential issues or vulnerabilities."} 
        '''
        data = results.get(1, '').strip()

        match = re.search(r'Rating\s*:\s*(\d+)', data, re.IGNORECASE)
        if match:
            security_score = int(match.group(1))  # Convert the extracted string to an integer
            print(f"Extracted security score is {security_score}")
        else:
            print("Rating not found.")
            security_score = -1
 
        if match:
            security_score = match.group(1)  # Get the first capturing group
            print(f"Extracted security score is {security_score}")
        else:
            print("Rating not found.")
            security_score = -1

        security_score = int(security_score)
        security_rating = "Fuck"
        if security_score < 0:
            security_rating = "N/A"
        elif security_score <= 3:
            security_rating = "Low Risk"
        elif security_score <=6:
            security_rating = "Moderate Risk"
        else:
            security_rating = "High Risk"
        
        summary=results.get(0, '')
        security_overview=results.get(1, '')
        key_functions=results.get(2, '')
        potential_issues=results.get(3, '')

        print(f'Summary: {summary}\n Security_Overview: {security_overview}\n Key Functions: {key_functions}\n Potential Issues: {potential_issues}\n')
        def add_breaks(original_text):
            # Replace '\n' with '<br>'
            processed_text = original_text.replace("\n", "<br>")
            
            # Replace bullet points '-' with HTML list items if you like
            processed_text = processed_text.replace("- ", "<li>")  
            processed_text = "<ul>" + processed_text + "</ul>"
            
            return processed_text

        '''summary = add_breaks(summary)
        security_overview = add_breaks(security_overview)
        key_functions = add_breaks(key_functions)
        potential_issues = add_breaks(potential_issues)'''
        
        return render_template('translate.html', 
                               summary=summary,
                               security_overview=security_overview,
                               key_functions=key_functions,
                               potential_issues=potential_issues,
                               security_rating = security_rating
                               )

    return render_template('translate.html')

if __name__ == '__main__':
    app_instance.run(debug=True)
