import sys, json, time, urllib.request, urllib.error, socket
sys.stdout.reconfigure(encoding='utf-8')
socket.setdefaulttimeout(1800)
URL='https://tnkwbcevfyslpetuuxlu.supabase.co'
ANON='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRua3diY2V2ZnlzbHBldHV1eGx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxOTkzMjMsImV4cCI6MjA5NDc3NTMyM30.bMQJwMVioi6OSYWYqXFEwGA89AompDtnr-eDg6movWw'
src=r'C:\Users\PC\Downloads\DIU_cours_systeme_intro.pdf'
blob=open(src,'rb').read()
fname='DIU_cours_systeme_intro.pdf'
# éviter les doublons si une tentative a partiellement réussi
import urllib.request as u
chk=json.loads(u.urlopen(u.Request(URL+"/rest/v1/ressources?file_name=eq."+fname+"&select=id",headers={'apikey':ANON,'Authorization':'Bearer '+ANON})).read())
if chk:
    print("déjà inséré, rien à faire"); sys.exit()
path=f"bloc3/{int(time.time()*1000)}_{fname}"
req=urllib.request.Request(f"{URL}/storage/v1/object/ressources/{path}",data=blob,method='POST',
  headers={'apikey':ANON,'Authorization':'Bearer '+ANON,'Content-Type':'application/pdf','x-upsert':'true'})
with urllib.request.urlopen(req, timeout=1800) as r: print("UPLOAD", r.status, round(len(blob)/1e6,1),"Mo")
row={"title":"Cours — Une introduction aux systèmes (V. Marangozova-Martin)","bloc":"bloc3",
     "topic":"Systèmes d'exploitation","description":"Cours DIU Bloc 3 : pourquoi un système d'exploitation, le matériel (CPU/UAL/registres, mémoire, périphériques, bus), commandes bas niveau, cycle fetch-decode-execute. 318 diapos, CC BY-NC-SA.",
     "file_path":path,"file_name":fname,"file_type":"application/pdf","file_size":len(blob)}
req2=urllib.request.Request(f"{URL}/rest/v1/ressources",data=json.dumps([row]).encode(),method='POST',
  headers={'apikey':ANON,'Authorization':'Bearer '+ANON,'Content-Type':'application/json','Prefer':'return=minimal'})
with urllib.request.urlopen(req2) as r: print("INSERT", r.status)
