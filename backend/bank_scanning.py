from pdf2image import convert_from_path
from langchain_community.llms import Ollama 
import pytesseract
import re

from langchain.output_parsers import ListOutputParser, PydanticOutputParser
from pydantic import BaseModel
import pydantic
import json

import warnings

warnings.filterwarnings('ignore', category=DeprecationWarning)

# regex testing
# pattern = re.compile(r"^(\d{2}/\d{2}/\d{4})\s+(.+)$", re.MULTILINE)
# transactions = pattern.findall(text_data)

# for transaction in transactions:
#     print(transaction)


def account_scan(file_path):
    pages = convert_from_path(file_path, 600)


    text_data = ""
    for page in pages:
        text = pytesseract.image_to_string(page)
        text_data += text + '\n'

    # print(text_data)

    llm = Ollama(model="llama3:8b", temperature=0) 


    prompt3 = f"""
    You are a financial assistant. 

    Your task is to identify **subscriptions** from unstructured financial data.

    Please follow these steps:
    1. Convert the unstructured data into structured transaction records (e.g., date and description).
    2. Identify recurring payments that follow a pattern (e.g., monthly, weekly).
    - These indicate subscription services.
    - Exclude recurring purchases like groceries, transport, or one-off items.
    3. Based on recurring transactions, identify likely **subscriptions**.
    4. Only include subscriptions that are **regular in timing** (not randomly spaced).
    5. Use the evidence to output an array of objects in the **exact format** shown below.

    Here is an example format — your output MUST look exactly like this:
    [
    {{ "account": "Vodafone", "type": "Monthly", "lastPayment": "2025-07-10" }},
    {{ "account": "Concern", "type": "Yearly", "lastPayment": "2025-01-11" }}
    ]

    🔴 IMPORTANT:
    - DO NOT add any explanations, summaries, headers, or markdown.
    - DO NOT return anything outside of the array.
    - DO NOT hallucinate data. Only use what is given.

    Examples:
    ❌ Not a subscription: ('15/03/2025', 'APPLE PAY Tesco')
    ❌ Not a subscription: ('14/02/2025', 'CHIP & PIN TfL')
    ✅ Is a subscription: ('18/02/2025', 'ONLINE PAYMENT OpenAI ($24.00, Rate: 1.2474)')

    Here is the data:
    {text_data}
    """



    raw_response = llm.invoke(prompt3)

    print(raw_response)

    # raw_response is a JSON string array; parse it to Python list before returning
    try:
        parsed_response = json.loads(raw_response)
    except json.JSONDecodeError:
        print("Failed to parse LLM output:", raw_response)
        parsed_response = []



    return parsed_response



class Subscription(BaseModel):
    account: str
    type: str
    lastPayment: str



if __name__ == "__main__":
    llm_output = json.loads(account_scan("uploads/Mock Data.pdf"))

    print(json.dumps(llm_output))

    # print("llm_output:", repr(llm_output))

    # llm_output = '''
    # [
    # {"account": "Streamly Media", "type": "Monthly", "lastPayment": "2025-07-14"},
    # {"account": "FitLife Center", "type": "Monthly", "lastPayment": "2025-07-10"}
    # ]
    # '''
    # print(pydantic.VERSION)
    # parser = ListOutputParser(item_parser=PydanticOutputParser(Subscription))
    # output = parser.parse(llm_output)  # output is a list of Subscription instances
