import os
import glob
import re

PAGES_DIR = r"C:\Users\hp\Downloads\BIOQUORA\src\pages"

def process_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Skip if already has useState
    if "useState" in content:
        return False

    # Replace React import
    content = re.sub(
        r"import React(.*?);", 
        r"import React, { useState, useEffect } from 'react';", 
        content, 
        count=1
    )

    # Find the main function declaration
    # e.g., export default function BioFoundationWorkspace() {
    func_match = re.search(r"export default function\s+(\w+)\s*\([^)]*\)\s*\{", content)
    if not func_match:
        return False

    func_str = func_match.group(0)
    
    injection = f"""
  // Auto-wired API Data State
  const [liveData, setLiveData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {{
    // Verify backend connectivity
    fetch('http://127.0.0.1:8000/api/health')
      .then(res => res.json())
      .then(data => {{
        setLiveData([data]);
        setIsLoading(false);
      }})
      .catch(err => {{
        console.error("Backend Disconnected:", err);
        setIsLoading(false);
      }});
  }}, []);
"""
    
    # Inject right after the function declaration
    content = content.replace(func_str, func_str + "\n" + injection)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
        
    return True

if __name__ == "__main__":
    files = glob.glob(os.path.join(PAGES_DIR, "Bio*.tsx"))
    count = 0
    for file in files:
        if process_file(file):
            count += 1
    print(f"Successfully injected API hooks into {count} React components.")
