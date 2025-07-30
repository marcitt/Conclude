# A collection of different prompts to test out with the current bank scanning LLM

text_data = ""

prompt_iteration_1 = f"""
You have are a financial assistant. 

Your overall task is to identify subscriptions from financial data to identify accounts that need to be closed for a bereaved individual.

The financial data will be structured as an array consisting of tuples with a payment date, followed by a payment description.

Follow these steps:
(1) Scan the data.
(2) Identify payments that have the same amount and description.
(3) Identify payments that have a regular recurring payment pattern.
(4) Identify payments with descriptions that are indictative of subscriptions services.
(5) Use all of this information to identify what subscriptions the account holder has.
(6) Ensure you validate the subscriptions, providing evidence. ONLY USE THE DATA PROVIDED. DO NOT HALLUCINATE.

Here is an example of a payment that is not a subscription: ('15/03/2025', 'APPLE PAY Tesco')
Here is an example of a payment that is not a subscription: ('14/02/2025', 'CHIP & PIN TfL')
Here is an example of a payment that is a subscription: ('18/02/2025', 'ONLINE PAYMENT OpenAIl ($24.00, Rate: 1.2474)')


Here is the data: {text_data}

"""

# this prompt works the best for now not sure why
prompt_iteration_0 = f"""


You are a financial analyst. The data that will be supplied is extracted dated transcations followed by a description of that transaction type.
You are to use this data to find potential services / subscriptions the bank statement holder may have had.



Follow these steps:
- Please identify any transcations that have a regular recurring payment e.g. monthly.
- Identify any descriptions that are indictative of a subscription service. 
- Finally please provide the names of the potential subscriptions you believe may exist and the transcations that you used to infer this.

ONLY USE THE DATA PROVIDED. DO NOT HALLUCINATE.

Here is an example of a payment that is not a subscription: '15/03/2025', 'APPLE PAY Tesco'
Here is an example of a payment that is a subscription: '18/02/2025', 'ONLINE PAYMENT OpenAIl ($24.00, Rate: 1.2474)'



Here is the data: {text_data}
"""

prompt_1 = f"""
You have are a financial assistant. 

The data supplied contains extracted transcations, that include a date and a description.
You are to use this data to find potential services / subscriptions the bank statement holder may have had.

Your task is to identify subscriptions from the data and use this to identify accounts that need to be closed.

Follow these steps:
(1) Identify any transcations that have a regular recurring payment pattern e.g. monthly.
(2) Identify any descriptions that are indictative of a subscription service.
(2) Identify payments that have the same amount and description OR have a regular recurring payment pattern OR are indictative of subscriptions services.
(5) Use this information to identify what subscriptions the account holder has.
(6) Ensure you validate the subscriptions, providing evidence. ONLY USE THE DATA PROVIDED. DO NOT HALLUCINATE.

Here is an example of a payment that is not a subscription: ('15/03/2025', 'APPLE PAY Tesco')
Here is an example of a payment that is not a subscription: ('14/02/2025', 'CHIP & PIN TfL')
Here is an example of a payment that is a subscription: ('18/02/2025', 'ONLINE PAYMENT OpenAIl ($24.00, Rate: 1.2474)')


Here is the data: {text_data}

"""

prompt = f"""


You are a financial analyst. The data that will be supplied is extracted dated transcations followed by a description of that transaction type.
You are to use this data to find potential services / subscriptions the bank statement holder may have had.



Follow these steps:
- Please identify any transcations that have a regular recurring payment e.g. monthly.
- Identify any descriptions that are indictative of a subscription service. 
- Finally please provide the names of the potential subscriptions you believe may exist and the transcations that you used to infer this.

ONLY USE THE DATA PROVIDED. DO NOT HALLUCINATE.

Here is an example of a payment that is not a subscription: '15/03/2025', 'APPLE PAY Tesco'
Here is an example of a payment that is a subscription: '18/02/2025', 'ONLINE PAYMENT OpenAIl ($24.00, Rate: 1.2474)'

NO HALLCUINATING. ONLY USE THE DATA FROM ACTUAL TRANSACTIONS.

Here is the data: {text_data}
"""

prompt2 = f"""
You have are a financial assistant. 

Your overall task is to identify subscriptions from financial data to identify accounts that need to be closed for a bereaved individual.

The financial data will be structured as an array consisting of tuples with a payment date, followed by a payment description.

Follow these steps:
(1) Scan the data - identify payments that have the same description - identify payments that have a regular recurring payment pattern -Identify payments with descriptions that are indictative of subscriptions services.
Use all of this information to identify what subscriptions the account holder has.
(2) Provide as an output the suspected subscriptions using real transactions as evidence.

Here is an example of a payment that is not a subscription: ('15/03/2025', 'APPLE PAY Tesco')
Here is an example of a payment that is not a subscription: ('14/02/2025', 'CHIP & PIN TfL')
Here is an example of a payment that is a subscription: ('18/02/2025', 'ONLINE PAYMENT OpenAIl ($24.00, Rate: 1.2474)')


Here is the data: {text_data}

"""

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