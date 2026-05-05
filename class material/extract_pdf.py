import os
import json
import PyPDF2

def extract_text_from_pdfs(directory):
    pdf_content = {}
    
    # Check if directory exists
    if not os.path.exists(directory):
        print(f"Directory not found: {directory}")
        return

    for filename in os.listdir(directory):
        if filename.endswith(".pdf"):
            filepath = os.path.join(directory, filename)
            print(f"Processing: {filename}")
            
            try:
                with open(filepath, 'rb') as file:
                    reader = PyPDF2.PdfReader(file)
                    text = ""
                    for page in reader.pages:
                        text += page.extract_text() + "\n"
                    
                    pdf_content[filename] = text
            except Exception as e:
                print(f"Error reading {filename}: {e}")
                pdf_content[filename] = f"Error extracting text: {str(e)}"

    with open('extracted_content.json', 'w', encoding='utf-8') as f:
        json.dump(pdf_content, f, indent=4)
    
    print("Extraction complete. Saved to extracted_content.json")

if __name__ == "__main__":
    extract_text_from_pdfs('./pdf')
