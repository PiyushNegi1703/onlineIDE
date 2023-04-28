import uuid
import subprocess
import django
django.setup()
from .models import SubmissionModel


def create_code_file(code, language):
    file_name = str(uuid.uuid4()) + "." + language
    with open("code/" + file_name, "w") as f:
        f.write(code)
    return file_name


def execute_code(file_name, language, submission_id):
    submission = SubmissionModel.objects.get(pk=submission_id)
    if language == "cpp":
        result = subprocess.run(["g++", "code/" + file_name], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        if result.returncode != 0:
            # Compile error
            submission.output = result.stderr
            submission.status = 'E'
            submission.save()
            return
        else:
            result = subprocess.run(["a.exe"], input=submission.user_input.encode("utf-8"), stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        
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

