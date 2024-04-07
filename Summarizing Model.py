import fitz  # PyMuPDF
from transformers import pipeline
import requests

def extract_text_from_pdf(pdf_url):
    response = requests.get(pdf_url)
    with fitz.open(stream=response.content, filetype="pdf") as doc:
        text = ''
        for page in doc:
            text += page.get_text()
    return text

def summarize_after_diagnosis_with_bart(text):
    summarization_pipeline = pipeline("summarization", model="sshleifer/distilbart-cnn-12-6", revision="a4f8f3e")
    diagnosis_index = text.lower().find("diagnosis")
    if diagnosis_index == -1:
        return "Diagnosis not found in the document."
    text_after_diagnosis = text[diagnosis_index:]
    max_length = min(150, len(text_after_diagnosis) + 10)
    max_length = min(max_length, 70)
    summary = summarization_pipeline(text_after_diagnosis, max_length=max_length, min_length=30, do_sample=False)
    return summary[0]['summary_text']

def extract_blood_report_info(text):
    lines = text.strip().split("\n")
    blood_report_info = "test - Result - Unit\n"
    for line in lines:
        if "Biological ref. interval" in line:
            continue
        parts = [part.strip() for part in line.split("--")]
        if len(parts) >= 3:
            test_name = parts[0]
            result = parts[1]
            unit = parts[2]
            blood_report_info += f"{test_name} - {result} - {unit}\n"
    return blood_report_info

x = int(input("Enter no. 1-3 to summerize a patient's Prescriptions "))

if x==1:
    visit_links = [['Visit 1','https://firebasestorage.googleapis.com/v0/b/hackaccino24.appspot.com/o/p1%2Fv11.pdf?alt=media&token=e2e411d6-3209-4470-8d2c-76a40caa49d3'],
                ['Visit 2','https://firebasestorage.googleapis.com/v0/b/hackaccino24.appspot.com/o/p1%2Fv12.pdf?alt=media&token=548cc23a-f23a-4f41-8021-7783fb8831b7'],
                ['Visit 3','https://firebasestorage.googleapis.com/v0/b/hackaccino24.appspot.com/o/p1%2Fv13.pdf?alt=media&token=4fbd5154-6f12-46ea-a5a3-2c3e20dc3e38'],
                ['Blood Report','https://firebasestorage.googleapis.com/v0/b/hackaccino24.appspot.com/o/p1%2Fv1b1.pdf?alt=media&token=974cca9b-7bf6-4187-ae06-9acc72db6290']]
elif x==2:
    visit_links = [['Visit 1','https://firebasestorage.googleapis.com/v0/b/hackaccino24.appspot.com/o/p2%2FP2_1.pdf?alt=media&token=c3bc462a-35a1-4853-8776-e5ebf270b5cd'],
                ['Visit 2','https://firebasestorage.googleapis.com/v0/b/hackaccino24.appspot.com/o/p2%2FP2_2.pdf?alt=media&token=fb107361-dc18-4309-bef6-1b9f7d32f832'],
                ['Visit 3','https://firebasestorage.googleapis.com/v0/b/hackaccino24.appspot.com/o/p2%2FP2_3.pdf?alt=media&token=8d86dcae-734c-4b30-98a1-333c36696868'],
                ['Visit 4','https://firebasestorage.googleapis.com/v0/b/hackaccino24.appspot.com/o/p2%2FP2_4.pdf?alt=media&token=be4652a4-625e-43d4-8f5f-a1124fef4423']]

elif x==3:
    visit_links = [['Visit 1','https://firebasestorage.googleapis.com/v0/b/hackaccino24.appspot.com/o/p3%2FP3_1.pdf?alt=media&token=c8cd42df-1232-4df6-9495-e0756475e16d'],
                ['Visit 2','https://firebasestorage.googleapis.com/v0/b/hackaccino24.appspot.com/o/p3%2FP3_2.pdf?alt=media&token=16b948e4-c4de-49cc-9465-e6fb2a53a42d']]

for visit_name, pdf_url in visit_links:
    print(f"Summary for {visit_name}:")
    text = extract_text_from_pdf(pdf_url)
    if visit_name == 'Blood Report':
        blood_report_info = extract_blood_report_info(text)
        print(blood_report_info)
    else:
        summary = summarize_after_diagnosis_with_bart(text)
        print(summary)
    print('-' * 30)
