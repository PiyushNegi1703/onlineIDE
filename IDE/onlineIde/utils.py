import uuid
import subprocess
import django
django.setup()
from .models import SubTab

def create_code_file(code, language):
    file_name = str(uuid.uuid4()) + "." + language
    with open("code/" + file_name, "w") as f:
        f.write(code)
    return file_name

def execute_code(file_name, language, sub_id):
    sub = SubTab.objects.get(pk=sub_id)
    if language == "cpp":
        result = subprocess.run(["g++", "code/" + file_name], stdout=subprocess.PIPE) #Compiling the code
        if(result.returncode != 0):
            #Compilation Error
            sub.status = 'E'
            sub.save()
            return
        
        result = subprocess.run(["a.exe"], stdout=subprocess.PIPE)
        if(result.returncode != 0):
            #Runtime Error
            sub.status = 'E'
            sub.save()
            return

        sub.output = result.stdout.decode("utf-8")
        sub.status = 'S'
        sub.save()