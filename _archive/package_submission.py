import os
import shutil
import zipfile

def package_submission():
    print("Starting MSME Hackathon Packaging Process...")
    
    base_dir = r"C:\Users\hp\Downloads"
    source_dir = os.path.join(base_dir, "BIOQUORA")
    staging_dir = os.path.join(base_dir, "MSME_Submission_Staging")
    source_dest = os.path.join(staging_dir, "Bioquora_Source_Code")
    docs_dest = os.path.join(staging_dir, "Documentation")
    zip_path = os.path.join(base_dir, "MSME_Bioquora_Submission")
    
    # 1. Clean previous staging
    if os.path.exists(staging_dir):
        shutil.rmtree(staging_dir)
    os.makedirs(docs_dest)

    print("1/3: Copying Source Code (Ignoring heavy node_modules & .git)...")
    # 2. Copy source code while ignoring heavy files
    shutil.copytree(
        source_dir, 
        source_dest, 
        ignore=shutil.ignore_patterns('node_modules', '.git', 'venv', '__pycache__', 'dist')
    )
    
    print("2/3: Copying MSME Hackathon Documentation...")
    # 3. Copy documentation from Brain artifacts directory
    brain_dir = r"C:\Users\hp\.gemini\antigravity\brain\ba256c60-dd5a-4fbc-9dee-8df961a8b1cb"
    
    docs_to_copy = {
        "bioquora_pitch_deck.md": "1_Pitch_Deck.md",
        "hackathon_executive_pitch_script.md": "2_Pitch_Script.md",
        "bioquora_detailed_project_report.md": "3_Detailed_Project_Report_DPR.md",
        "bioquora_financial_projections.md": "4_Financial_Projections.md",
        "proforma_answers.md": "5_Proforma_Application.md"
    }
    
    for src_file, dest_name in docs_to_copy.items():
        src_path = os.path.join(brain_dir, src_file)
        if os.path.exists(src_path):
            shutil.copy2(src_path, os.path.join(docs_dest, dest_name))
            print(f"  -> Copied {dest_name}")
        else:
            print(f"  -> Warning: Could not find {src_file}")
            
    print("3/3: Compressing into final ZIP archive...")
    # 4. Zip the entire staging directory
    shutil.make_archive(zip_path, 'zip', staging_dir)
    
    # 5. Clean up staging
    shutil.rmtree(staging_dir)
    
    print(f"\nSUCCESS! Your final submission is ready at: {zip_path}.zip")

if __name__ == "__main__":
    package_submission()
