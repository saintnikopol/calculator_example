import gradio as gr
from dotenv import load_dotenv
import os
import prompt_lib
from pprint import pprint
from anthropic import Anthropic

load_dotenv()
API_KEY = os.environ.get('ANTHROPIC_API_KEY')

anthropic = Anthropic(api_key=API_KEY)

def chat_with_claude(message, history):
    if not history:

        messages = [{"role": "user", "content": prompt_lib.SYSTEM_WEB_PROMPT_CLAUDE}]
    else:
        messages = []
        for user, assistant in history:
            messages.append({"role": "user", "content": user})
            messages.append({"role": "assistant", "content": assistant})

        messages.append({"role": "user", "content": message})

    print("Messages being sent to API:", messages)

    response = anthropic.messages.create(
        model = "claude-3-5-sonnet-20240620",
        max_tokens=4000,
        messages=messages,
    )
    print("\nFull API Response: ----")
    pprint(response, width=100, depth=None, compact=False)
    print("---- Full API Response")

    if response.content and len(response.content) > 0:
        return response.content[0].text
    else:
        return "Empty response from API"

iface = gr.ChatInterface(
    chat_with_claude,
    title="Hi",
    description="Coding with a web stellar prompt.",
    theme="default",
)

iface.launch()
