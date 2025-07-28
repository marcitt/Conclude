from pdf2image import convert_from_path
from langchain_community.llms import Ollama 
import pytesseract
import re

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

    print(text_data)

    llm = Ollama(model="llama3:8b", temperature=0) 


    prompt3 = f"""
    You have are a financial assistant. 

    Your overall task is to identify subscriptions from financial data to identify accounts that need to be closed for a bereaved individual.

    The financial data will be supplied as unstructured text.

    Follow these steps:
    (1) Convert the unstructured text to structured transaction data e.g. with date and description.
    (2) Use this information to identify payments that have a regular recurring payment pattern e.g. occur monthly or that are indictative of a subscription service. Please ignore regular payments that are indicative of other regular purchases such as groceries or travel expenses. Also make sure there is a regularity to the dates.
    (3) Use this information to identify potential subscriptions.
    (4) Using this information list the potential subscriptions supplying evidence - only include subscriptions that have a pattern to their payment type e.g. monthly or weekly - not a repeated payment occurring at random intervals.
    (5) Using this information provide as a response to the user the potential subscriptions.

    Here is an example of a payment that is not a subscription: ('15/03/2025', 'APPLE PAY Tesco')
    Here is an example of a payment that is not a subscription: ('14/02/2025', 'CHIP & PIN TfL')
    Here is an example of a payment that is a subscription: ('18/02/2025', 'ONLINE PAYMENT OpenAIl ($24.00, Rate: 1.2474)')

    ONLY USE THE DATA PROVIDED. DO NOT HALLUCINATE.

    Here is the data: {text_data}

    """

    return(llm.invoke(prompt3))

if __name__ == "__main__":
    account_scan("uploads/test-bank.pdf")