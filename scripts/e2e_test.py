import requests
import time

def run_e2e_test():
    # Target Next.js local server
    url = "http://localhost:3000/api/chat"
    
    test_payloads = [
        "Nikalipa late 2 days, fine ni ganji ngapi?",
        "Audit M-Pesa transaction code QB76XYZ123."
    ]
    
    print("Initiating E2E integration test against Next.js Vertex API...")
    
    for payload in test_payloads:
        print(f"\n[Test Case] Sending User Sheng/Input: {payload}")
        try:
            start_time = time.time()
            response = requests.post(url, json={"message": payload})
            latency = time.time() - start_time
            
            print(f"Status Code: {response.status_code}")
            print(f"Latency (TTFT objective < 2s): {latency:.2f}s")
            print(f"Vertex AI Agent Response: '{response.json().get('response')}'")
        except Exception as e:
            print(f"Test Failed. Ensure Next.js is running (via `pnpm run dev` in frontend). Error: {e}")

if __name__ == "__main__":
    run_e2e_test()
