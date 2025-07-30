from dotenv import load_dotenv
from langchain_community.llms import Ollama
from langchain.agents import intitilize_agent, AgentType, load_tools

load_dotenv() # load serpai key

# models are downloaded and run via ollama
# they can be viewed here: https://ollama.com/search
# please download relevant model and ensure ollama is running in background
# llama3:8b is recommended but other models can also be used e.g. mistral
# please make sure model spec matches your laptop before downloading - some models take up a lot of GB
llm = Ollama(model="llama3:8b", temperature=0) 

tools = load_tools(["serpapi"], llm=llm) # tools used by the LLM
# serpapi is a search tool that leverages google
# you will need to make an account and add API key to .env file

# TO DO:
# Add write to a file an email draft -> later this will link to an email API
# Add tool 

agent = initialize_agent(
    tools=tools,
    llm=llm,
    agent=AgentType.CHAT_ZERO_SHOT_REACT_DESCRIPTION, #try experiment with different agent types
    verbose=True
)

company = "" # replace with company you want to cancel account for 

context = """
You are assisting with freezing or disabling a Monzo bank account due to bereavement.

Assume the system has access to:
- A valid death certificate for the deceased
- The executor’s name and email address

Your goal is to minimize the user's effort and complete as much of the process for them as possible.

Follow these steps:

1. Use search to find Monzo’s official process for closing or freezing a deceased person’s account.
   - Look for Monzo’s bereavement team, email address, or online form
   - Prioritize verified help pages or FAQs

2. Summarize the required steps in plain English.

3. If Monzo requires sending an email:
   - Draft a professional email that the system (on behalf of the executor) could send
   - Include placeholders for personal details if needed (e.g., full name, account email)

4. If Monzo uses a form:
   - Provide the link
   - Suggest how the form can be prefilled automatically using the known data

Make sure your final response:
- Is respectful and empathetic
- Provides clear next steps
- Minimizes any manual action the user needs to take
- Includes direct links and contact details

Output should be fully ready to execute or send with minimal edits.
"""

print("🤖 Agent is processing the Monzo bereavement account closure request...\n")
response = agent.run(prompt)

print("\n✅ Final Instructions or Draft:\n")
print(response)