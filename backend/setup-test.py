from pdf2image import convert_from_path
from langchain_community.llms import Ollama 
import pytesseract
import re

from PIL import Image

import warnings

warnings.filterwarnings('ignore', category=DeprecationWarning)

llm = Ollama(model="llama3:8b", temperature=0) 

print(llm.invoke("Please let the user know whether the LLM is working. Do not ask any questions. Also let the user know pytesseract has successfully been setup."))

img = Image.open("test.png")

# Run OCR
extracted_text = pytesseract.image_to_string(img)

# Print the result
print("Extracted Text:")
print(extracted_text.strip())