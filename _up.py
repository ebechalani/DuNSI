import sys, json, time, os, urllib.request, urllib.error
sys.stdout.reconfigure(encoding='utf-8')
URL='https://tnkwbcevfyslpetuuxlu.supabase.co'
ANON='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRua3diY2V2ZnlzbHBldHV1eGx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxOTkzMjMsImV4cCI6MjA5NDc3NTMyM30.bMQJwMVioi6OSYWYqXFEwGA89AompDtnr-eDg6movWw'
src=r'C:\Users\PC\Downloads\DIU_cours_systeme_intro.pdf'
blob=open(src,'rb').read()
fname='DIU_cours_systeme_intro.pdf'
path=f"bloc3/{int(time.time()*1000)}_{fname}"
req=urllib.request.Request(f"{URL}/storage/v1/object/ressources/{path}",data=blob,method='POST',
  headers={'apikey':ANON,'Authorization':'Bearer '+ANON,'Content-Type':'application/pdf','x-upsert':'true'})
try:
    with urllib.request.urlopen(req, timeout=300) as r: print("UPLOAD", r.status, round(len(blob)/1e6,1),"Mo")
except urllib.error.HTTPError as e:
    print("ERR UPLOAD", e.code, e.read().decode()); raise
row={"title":"Cours — Une introduction aux systèmes (V. Marangozova-Martin)","bloc":"bloc3",
     "topic":"Systèmes d'exploitation","description":"Cours DIU Bloc 3 : pourquoi un système d'exploitation, le matériel (CPU/UAL/registres, mémoire, périphériques, bus), commandes bas niveau, cycle fetch-decode-execute. 318 diapos, CC BY-NC-SA.",
     "file_path":path,"file_name":fname,"file_type":"application/pdf","file_size":len(blob)}
req2=urllib.request.Request(f"{URL}/rest/v1/ressources",data=json.dumps([row]).encode(),method='POST',
  headers={'apikey':ANON,'Authorization':'Bearer '+ANON,'Content-Type':'application/json','Prefer':'return=minimal'})
try:
    with urllib.request.urlopen(req2) as r: print("INSERT", r.status)
except urllib.error.HTTPError as e:
    print("ERR INSERT", e.code, e.read().decode())
