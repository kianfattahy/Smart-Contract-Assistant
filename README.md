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

1. **Contract Analysis Page**: Users can upload smart contracts for analysis.
2. **Report Generation Page**: View and manage generated reports.
3. **Settings Page**: Customize analysis settings.
4. **Dashboard**: Quick overview of recent activities.

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
