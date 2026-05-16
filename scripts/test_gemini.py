import os

def test_sheng_prompt():
    print("WARNING: run `pip install google-generativeai` and set GEMINI_API_KEY to hit live.")
    
    prompt = """
    System: You are an expert Chama Legal Arbitrator. Respond to the user's Sheng query. Your temperature is 0.
    Context Dictionary: mullah=money, bano=penalty, chapo=chairman.
    Bylaws: Late payments get a 500 KES penalty per day.
    User Query: "Nikalipa late 2 days, bano ni mullah ngapi?"
    """
    
    print("Testing Prompt:")
    print(prompt)
    print("---")
    print("Expected Output Verification: 'Bano lako litakuwa mullah 1,000 KES (500 kwa kila siku kwa siku 2).'")

if __name__ == "__main__":
    test_sheng_prompt()
