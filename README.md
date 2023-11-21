# Smart Contract Assistant

Overview
--------

Smart Contract Assistant is a tool utilizing artificial intelligence to facilitate the analysis and optimization of smart contracts. This application automates the examination and reporting of potential issues in smart contracts, enhancing the security and performance of blockchain-based systems.

This project provided an opportunity to enhance my front-end software engineering skills, resulting in a product that emphasizes a polished and user-friendly interface. While the back-end is functional, it's less comprehensive, reflecting a primary focus on the interface's aesthetic and interactive qualities. The UI includes various placeholder elements to demonstrate potential features.

This project is currently in the developmental stage, and might not include some sophisticated features.

Table of Contents
-----------------

1. Background
2. User Interface
3. Capabilities
4. Technical Architecture
5. Setup Guide

Background
----------

Smart contract analysis is crucial in the blockchain ecosystem, yet it can be complex and error-prone. Manual examination of contracts often leads to overlooked vulnerabilities. Smart Contract Assistant addresses this by automating the analysis process, identifying potential issues, and suggesting optimizations, thereby streamlining the workflow.

User Interface
--------------
1. **Onboarding Page**: User login and authentication.
   ![Screenshot 2023-11-21 at 12 35 13 PM](https://github.com/kianfattahy/Contract2Code/assets/94335877/e81870f4-2345-4af5-8e6c-3d1775b0b70e)
2. **Contract Analysis Page**: Users can upload smart contracts for analysis.
   ![Screenshot 2023-11-21 at 12 09 50 PM](https://github.com/kianfattahy/Contract2Code/assets/94335877/ac43ab74-cf50-4c67-96f2-cd9e44cd11ad)
3. **Report Generation Page**: View and manage generated reports.
![Screenshot 2023-11-21 at 12 18 02 PM](https://github.com/kianfattahy/Contract2Code/assets/94335877/4b248a70-ef85-4e3c-a4a6-fca176687add)


Capabilities
------------

- **Smart Contract Upload**: Users can upload contracts for analysis.
- **Automated Analysis**: The application analyzes contracts for security vulnerabilities and performance issues.
- **Report Generation**: Generates comprehensive reports highlighting potential issues and suggestions.
- **Feedback Mechanism**: Users can provide feedback for continuous improvement of the analysis algorithms.
- **Customizable Settings**: Allows users to adjust analysis parameters.

Technical Architecture
----------------------

- **Front-End**: JavaScript with React for a responsive user interface.
- **Back-End**: Python with Flask, handling data processing and analysis.
- **Database**: SQLite for storing contract details and analysis results.
- **Assistant API**: Utilizes OpenAI's API for contract analysis.

# Setup Guide

## Pre-requisites

- Python3
- node v18.18.0 (npm v10.1.0)

## Backend Setup

### Step 1: Create a Python Virtual Environment
Navigate to the project directory and execute the following command to create a Python virtual environment:
```bash
python3 -m venv myenv
```
### Step 2: Activate the Virtual Environment
On macOS and Linux:
```bash
source myenv/bin/activate
```
On Windows:
```bash
.\myenv\Scripts\activate
```
### Step 3: Install Python Dependencies
```bash
pip install flask flask-cors sqlite3 openai==0.28
```
## Frontend Setup

### Step 4: Install Node Dependencies
In the root directory of the project, run:
```bash
npm install
```

## Running the App
### Step 5: Start the Backend
Navigate to the src directory and run:
```bash
cd src
python app.py
```
### Step 6: Start the Frontend
Open another terminal window, navigate to the src folder in the project directory and run:
```bash
npm run dev
```
The React app should now be up and running.

### Step 7: Input OpenAI API Token

For the application to access OpenAI's features, you need to input your OpenAI API token. Follow these steps:

1. Locate `config.json` file in your project's root directory.
2. Inside the `config.json` file, add the following structure, replacing `YOUR_OPENAI_API_TOKEN` with your actual OpenAI API token:

   ```json
   {
     "openai_api_token": "YOUR_OPENAI_API_TOKEN"
   }


### Sample Contract: Try Analyzing This!


    
    contract FantasyFootballBetting {
        address public owner;
        mapping(address => uint256) public balances;
        uint256 public nextBetId;
        mapping(uint256 => Bet) public bets;
        
        struct Bet {
            address better;
            uint256 amount;
            uint8 selectedTeam;
        }
    
        constructor() {
            owner = msg.sender;
        }
    
        function deposit() public payable {
            require(msg.value > 0, "Deposit must be greater than 0");
            balances[msg.sender] += msg.value;
        }
    
        function placeBet(uint256 amount, uint8 team) public {
            require(balances[msg.sender] >= amount, "Insufficient balance");
            require(team == 1 || team == 2, "Invalid team selected");
            balances[msg.sender] -= amount;
            bets[nextBetId++] = Bet(msg.sender, amount, team);
        }
    
        function resolveBet(uint256 betId, bool won) public {
            require(msg.sender == owner, "Only owner can resolve bets");
            Bet storage bet = bets[betId];
            if (won) {
                uint256 reward = bet.amount * 2;
                require(balances[address(this)] >= reward, "Not enough funds in contract");
                balances[bet.better] += reward;
            }
        }
    
        function withdraw(uint256 amount) public {
            require(balances[msg.sender] >= amount, "Insufficient balance");
            balances[msg.sender] -= amount;
            payable(msg.sender).transfer(amount);
        }
    }
