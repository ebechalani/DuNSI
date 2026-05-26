import sys, json, time, socket, urllib.request, urllib.error
sys.stdout.reconfigure(encoding='utf-8')
socket.setdefaulttimeout(600)
URL='https://tnkwbcevfyslpetuuxlu.supabase.co'
ANON='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRua3diY2V2ZnlzbHBldHV1eGx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxOTkzMjMsImV4cCI6MjA5NDc3NTMyM30.bMQJwMVioi6OSYWYqXFEwGA89AompDtnr-eDg6movWw'
src=r'C:\Users\PC\Downloads\DIU_cours_systeme_intro_compresse.pdf'
blob=open(src,'rb').read()
fname='DIU_cours_systeme_intro.pdf'
chk=json.loads(urllib.request.urlopen(urllib.request.Request(URL+"/rest/v1/ressources?file_name=eq."+fname+"&select=id",headers={'apikey':ANON,'Authorization':'Bearer '+ANON})).read())
if chk: print("déjà inséré"); sys.exit()
path=f"bloc3/{int(time.time()*1000)}_{fname}"
urllib.request.urlopen(urllib.request.Request(f"{URL}/storage/v1/object/ressources/{path}",data=blob,method='POST',
  headers={'apikey':ANON,'Authorization':'Bearer '+ANON,'Content-Type':'application/pdf','x-upsert':'true'}))
print("UPLOAD ok", round(len(blob)/1e6,1),"Mo")
row={"title":"Cours — Une introduction aux systèmes (V. Marangozova-Martin)","bloc":"bloc3",
     "topic":"Systèmes d'exploitation","description":"Cours DIU Bloc 3 (Jour 5) : pourquoi un système d'exploitation, le matériel (CPU/UAL/registres, mémoire, périphériques, bus), commandes bas niveau, cycle fetch-decode-execute. 60 diapos, CC BY-NC-SA. (PDF compressé pour le web.)",
     "file_path":path,"file_name":fname,"file_type":"application/pdf","file_size":len(blob)}
urllib.request.urlopen(urllib.request.Request(f"{URL}/rest/v1/ressources",data=json.dumps([row]).encode(),method='POST',
  headers={'apikey':ANON,'Authorization':'Bearer '+ANON,'Content-Type':'application/json','Prefer':'return=minimal'}))
print("INSERT ok")
