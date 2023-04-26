import uuid
import subprocess

def create_code_file(code, language):
    file_name = str(uuid.uuid4()) + "." + language
    with open("code/" + file_name, "w") as f:
        f.write(code)
    return file_name

def execute_code(file_name, language):
    if language == "cpp":
        result = subprocess.run(["g++", "code/" + file_name], stdout=subprocess.PIPE) #Compiling the code
        if(result.returncode != 0):
            #Compilation Error
            return
        
        result = subprocess.run(["a.exe"], stdout=subprocess.PIPE)
        if(result.returncode != 0):
            #Runtime Error
            return

        return result.stdout.decode("utf-8")