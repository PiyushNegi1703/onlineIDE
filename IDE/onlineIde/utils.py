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


def execute_code(file_name, language, submission_id):
    submission = SubTab.objects.get(pk=submission_id)
    if language == "cpp":
        # g++ xyz.cpp
        result = subprocess.run(["g++", "code/" + file_name], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        if result.returncode != 0:
            # Compile error
            submission.output = result.stderr
            submission.status = 'E'
            submission.save()
            return
        else:
            result = subprocess.run(["a.exe"], stdout=subprocess.PIPE)
        
        if result.returncode != 0:
            #Runtime error
            submission = result.stderr
            submission.status = 'E'
            submission.save()
            return
        else:
            submission.output = result.stdout.decode("utf-8")
            submission.status = 'S'
            submission.save()
            return

