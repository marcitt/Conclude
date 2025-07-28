# Backend
The Backend is used for managing the application API and server. The server is currently run using Flask, however migrating to FastAPI may be better for future development.

### Getting Started 
All of the steps required to setup the backend will be explained in more detailed below, here is a quick summary:

Backend requirements:
1. Ollama (for running local AI models)
2. llama3:8b model installed locally (using Ollama)
3. tesseract installed on your system


#### Setting Up Ollama

(For local AI models) Install Ollama: https://ollama.com/

To check this has been installed correctly open a terminal/shell and run:
```
ollama --version
```

The model we are currently testing with is llama3.1:8b, it requires 4.9GB of storage. You can view more details of the model here: https://ollama.com/library/llama3.1:8b

To install the model run:
```
ollama pull llama3:8b
```

If you want to test it out locally in the terminal you can run:
```
ollama run llama3:8b
```

If you would prefer to use a different model (e.g. that takes up less storage) you can research here: https://ollama.com/search
however you will need to modify some lines of code in your local repo to make sure everything is working.

Anywhere in the code where an LLM is initialised you will have to replace "llama3:8b" with your chosen model:
```
llm = Ollama(model="llama3:8b", temperature=0) 
```

#### Method 1: Setup with conda (preferred method)
I prefer to use conda (Anaconda) for managing environments - if you already know how to use this I would recommend as I find it easier to work with. 

⚠️ Using Anaconda/Conda can change your system PATH which can present issues e.g. it may set the conda installation of Python to your default, which might not be desirable if you typically prefer to work with another Python installation. If you have issues with this I can help out but just a warning in advance. ⚠️

To set up the backend environment with Anaconda follow the steps below:

(If not already installed) Install anaconda: https://www.anaconda.com/download

Check it has been installed correctly:
```
conda --version
```

Make sure your current working directory is conclude-dev/backend 
e.g. when you open the conclude repo run:
```
cd backend
```

To create the environment run:
```
conda env create -f environment.yaml
```

To activate the environment run:
```
conda activate conclude
```

If you ever want to deactivate environment:
```
conda deactivate conclude
```

#### Method 2: Setup with venv (if you prefer not to work with conda)
This method uses a virtual environment (venv) and pip, which is a more traditional way of managing dependencies, but involves more steps.

##### Installing Tesseract

To use the OCR library `pytesseract` we need to make sure `tesseract` is installed on the system/PATH, if you follow method 1 conda manages this installation - however tesseract cannot be installed using `pip` so for Method 2 we have to do a system installation. 

Details for installing `tesseract` are included here:
https://www.geeksforgeeks.org/python/introduction-to-python-pytesseract-package/

If you are using mac and have a homebrew installation you can just run:
```
brew install tesseract
```

##### Setting up virtual environment

Navigate to conclude/backend:
```
cd backend
```

Create the virtual environment: 
```
python -m venv venv
```
⚠️ for mac may need to use python3 depending on how Python is configured on your system

Activate the virtual environment:
```
source venv/bin/activate
```
for windows use: `venv\Scripts\activate`

Install dependencies: 
```
python -m pip install -r requirements.txt
```

#### Testing
To check your environment has been configured properly run:
```
python setup-test.py
```
Make sure Ollama is running in the background and your virtual environment is activated. If you are using `venv` (Method 2) make sure it is activated with `source venv/bin/activate` or if you are using `conda` (Method 1) make sure it is activated with `conda activate conclude`, also make sure you are in the conclude/backend directory.

Once you have the basic code running I'd recommend playing around with the code in setup-test.py so you can get an idea for how interacting with LLMs and prompts work as well as OCR - try loading in and reading out different images. If you setup your virtual environment with conda you can also test this out in `playground.ipynb` which is a Juypter notebook so easier to experiment with and test individual code cells. Just make sure you are using the anaconda `conclude` environment for the kernel.

#### Bank Statement Scanning
Once you are comfortable with the setup and running basic functions you can try working with the backend/bank_scanning.py code.

The main task associated with this code is prompt engineering - adjusting the prompts to provide better insight into the bank statements and formatted outputs.


# Client
Next we will want to run the client. The client (also known as frontend) will be what the user interacts with. We are using React for the frontend.

### Getting started
To setup the client make sure to enter the directory conclude/client:
```
cd client
```
If you were in the backend directory before you can run `cd ..` to get out and then `cd client` to enter the frontend side.

Once you are in the correct repo install any dependencies:
```
npm install
```

You should then be able to run the frontend:
```
npm run dev
```
Navigate to the link provided e.g. http://localhost:5173/ and you should be able to see the frontend running on the browser.

# Connecting Frontend and Backend
To enable the frontend and backend to communicate simply make sure you have run `python server.py` and `npm run dev` in two seperate terminals - you can do this in vscode by creating a split terminal. This will mean the backend and frontend are both running at the same time and should be able to interact with each other.

That should be everything :)
